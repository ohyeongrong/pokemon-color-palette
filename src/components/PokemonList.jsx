import usePokemonStore from '../stores/usePokemonStore.js'
import PokemonCard from './PokemonCard.jsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getPokemonList, getPokemonDetails } from '../api/pokemonApi.js'
import '../App.css'

function PokemonList() {

    const allPokemonList = usePokemonStore((state) => state.allPokemonList);
    const setAllPokemonList = usePokemonStore((state) => state.setAllPokemonList);

    const filteredPokemonList = usePokemonStore((state) => state.filteredPokemonList);

    // 무한 스크롤
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newPokemon = await getPokemonDetails(offset, 12);
        usePokemonStore.getState().appendPokemonList(newPokemon);

        setOffset(prev => prev + newPokemon.length);
        if (newPokemon.length < 12) setHasMore(false);
        setLoading(false);
    }, [loading, hasMore, offset]);

    useEffect(() => {
        const observer = new IntersectionObserver ( entries => {
            if(entries[0].isIntersecting && !loading && hasMore){
                loadMore();
            }
        } ,{ threshold: 1}
        );

        if(loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    },[loadMore, loading, hasMore]);





    return (
        <section>
            {console.log(filteredPokemonList)}
            <h2 className='sr-only'>포켓몬 목록</h2>
            <div className='flex flex-col items-center gap-18'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-2 sm:gap-y-10'
                    >
                    { 
                        filteredPokemonList.map((pokemon, i)=> {
                            return (                  
                                <PokemonCard key={pokemon.name + i} pokemon={pokemon} />
                            )
                        })
                    }
                    <div ref={ loaderRef }></div>
                </div>
                { loading && 
                    (
                        <div class="animate-spin inline-block size-10 border-3 border-current border-t-transparent text-[var(--gray-color)] rounded-full" role="status" aria-label="loading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default PokemonList