import usePokemonStore from '../stores/usePokemonStore.js'
import PokemonCard from './PokemonCard.jsx'
import { useState } from 'react'

function PokemonList() {

    const allPokemonList = usePokemonStore((state) => state.allPokemonList);

    const filteredPokemonList = usePokemonStore((state) => state.filteredPokemonList);

    //첫 도감 보이는 갯수 이거 모바일 뭐 테블릿별.. 변경해야할거같은데??
    const [visibleCount, setVisibleCount] = useState(12);

    return (
        <section>
            <h2 className='sr-only'>포켓몬 목록</h2>
            <div className='flex flex-col items-center gap-18'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-2 sm:gap-y-10'
                >
                { 
                    filteredPokemonList.slice(0, visibleCount).map(pokemon => {
                        return (                  
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        )
                    })
                }
            </div>
            {
                visibleCount < allPokemonList.length 
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
    )
}

export default PokemonList