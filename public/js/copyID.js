function copyToClipboard(element) {
    /*
        Use : Copy beatmap ID to clip board based on clicked element
        using keyword this.
    */
    const text = element.getAttribute('data-beatmap-id');
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(textarea);

    element.textContent = "Copied!";
    element.classList.add('copied');

    setTimeout(() => {
        element.textContent = text; 
        element.classList.remove('copied'); 
    }, 500); 
}
