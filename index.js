const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (data) => {
  const poem = data[0]

  const h2 = makeTag('h2')
  const h3 = makeTag('h3')
  const em = makeTag('em')
  const p = makeTag('p')

  const titleHTML = h2(poem.title)
  const authorHTML = h3(em(`by ${poem.author}`))
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
  if (current.length) stanzas.push(current)
  
  // convert stanzas to <p> with breaks
  const stanzaHTML = pipe(
    arr => arr.map(stanza => stanza.join('<br>')),
    arr => arr.map(p),
    arr => arr.join('')
  )(stanzas)
  return `${titleHTML}${authorHTML}${stanzaHTML}`
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
