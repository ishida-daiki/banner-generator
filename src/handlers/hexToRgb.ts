// 色の16進数をRGBに変換する関数
export function hexToRgb(hex: string) {
    // #を削除し、3桁の場合は6桁に変換
    const cleanHex = hex.replace("#", "").trim();
    const validHex =
        cleanHex.length === 3
            ? cleanHex
                .split("")
                .map((char) => char + char)
                .join("")
            : cleanHex;
    
    // 16進数を10進数に変換し、255で割って0-1の範囲に正規化
    const r = parseInt(validHex.slice(0, 2), 16) / 255;
    const g = parseInt(validHex.slice(2, 4), 16) / 255;
    const b = parseInt(validHex.slice(4, 6), 16) / 255;

    // NaNチェック
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return { r: 0, g: 0, b: 0 }; // 無効な値の場合は黒を返す
    }

    return { r, g, b };
}