export function rev(x: number) {
    return x - Math.floor(x/360) * 360
}