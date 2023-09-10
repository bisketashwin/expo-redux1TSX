
// colorUtils.ts
export const randomColor = (): string => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');
  
    const hexColor = `#${redHex}${greenHex}${blueHex}`;
    return hexColor;
  };

  
  export const hexCodeDistance = (hex1: string, hex2: string): number => {
    const bigint1 = parseInt(hex1, 16);
    const bigint2 = parseInt(hex2, 16);
    return Math.abs(bigint1 - bigint2);
  };
  
  export function isLightColor(hexColor: string): boolean {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  }