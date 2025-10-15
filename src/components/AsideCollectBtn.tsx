import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import usePokemonStore from '../stores/usePokemonStore.js'
import DismissButton from './DismissButton.js'
import type { AllPokemonData } from '../types/types.js';

function AsideCollectBtn() {

    const collectPokemonList = usePokemonStore((state) => state.collectPokemonList);
    const toggleCollect = usePokemonStore((state) => state.toggleCollect);

    const getColorFromCache = usePokemonStore((state) => state.getColorFromCache);

    const formatId = usePokemonStore((state) => state.formatId);

    const openModal = usePokemonStore((state) => state.openModal);

    const [showBtn, setShowBtn] = useState(false);
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        if(collectPokemonList.length > 0){ setShowBtn(true) }
        else { setShowBtn(false) }
    },[collectPokemonList])

    useEffect(() => {
        gsap.to(btnRef.current, {
            y: showBtn ? 0 : 100,
            opacity: showBtn ? 1 : 0,
            duration: 0.8,
            ease: 'power2.inout',
            pointerEvents: showBtn ? 'auto' : 'none'
        })
    }, [showBtn])


    //콜렉트 리스트 토글
    const [showCollect, setShowCollect] = useState(false);
    
    //aside 콜렉션 이미지 띄우기
    const lastPokemon = collectPokemonList.at(-1);

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, pokemon: AllPokemonData) => {
        e.stopPropagation();
        toggleCollect(pokemon);
        if(collectPokemonList.length <= 1){
            setShowCollect(false)
        }
    }

    return (
    <>
        <div className='w-10 h-10 
            rounded-full border border-[var(--navy-color)]
            flex flex-wrap justify-center items-center backdrop-blur-sm'
            ref={btnRef}
            >
            <button
                className='flex flex-wrap items-center justify-center w-7 h-7 ' 
                type="button"
                onClick={ ()=> setShowCollect(!showCollect) }>
                {
                    lastPokemon && <img className='w-full h-full object-contain' src={lastPokemon.imgGifFrontUrl} alt={lastPokemon.name} />
                }
            </button>
        </div>
        {/* 저장된 리스트 */}
        <div className={`absolute right-0 bottom-25 w-58 backdrop-blur-sm
            transition-all duration-300 ease-in-out
            ${showCollect ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
            `}>
            <ul className='text-sm w-full h-full' role="listbox">
                {
                    collectPokemonList.map((pokemon, i)=>(
                        <li
                        key={pokemon.name + i}
                        onClick={() => openModal(pokemon)}
                        className={`
                                w-full py-2 px-4 bg-[var(--gray-color)]/10 text-[var(--gray-color)]
                                border-[var(--navy-color)] cursor-pointer
                                ${
                                collectPokemonList.length === 1
                                    ? 'border border-[var(--navy-color)] rounded-2xl'
                                    : i === 0
                                    ? 'border border-[var(--navy-color)] rounded-t-2xl'
                                    : i === collectPokemonList.length - 1
                                    ? 'border-x border-b border-[var(--navy-color)] rounded-b-2xl'
                                    : 'border-x border-b border-[var(--navy-color)]'
                                }
                            `}
                        role="option">
                        <div>
                            <div className='flex justify-between items-center' >
                                <div className='flex items-center gap-2'>
                                    <div className='w-6 h-6'>
                                        <img className='w-full h-full object-contain' src={pokemon.imgGifFrontUrl} alt={pokemon.name} />
                                    </div>
                                    <dl className='flex items-center gap-1'>
                                        <dt className='sr-only'>포켓몬</dt>
                                        <dd className='text-white'>
                                            { pokemon.name }
                                        </dd>
                                        <dt className='sr-only'>도감번호</dt>
                                        <dd className='text-xs'>#{ formatId(pokemon.id) }</dd>
                                    </dl>
                                    <div className='flex gap-1'>
                                        {
                                            getColorFromCache(pokemon.id).map((color, i) => 
                                                <div 
                                                    key={color + i}
                                                    className={`w-3 h-3 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]`}
                                                    style={{ backgroundColor: color }}>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <DismissButton removeBtn onClick={(e) => handleRemove(e,pokemon)} fillcolor='var(--gray-color)'/>
                            </div>
                        </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    </>
    )
}

export default AsideCollectBtn