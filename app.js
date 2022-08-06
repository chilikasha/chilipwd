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

let defaultCharacters = ''
let defaultNumbers = ''
let defaultSymbols = ''

// var returnString = function (charSet, start, end) {
//     for( var i = start; i <= end; i++ ) {
//       charSet += String.fromCharCode( i );
//     }
// }

for( var i = 97; i <= 122; i++ ) {
  defaultCharacters += String.fromCharCode( i );
}

for( var i = 48; i <= 57; i++ ) {
  defaultNumbers += String.fromCharCode( i );
}

// symbols
for( var i = 33; i <= 47; i++ ) {
  defaultSymbols += String.fromCharCode( i );
}
for( var i = 58; i <= 64; i++ ) {
  defaultSymbols += String.fromCharCode( i );
}
for( var i = 91; i <= 96; i++ ) {
  defaultSymbols += String.fromCharCode( i );
}
for( var i = 123; i <= 126; i++ ) {
  defaultSymbols += String.fromCharCode( i );
}

// wrap password string into span elements
const spanWrap = () => {
    $('.pwd').each(function (index) {
        var nums = defaultNumbers
        var specials = defaultSymbols
        var characters = $(this).text().split("");
        $this = $(this);
        $this.empty();
        $.each(characters, function (i, el) {
            $this.append(`<span>` + el + `</span`);
        });

        characters.forEach((element) => {
            if (nums.includes(element)) {
                $('h1').find(`span:contains(${element})`).css("color", "#3b82f6")
            } else if (specials.includes(element)) {
                $('h1').find(`span:contains('${element}')`).css("color", "#dc2626")
                $('h1').find(`span:contains('\"')`).css("color", "#dc2626")
                $('h1').find(`span:contains("\'")`).css("color", "#dc2626")
                $('h1').find(`span:contains("\\")`).css("color", "#dc2626")
            }
        })
    });
}

const generatePassword = () => {

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
