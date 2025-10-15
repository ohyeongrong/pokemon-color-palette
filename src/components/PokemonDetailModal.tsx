import PokemonModalContent from './PokemonModalContent.js'
import usePokemonStore from '../stores/usePokemonStore.js'
import gsap from 'gsap';
import { useRef } from 'react'

function PokemonDetailModal() {

    const selectedPokemon = usePokemonStore((state) => state.selectedPokemon);
    const closeModal = usePokemonStore((state) => state.closeModal);

    const contentRef = useRef(null);

    if(!selectedPokemon){
        return null;
    }

    const handleCloseWithAnimation = () => {
        if (!contentRef.current) {
            closeModal(); // ref가 없으면 그냥 닫기
            return;
        }

        // 닫기 애니메이션 실행
        gsap.fromTo(contentRef.current, 
            { 
                    scale: 1,
                    opacity: 1,
                },
            {
                    duration: 0.6,
                    scale: 0.2,
                    opacity: 0,
                    ease: "back.in(1.7)",
                    onComplete: closeModal // 애니메이션 완료 후 Zustand 상태 업데이트
            },
        );
    };

    return (
        <dialog 
            open 
            className="fixed z-100 bg-[var(--black-color)]/10 w-full h-full backdrop-blur-sm"
            onClick={ handleCloseWithAnimation }
        >
            <PokemonModalContent selectedPokemon={selectedPokemon} contentRef={contentRef} handleCloseWithAnimation={handleCloseWithAnimation} />
        </dialog>
    )
}

export default PokemonDetailModal