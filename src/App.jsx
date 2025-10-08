import { useEffect, useState } from 'react'
import './App.css'
import { getPokemonDetails, getPokemonAllTypes } from './api/pokemonApi.js'
import usePokemonStore from './stores/usePokemonStore.js'
import PokemonDetailModal from './components/PokemonDetailModal.jsx'
import DismissButton from './components/DismissButton.jsx'
import PokemonList from './components/PokemonList.jsx'
import PokemonListControls from './components/PokemonListControls.jsx'
import FloatingAside from './components/FloatingAside.jsx'

function App() {

  const allPokemonList = usePokemonStore((state) => state.allPokemonList);
  const setAllPokemonList = usePokemonStore((state) => state.setAllPokemonList);

  const allTypeList = usePokemonStore((state) => state.allTypeList);
  const setAllTypeList = usePokemonStore((state) => state.setAllTypeList);

  const collectPokemonList = usePokemonStore((state) => state.collectPokemonList);
  const toggleCollect = usePokemonStore((state) => state.toggleCollect);

  const formatId = usePokemonStore((state) => state.formatId);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonDetails();
      const typeData = await getPokemonAllTypes();
      setAllPokemonList(data);
      setAllTypeList(typeData);
    }
    fetchData();
  }, [setAllPokemonList])
  

  //콜렉트 토글
  const [showCollect, setShowCollect] = useState(false);


//aside 콜렉션 이미지 띄우기
const lastPokemon = collectPokemonList.at(-1);

  return (
    <>
      <PokemonDetailModal/>
      <main className='container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 max-w-[1440px]'>
        <PokemonListControls/>
        <PokemonList/>
      </main>
      <aside className='fixed right-10 bottom-10 z-60'>
        <div className='flex flex-col gap-2 relative'>
          {/* 저장 목록 */}
          {
            collectPokemonList.length > 0
              &&
              <div className='w-10 h-10 
                rounded-full border border-[var(--navy-color)]
                flex flex-wrap justify-center items-center '>
                <div className='backdrop-blur-sm'>
                  <button
                    className='flex flex-wrap items-center justify-center w-7 h-7' 
                    type="button"
                    onClick={() => setShowCollect(!showCollect)}
                    >
                    {
                      lastPokemon && <img className='w-full h-full object-contain' src={lastPokemon.imgGifFrontUrl} alt={lastPokemon.name} />
                    }
                  </button>
                </div>
                {
                  showCollect 
                  && (
                    <div className='absolute bottom-24 right-0 w-54 backdrop-blur-sm'>
                      <ul className='text-sm w-full' role="listbox">
                          {
                              collectPokemonList.map((pokemon, i)=>(
                                  <li 
                                  key={pokemon.name + i}
                                  className={`
                                        w-full py-2 px-4 bg-[var(--gray-color)]/10 text-[var(--gray-color)]
                                        border-[var(--navy-color)]
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
                                  <a href="#">
                                      <div className='flex justify-between items-center'>
                                          <div className='flex items-center gap-1'>
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
                                          </div>
                                          <DismissButton removeBtn onClick={()=> toggleCollect(pokemon)} fillcolor='var(--gray-color)'/>
                                      </div>
                                  </a>
                                  </li>
                              ))
                          }
                      </ul>
                    </div>
                  )
                }
              </div>
          }
          {/* 탑 이동 버튼 */}
          <div className='w-10 h-10
            rounded-full border border-[var(--navy-color)]
            flex justify-center items-center backdrop-blur-sm'>
              <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#7F8EA3"><path d="M450-665.08 243.23-458.31q-8.92 8.92-20.88 8.81-11.96-.12-21.27-9.42-8.69-9.31-9-21.08-.31-11.77 9-21.08l253.61-253.61q5.62-5.62 11.85-7.92 6.23-2.31 13.46-2.31t13.46 2.31q6.23 2.3 11.85 7.92l253.61 253.61q8.31 8.31 8.5 20.58.19 12.27-8.5 21.58-9.31 9.3-21.38 9.3-12.08 0-21.39-9.3L510-665.08V-210q0 12.77-8.62 21.38Q492.77-180 480-180t-21.38-8.62Q450-197.23 450-210v-455.08Z"/></svg>
              </button>
          </div>
        </div>
      </aside>
      <FloatingAside />
    </>
  )
}

export default App
