import DismissButton from './DismissButton.jsx'

function PokemonDetailModal() {
    return (
        <dialog className="fixed left-1/3 top-1/3 z-100 bg-[var(--black-color)]/80 backdrop-blur-sm rounded-2xl text-white">
            <div className="p-16 w-xl relative">
                <header className=' absolute right-4 top-4'>
                    <h2 className="sr-only">포켓몬 상세 모달창</h2>
                    <DismissButton label={"모달창 닫기"} height='24px' width='24px'/>
                </header>
                <article>
                    <div className="flex flex-col gap-9">
                        <div className="flex flex-wrap items-center">
                            <div className="flex-1">
                                <div className="w-45 h-45">
                                    <img className="w-full h-full object-cover" src="https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000101.png" alt="#" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <dl>
                                            <dt className="sr-only">도감번호</dt>
                                            <dd className="text-[var(--gray-color)] font-semibold">#000</dd>
                                        </dl>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-2xl font-semibold">포켓몬이름</h2>
                                                <span>속성타입버튼</span>
                                            </div>
                                            <p className="text-sm text-[var(--gray-color)]">pokemonEnglishname</p>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <dl className="flex gap-2">
                                            <dt>분류</dt>
                                            <dd className="text-[var(--gray-color)]">씨앗포켓몬</dd>
                                        </dl>
                                        <dl className="flex gap-2">
                                            <dt>키</dt>
                                            <dd className="text-[var(--gray-color)]" >00m</dd>
                                            <dt>몸무게</dt>
                                            <dd className="text-[var(--gray-color)]">00kg</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul role="tablist" className="flex text-center text-sm">
                            <li className="flex-1 cursor-pointer border-b py-2 " role="presentation">
                                <button id="tab-evolution" role="tab" aria-controls="panel-evolution" aria-selected="true" type="button">진화</button>
                            </li>
                            <li className="flex-1 cursor-pointer border-b border-[var(--navy-color)] text-[var(--gray-color)] py-2" role="presentation">
                                <button id="tab-color" role="tab" aria-controls="panel-color" aria-selected="false" type="button">컬러</button>
                            </li>
                        </ul>
                        <div id="panel-evolution" role="tabpanel" aria-labelledby="tab-evolution" hidden>
                            <ul className='flex justify-evenly items-center'>
                                <li className='flex items-center'>
                                    <div className='flex flex-col items-center text-center gap-2'>
                                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif" alt="포켓몬이름" />
                                        <dl className='text-sm'>
                                            <dt className='sr-only'>포켓몬 이름</dt>
                                            <dd className='font-semibold'>한글명</dd>
                                            <dd className='text-[var(--gray-color)]'>Englishname</dd>
                                        </dl>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#7F8EA3"><path d="M593.23-480 291.92-781.31q-11.92-11.92-11.61-28.38.31-16.46 12.23-28.39Q304.46-850 320.92-850t28.39 11.92l306.23 306.85q10.84 10.85 16.07 24.31 5.24 13.46 5.24 26.92t-5.24 26.92q-5.23 13.46-16.07 24.31L348.69-121.92q-11.92 11.92-28.07 11.61-16.16-.31-28.08-12.23-11.92-11.92-11.92-28.38t11.92-28.39L593.23-480Z"/></svg>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div id="panel-color" role="tabpanel" aria-labelledby="tab-color" >
                            <div>
                                <ul className='flex justify-between gap-2'>
                                    <li className='flex flex-wrap flex-col justify-between gap-4 p-4 w-37 h-30 bg-amber-400 rounded-2xl text-xs'>
                                        <div className='flex'>
                                            <div className='relative cursor-pointer flex items-center justify-center bg-[var(--gray-color)]/40 rounded-xl p-1.5'>
                                                <span className='font-semibold'>HEX</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#fff"><path d="M480-372.92q-7.23 0-13.46-2.31t-11.85-7.92L274.92-562.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.15l162.92-162.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L505.31-383.15q-5.62 5.61-11.85 7.92-6.23 2.31-13.46 2.31Z"/></svg>
                                                </span>
                                                <ul hidden className='absolute w-full top-8 bg-[var(--gray-color)]/40 rounded-xl p-1.5 backdrop-blur-sm'>
                                                        <li className='flex justify-between'>
                                                            <span>HEX</span>
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#fff"><path d="m389-354.38 305.54-305.54q7.83-7.93 18.34-8.12 10.5-.19 18.81 8.12 8.31 8.31 8.31 18.46 0 10.16-7.92 18.08L412.31-303.15q-9.76 9.84-22.76 9.84-13.01 0-22.86-9.84l-138-138q-7.92-7.93-8.3-18.2-.39-10.26 7.92-18.57t18.55-8.31q10.24 0 18.22 8.31L389-354.38Z"/></svg>
                                                            </span>
                                                        </li>
                                                        <li>RGB</li>
                                                        <li>HSL</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>hsl(355, 74%, 66%)</span>
                                            <button className='bg-[var(--gray-color)]/40 rounded-full p-2' type="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#fff"><path d="M362.31-260q-27.01 0-45.66-18.65Q298-297.3 298-324.31v-455.38q0-27.01 18.65-45.66Q335.3-844 362.31-844h359.38q27.01 0 45.66 18.65Q786-806.7 786-779.69v455.38q0 27.01-18.65 45.66Q748.7-260 721.69-260H362.31Zm0-52h359.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-124 176q-27.01 0-45.66-18.65Q174-173.3 174-200.31v-481.38q0-11.07 7.41-18.54 7.4-7.46 18.38-7.46 10.98 0 18.6 7.46 7.61 7.47 7.61 18.54v481.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h385.38q11.07 0 18.54 7.4 7.46 7.41 7.46 18.39t-7.46 18.59q-7.47 7.62-18.54 7.62H238.31ZM350-312v-480 480Z"/></svg>
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </dialog>
    )
}

export default PokemonDetailModal