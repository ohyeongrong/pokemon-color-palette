import DismissButton from './DismissButton.js'
import usePokemonStore from '../stores/usePokemonStore.js'
import PokemonTypeBadge from './PokemonTypeBadge.js';
import type { ForwardedRef } from 'react'; 
import { useRef, useEffect } from 'react';
import { usePokemonColor } from '../hooks/usePokemonColor.js'
import type { AllPokemonData } from '../types/types.js';
import AddCollectBtn from '../components/AddCollectBtn.js'
import gsap from 'gsap';

interface PokemonModalContent {
    selectedPokemon : AllPokemonData;
    contentRef: ForwardedRef<HTMLDivElement>; 
    handleCloseWithAnimation: () => void;
}

function PokemonModalContent({ selectedPokemon, contentRef, handleCloseWithAnimation }: PokemonModalContent) {

    const closeModal = usePokemonStore((state) => state.closeModal);
    const formatId = usePokemonStore((state) => state.formatId);
    const getColorFromCache = usePokemonStore((state) => state.getColorFromCache);

    const formatMetricValue = usePokemonStore((state) => state.formatMetricValue);

    const { colors, fetchColors } = usePokemonColor(
        selectedPokemon.id, 
        selectedPokemon.imageUrl
    );

    useEffect(() => {
        fetchColors();

        if (contentRef) {
            const refObject = contentRef as React.RefObject<HTMLDivElement>; 

            if (refObject.current) {
                gsap.fromTo(
                    refObject.current, 
                    { 
                        scale: 0.2,
                        opacity: 0,
                    },
                    {
                        duration: 0.6,
                        scale: 1,
                        opacity: 1,
                        ease: "back.out(1.7)",
                    }
                );
            }
        }
    }, [selectedPokemon.id, selectedPokemon.imageUrl, fetchColors, contentRef]);

    
    // 컬러 복사
    function handleColorCopy(txt: string) {
        navigator.clipboard.writeText(txt).then(()=>{
            alert('복사 성공')
        })
        .catch(err => {
            console.log('복사 실패 :' , err);
        })
    }

    return (
        <div className="inset-1/2 -translate-x-1/2 -translate-y-1/2 
            w-full h-full md:md:h-auto px-4 md:p-16 md:w-xl 
            relative text-white
            bg-[var(--black-color)]/80 md:border md:border-[var(--navy-color)] md:rounded-2xl"
            onClick={e => e.stopPropagation()}
            ref={contentRef}
            >
                    <header className='absolute right-4 top-4 md:right-2 md:top-2'>
                        <h2 className="sr-only">{selectedPokemon.name} 상세 모달창</h2>
                        <DismissButton 
                            label={"모달창 닫기"} 
                            closeBtn 
                            onClick={() => { handleCloseWithAnimation() }} 
                            height='24px' width='24px'/>
                    </header>
                    <article>
                        <div className="flex flex-col gap-9 py-18 md:py-0 px-4 md:px-0">
                            <div className="flex items-center relative">
                                <div className="flex-4/9 md:flex-1 ">
                                    <div className='absolute top-1 left-1'>
                                        <AddCollectBtn pokemon={selectedPokemon} height='20px' width='20px'/>
                                    </div>
                                    <div className='w-full h-full flex items-center justify-center'>
                                        <img className="object-contain [image-rendering:pixelated]" src={selectedPokemon.imgGifFrontUrl} alt={selectedPokemon.name} loading="lazy" />
                                    </div>
                                </div>
                                <div className="flex-5/9 md:flex-1">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <dl>
                                                <dt className="sr-only">도감번호</dt>
                                                <dd className="text-[var(--gray-color)] font-semibold">#{ formatId(selectedPokemon.id) }</dd>
                                            </dl>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h2 className="text-2xl font-semibold">{ selectedPokemon.name }</h2>
                                                    <PokemonTypeBadge pokemon={selectedPokemon}/>
                                                </div>
                                                <p className="text-sm text-[var(--gray-color)]">{ selectedPokemon.englishName }</p>
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            <dl className="flex gap-2">
                                                <dt>분류</dt>
                                                <dd className="text-[var(--gray-color)]">{ selectedPokemon.genus }</dd>
                                            </dl>
                                            <dl className="flex gap-2">
                                                <dt>키</dt>
                                                <dd className="text-[var(--gray-color)]" >{ formatMetricValue(selectedPokemon.height) }m</dd>
                                                <dt>몸무게</dt>
                                                <dd className="text-[var(--gray-color)]">{ formatMetricValue(selectedPokemon.weight) }kg</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='border-b border-[var(--navy-color)]'></div>
                            <div>
                                <ul className='flex flex-col md:flex-row md:justify-between gap-2'>
                                    {
                                        getColorFromCache(selectedPokemon.id).map((color, i) => (
                                            <li key={color + i} className='flex flex-wrap flex-col justify-between gap-1 p-3 md:gap-4 md:p-4 md:w-37 md:h-30 rounded-2xl text-xs'
                                                style={{ backgroundColor: color }}>
                                                <div className='flex'>
                                                    <div className='flex items-center justify-center bg-[var(--black-color)]/40 rounded-lg py-1 px-2'>
                                                        <span className='font-semibold'>
                                                            {   i === 0
                                                                ? 'Primary'
                                                                : i === 1
                                                                ? 'Secondary'
                                                                : 'Accent'
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between items-end'>
                                                    <span>{ color }</span>
                                                    <button 
                                                        className='bg-[var(--black-color)]/40 rounded-full p-2 hover:bg-[var(--gray-color)]/40 transition-colors duration-600 ease-in-out' 
                                                        type="button"
                                                        onClick={ () => handleColorCopy(color) }
                                                        >
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#fff"><path d="M362.31-260q-27.01 0-45.66-18.65Q298-297.3 298-324.31v-455.38q0-27.01 18.65-45.66Q335.3-844 362.31-844h359.38q27.01 0 45.66 18.65Q786-806.7 786-779.69v455.38q0 27.01-18.65 45.66Q748.7-260 721.69-260H362.31Zm0-52h359.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-124 176q-27.01 0-45.66-18.65Q174-173.3 174-200.31v-481.38q0-11.07 7.41-18.54 7.4-7.46 18.38-7.46 10.98 0 18.6 7.46 7.61 7.47 7.61 18.54v481.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h385.38q11.07 0 18.54 7.4 7.46 7.41 7.46 18.39t-7.46 18.59q-7.47 7.62-18.54 7.62H238.31ZM350-312v-480 480Z"/></svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </article>
        </div>
    )
}

export default PokemonModalContent