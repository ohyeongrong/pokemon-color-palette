import axios, { all } from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    timeout: 3000,
})

export async function getPokemonList(offset=0, limit=12) {
    const res = await axiosInstance.get(`/pokemon?offset=${offset}&limit=${limit}`);
    return res.data.results;
}

// 각 포켓몬 상세정보
export async function getPokemonDetails(offset = 0, limit = 12) {
    const pokemonList = await getPokemonList(offset, limit);

    // 상세 정보 요청
    const detailResponses = await Promise.all(
        pokemonList.map(p => axiosInstance.get(p.url))
    );

    const speciesResponses = await Promise.all(
        detailResponses.map(async res => {
            try {
            return await axiosInstance.get(res.data.species.url);
            } catch {
            return { data: { names: [], genera: [] } }; // 빈 객체로 대체
            }
        })
    );

    const typeCache = {};

    const allPokemonData = await Promise.all(
        detailResponses.map(async (detailRes, i) => {
            const detailData = detailRes.data;
            const speciesData = speciesResponses[i].data;

            const koreanName = speciesData.names.find(n => n.language.name === 'ko')?.name || detailData.name;
            const genusName = speciesData.genera.find(g => g.language.name === 'ko')?.genus || '';

            const types = await Promise.all(
                detailData.types.map(async typeInfo => {
                    const enType = typeInfo.type.name;
                    if (typeCache[enType]) return typeCache[enType];

                    const typeRes = await axiosInstance.get(typeInfo.type.url);
                    const typeData = typeRes.data;
                    const koreanTypeName = typeData.names.find(n => n.language.name === 'ko')?.name || enType;
                    const typeObj = { enType, koType: koreanTypeName };
                    typeCache[enType] = typeObj;
                    return typeObj;
                })
            );

            return {
                id: detailData.id,
                name: koreanName,
                englishName: detailData.name,
                weight: detailData.weight,
                height: detailData.height,
                genus: genusName,
                types,
                imageUrl: detailData.sprites.front_default,
                imgGifFrontUrl: detailData.sprites.versions['generation-v']['black-white'].animated.front_default,
                imgGifBackUrl: detailData.sprites.versions['generation-v']['black-white'].animated.back_default,
            };
        })
    );

    return allPokemonData;
}


// 포켓몬 리스트 분류하는 타입 버튼용으로 포켓몬 모든 속성 요청
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