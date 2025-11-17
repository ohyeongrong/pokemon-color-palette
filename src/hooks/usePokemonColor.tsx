import usePokemonStore from '../stores/usePokemonStore.js'
import { useCallback, useState } from 'react'
import ColorThief from 'colorthief'

export function usePokemonColor(pokemonId: number, imageUrl: string) {
    const [colors, setColors] = useState<string[]>([]);
    const colorCache = usePokemonStore((state) => state.colorCache);
    const setColorCache = usePokemonStore((state) => state.setColorCache);

    const fetchColors = useCallback(() => {
        if (!pokemonId || !imageUrl) return;
        if (colorCache[pokemonId]) {
            setColors(colorCache[pokemonId])
            return
        }

    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.src = imageUrl

    img.onload = () => {
        const colorThief = new ColorThief()
        try {
            const palette: [number, number, number][] = colorThief.getPalette(img, 3)
            const hexColors = palette.map(([r, g, b]) => rgbToHex(r, g, b))
            setColors(hexColors)
            setColorCache(pokemonId, hexColors)
        } catch (err) {
            console.error("색 추출 실패:", err);
            setColors([]);
        } 
    }
    }, [pokemonId, imageUrl, colorCache, setColorCache]);
    return { colors, fetchColors };
}


// RGB - HEX 변환 함수
function rgbToHex(r:number, g:number, b:number): string {
    return `#${[r, g, b]
        .map(x => x.toString(16).padStart(2, "0"))
        .join("")}`
}