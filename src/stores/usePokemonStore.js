import { create } from 'zustand'

const usePokemonStore = create((set, get)=>({

    allPokemonList : [], // api에서 받은 모든 포켓몬 리스트

    filteredPokemonList: [], // 실제 사용 리스트

    searchSuggestions: [], // 검색창 자동완성 리스트
    
    setAllPokemonList : (list) => set({ allPokemonList : list, filteredPokemonList: list }),

    allTypeList : [], // api에서 받은 모든 속성

    setAllTypeList : (list) => {
        const filteredType = list.filter(type =>
            type.enType !== "unknown" && type.enType !== "stellar")
        set({ allTypeList: filteredType })
    },


    // 타입버튼 별 리스트 변경
    filterByType : (type) => {
        set((state) => ({
            filteredPokemonList: 
                type !== 'all'
                    ? state.allPokemonList.filter(list => 
                        list.types.some(t => t.enType === type))
                    : state.allPokemonList,
        }))
    },

    //키워드 별 리스트 변경
    filterByKeyword : (keyword) => {
        const trimmedKeyword = keyword.trim().replace(/\s+/g, "");

        if(!trimmedKeyword){
            set((state)=>({
                filteredPokemonList: state.allPokemonList
            }))
            return;
        }

        const filteredKeywordList = get().allPokemonList.filter((pokemon) =>
            pokemon.name.includes(trimmedKeyword) ||
            pokemon.id.toString().includes(trimmedKeyword)
        );

        set({ filteredPokemonList : filteredKeywordList })
    },

    //자동완성 키워드별 리스트 변경
    getSearchSuggestions : (keyword) => {

        const trimmedKeyword = keyword.trim().replace(/\s+/g, "");

        if(!trimmedKeyword){
            set({ searchSuggestions: [] });
            return;
        }

        const suggestions = get().allPokemonList.filter((pokemon) =>
            pokemon.name.includes(trimmedKeyword) ||
            pokemon.id.toString().includes(trimmedKeyword)
        );

        set({ searchSuggestions : suggestions.slice(0, 5) })
    }

}));


export default usePokemonStore;