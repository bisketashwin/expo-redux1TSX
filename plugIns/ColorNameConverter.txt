/*

+-----------------------------------------------------------------+
|     Created by Chirag Mehta - http://chir.ag/projects/ntc       |
|-----------------------------------------------------------------|
|               ntc js (Name that Color JavaScript)               |
+-----------------------------------------------------------------+

All the functions, code, lists etc. have been written specifically
for the Name that Color JavaScript by Chirag Mehta unless otherwise
specified.

This script is released under the: Creative Commons License:
Attribution 2.5 http://creativecommons.org/licenses/by/2.5/

Sample Usage:

  <script type="text/javascript" src="ntc.js"></script>

  <script type="text/javascript">

    var n_match  = ntc.name("#6195ED");
    n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
    n_name       = n_match[1]; // This is the text string for the name of the match
    n_exactmatch = n_match[2]; // True if exact color match, False if close-match

    alert(n_match);

  </script>

*/
import React from 'react';

import colorNames from './colorNames';

const ntc = {
    names: colorNames,
    init: function () {
        for (let i = 0; i < ntc.names.length; i++) {
            const color = "#" + ntc.names[i][0];
            const rgb = ntc.rgb(color);
            const hsl = ntc.hsl(color);
            ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
        }
    },

    name: function (color) {
        color = color.toUpperCase();
        if (color.length < 3 || color.length > 7)
            return ["#000000", "Invalid Color: " + color, false];
        if (color.length % 3 === 0)
            color = "#" + color;
        if (color.length === 4)
            color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);

        const rgb = ntc.rgb(color);
        const r = rgb[0], g = rgb[1], b = rgb[2];
        const hsl = ntc.hsl(color);
        const h = hsl[0], s = hsl[1], l = hsl[2];
        let ndf1 = 0, ndf2 = 0, ndf = 0;
        let cl = -1, df = -1;

        for (let i = 0; i < ntc.names.length; i++) {
            if (color === "#" + ntc.names[i][0])
                return ["#" + ntc.names[i][0], ntc.names[i][1], true];

            ndf1 = Math.pow(r - ntc.names[i][2], 2) + Math.pow(g - ntc.names[i][3], 2) + Math.pow(b - ntc.names[i][4], 2);
            ndf2 = Math.pow(h - ntc.names[i][5], 2) + Math.pow(s - ntc.names[i][6], 2) + Math.pow(l - ntc.names[i][7], 2);
            ndf = ndf1 + ndf2 * 2;
            if (df < 0 || df > ndf) {
                df = ndf;
                cl = i;
            }
        }

        return cl < 0 ? ["#000000", "Invalid Color: " + color, false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], false];
    },

    // Adopted from: Farbtastic 1.2
    // http://acko.net/dev/farbtastic
    hsl: function (color) {
        const rgb = [
            parseInt('0x' + color.substring(1, 3)) / 255,
            parseInt('0x' + color.substring(3, 5)) / 255,
            parseInt('0x' + color.substring(5, 7)) / 255,
        ];
        let min, max, delta, h, s, l;
        const r = rgb[0], g = rgb[1], b = rgb[2];

        min = Math.min(r, Math.min(g, b));
        max = Math.max(r, Math.max(g, b));
        delta = max - min;
        l = (min + max) / 2;

        s = 0;
        if (l > 0 && l < 1)
            s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

        h = 0;
        if (delta > 0) {
            if (max === r && max !== g) h += (g - b) / delta;
            if (max === g && max !== b) h += (2 + (b - r) / delta);
            if (max === b && max !== r) h += (4 + (r - g) / delta);
            h /= 6;
        }
        return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
    },

    // Adopted from: Farbtastic 1.2
    // http://acko.net/dev/farbtastic
    rgb: function (color) {
        return [
            parseInt('0x' + color.substring(1, 3)),
            parseInt('0x' + color.substring(3, 5)),
            parseInt('0x' + color.substring(5, 7)),
        ];
    },
};

// Initialize the ntc object
ntc.init();

// Example usage in a React component
function ColorNameConverter( inputColor ) {
    const color = inputColor ?? "#FF0000";
    const result = ntc.name(color);

    return (result);
}

export default ColorNameConverter;


