// Transforms the jp112.inputplugin file, which maps Jyutping to Chinese characters,
// and creates a JS file, which reverses the mapping (Chinese characters to Jyutping).
// The .inputplugin file was from Dominic Yu's Jyutping for Mac version 1.1.2:
//   http://rescomp.stanford.edu/~domingo2/Chinese.html

var fs, charmap, output, match, jyutping, chars;

fs = require('fs');

// Maps Chinese characters to Jyutping.
charmap = {};

// Store the output in an array to preserve line order before writing to the file.
output = [];

// Read the .inputplugin file (converted to UTF-8) line-by-line.
// The lines we want lead with a Jyutping word, which is followed by a tab,
// and the a comma-separated list of the matching Chinese characters.
fs.readFileSync('jp112-utf8.inputplugin').toString().split('\r').forEach(function(line) {
    match = line.match(/^(\w+\d)\t(.+)$/);
    if (!match) return;
    jyutping = match[1], chars = match[2].split(',');
    chars.forEach(function(c) {
        if (typeof charmap[c] == 'undefined') {
            charmap[c] = jyutping;
            output.push('\t"' + c + '": "' + jyutping + '"');
        }
    });
});

// Wrap the result in a JavaScript object and write to a .js file.
output = 'var _charmap = {\n' + output.join(',\n') + '\n};';
fs.writeFileSync('plugin/charmap.js', output);