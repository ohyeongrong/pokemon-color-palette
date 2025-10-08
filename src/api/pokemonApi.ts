import axios, { all } from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    timeout: 3000,
})

// 포켓몬 60마리
async function getPokemonList() {
    try {
        const res = await axiosInstance.get('/pokemon?limit=60');
        return res.data.results;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// 각 포켓몬 상세정보
export async function getPokemonDetails() {

    const pokemonList = await getPokemonList();

    // 상세 정보 요청
    const detailResponses = await Promise.all(pokemonList.map(p => axiosInstance.get(p.url)));

    //species 정보 요청
    const speciesResponses = await Promise.all(detailResponses.map(res => axiosInstance.get(res.data.species.url)));

    const typeCache = {};

    // 최종 데이터 구성
    const allPokemonData = await Promise.all(detailResponses.map(async (detailRes, i) => {
        const detailData = detailRes.data;
        const speciesData = speciesResponses[i].data;

    // 한글 이름
    const koreanName = speciesData.names.find(n => n.language.name === 'ko')?.name || detailData.name;

    // 한글 분류
    const genusName = speciesData.genera.find(g => g.language.name === 'ko')?.genus || '';

    // 타입 처리 (캐시 사용)
    const types = await Promise.all(
        detailData.types.map(async typeInfo => {
            const enType = typeInfo.type.name;

            // 1️⃣ 캐시에 이미 있으면 그대로 반환
            if (typeCache[enType]) return typeCache[enType];

            // 2️⃣ 캐시에 없으면 API 호출
            const typeRes = await axiosInstance.get(typeInfo.type.url);
            const typeData = typeRes.data;

            const koreanTypeName = typeData.names.find(n => n.language.name === "ko")?.name || enType;

            const typeObj = { enType, koType: koreanTypeName };

            // 3️⃣ 캐시에 저장
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