let qtdNiveisUsuario, informacoesBasicas

axios.defaults.headers.common['Authorization'] = 'vqgonafhaOZTHsJVhkbESWSg'

listarQuizes()
function dadoinvalido() {
  alert(`Dados incorretos, por favor Verifique se:\n
    Todos os campos estão preenchidos,\n
    O título tem entre 20 e 65 caracteres,\n
    A URL é válida,\n
    A quantidade de perguntas é no mínimo 3,\n
    A quantidade de níveis é no mínimo 2
    `)
  console.log('dado invalido')
}

function criacaoinfobasica() {
  console.log('cria info')

  let titulo = document.querySelector('.criacao-titulo').value
  let url = document.querySelector('.criacao-url').value
  let perguntas = document.querySelector('.criacao-qtd-perguntas').value
  let niveis = document.querySelector('.criacao-qtd-niveis').value
  console.log(titulo)
  console.log(perguntas)
  console.log(niveis)

  if (titulo.length >= 20 && titulo.length <= 65) {
    console.log('if titulo')
    if (perguntas >= 3) {
      console.log('if pergunta')
      if (niveis >= 2) {
        console.log('if nivel')
        try {
          let urls = new URL(url)
          const tela31 = cardselector.querySelector('.tela-3-1')
          tela31.classList.add('escondido')
          informacoesBasicas = {
            image: url,
            title: titulo
          }
          let qtdPerguntas = Number(perguntas)
          qtdNiveisUsuario = Number(niveis)
          criarPerguntas(qtdPerguntas)
        } catch (err) {
          dadoinvalido()
        }
      } else {
        dadoinvalido()
      }
    } else {
      dadoinvalido()
    }
  } else {
    dadoinvalido()
  }
}

function listarQuizes() {
  let promessa = axios.get(
    'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes'
  ) // promessa da lista de todos os quizes incluindo os do  usuario !!
  let cardsContainer = document.querySelector('.todosOsQuizzes')

  promessa.then(quizes => {
    quizes = quizes.data
    quizes.forEach(quiz => {
      console.log(quiz)

      cardsContainer.innerHTML += `<div class="card">
    <img src="${quiz.image}">
    <p>${quiz.title}</p>
    </div>`
    })
  })
}
