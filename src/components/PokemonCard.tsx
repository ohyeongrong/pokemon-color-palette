import usePokemonStore from '../stores/usePokemonStore.js'
import { useEffect, useLayoutEffect, useRef, type HTMLAttributes } from 'react'
import PokemonTypeBadge from './PokemonTypeBadge.js';
import { usePokemonColor } from '../hooks/usePokemonColor.js'
import type { AllPokemonData } from '../types/types.js';
import gsap from 'gsap';
import AddCollectBtn from '../components/AddCollectBtn.js'

interface PokemonCard {
    pokemon: AllPokemonData
}

function PokemonCard ({ pokemon }: PokemonCard )  {

    const formatId = usePokemonStore((state) => state.formatId);
    const toggleCollect = usePokemonStore((state) => state.toggleCollect);
    const collectPokemonList = usePokemonStore((state) => state.collectPokemonList);

    const isCollected = collectPokemonList.some(p => p.id === pokemon.id)

    const openModal = usePokemonStore((state) => state.openModal);

    const formatMetricValue = usePokemonStore((state) => state.formatMetricValue);

    const { colors, fetchColors } = usePokemonColor(pokemon.id, pokemon.imageUrl);

    const cardInnerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLElement>(null);

    useEffect(()=>{
        fetchColors()
    },[pokemon.id, pokemon.imageUrl])


    //카드 리스트 애니메이션 초기 상태 설정
    useEffect(()=>{
        if(cardRef.current){
            gsap.set(cardRef.current, {autoAlpha: 0, y: 50});
        }
    },[]);

    // 모달창
    const handleCardClick = (pokemon: AllPokemonData) => {
        openModal(pokemon)
    }

    // 콜렉트 추가
    const handleAddCollectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleCollect(pokemon);
    }

    //마우스 오버 카드 효과
    const handleHoverStart = () => {
        gsap.to(cardInnerRef.current, {
            rotateY: 180,
            duration: 0.6,
            ease: "power2.inOut"
        });
    };

    const handleHoverEnd = () => {
        gsap.to(cardInnerRef.current, {
        rotateY: 0,
        duration: 0.6,
        ease: "power2.inOut"
        });
    };

    return (
        <article onClick={ () => handleCardClick(pokemon)} className='flex flex-wrap cursor-pointer'>
            <div className='w-58 h-64 md:h-82'
                onMouseEnter={ handleHoverStart }
                onMouseLeave={ handleHoverEnd }
                onTouchStart={handleHoverStart}
                onTouchEnd={handleHoverEnd}>
                <div className='w-full h-full relative [transform-style:preserve-3d]' ref={cardInnerRef}>
                    {/* 포켓몬 card 앞면*/}
                    <div
                        className='absolute
                        flex flex-col justify-between 
                        border-1 border-[var(--navy-color)] rounded-2xl 
                        p-4 md:p-6  w-full h-full backface-hidden'>
                        {/* 포켓몬 이름 */}
                        <div className='flex justify-between'>
                            <div className='flex flex-col items-start'>
                                <h3 className='text-xl md:text-2xl font-semibold'>{pokemon.name}</h3>
                                <span className='text-xs md:text-sm text-[var(--gray-color)]'>{pokemon.englishName}</span>
                            </div>
                            <dl>
                                <dt className='sr-only'>도감번호</dt>
                                <dd className='text-[var(--gray-color)] font-semibold'>#{formatId(pokemon.id)}</dd>
                            </dl>
                        </div>
                        {/* 포켓몬 이미지 */}
                        <div className='flex flex-col justify-center items-center gap-2 relative'>
                            <img className='absolute object-cover [image-rendering:pixelated]' src={pokemon.imgGifFrontUrl} alt={pokemon.englishName} loading="lazy" />
                            <div className='w-30 h-30 md:w-32 md:h-32 relative'>
                                <div className='absolute right-0'>
                                    <AddCollectBtn pokemon={pokemon}/>
                                </div>
                            <div className='w-full h-full bg-[var(--gray-color)]/10 rounded-full'></div>
                        </div>
                        {/* 컬러칩 */}
                        <div className='flex gap-1'>
                            {
                                colors.map((color, i) => 
                                    <div 
                                    key={color + i}
                                    className={`w-3 h-3 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]`}
                                    style={{ backgroundColor: color }}>

                                    </div>
                                )
                            }
                        </div>
                        </div>
                        {/* 포켓몬 속성, 타입 */}
                        <div className='flex items-center justify-between'>
                        {/* 타입 */}
                        <PokemonTypeBadge pokemon={pokemon}/>
                        <dl>
                            <dt className='sr-only'>분류</dt>
                            <dd className='text-[11px] md:text-xs text-[var(--gray-color)]'>{pokemon.genus}</dd>
                        </dl>
                        </div>
                    </div>
                    {/* 포켓몬 card 뒷면*/}
                    <div 
                        className='absolute
                        flex flex-col justify-between 
                        border-1 border-[var(--navy-color)] bg-[var(--navy-color)]/40 rounded-2xl 
                        p-4 md:p-6 w-full h-full backface-hidden
                        rotate-y-180'>
                        {/* 포켓몬 이름 */}
                        <div className='flex justify-between'>
                            <div className='flex flex-col items-start'>
                                <h3 className='text-xl md:text-2xl font-semibold'>{pokemon.name}</h3>
                                <span className='text-xs md:text-sm text-[var(--gray-color)]'>{pokemon.englishName}</span>
                            </div>
                            <dl>
                                <dt className='sr-only'>도감번호</dt>
                                <dd className='text-[var(--gray-color)] font-semibold'>#{formatId(pokemon.id)}</dd>
                            </dl>
                        </div>
                        {/* 포켓몬 이미지 */}
                        <div className='flex flex-col justify-center items-center gap-2 relative'>
                            <img className='absolute object-cover [image-rendering:pixelated]' src={pokemon.imgGifBackUrl} alt={pokemon.englishName} loading="lazy"/>
                            <div className='w-30 h-30 md:w-32 md:h-32 relative'>
                                <div className='absolute right-0'>
                                    <AddCollectBtn pokemon={pokemon}/>
                                </div>
                            <div className='w-full h-full bg-[var(--gray-color)]/10 rounded-full'></div>
                        </div>
                        {/* 컬러칩 */}
                        <div className='flex gap-1'>
                            {
                                colors.map((color, i) => 
                                    <div
                                    key={color + i}
                                    className={`w-3 h-3 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]`}
                                    style={{ backgroundColor: color }}>

                                    </div>
                                )
                            }
                        </div>
                        </div>
                        {/* 포켓몬 정보 */}
                        <div className='flex justify-between'>
                        <dl className='flex gap-4 text-[11px] md:text-sm'>
                            <div className='flex gap-1'>
                            <dt>키</dt>
                            <dd className='text-[var(--gray-color)]'>{formatMetricValue(pokemon.height)}m</dd>
                            </div>
                            <div className='flex gap-1'>
                            <dt>몸무게</dt>
                            <dd className='text-[var(--gray-color)]'>{formatMetricValue(pokemon.weight)}kg</dd>
                            </div>
                        </dl>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default PokemonCard