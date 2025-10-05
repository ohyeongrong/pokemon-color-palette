import { create } from 'zustand'

const usePokemonStore = create((set)=>({

    pokemonList : [],
    
    setPokemonList : (list) => set({ pokemonList : list }),

    pokemonType : [],

    setPokemonType : (list) => {
        const filteredType = list.filter(type =>
            type.enType !== "unknown" && type.enType !== "stellar"
        )
        set({ pokemonType: filteredType })
    }

}));


export default usePokemonStore;