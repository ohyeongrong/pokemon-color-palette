import PokemonModalContent from './PokemonModalContent.jsx'
import usePokemonStore from '../stores/usePokemonStore.js'

function PokemonDetailModal() {

    const selectedPokemon = usePokemonStore((state) => state.selectedPokemon);

    if(!selectedPokemon){
        return null;
    }

    return (
        <dialog open className="fixed z-100 bg-[var(--black-color)]/10 w-full h-full backdrop-blur-sm">
            <PokemonModalContent />
        </dialog>
    )
}

export default PokemonDetailModal