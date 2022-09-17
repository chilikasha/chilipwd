// TODO: remove numbers true
const flags = {
  uppercase: false,
  numbers: false,
  symbols: false,
  length: 12,
}

const selectors = {
  copy: 'copy',
  checkbox: 'checkbox',
  slider: 'slider',
  button: 'button',
  sliderValue: document.querySelector('.value'),
  // TODO: change to 'pwd'
  input: document.querySelector('.pwd'),
}

let defaultCharacters = ''
let defaultNumbers = ''
let defaultSymbols = ''

for (var i = 97; i <= 122; i++) {
  defaultCharacters += String.fromCharCode(i)
}

for (var i = 48; i <= 57; i++) {
  defaultNumbers += String.fromCharCode(i)
}

// symbols
for (var i = 33; i <= 47; i++) {
  defaultSymbols += String.fromCharCode(i)
}
for (var i = 58; i <= 64; i++) {
  defaultSymbols += String.fromCharCode(i)
}
for (var i = 91; i <= 96; i++) {
  defaultSymbols += String.fromCharCode(i)
}
for (var i = 123; i <= 126; i++) {
  defaultSymbols += String.fromCharCode(i)
}

// wrap password string into span elements
const spanWrap = () => {
  $('.pwd').each(function (index) {
    var nums = defaultNumbers
    var specials = defaultSymbols
    var characters = $(this).text().split('')
    $this = $(this)
    $this.empty()
    $.each(characters, function (i, el) {
      $this.append(`<span>` + el + `</span`)
    })

    characters.forEach((element) => {
      if (nums.includes(element)) {
        $('.pwd').find(`span:contains(${element})`).css('color', '#2563eb')
      } else if (specials.includes(element)) {
        $('.pwd')
          .find(`span:contains('${element}')`)
          .css('color', 'rgb(234 88 12)')
        $('.pwd').find(`span:contains('\"')`).css('color', 'rgb(234 88 12)')
        $('.pwd').find(`span:contains("\'")`).css('color', 'rgb(234 88 12)')
        // TODO: fix
        $('.pwd').find(`span:contains("\\")`).css('color', 'rgb(234 88 12)')
      }
    })
  })
}

const generatePassword = () => {
  const characters = {
    uppercase: defaultCharacters.toUpperCase(),
    numbers: defaultNumbers,
    symbols: defaultSymbols,
  }

  const characterList = [
    defaultCharacters,
    characters.uppercase,
    ...(flags.numbers ? characters.numbers : []),
    ...(flags.symbols ? characters.symbols : []),
  ].join('')

  const charsArray = defaultCharacters.split('')
  const charsUppercaseArray = characters.uppercase.split('')
  const allCharsArray = charsArray.concat(charsUppercaseArray)

  const numbersArray = defaultNumbers.split('')
  const specialsArray = defaultSymbols.split('')

  function gen() {
    return Array.from({ length: flags.length }, () =>
      Math.floor(Math.random() * characterList.length)
    )
      .map((number) => characterList[number])
      .join('')
  }

  let pwd
  pwd = gen()

  if (flags.numbers === true && flags.symbols === false) {
    while (numbersArray.some((v) => pwd.includes(v)) === false) {
      // console.log('oh shit')
      pwd = gen()
      if (
        numbersArray.some((v) => pwd.includes(v)) === true &&
        allCharsArray.some((v) => pwd.includes(v)) === true
      ) {
        break
      }
    }
  }

  if (flags.symbols === true && flags.numbers === false) {
    while (specialsArray.some((v) => pwd.includes(v)) === false) {
      // console.log('oh shit 2')
      // console.log(`initial pwd: ${pwd}`)
      pwd = gen()
      // console.log(`new pwd: ${pwd}`)
      if (
        specialsArray.some((v) => pwd.includes(v)) === true &&
        allCharsArray.some((v) => pwd.includes(v)) === true
      ) {
        break
      }
    }
  }

  if (flags.numbers === true && flags.symbols === true) {
    while (
      allCharsArray.some((v) => pwd.includes(v)) === false ||
      specialsArray.some((v) => pwd.includes(v)) === false ||
      numbersArray.some((v) => pwd.includes(v)) === false
    ) {
      // console.log('oh shit 3')
      pwd = gen()
      if (
        allCharsArray.some((v) => pwd.includes(v)) === true &&
        specialsArray.some((v) => pwd.includes(v)) === true &&
        numbersArray.some((v) => pwd.includes(v)) === true
      ) {
        break
      }
    }
  }

  return pwd
}

// TODO: ?
window.onload = spanWrap

document.querySelector('#app').addEventListener('input', (event) => {
  switch (event.target.dataset.jsSelector) {
    // slider listener
    case selectors.slider:
      const value = event.target.valueAsNumber
      selectors.sliderValue.innerText = value
      flags.length = value
      break
  }
})

document.querySelector('#app').addEventListener('click', (event) => {
  switch (event.target.dataset.jsSelector) {
    // copy button listener
    case selectors.copy:
      navigator.clipboard.writeText(selectors.input.textContent)
      break

    // checkboxes listener
    case selectors.checkbox:
      flags[event.target.control.id] = !event.target.control.checked
      break

    // generate button listener
    case selectors.button:
      selectors.input.textContent = generatePassword()
      spanWrap()
      break
  }
})

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    $(':checkbox:checked').prop('checked', false)
    selectors.input.textContent = generatePassword()
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'g') {
    event.preventDefault()
    selectors.input.textContent = generatePassword()
    spanWrap()
  } else if (event.key.toLowerCase() === 'c') {
    event.preventDefault()
    document.getElementById('copy_btn').click()
  }
})
