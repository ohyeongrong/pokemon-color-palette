import axios, { all } from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    timeout: 3000,
})

async function getPokemonList() {
    try {
        const res = await axiosInstance.get('/pokemon?limit=60');
        return res.data.results;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getPokemonDetails() {
    const pokemonList = await getPokemonList();

    const pokemonPromises = pokemonList.map(async pokemon => {
        try {
            //포켓몬 영문 정보 
            const detailRes = await axiosInstance.get(pokemon.url);
            const detailData = detailRes.data;

            // 포켓몬 한글 정보
            const speciesRes = await axiosInstance.get(detailData.species.url);
            const speciesData = speciesRes.data;

            //포켓몬 한글 명
            const koreanNameEntry = speciesData.names.find(
                name => name.language.name === 'ko'
            );
            const koreanName = koreanNameEntry ? koreanNameEntry.name : detailData.name;
            
            //포켓몬 한글 분류
            const genusEntry = speciesData.genera.find(
                genus => genus.language.name === 'ko'
            );
            const genusName = genusEntry ? genusEntry.genus : '';

            //포켓몬 한글 타입
            const typesWithUrls = await Promise.all(
                detailData.types.map(async (typeInfo) => {
                    const typeRes = await axiosInstance.get(typeInfo.type.url);
                    const typeData = typeRes.data;

                    const koreanTypeEntry = typeData.names.find(
                        (n) => n.language.name === "ko"
                    );
                    const koreanTypeName = koreanTypeEntry
                        ? koreanTypeEntry.name
                        : typeInfo.type.name;

                    return {
                        enType: typeInfo.type.name,
                        koType: koreanTypeName,
                        url: typeInfo.type.url,
                    };
                })
            );

            return {
                id: detailData.id,

                name: koreanName, 
                englishName: detailData.name,

                weight: detailData.weight,
                height: detailData.height,

                genus: genusName, 

                types: typesWithUrls,
                
                imageUrl: detailData.sprites.front_default,
                imgGifFrontUrl: detailData.sprites.versions['generation-v']['black-white'].animated.front_default,
                imgGifBackUrl: detailData.sprites.versions['generation-v']['black-white'].animated.back_default,
            };

        } catch (err) {
            console.error(`포켓몬 데이터 로드 오류 (${pokemon.name}):`, err.message);
            return null;
        }
    });

    const allPokemonData = await Promise.all(pokemonPromises);

    return allPokemonData.filter(data => data !== null)
}

async function getPokemonTypes() {
    try {
        const res = await axiosInstance.get('/type');
        return res.data.results;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getPokemonAllTypes() {
    const pokemonTypes = await getPokemonTypes();

    const pokemonPromises = pokemonTypes.map(async typeInfo => {
        try {       
                const typeRes = await axiosInstance.get(typeInfo.url);
                const typeData = typeRes.data;

                const koreanTypeEntry = typeData.names.find(
                        (n) => n.language.name === "ko"
                    );
                    const koreanTypeName = koreanTypeEntry
                        ? koreanTypeEntry.name
                        : typeInfo.name;

                    return {
                        enType: typeInfo.name,
                        koType: koreanTypeName,
                    };

        } catch (err) {
            console.error(err);
            return null;
        }
    });

        const allPokemonData = await Promise.all(pokemonPromises);

        return allPokemonData.filter(data => data !== null)
}