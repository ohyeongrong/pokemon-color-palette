import usePokemonStore from '../stores/usePokemonStore.js'
import { typeColors } from '../constants/typeColors.js'

function PokemonCard({ pokemon }) {

    const formatId = usePokemonStore((state) => state.formatId);
    const toggleCollect = usePokemonStore((state) => state.toggleCollect);
    const collectPokemonList = usePokemonStore((state) => state.collectPokemonList);

    const isCollected = collectPokemonList.some(p => p.id === pokemon.id)

    return (
        <article className='flex flex-wrap'>
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
                            <span className='text-sm text-[var(--gray-color)]'>{pokemon.englishName}</span>
                        </div>
                        <dl>
                            <dt className='sr-only'>도감번호</dt>
                            <dd className='text-[var(--gray-color)] font-semibold'>#{formatId(pokemon.id)}</dd>
                        </dl>
                        </div>
                        {/* 포켓몬 이미지 */}
                        <div className='flex flex-col justify-center items-center gap-2 relative'>
                        <img className='absolute object-cover [image-rendering:pixelated]' src={pokemon.imgGifFrontUrl} alt={pokemon.englishName} />
                        <div className='w-32 h-32 relative'>
                            <div className='absolute right-0'>
                            <button 
                                type="button" 
                                className='flex p-0.5 rounded-full bg-[var(--gray-color)]' 
                                aria-label='컬렉션 추가 하기'
                                onClick={()=> toggleCollect(pokemon)}
                            > 
                                {
                                isCollected 
                                ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1D1D1F"><path d="M250-450q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q237.25-510 250-510h460q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q722.75-450 710-450H250Z"/></svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1D1D1F"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>                
                                }
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
                            <span className='text-sm text-[var(--gray-color)]'>{pokemon.englishName}</span>
                        </div>
                        <dl>
                            <dt className='sr-only'>도감번호</dt>
                            <dd className='text-[var(--gray-color)] font-semibold'>#{formatId(pokemon.id)}</dd>
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
    )
}

export default PokemonCard