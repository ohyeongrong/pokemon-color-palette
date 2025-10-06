import { create } from 'zustand'

const usePokemonStore = create((set, get)=>({

    // 일단 구조 변경해야함. 1.api에 받아온거 저장하는 alllist, 2. 정렬, 필터 등으로 변경될 list 만들고 관리 변수명은 변경하자요

    allPokemonList : [],
    
    setAllPokemonList : (list) => set({ allPokemonList : list, filteredPokemonList: list }),

    allTypeList : [],

    setAllTypeList : (list) => {
        const filteredType = list.filter(type =>
            type.enType !== "unknown" && type.enType !== "stellar")
        set({ allTypeList: filteredType })
    },

    filteredPokemonList: [],

    filterByType : (type) => {
        set((state) => ({
            filteredPokemonList: 
                type !== 'all'
                    ? state.allPokemonList.filter(list => 
                        list.types.some(t => t.enType === type))
                    : state.allPokemonList,
        }))
    },

}));


export default usePokemonStore;