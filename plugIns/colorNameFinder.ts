import { hexCodeDistance, randomColor } from "./colorUtils";
import colorNames from "./colorNames";
// colorNameFinder.ts
//const colorNames: [string, string][] = []; // Assuming colorNames is defined somewhere

export const findColorName = (hexCode: string): [string, string, boolean] => {
    const hexCodeWithoutHash = hexCode.replace('#', '').toUpperCase();

  let closestMatch: [string, string] | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  colorNames.forEach(([code, name]) => {
    const distance = hexCodeDistance(hexCodeWithoutHash, code);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestMatch = [code, name];
    }
  });

  const exactMatch = closestMatch != null && closestMatch[0] === hexCodeWithoutHash;

  return [hexCode, closestMatch?.[1] ?? '', exactMatch];
};

export const generateColorName = (hexColor?: string): [string, string, boolean] => {
    const inputColor = hexColor ?? randomColor();
    // Assuming ColorNameConverter is imported correctly
    const outPut = findColorName(inputColor);
    return [...outPut];
};
  

