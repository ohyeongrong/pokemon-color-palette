import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

function ScrollTopBtn() {

    const [showTopBtn, setShowTopBtn] = useState(false)

    const topBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(()=> {
        const handleScroll = () => {
            if(window.scrollY > 200) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    useEffect(() => {
        gsap.to(topBtnRef.current, {
            y: showTopBtn ? 0 : 50,
            opacity: showTopBtn ? 1 : 0,
            duration: 0.8,
            ease: 'power2.inout',
            pointerEvents: showTopBtn ? 'auto' : 'none'
        })
    }, [showTopBtn])

    //스크롤 버튼 클릭 시 위로 이동
    const handleScrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
    

    return (
        <div>
            <button 
            onClick={ handleScrollTop }
            ref={ topBtnRef }
            type="button"
            className='w-10 h-10
            rounded-full border border-[var(--navy-color)]
            flex justify-center items-center backdrop-blur-sm'
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#7F8EA3"><path d="M450-665.08 243.23-458.31q-8.92 8.92-20.88 8.81-11.96-.12-21.27-9.42-8.69-9.31-9-21.08-.31-11.77 9-21.08l253.61-253.61q5.62-5.62 11.85-7.92 6.23-2.31 13.46-2.31t13.46 2.31q6.23 2.3 11.85 7.92l253.61 253.61q8.31 8.31 8.5 20.58.19 12.27-8.5 21.58-9.31 9.3-21.38 9.3-12.08 0-21.39-9.3L510-665.08V-210q0 12.77-8.62 21.38Q492.77-180 480-180t-21.38-8.62Q450-197.23 450-210v-455.08Z"/></svg>
            </button>
        </div>
    )
}

export default ScrollTopBtn