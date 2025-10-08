import { useEffect, useState } from 'react'
import './App.css'
import { getPokemonDetails, getPokemonAllTypes } from './api/pokemonApi.js'
import usePokemonStore from './stores/usePokemonStore.js'
import PokemonDetailModal from './components/PokemonDetailModal.jsx'
import DismissButton from './components/DismissButton.jsx'
import PokemonList from './components/PokemonList.jsx'
import PokemonListControls from './components/PokemonListControls.jsx'
import FloatingAside from './components/FloatingAside.jsx'

function App() {

  const allPokemonList = usePokemonStore((state) => state.allPokemonList);
  const setAllPokemonList = usePokemonStore((state) => state.setAllPokemonList);

  const allTypeList = usePokemonStore((state) => state.allTypeList);
  const setAllTypeList = usePokemonStore((state) => state.setAllTypeList);

  const collectPokemonList = usePokemonStore((state) => state.collectPokemonList);
  const toggleCollect = usePokemonStore((state) => state.toggleCollect);

  const formatId = usePokemonStore((state) => state.formatId);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonDetails();
      const typeData = await getPokemonAllTypes();
      setAllPokemonList(data);
      setAllTypeList(typeData);
    }
    fetchData();
  }, [setAllPokemonList])
  

  //콜렉트 토글
  const [showCollect, setShowCollect] = useState(false);


//aside 콜렉션 이미지 띄우기
const lastPokemon = collectPokemonList.at(-1);

  return (
    <>
      <PokemonDetailModal/>
      <main className='container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 max-w-[1440px]'>
        <PokemonListControls/>
        <PokemonList/>
      </main>
      <FloatingAside />
    </>
  )
}

export default App
