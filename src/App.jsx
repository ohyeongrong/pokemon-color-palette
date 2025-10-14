import { useEffect } from 'react'
import './App.css'
import { getPokemonAllTypes } from './api/pokemonApi.js'
import usePokemonStore from './stores/usePokemonStore.js'
import PokemonDetailModal from './components/PokemonDetailModal.js'
import PokemonList from './components/PokemonList.js'
import PokemonListControls from './components/PokemonListControls.js'
import FloatingAside from './components/FloatingAside.js'

function App() {

  const setAllTypeList = usePokemonStore((state) => state.setAllTypeList);

  useEffect(() => {
  const fetchTypes = async () => {
    const typeData = await getPokemonAllTypes();
    setAllTypeList(typeData);
  };
    fetchTypes();
}, []);
  
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
