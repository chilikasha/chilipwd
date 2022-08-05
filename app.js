const flags = {
    uppercase: false,
    numbers: false,
    symbols: false,
    length: 12
}

const selectors = {
    copy: 'copy',
    checkbox: 'checkbox',
    slider: 'slider',
    button: 'button',
    sliderValue: document.querySelector('.value'),
    input: document.querySelector('.pwd')
}

const generatePassword = () => {
    // const defaultCharacters = 'abcdefghijklmnopqrstuvwxyz'
    let defaultCharacters = ''
    let defaultNumbers = ''
    let defaultSymbols = ''
    for( var i = 97; i <= 122; i++ ) {
      defaultCharacters += String.fromCharCode( i );
    }
    for( var i = 48; i <= 57; i++ ) {
      defaultNumbers += String.fromCharCode( i );
    }
    for( var i = 33; i <= 47; i++ ) {
      defaultSymbols += String.fromCharCode( i );
    }
    const characters = {
        uppercase: defaultCharacters.toUpperCase(),
        numbers: defaultNumbers,
        symbols: defaultSymbols
    }

    const characterList = [
        defaultCharacters,
        // ...flags.uppercase ? characters.uppercase : [],
        characters.uppercase,
        ...flags.numbers ? characters.numbers : [],
        ...flags.symbols ? characters.symbols : []
    ].join('')

    return Array.from({ length: flags.length }, () => Math.floor(Math.random() * characterList.length))
        .map(number => characterList[number])
        .join('')
}

document.querySelector('#app').addEventListener('click', event => {
    switch (event.target.dataset.jsSelector) {
        // Event listener for copy
        case selectors.copy:
            navigator.clipboard.writeText(selectors.input.textContent)
        break;

        // Event listeners for checkboxes
        case selectors.checkbox:
            flags[event.target.control.id] = !event.target.control.checked
        break;

        // Event listeners for slider
        case selectors.slider:
            const value = event.target.valueAsNumber

            selectors.sliderValue.innerText = value
            flags.length = value
        break;

        // Event listener for generate button
        case selectors.button:
            selectors.input.textContent = generatePassword()
        break;
    }
})

document.addEventListener('readystatechange', event => { 
    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
        selectors.input.textContent = generatePassword()
    }
});
