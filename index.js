const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (data) => {
  const poem = data[0]
  const titleHTML = `<h2>${poem.title}</h2>`
  const authorHTML = `<h3><em>by ${poem.author}</em></h3>`
  // stanzas
  const stanzas = []
  let current = []

  poem.lines.forEach(line => {
    if (line === '') {
      if (current.length) {
        stanzas.push(current)
        current = []
      }
    } else {
      current.push(line)
    }
  })

  if (current.length) {
    stanzas.push(current)
  }
  // convert stanzas to <p> with breaks
  const stanzaHTML = stanzas.map(stanza => `<p>${stanza.join('<br/>')}</p>`).join('')
  return `${titleHTML}${authorHTML}${stanzaHTML}`
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
