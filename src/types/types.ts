export interface AllPokemonTypes {
    enType: string; 
    koType: string;
}

export interface AllPokemonData {
    id: number;
    name: string;
    englishName: string;
    weight: string;
    height: string;
    genus: string;
    types : AllPokemonTypes[];
    imageUrl: string;
    imgGifFrontUrl: string;
    imgGifBackUrl: string;
}

export interface TypeCache {
    [key:string]: {
        enType: string; 
        koType: string;
    }
}


export interface ColorCache {
    [key:number]: string[];
}

export type SortOption =
    | 'id-asc'
    | 'id-desc'
    | 'weight-asc'
    | 'weight-desc'
    | 'height-asc'
    | 'height-desc';