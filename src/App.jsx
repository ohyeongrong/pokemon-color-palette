import { useEffect, useState } from 'react'
import './App.css'
import { getPokemonDetails, getPokemonAllTypes } from './api/pokemonApi.js'
import usePokemonStore from './stores/usePokemonStore.js'
import { typeColors } from './constants/typeColors.js'

function App() {

  const pokemonList = usePokemonStore((state) => state.pokemonList);
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);
  const pokemonType = usePokemonStore((state) => state.pokemonType);
  const setPokemonType = usePokemonStore((state) => state.setPokemonType);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonDetails();
      const typeData = await getPokemonAllTypes();
      setPokemonList(data);
      setPokemonType(typeData);
    }
    fetchData();
  }, [setPokemonList, setPokemonType])
  
  // 도감번호 변경 함수 - 포켓몬 카드에 사용
  function formatID(id) {
    return id.toString().padStart(3, "0")
  }

  const [visibleCount, setVisibleCount] = useState(12);

  return (
    <main>
      <section className='py-16'>
        <h2 className='sr-only'>포켓몬 검색 및 필터</h2>
        <form role='search'>
          <div className='grid grid-cols-5 justify-between'>
            {/* 포켓몬 타입 라디오 버튼 반복문 사용 */}
            <fieldset className='col-span-2 flex flex-wrap items-center gap-1'>
              <legend className='sr-only'>포켓몬 타입 선택</legend>
              {/* 전체 버튼 */}
                <div>
                  <input 
                    id="type-all" 
                    type="radio" 
                    name="type" 
                    value="all" 
                    className='appearance-none peer'
                  />
                  <label
                    htmlFor="type-all"
                    className='
                      px-3 py-2 border border-[var(--navy-color)] rounded-full
                      text-[var(--gray-color)] text-sm cursor-pointer
                      peer-checked:bg-[var(--navy-color)] 
                      peer-checked:border-transparent 
                    peer-checked:text-white
                    '
                  >
                    전체
                  </label>
                </div>
                {
                  pokemonType.map((type, i) =>(
                    <div key={type.enType + i}>
                      <input 
                        id={`type-${type.enType}`}
                        type="radio" 
                        name="type" 
                        value={type.enType}
                        className='appearance-none peer'
                      />
                      <label 
                        htmlFor={`type-${type.enType}`}
                        className={`
                          px-3 py-2 border border-[var(--navy-color)] rounded-full 
                          text-[var(--gray-color)]  text-sm cursor-pointer
                          peer-checked:bg-[var(--navy-color)] 
                          peer-checked:border-transparent
                          peer-checked:text-white
                        `}
                      >
                        {type.koType}
                      </label>
                    </div>
                  ))
                }
            </fieldset>
            <div className='col-span-3 flex flex-col items-end gap-4'>
              {/* 포켓몬 검색창 */}
              <div className='reative'>
                <div className='text-sm w-87 border border-[var(--navy-color)] rounded-full flex justify-between px-4 py-2'>
                  <input 
                    className='w-full placeholder:text-[var(--gray-color)]/50 
                      caret-[var(--gray-color)] focus:outline-none' 
                    type="search" 
                    name="search" 
                    placeholder='포켓몬 이름, 도감 번호 입력해주세요.' 
                  />
                  {/* 검색창에 입력되면 삭제 버튼 하나 더 띄울거임 */}
                  <div className='flex gap-2'>
                    {/* 삭제버튼 */}
                    <button className='hidden' type="button" aria-label="입력 내용 지우기">
                      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#1D283A"><path d="m480-437.85 122.92 122.93q8.31 8.3 20.89 8.5 12.57.19 21.27-8.5 8.69-8.7 8.69-21.08 0-12.38-8.69-21.08L522.15-480l122.93-122.92q8.3-8.31 8.5-20.89.19-12.57-8.5-21.27-8.7-8.69-21.08-8.69-12.38 0-21.08 8.69L480-522.15 357.08-645.08q-8.31-8.3-20.89-8.5-12.57-.19-21.27 8.5-8.69 8.7-8.69 21.08 0 12.38 8.69 21.08L437.85-480 314.92-357.08q-8.3 8.31-8.5 20.89-.19 12.57 8.5 21.27 8.7 8.69 21.08 8.69 12.38 0 21.08-8.69L480-437.85Zm.07 337.85q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Z"/></svg>
                    </button>
                    {/* 검색 버튼 */}
                    <button type="submit" aria-label="검색 버튼">
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
                <div className='hidden absolute top-12'>
                  <ul className='text-sm' role="listbox">
                    <li 
                      className='w-87 py-2 px-4
                      border border-[var(--navy-color)] rounded-t-2xl
                      bg-[var(--gray-color)]/10 backdrop-blur-md
                      text-[var(--gray-color)]'
                      role="option">
                      <a href="#">
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center gap-1'>
                            <div className='w-6 h-6'>
                              <img className='w-full h-full object-cover' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif" alt="포켓몬이름" />
                            </div>
                            <dl>
                              <dt className='hidden'>포켓몬</dt>
                              <dd className='text-white'>이상해씨</dd>
                            </dl>
                          </div>
                          <dl>
                            <dt className='sr-only'>도감번호</dt>
                            <dd className='text-xs'>#001</dd>
                          </dl>
                        </div>
                      </a>
                    </li>
                    <li 
                      className='w-87 py-2 px-4
                      border-x border-[var(--navy-color)]
                      bg-[var(--gray-color)]/10 backdrop-blur-md
                      text-[var(--gray-color)]'
                      role="option">
                      <a href="#">
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center gap-1'>
                            <div className='w-6 h-6'>
                              <img className='w-full h-full object-cover' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif" alt="포켓몬이름" />
                            </div>
                            <dl>
                              <dt className='hidden'>포켓몬</dt>
                              <dd className='text-white'>이상해씨</dd>
                            </dl>
                          </div>
                          <dl>
                            <dt className='sr-only'>도감번호</dt>
                            <dd className='text-xs'>#001</dd>
                          </dl>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div 
                    className='flex items-center justify-end 
                      w-87 py-2 px-4 
                      bg-[var(--gray-color)]/10 rounded-b-2xl backdrop-blur-md
                      text-xs text-[var(--gray-color)]/60
                      border border-[var(--navy-color)]'
                  >
                    <button type="button">닫기</button>
                  </div>
                </div>
              </div>
              {/* 정렬기능 - 셀렉트 박스 */}
              <div className='text-sm relative'>
                <div className='flex cursor-pointer'>
                  <span className='text-[var(--gray-color)]'>도감번호 순서</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7F8EA3"><path d="M480-372.92q-7.23 0-13.46-2.31t-11.85-7.92L274.92-562.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.15l162.92-162.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L505.31-383.15q-5.62 5.61-11.85 7.92-6.23 2.31-13.46 2.31Z"/></svg>
                  </span>
                </div>
                <ul className='
                      absolute right-0
                      flex flex-col gap-2
                      w-40 py-4 px-5
                      border border-[var(--navy-color)] rounded-2xl
                      bg-[var(--gray-color)]/10 backdrop-blur-md
                      text-[var(--gray-color)]'
                      role="listbox">
                  <li 
                    className='flex justify-between text-white cursor-pointer' 
                    role="option">
                      도감번호 순서
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="m389-354.38 305.54-305.54q7.83-7.93 18.34-8.12 10.5-.19 18.81 8.12 8.31 8.31 8.31 18.46 0 10.16-7.92 18.08L412.31-303.15q-9.76 9.84-22.76 9.84-13.01 0-22.86-9.84l-138-138q-7.92-7.93-8.3-18.2-.39-10.26 7.92-18.57t18.55-8.31q10.24 0 18.22 8.31L389-354.38Z"/></svg> 
                  </li>
                  <li>도감번호 반대순서</li>
                  <li>무거운 순서</li>
                  <li>가벼운 순서</li>
                  <li>키 큰 순서</li>
                  <li>키 작은 순서</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </section>
      <section>
        <h2 className='sr-only'>포켓몬 목록</h2>
        <div className='flex flex-col items-center gap-18'>
          <div className='grid grid-cols-6 gap-x-3 gap-y-10'>
            { 
              pokemonList.slice(0, visibleCount).map(pokemon => (
                <article key={pokemon.id}>
                  {/* 반복문 써야함 */}
                  <div className='w-58 h-82'>
                    <div className='w-full h-full relative'>
                      {/* 포켓몬 card 앞면*/}
                      <div
                        className='absolute
                        flex flex-col justify-between 
                        border-1 border-[var(--navy-color)] rounded-2xl 
                        p-6 w-full h-full backface-hidden'>
                        {/* 포켓몬 이름 */}
                        <div className='flex justify-between'>
                          <div>
                            <h3 className='text-2xl font-semibold'>{pokemon.name}</h3>
                            <h2 className='text-sm text-[var(--gray-color)]'>{pokemon.englishName}</h2>
                          </div>
                          <dl>
                            <dt className='sr-only'>도감번호</dt>
                            <dd className='text-[var(--gray-color)] font-semibold'>#{formatID(pokemon.id)}</dd>
                          </dl>
                        </div>
                        {/* 포켓몬 이미지 */}
                        <div className='flex flex-col justify-center items-center gap-2 relative'>
                          <img className='absolute object-cover [image-rendering:pixelated]' src={pokemon.imgGifFrontUrl} alt={pokemon.englishName} />
                          <div className='w-32 h-32 relative'>
                            <div className='absolute right-0'>
                              <button type="button" className='flex p-0.5 rounded-full bg-[var(--gray-color)]'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1D1D1F"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>                
                              </button>
                            </div>
                            <div className='w-full h-full bg-[var(--gray-color)]/10 rounded-full'></div>
                          </div>
                          {/* 컬러칩 */}
                          <div className='flex gap-1'>
                            <div className='w-3 h-3 bg-blue-400 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]'></div>
                            <div className='w-3 h-3 bg-blue-400 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]'></div>
                            <div className='w-3 h-3 bg-blue-400 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]'></div>
                          </div>
                        </div>
                        {/* 포켓몬 속성, 타입 */}
                        <div className='flex justify-between'>
                          {/* 타입 */}
                          <ul className='flex gap-1'>
                            {
                              pokemon.types.map((type, i) => {
                                const typeBadge = typeColors[type.koType] || 'bg-gray-300';
                                return (
                                  <li key={type.enType + i} className={`text-xs ${typeBadge} rounded-full px-2 py-0.5`}>{type.koType}</li>
                                )
                              })
                            }
                          </ul>
                          <dl>
                            <dt className='sr-only'>분류</dt>
                            <dd className='text-[13px] text-[var(--gray-color)]'>{pokemon.genus}</dd>
                          </dl>
                        </div>
                      </div>
                      {/* 포켓몬 card 뒷면*/}
                      <div 
                        className='absolute
                        flex flex-col justify-between 
                        border-1 border-[var(--navy-color)] bg-[var(--navy-color)]/100 rounded-2xl 
                        p-6 w-full h-full backface-hidden
                        rotate-y-180'>
                        {/* 포켓몬 이름 */}
                        <div className='flex justify-between'>
                          <div>
                            <h3 className='text-2xl font-semibold'>{pokemon.name}</h3>
                            <h2 className='text-sm text-[var(--gray-color)]'>{pokemon.englishName}</h2>
                          </div>
                          <dl>
                            <dt className='sr-only'>도감번호</dt>
                            <dd className='text-[var(--gray-color)] font-semibold'>#{formatID(pokemon.id)}</dd>
                          </dl>
                        </div>
                        {/* 포켓몬 이미지 */}
                        <div className='flex flex-col justify-center items-center gap-2'>
                          <div className='w-32 h-32 relative'>
                            <div className='absolute right-0'>
                              <button type="button" className='flex p-0.5 rounded-full bg-[var(--gray-color)]'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1D1D1F"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>                
                              </button>
                            </div>
                            <img className='w-full h-full object-cover scale-45 [image-rendering:pixelated]' src={pokemon.imgGifBackUrl} alt={pokemon.name} />
                            <div className='absolute inset-0 w-full h-full bg-[var(--gray-color)]/10 rounded-full'></div>
                          </div>
                          {/* 컬러칩 */}
                          <div className='flex gap-1'>
                            <div className='w-3 h-3 bg-blue-400 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]'></div>
                            <div className='w-3 h-3 bg-blue-400 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]'></div>
                            <div className='w-3 h-3 bg-blue-400 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]'></div>
                          </div>
                        </div>
                        {/* 포켓몬 정보 */}
                        <div className='flex justify-between'>
                          <dl className='flex gap-4 text-sm'>
                            <div className='flex gap-1'>
                              <dt>키</dt>
                              <dd className='text-[var(--gray-color)]'>{pokemon.height}m</dd>
                            </div>
                            <div className='flex gap-1'>
                              <dt>몸무게</dt>
                              <dd className='text-[var(--gray-color)]'>{pokemon.weight}kg</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            }
          </div>
          {
            visibleCount < pokemonList.length 
            && (
              <button 
                onClick={ () => setVisibleCount(list => list + 12)} 
                className='text-[var(--gray-color)] py-4 w-58 border border-[var(--navy-color)] rounded-lg' 
                type="button">
                  더보기
              </button>
            )
          }
        </div>
      </section>
    </main>
  )
}

export default App
