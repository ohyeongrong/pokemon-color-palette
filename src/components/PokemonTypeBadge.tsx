import { typeColors } from '../constants/typeColors.js'
import type { AllPokemonData } from '../types/types.js'

interface PokemonTypeBadge {
    pokemon: AllPokemonData;
}

function PokemonTypeBadge ({ pokemon }: PokemonTypeBadge) {

    return (
        <ul className='flex gap-1'>
            {
                pokemon.types.map((type, i) => {
                    const typeBadge = typeColors[type.koType as keyof typeof typeColors] || 'bg-gray-300';
                    return (
                    <li key={type.enType + i} className={`md:text-xs ${typeBadge} text-[10px] rounded-full md:px-2 px-1 py-0.5`}>{type.koType}</li>
                    )
                })
            }
        </ul>
    )
}

export default PokemonTypeBadge