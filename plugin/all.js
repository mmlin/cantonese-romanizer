// Get all the text nodes in the document, and replace any Chinese characters found with Jyutping.
$(getTextNodesIn(document)).each(function(index, el) {
    var $el, text, chars, i, len, c, jyutping, frag, match, phonetic, tone;
    $el = $(el), text = $el.text(), chars = [], frag = document.createDocumentFragment();

    // Walk through the text in this node one character at a time.
    for (i = 0, len = text.length; i < len; i++) {
        c = text[i], jyutping = _charmap[c];

        // If the char was in our map (i.e. it's a Chinese char), replace it with Jyutping.
        if (jyutping) {
            if (chars.length) {
                frag.appendChild(document.createTextNode(chars.join('')));
                chars = [];
            }
            match = jyutping.match(/^(\w+)(\d)$/);
            if (match && match.length == 3) {
                phonetic = document.createTextNode(match[1]);
                tone = document.createElement('sup');
                tone.appendChild(document.createTextNode(match[2]));
                frag.appendChild(phonetic);
                frag.appendChild(tone);
            }
            else
                chars.push(jyutping);
        }
        else
            chars.push(c);
    }

    // Add any remaining chars to the document fragment.
    if (chars.length)
        frag.appendChild(document.createTextNode(chars.join('')));

    // Replace the text node with the fragment we've assembled.
    $el.replaceWith(frag);
});

// Selects all decendent text nodes of an element.
// http://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery
function getTextNodesIn(node, includeWhitespaceNodes) {
    var textNodes = [], whitespace = /^\s*$/;

    function getTextNodes(node) {
        if (node.nodeType == 3) {
            if (includeWhitespaceNodes || !whitespace.test(node.nodeValue)) {
                textNodes.push(node);
            }
        } else {
            for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                getTextNodes(node.childNodes[i]);
            }
        }
    }

    getTextNodes(node);
    return textNodes;
}