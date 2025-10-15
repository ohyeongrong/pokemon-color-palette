import usePokemonStore from '../stores/usePokemonStore.js'
import type { AllPokemonData } from '../types/types.js';

interface AddCollectBtn {
    pokemon: AllPokemonData;
    height?: string;
    width?: string;
}


function AddCollectBtn({ pokemon, height='24px', width='24px'  }: AddCollectBtn) {

    const collectPokemonList = usePokemonStore((state) => state.collectPokemonList);

    const toggleCollect = usePokemonStore((state) => state.toggleCollect);

    const isCollected = collectPokemonList.some(p => p.id === pokemon.id)


    // 콜렉트 추가
    const handleAddCollectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleCollect(pokemon);
    }

    return (
            <button 
                type="button" 
                className={`flex p-0.5 rounded-full 
                ${ isCollected ? 'bg-white' : 'bg-[var(--gray-color)]'}
                hover:bg-white transition-colors duration-600 ease-in-out `}
                aria-label='컬렉션 추가 하기'
                onClick={ handleAddCollectClick }
            > 
                {
                    isCollected 
                    ? <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill="#1D1D1F"><path d="M240-440q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h480q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H240Z"/></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill="#1D1D1F"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>                
                }
            </button>
    )
}

export default AddCollectBtn