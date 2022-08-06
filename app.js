// TODO: remove numbers true
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

    // TODO: change to 'pwd'
    input: document.querySelector('.pwd')
}

// wrap password string into span elements
const spanWrap = () => {
    $('.pwd').each(function (index) {
        // var format = ['1', '2', '3', '4']
        var format = '1234567890'
        var characters = $(this).text().split("");
        $this = $(this);
        $this.empty();
        $.each(characters, function (i, el) {
            $this.append(`<span>` + el + `</span`);
        });

        characters.forEach((element) => {
            if (format.includes(element)) {
                console.log(`numbers: ${element}`)
                $('h1').find(`span:contains(${element})`).css("color", "#3b82f6")
            }
        })
    });
}

const generatePassword = () => {
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

    let nums = characters.numbers

    const characterList = [
        defaultCharacters,
        characters.uppercase,
        ...flags.numbers ? characters.numbers : [],
        ...flags.symbols ? characters.symbols : []
    ].join('')

    const pwd = Array.from({ length: flags.length }, () => Math.floor(Math.random() * characterList.length))
        .map(number => characterList[number])

    return pwd.join('')

    // return Array.from({ length: flags.length }, () => Math.floor(Math.random() * characterList.length))
    //     .map(number => characterList[number])
    //     .join('')
}

window.onload = spanWrap

document.querySelector('#app').addEventListener('click', event => {
    switch (event.target.dataset.jsSelector) {
        // copy button listener
        case selectors.copy:
            navigator.clipboard.writeText(selectors.input.textContent)
        break;

        // checkboxes listener
        case selectors.checkbox:
            flags[event.target.control.id] = !event.target.control.checked
        break;

        // slider listener
        case selectors.slider:
            const value = event.target.valueAsNumber

            selectors.sliderValue.innerText = value
            flags.length = value
        break;

        // generate button listener
        case selectors.button:
            selectors.input.textContent = generatePassword()
            spanWrap()
        break;
    }
})

document.addEventListener('readystatechange', event => { 
    if (event.target.readyState === "complete") {
        selectors.input.textContent = generatePassword()
    }
});
