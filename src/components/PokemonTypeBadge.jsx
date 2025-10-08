import { typeColors } from '../constants/typeColors.js'

function PokemonTypeBadge({ pokemon }) {

    return (
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
    )
}

export default PokemonTypeBadge