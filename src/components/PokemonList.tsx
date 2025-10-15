import usePokemonStore from '../stores/usePokemonStore.js'
import PokemonCard from './PokemonCard.js'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getPokemonDetails } from '../api/pokemonApi.js'
import gsap from 'gsap';


function PokemonList() {

    const selectedType = usePokemonStore((state) => state.selectedType);

    const filteredPokemonList = usePokemonStore((state) => state.filteredPokemonList);

    const sortOptValue = usePokemonStore((state) => state.sortOptValue);
    const setSortOptValue = usePokemonStore((state) => state.setSortOptValue);

    type RefCallback<T> = (instance: T | null) => void;

    // 무한 스크롤
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);

    //화면 너비에 따른 로드 갯수
    const getLoadCount = (width: number) => {
        if (width >= 1280) return 18; // xl:grid-cols-6
        if (width >= 1024) return 15; // lg:grid-cols-5
        if (width >= 768) return 12;  // md:grid-cols-4
        if (width >= 640) return 9;   // sm:grid-cols-3
        return 6;                     // grid-cols-2
    };

    const [loadCount, setLoadCount] = useState(getLoadCount(window.innerWidth));

    //디바운스 함수 - handleResize 횟수 제어
    function debounce<T extends (...args: any[]) => void>(
        func: T,
        delay: number
        ) {
        let timeoutId: ReturnType<typeof setTimeout>;

        return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }


    useEffect(() => {
        const handleResize = () => {
            setLoadCount(getLoadCount(window.innerWidth));
        };

        const debouncedHandleResize = debounce(handleResize, 250);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    },[])

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newPokemon = await getPokemonDetails(offset, loadCount);
        usePokemonStore.getState().appendPokemonList(newPokemon);

        setOffset(prev => prev + newPokemon.length);
        if (newPokemon.length < loadCount) setHasMore(false);
        setLoading(false);
    }, [loading, hasMore, offset]);

    useEffect(() => {
        const observer = new IntersectionObserver ( entries => {
            if(entries[0]?.isIntersecting && !loading && hasMore){
                if (selectedType === 'all' && sortOptValue === 'id-asc') {
                    loadMore();
                }
            }
        } ,{ threshold: 1}
        );

        if(loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    },[loadMore, loading, hasMore, selectedType, sortOptValue]);


    
    //카드 리스트 애니메이션
    const pokemonCardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animatedCountRef = useRef(0);

    useEffect(()=>{
        pokemonCardRefs.current = pokemonCardRefs.current.slice(0, filteredPokemonList.length)
    }, [filteredPokemonList]);

    useEffect(()=>{
        const newCardsCount = filteredPokemonList.length;
        const previouslyAnimated = animatedCountRef.current;

        if(newCardsCount > previouslyAnimated){
            const newCards = pokemonCardRefs.current.slice(previouslyAnimated);

            gsap.fromTo(newCards,
                { autoAlpha: 0, y: 100 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    stagger: {
                        each: 0.1,
                        from: 'start',  
                        grid: 'auto',
                    }
                }
            )
            animatedCountRef.current = newCardsCount;
        }
    },[filteredPokemonList])



    return (
        <section>
            <h2 className='sr-only'>포켓몬 목록</h2>
            <div className='flex flex-col items-center gap-18 relative'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-2 sm:gap-y-10'
                    >
                    { 
                        filteredPokemonList.map((pokemon, i)=> {
                            return (   
                                <div key={pokemon.name + i} ref={(el) => { pokemonCardRefs.current[i] = el }} >
                                    <PokemonCard pokemon={pokemon} />         
                                </div>    
                            )
                        })
                    }
                    <div ref={ loaderRef }></div>
                </div>
            </div>
            { loading && 
                (
                    <div className='fixed z-100 inset-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--black-color)]/50 backdrop-blur-sm flex justify-center items-center'>
                        <div className="animate-spin inline-block size-10 border-3 border-current border-t-transparent text-[var(--gray-color)] rounded-full" role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default PokemonList