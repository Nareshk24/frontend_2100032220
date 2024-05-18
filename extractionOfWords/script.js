document.addEventListener('DOMContentLoaded', () => {
    const paragraph = document.getElementById('text');
    const text = paragraph.textContent;

    // Function to wrap long words with a span and highlight them
    function highlightLongWords(text) {
        return text.split(/\b/).map(word => {
            if (word.length > 8) {
                return `<span class="highlight">${word}</span>`;
            }
            return word;
        }).join('');
    }

    // Highlight long words and update the paragraph content
    paragraph.innerHTML = highlightLongWords(text);
});
