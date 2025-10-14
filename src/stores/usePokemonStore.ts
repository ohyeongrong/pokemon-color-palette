import { create } from 'zustand'
import type { AllPokemonData, AllPokemonTypes, SearchSuggestions, ColorCache, SortOption } from '../types/types'

interface PokemonStore {
    allPokemonList: AllPokemonData[];
    filteredPokemonList: AllPokemonData[];
    searchSuggestions: AllPokemonData[];
    setAllPokemonList : (list: AllPokemonData[]) => void;
    allTypeList: AllPokemonTypes[];
    collectPokemonList : AllPokemonData[];
    appendPokemonList: (newList: AllPokemonData[]) => void;
    setAllTypeList : (list: AllPokemonTypes[]) => void;
    selectedType: string
    setSelectedType : (type: string) => void;
    filterByType : (type: string) => void;
    filterByKeyword : (keyword: string) => void;
    getSearchSuggestions : (keyword: string) => void;
    filterBySort : (opt: SortOption) => void;
    toggleCollect : (addList: AllPokemonData) => void;
    formatId : (id: number) => string;
    colorCache : ColorCache;
    setColorCache: (id: number, color: string[]) => void;
    getColorFromCache : (id: number) => string[];
    selectedPokemon: AllPokemonData | null;
    openModal : (pokemonData: AllPokemonData) => void;
    closeModal: () => void;
}


const usePokemonStore = create<PokemonStore>((set, get)=>({

    allPokemonList: [], // api에서 받은 모든 포켓몬 리스트

    filteredPokemonList: [], // 실제 사용 리스트

    searchSuggestions: [], // 검색창 자동완성 리스트
    
    setAllPokemonList : (list) => set({ allPokemonList : list, filteredPokemonList: list }),

    appendPokemonList: (newList) => set(state => ({
        allPokemonList: [
            ...state.allPokemonList,
            ...newList.filter(n => !state.allPokemonList.some(p => p.id === n.id))
        ],
        filteredPokemonList: [
            ...state.filteredPokemonList,
            ...newList.filter(n => !state.filteredPokemonList.some(p => p.id === n.id))
        ]
    })),

    allTypeList : [], // api에서 받은 모든 속성

    setAllTypeList : (list) => {
        const filteredType = list.filter(type =>
            type.enType !== "unknown" && type.enType !== "stellar")
        set({ allTypeList: filteredType })
    },

    selectedType : 'all', // 현재 선택된 타입 ('all'이면 전체 보기)

    setSelectedType : (type) => set({ selectedType: type }),

    // 타입버튼 별 리스트 변경
    filterByType : (type) => {
        set((state) => ({
            selectedType: type,
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
    },

    filterBySort : (opt) => {
        const sortOpts: Record<SortOption, (a: AllPokemonData, b:AllPokemonData) => number> = {
            'id-asc':  (a, b) => a.id - b.id,
            'id-desc': (a, b) => b.id - a.id,
            'weight-asc': (a, b) => Number(a.weight) - Number(b.weight),
            'weight-desc': (a, b) => Number(b.weight) - Number(a.weight),
            'height-asc': (a, b) => Number(a.height) - Number(b.height),
            'height-desc': (a, b) => Number(b.height) - Number(a.height),
        }

        const sortOpt = sortOpts[opt]

        const sortedList = 
        sortOpt
        ? [...get().filteredPokemonList].sort(sortOpt)
        : [...get().filteredPokemonList];

        set({ filteredPokemonList : sortedList })
    },

    // 저장 기능
    collectPokemonList : [],

    toggleCollect : (addList) => set((state) => {

        const maxCollectCount = 3;
        const isCollected = state.collectPokemonList.some(item => item.id === addList.id);

        if(isCollected){
            return {
                collectPokemonList: state.collectPokemonList.filter(item => item.id !== addList.id)
            }
        }  
        if(state.collectPokemonList.length >= maxCollectCount) {
            alert('컬렉션 추가는 최대 3개까지 가능합니다')
            return {};
        }
        return {
            collectPokemonList: [...state.collectPokemonList, addList]
        }
    }),

    // 도감번호 커스텀
    formatId : (id) => {
        return id.toString().padStart(3, "0")
    },

    //컬러 추출 리스트
    colorCache : {} as ColorCache,
    
    setColorCache: (id, color) => {
        set(state => ({
            colorCache: { ...state.colorCache, [id]: color }
        }));
    },

    getColorFromCache : (id) => {
        return get().colorCache[id] || [];
    },

    selectedPokemon: null, 

    openModal : (pokemonData) => set({selectedPokemon : pokemonData}),

    closeModal : () => set({ selectedPokemon: null }),
    
}));


export default usePokemonStore;