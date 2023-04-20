let qtdNiveisUsuario, informacoesBasicas
let verifPerguntas = { questions: [] }

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
function perguntaerro() {
  alert(`Dados incorretos, por favor verifique se:\n
    Todos os campos estão preenchidos,\n
     o título tem no mínimo 20 caracteres,\n
      É uma cor em hexadecimal,\n
      Tem pelo menos 1 resposta correta e 1 errada por
pergunta,`)
}
function Exibirtela3() {
  document.querySelector('.tela-3-1').classList.remove('escondido')
  document.querySelector('.containerQuizz').classList.add('escondido')
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
  console.log(url)
  //validação dos dados da informação basica
  if (titulo.length >= 20 && titulo.length <= 65) {
    console.log('if titulo')
    if (perguntas >= 3) {
      console.log('if pergunta')
      if (niveis >= 2 && testeurl(url)) {
        console.log('if nivel')
        const tela31 = document.querySelector('.tela-3-1')
        tela31.classList.add('escondido')
        informacoesBasicas = {
          image: url,
          title: titulo
        }
        let qtdPerguntas = Number(perguntas)
        qtdNiveisUsuario = Number(niveis)
        criarPerguntas(qtdPerguntas)
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
function testeurl(url) {
  //testar formato do url
  try {
    let urls = new URL(url)
    return true
  } catch (err) {
    return false
  }
}

function testeCor(cor) {
  //validador dos campos de cores, se possuem formato hexadecimal
  let hex = /^#[0-9A-F]{6}$/i
  return hex.test(cor)
}

function criarPerguntas(qtdPerguntas) {
  //criar titulo, botão e box de perguntas para renderizar perguntas
  let perguntas = qtdPerguntas
  console.log(perguntas)
  document.querySelector('.tela-3-2').classList.remove('escondido')
  let conteudoTela32 = document.querySelector('.tela-3-2')

  conteudoTela32.innerHTML = ''

  conteudoTela32.innerHTML += `
        
            <h2>Crie suas perguntas</h2>
            <div class="box-perguntas">
            </div>
            <button class="criar-pergunta-bt" onclick="verificarPerguntasCriadas(${qtdPerguntas})">
                Prosseguir para criar níveis
            </button>
            `

  inserirPergunta(perguntas)
}
function inserirPergunta(perguntas) {
  //função renderizar perguntas de acordo quantidade estipulada na criação com informações basicas
  let Box = document.querySelector('.tela-3-2 .box-perguntas')

  for (let i = 1; i <= perguntas; i++) {
    Box.innerHTML += `
        <div class="criar-pergunta">
            <ul id="${i}" class="pergunta${i}">
                <div onclick="expandirpergunta(${i})">
                <h2>Pergunta ${i}</h2>
                <img class="img-pergunta${i}"src="./assets/imagens/create.svg">
                </div>
                <li>
                    <input type="text" placeholder="Texto da pergunta" class="titulo">
                    <input type="text" placeholder="Cor de fundo da pergunta" class="cor">
                </li>
                <li>
                    <h2>Resposta correta</h2>
                    <input type="text" placeholder="Resposta correta" class="respostaCorreta">
                    <input type="text" placeholder="URL da imagem" class="urlCorreta">
                </li>
                <li>
                    <h2>Respostas incorretas</h2>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 1" class="resposta1">
                        <input type="text" placeholder="URL da imagem 1" class="URL1">
                    </div>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 2" class="resposta2">
                        <input type="text" placeholder="URL da imagem 2" class="URL2">
                    </div>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 3" class="resposta3">
                        <input type="text" placeholder="URL da imagem 3" class="URL3">
                    </div>
                </li>
            </ul>
        </div>
        `
  }
}

function verificarPerguntasCriadas(qtdPerguntas) {
  //buscar valores dos inputs de perguntas para validar dados
  let i = 0
  let pergunta = document.querySelector(`.pergunta${i + 1}`)

  let titulo = pergunta.querySelector('.titulo').value
  let cor = pergunta.querySelector('.cor').value
  let respostaCorreta = pergunta.querySelector('.respostaCorreta').value
  let URLCorreta = pergunta.querySelector('.urlCorreta').value
  let resposta1 = pergunta.querySelector('.resposta1').value
  let URL1 = pergunta.querySelector('.URL1').value
  let resposta2 = pergunta.querySelector('.resposta2').value
  let URL2 = pergunta.querySelector('.URL2').value
  let resposta3 = pergunta.querySelector('.resposta3').value
  let URL3 = pergunta.querySelector('.URL3').value
  //Verificar os campos das perguntas e criar variavel com objeto das pergunsta para envio ao servidor
  for (i = 0; i < qtdPerguntas; i++) {
    if (
      (titulo.length > 20 &&
        testeCor(cor) &&
        respostaCorreta != '' &&
        testeurl(URLCorreta) &&
        resposta1 != '' &&
        testeurl(URL1)) ||
      (resposta2 != '' && testeurl(URL2)) ||
      (resposta3 != '' && testeurl(URL3))
    ) {
      let respostas = []
      respostas.push({
        text: respostaCorreta,
        image: URLCorreta,
        isCorrectAnswer: true
      })
      if (resposta1 != '' && testeurl(URL1)) {
        respostas.push({
          text: resposta1,
          image: URL1,
          isCorrectAnswer: false
        })
      }
      if (resposta2 != '' && testeurl(URL2)) {
        respostas.push({
          text: resposta2,
          image: URL2,
          isCorrectAnswer: false
        })
      }
      if ((resposta3 = '' && testeurl(URL3))) {
        respostas.push({
          text: resposta3,
          image: URL3,
          isCorrectAnswer: false
        })
      }

      let perguntas = {
        title: titulo,
        color: cor,
        answers: respostas
      }
      verifPerguntas.questions.push(perguntas)
      console.log(verifPerguntas)
    } else {
      perguntaerro()
      return
    }
  }
  VerificaNivel(qtdNiveisUsuario)
}
function VerificaNivel(qtdNiveisUsuario) {
  //função para criar nivei do quizz
}

function SendQuizzAPI() {
  //função para envio de objeto com novo quizz, en=m construção, falta parte dos niveis
  const ObjetoPerguntas = {
    title: informacoesBasicas.title,
    image: informacoesBasicas.image,
    verifPerguntas,
    levels: [
      {
        title: 'Título do nível 1',
        image: 'https://http.cat/411.jpg',
        text: 'Descrição do nível 1',
        minValue: 0
      },
      {
        title: 'Título do nível 2',
        image: 'https://http.cat/412.jpg',
        text: 'Descrição do nível 2',
        minValue: 50
      }
    ]
  }
  console.log(ObjetoPerguntas)
}

function listarQuizes() {
  let promessa = axios.get(
    'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes'
  ) // promessa da lista de todos os quizes incluindo os do  usuario !!
  let cardsContainer = document.querySelector('#todosOsQuizzes')


  promessa.then(quizes => {
    quizes = quizes.data
    quizes.forEach(quiz => {
      console.log(quiz)

      cardsContainer.innerHTML += 
      `<div class="card">
    <img src="${quiz.image}">
    <p>${quiz.title}</p>
    </div>`
    })
  })
}
