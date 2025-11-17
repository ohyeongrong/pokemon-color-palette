import ScrollTopBtn from '../components/ScrollTopBtn.js'
import AsideCollectBtn from '../components/AsideCollectBtn.js'

function FloatingAside() {
    
    return (
        <aside className='fixed right-10 bottom-10 z-60'>
            <div className='flex flex-col gap-2 relative'>
                {/* 저장한 목록 보여주는 버튼 */}
                <AsideCollectBtn />
                {/* 탑 이동 버튼 */}
                <ScrollTopBtn />
            </div>
        </aside>
    )
}

export default FloatingAside