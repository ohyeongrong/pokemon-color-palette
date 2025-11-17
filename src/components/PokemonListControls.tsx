import usePokemonStore from '../stores/usePokemonStore.js'
import DismissButton from './DismissButton.js'
import React, { useEffect, useRef, useState } from 'react'
import type { AllPokemonData, SortOption } from '../types/types'
import gsap from 'gsap';

function PokemonListControls () {

    const allTypeList = usePokemonStore((state) => state.allTypeList);

    const allPokemonList = usePokemonStore((state) => state.filteredPokemonList);

    const selectedType = usePokemonStore((state) => state.selectedType);
    const setSelectedType = usePokemonStore((state) => state.setSelectedType);

    const filterByType = usePokemonStore((state) => state.filterByType);
    const filterByKeyword = usePokemonStore((state) => state.filterByKeyword);
    
    const searchSuggestions = usePokemonStore((state) => state.searchSuggestions);
    const getSearchSuggestions = usePokemonStore((state) => state.getSearchSuggestions);

    const filterBySort = usePokemonStore((state) => state.filterBySort);

    const formatId = usePokemonStore((state) => state.formatId);

    const openModal = usePokemonStore((state) => state.openModal);

    const sortOptValue = usePokemonStore((state) => state.sortOptValue);
    const setSortOptValue = usePokemonStore((state) => state.setSortOptValue);

    //검색창 키워드 담아 둘 변수
    const [keyword, setKeyword] = useState('');

    //정렬 옵션 창
    const [showSortOpts, setShowSortOpts] = useState(false);

    // 정렬 옵션 매핑
    const sortOptions = [
    { label: '도감번호 순서', value: 'id-asc' },
    { label: '도감번호 반대순서', value: 'id-desc' },
    { label: '무거운 순서', value: 'weight-desc' },
    { label: '가벼운 순서', value: 'weight-asc' },
    { label: '키 큰 순서', value: 'height-desc' },
    { label: '키 작은 순서', value: 'height-asc' },
    ];

    //타입버튼 별 리스트 보이는 함수
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        filterByType(value)
        setSelectedType(value)
        setSortOptValue('id-asc')
    }

    //검색창 함수
    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setKeyword(value)
        getSearchSuggestions(value)
    }

    //검색창 키워드 삭제
    const handleKeywordDelte = () => {
        setKeyword('')
        getSearchSuggestions('')
    }

    //검색 버튼 클릭
    const handlekeywordClick = () => {
        filterByKeyword(keyword)
        setKeyword('')
        getSearchSuggestions('')
        setSortOptValue('id-asc')
        setSelectedType('')
    }

    //검색창 자동완성 부분 키워드 강조하기
    function keywordHighlight(value:string, keyword: string) {

        const index = value.toString().indexOf(keyword);

        if(index === -1){
        return value
        }

        const before = value.substring(0, index);
        const highlight = value.substring(index, index + keyword.length);
        const after = value.substring(index + keyword.length);

        return (
        <>
            {before}
            <span className='text-white'>{highlight}</span>
            {after}
        </>
        );
    }

    // 정렬 옵션 순 변경
    const handleOptChange = (e: React.MouseEvent<HTMLElement>) => {
    const value = e.currentTarget.dataset.value;
    filterBySort(value as SortOption)
    setSortOptValue(value ?? '')
    setShowSortOpts(false)
    }

    //정렬 옵션 선택한 한글 옵션명 적용
    function seletedOptLabel() {
    const result = sortOptions.find(item => item.value === sortOptValue)

    return result ? result.label : '도감번호 순서'
    }

    
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    //자동완성 리스트 모달창 열기
    const handleModalOpen = (pokemon: AllPokemonData) => {
        const selectedPokemon = allPokemonList.find(p => p.id === pokemon.id)
        if(!selectedPokemon) return;
        openModal(selectedPokemon)
    }

    const formRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(formRef.current, 
            { autoAlpha: 0 },
            {
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power2.inOut',
            }
        )
    },[])

    return (
        <section className='py-8 md:py-16'>
            <h2 className='sr-only'>포켓몬 검색 및 필터</h2>
            <form role='search' onSubmit={ handleSearch } ref={formRef}>
                <div className='flex flex-col gap-6 md:gap-0 md:flex-row'>
                    {/* 포켓몬 타입 라디오 버튼 */}
                    <fieldset className='md:flex-1/2 lg:flex-2/5'> 
                        <legend className='sr-only'>포켓몬 타입 선택</legend>
                        {/* 전체 버튼 */}
                        <div className='flex flex-wrap gap-1'>
                            <div className='flex flex-wrap flex-col justify-center items-center'>
                            <input 
                            id="type-all" 
                            type="radio" 
                            name="type" 
                            value="all"
                            checked={ selectedType === 'all' } 
                            className='appearance-none peer'
                            onChange={ handleTypeChange }
                            />
                            <label
                            htmlFor="type-all"
                            className={`
                                px-2.5 md:px-3 py-1.5 md:py-2 border border-[var(--navy-color)] rounded-full
                                text-[var(--gray-color)] text-sm cursor-pointer
                                peer-checked:bg-[var(--navy-color)] 
                                peer-checked:border-transparent  peer-checked:text-white 
                                ${selectedType !== 'all' && 'hover:bg-[var(--navy-color)]/60'} 
                                transition-colors duration-600 ease-in-out
                            `}>
                            전체
                            </label>
                        </div>
                        {
                            allTypeList.map((type, i) =>(
                            <div className='flex flex-wrap flex-col justify-center items-center' key={type.enType + i}>
                                <input 
                                id={`type-${type.enType}`}
                                type="radio" 
                                name="type" 
                                value={type.enType}
                                checked={ selectedType === type.enType } 
                                className='appearance-none peer'
                                onChange={ handleTypeChange }
                                />
                                <label 
                                htmlFor={`type-${type.enType}`}
                                className={`
                                    px-2.5 md:px-3 py-1.5 md:py-2 border border-[var(--navy-color)] rounded-full 
                                    text-[var(--gray-color)]  text-sm cursor-pointer
                                    peer-checked:bg-[var(--navy-color)] 
                                    peer-checked:border-transparent
                                    peer-checked:text-white  
                                    ${selectedType !== type.enType && 'hover:bg-[var(--navy-color)]/60'}
                                    transition-colors duration-600 ease-in-out
                                `}
                                >
                                {type.koType}
                                </label>
                            </div>
                            ))
                        }
                        </div>
                    </fieldset>
                    {/* 검색, 정렬 */}
                    <div className='md:flex-1/2 lg:flex-3/5'>
                        <div className='flex flex-col items-end gap-4'>
                        {/* 포켓몬 검색창 */}
                        <div className='relative w-full md:w-87'>
                            <div className='relative text-sm w-full 
                            border border-[var(--navy-color)] rounded-full hover:border-[var(--gray-color)]
                            transition-colors duration-600 ease-in-out
                            flex justify-between px-4 py-2'>
                                <input 
                                    className='w-full placeholder:text-[var(--gray-color)]/50 
                                    caret-[var(--gray-color)] focus:outline-none appearance-none' 
                                    type="search" 
                                    name="search"
                                    value={keyword}
                                    placeholder='포켓몬 이름, 도감 번호 입력해주세요.'
                                    onChange={ handleKeywordChange }
                                />
                                {/* 버튼 영역 */}
                                <div className='flex gap-2'>
                                    {/* 삭제버튼 */}
                                    {
                                    keyword 
                                        &&
                                        <DismissButton closeBtn label={"입력 내용 지우기"} onClick={ handleKeywordDelte }/>
                                    }
                                    {/* 검색 버튼 */}
                                    <button 
                                    type="submit" 
                                    aria-label="검색 버튼"
                                    onClick={ handlekeywordClick } 
                                    className='relative'
                                    >
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_18_491)">
                                            <path d="M5.88818 11.7928C4.2545 11.7928 2.86467 11.219 1.7187 10.0714C0.572899 8.92372 0 7.53203 0 5.89638C0 4.26073 0.572899 2.86904 1.7187 1.72132C2.86467 0.573774 4.25423 0 5.88739 0C7.52055 0 8.91012 0.573774 10.0561 1.72132C11.2019 2.86904 11.7748 4.26099 11.7748 5.89717C11.7748 6.58374 11.6623 7.2402 11.4372 7.86657C11.2119 8.49311 10.9071 9.05874 10.5227 9.56347L13.7771 12.8229C13.9223 12.9681 13.9966 13.1246 13.9999 13.2923C14.0032 13.4599 13.9289 13.6198 13.7771 13.7719C13.6252 13.924 13.4629 14 13.2901 14C13.1174 14 12.9552 13.924 12.8033 13.7719L9.5489 10.5387C9.02466 10.9372 8.44984 11.2459 7.82443 11.4646C7.19902 11.6834 6.55361 11.7928 5.88818 11.7928ZM5.88739 10.4279C7.15097 10.4279 8.22093 9.98901 9.09727 9.11116C9.97379 8.23348 10.412 7.16189 10.412 5.89638C10.412 4.63088 9.97379 3.55928 9.09727 2.6816C8.22093 1.80375 7.15097 1.36482 5.88739 1.36482C4.62382 1.36482 3.55386 1.80375 2.67752 2.6816C1.801 3.55928 1.36274 4.63088 1.36274 5.89638C1.36274 7.16189 1.801 8.23348 2.67752 9.11116C3.55386 9.98901 4.62382 10.4279 5.88739 10.4279Z" fill="#7F8EA3"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_18_491">
                                            <rect width="14" height="14" fill="white"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* 검색 자동완성 */}
                            <div className={`absolute w-full mt-2 z-50 backdrop-blur-md
                                transition-all duration-300 ease-in-out
                                ${searchSuggestions.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                            `}>
                                <ul className='text-sm w-full' role="listbox">
                                {
                                    searchSuggestions.map((pokemon, i)=>(
                                    <li 
                                        key={pokemon.name + i}
                                        className={
                                        i === 0
                                        ? 'w-full py-2 px-4 border border-[var(--navy-color)] rounded-t-2xl bg-[var(--gray-color)]/10 text-[var(--gray-color)]'
                                        : 'w-full py-2 px-4 border-x border-b border-[var(--navy-color)] bg-[var(--gray-color)]/10 text-[var(--gray-color)]'
                                    }
                                        role="option">
                                        <button 
                                            onClick={ ()=> handleModalOpen(pokemon) }
                                            type='button' 
                                            className='w-full flex justify-between items-center'>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-6 h-6'>
                                                    <img className='w-full h-full object-contain' src={pokemon.imgGifFrontUrl} alt={pokemon.name} loading="lazy" />
                                                </div>
                                                <dl>
                                                    <dt className='sr-only'>포켓몬</dt>
                                                    <dd className='text-[var(--gray-color)]'>
                                                    { keywordHighlight(pokemon.name, keyword) }
                                                    </dd>
                                                </dl>
                                            </div>
                                            <dl>
                                                <dt className='sr-only'>도감번호</dt>
                                                <dd className='text-xs'>#{keywordHighlight(formatId(pokemon.id), keyword)}</dd>
                                            </dl>
                                        </button>
                                    </li>
                                    ))
                                }
                                </ul>
                                <div 
                                className='flex items-center justify-end 
                                    w-full py-2 px-4 
                                    bg-[var(--gray-color)]/10 rounded-b-2xl
                                    text-xs text-[var(--gray-color)]/60
                                    border-x border-b border-[var(--navy-color)]'
                                >
                                <button
                                    onClick={handleKeywordDelte}
                                    type="button"
                                    >
                                    닫기
                                </button>
                                </div>
                            </div>
                        </div>
                        {/* 정렬기능 - 셀렉트 박스 */}
                        <div className='text-sm relative'>
                            <div 
                            className='flex cursor-pointer'
                            onClick={()=> setShowSortOpts(!showSortOpts)}
                            >
                                <span className='text-[var(--gray-color)]'>{ seletedOptLabel() }</span>
                                <span>
                                    { showSortOpts 
                                        ? <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#7F8EA3"><path d="M480-541.85 317.08-378.92q-8.31 8.3-20.89 8.5-12.57.19-21.27-8.5-8.69-8.7-8.69-21.08 0-12.38 8.69-21.08l179.77-179.77q10.85-10.84 25.31-10.84 14.46 0 25.31 10.84l179.77 179.77q8.3 8.31 8.5 20.89.19 12.57-8.5 21.27-8.7 8.69-21.08 8.69-12.38 0-21.08-8.69L480-541.85Z"/></svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#7F8EA3"><path d="M480-372.92q-7.23 0-13.46-2.31t-11.85-7.92L274.92-562.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.15l162.92-162.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L505.31-383.15q-5.62 5.61-11.85 7.92-6.23 2.31-13.46 2.31Z"/></svg> 
                                    }
                                </span>
                            </div>
                            <ul className={`
                                absolute right-0 top-6 z-40
                                flex flex-col gap-2
                                w-42 py-4 px-5
                                border border-[var(--navy-color)] rounded-2xl
                                bg-[var(--gray-color)]/10 backdrop-blur-md
                                text-[var(--gray-color)]
                                transition-all duration-600 ease-in-out
                                ${showSortOpts ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                                `}
                                role="listbox">
                            {
                                sortOptions.map((opt, i) => 
                                <li
                                    key={opt.label + i}
                                    className={`flex justify-between cursor-pointer 
                                    ${ sortOptValue === opt.value ? 'text-white' : 'text-[var(--gray-color)]'}`} 
                                    role="option"
                                    data-value={opt.value}
                                    onClick={ handleOptChange }
                                    >
                                    {opt.label}
                                    {
                                        sortOptValue === opt.value
                                        &&
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="m389-354.38 305.54-305.54q7.83-7.93 18.34-8.12 10.5-.19 18.81 8.12 8.31 8.31 8.31 18.46 0 10.16-7.92 18.08L412.31-303.15q-9.76 9.84-22.76 9.84-13.01 0-22.86-9.84l-138-138q-7.92-7.93-8.3-18.2-.39-10.26 7.92-18.57t18.55-8.31q10.24 0 18.22 8.31L389-354.38Z"/></svg> 
                                    }
                                </li>
                                )
                            }
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default PokemonListControls