let DadosCriarNovoQuizz = {}
let qtdNiveisUsuario
let umquizz

axios.defaults.headers.common['Authorization'] = 'vqgonafhaOZTHsJVhkbESWSg'

listarQuizes()
function listarQuizes() {
  let promessa = axios.get(
    'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes'
  ) // promessa da lista de todos os quizes incluindo os do  usuario !!
  let cardsContainer = document.querySelector('#todososquizes')
  cardsContainer.innerHTML = '' //substituir modelos por conteudo da API
  let Seusquizes = document.querySelector('.seusQuizes')
  let todosOsQuizzesSeusQuizzes = document.querySelector(
    '.todosOsQuizzes-seusQuizzes'
  )
  let x = 0
  promessa.then(quizes => {
    quizes = quizes.data
    quizes.forEach(quiz => {
      console.log(quiz)
      if (localStorage.getItem(`${quiz.id}`) == quiz) {
        Seusquizes.innerHTML += `<div data-test="my-quiz" class="card " onclick="BuscarQuizz(${quiz.id})">
         <div class="background"></div>
   <img src="${quiz.image}">
   <p>${quiz.title}</p>
   </div>`
        x++
      } else {
        cardsContainer.innerHTML += `<div data-test="others-quiz" class="card " onclick="BuscarQuizz(${quiz.id})">
            <div class="background"></div>
      <img src="${quiz.image}">
      <p>${quiz.title}</p>
      </div>`
      }
    })
    if (x != 0) {
      let criarQuizdiv = document.querySelector('.criarQuizz')
      criarQuizdiv.classList.add('escondido')
      todosOsQuizzesSeusQuizzes.classList.remove('escondido')
    }
  })
}

function BuscarQuizz(quizid) {
  let promess = axios.get(
    `https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${quizid}`
  )
  promess.then(exibirumquizz)
}

function exibirumquizz(quizzz) {
  umquizz = quizzz.data
  console.log(quizzz)
  console.log(quizzz.data.questions.length)
  document.querySelector('.main').classList.add('escondido')
  document.querySelector('.tela-2').classList.remove('escondido')

  let banner = document.querySelector('.tela-2')
  banner.innerHTML = ''
  banner.innerHTML = `
    <div data-test="banner" class="banner">
    <img
    class="img-banner"
    src="${umquizz.image}"
    alt=""
  />
  <h2 class="title-banner">${umquizz.title}</h2>
  </div>`

  let perguntas = document.querySelector('.tela-2')
  perguntas.innerHTML = ''

  for (let i = 0; i < umquizz.questions.length; i++) {
    perguntas.innerHTML += `
        <div data-test="question"  class="container-quizz-tela2">
            
                <div class="header-quizz">
                    <h2>${umquizz.questions[i].title}</h2>
                </div>
                <div class="container-cardQuizz ccardQuizz${i}">
                    
                </div>
            
        </div>
        `
    if (i === umquizz.questions.length - 1) {
      perguntas.innerHTML += `<div class="tela-resultado escondido">
        <div class="div"></div>`
    }
    geraropcoes(i)
  }
}
function geraropcoes(idpergunta) {
  let Opcoes = document.querySelector(`.ccardQuizz${idpergunta}`)

  let respostas = umquizz.questions[idpergunta].answers
  console.log(respostas)

  respostas = respostas.sort(embaralhar)
  console.log(respostas)

  for (let i = 0; i < respostas.length; i++) {
    if (respostas[i].isCorrectAnswer) {
      Opcoes.innerHTML += `
            <div data-test="answer" class="cardQuizz opcao correta" onclick="selecionarCard(this)">
            
                <img src="${respostas[i].image}">
                <p data-test="answer-text">${respostas[i].text}</p>
            </div>
        `
      //ccardQuizz${idpergunta}
    } else {
      Opcoes.innerHTML += `
            <div data-test="answer" class="cardQuizz opcao" onclick="selecionarCard(this)">
                <img src="${respostas[i].image}">
                <p data-test="answer-text">${respostas[i].text}</p>
            </div>
        `
    }
  }
}
function embaralhar() {
  return Math.random() - 0.5
}

function dadoinvalido() {
  alert(`Dados incorretos, por favor Verifique se:\n
    Todos os campos estão preenchidos,\n
    O título tem entre 20 e 65 caracteres,\n
    A URL é válida,\n
    A quantidade de perguntas é no mínimo 3,\n
    A quantidade de níveis é no mínimo 2`)
}
function perguntaerro() {
  alert(`Dados incorretos, por favor verifique se:\n
    Todos os campos estão preenchidos,\n
    O título tem no mínimo 20 caracteres,\n
    É uma cor em hexadecimal,\n
    Tem pelo menos 1 resposta correta e 1 errada por
    pergunta,`)
}
function nivelerro() {
  alert(`Dados incorretos, por favor verifique se:\n
    Todos os campos estão preenchidos,\n
    O título tem no mínimo 10 caracteres,\n
    A porcentagem está entre 0 e 100,\n
    Tem um nível 0,\n
    A descrição tem no mínimo 30 caracteres`)
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

  //validação dos dados da informação basica
  if (titulo.length >= 20 && titulo.length <= 65) {
    if (perguntas >= 3) {
      if (niveis >= 2 && testeurl(url)) {
        DadosCriarNovoQuizz.title = titulo
        DadosCriarNovoQuizz.image = url
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
  document.querySelector('.tela-3-1').classList.add('escondido')
  document.querySelector('.tela-3-2').classList.remove('escondido')
  let conteudoTela32 = document.querySelector('.tela-3-2')
  conteudoTela32.innerHTML = ''
  conteudoTela32.innerHTML += `
            <h2>Crie suas perguntas</h2>
            <div class="box-perguntas">
            </div>
            <button data-test="go-create-levels" class="criar-pergunta-bt" onclick="verificarPerguntasCriadas(${qtdPerguntas})">
                Prosseguir para criar níveis
            </button>
            `
  renderizarPergunta(qtdPerguntas)
}

function renderizarPergunta(qtdPerguntas) {
  //função renderizar perguntas de acordo quantidade estipulada na criação com informações basicas
  let Box = document.querySelector('.tela-3-2 .box-perguntas')
  Box.innerHTML = ''
  for (let i = 1; i <= qtdPerguntas; i++) {
    Box.innerHTML += `
        <div class="criar-pergunta">
            <ul data-test="question-ctn"  id="${i}" class="pergunta${i}">
                <div onclick="expandir(${i})">
                <h2>Pergunta ${i}</h2>
                <img data-test="toggle" class="img-pergunta${i}"src="./assets/imagens/create.svg"/>
                </div>
                <li>
                    <input data-test="question-input" type="text" placeholder="Texto da pergunta" class="titulo">
                    <input data-test="question-color-input" type="text" placeholder="Cor de fundo da pergunta" class="cor">
                </li>
                <li>
                    <h2>Resposta correta</h2>
                    <input data-test="correct-answer-input" type="text" placeholder="Resposta correta" class="respostaCorreta">
                    <input data-test="correct-img-input" type="text" placeholder="URL da imagem" class="urlCorreta">
                </li>
                <li>
                    <h2>Respostas incorretas</h2>
                    <div>
                        <input data-test="wrong-answer-input" type="text" placeholder="Resposta incorreta 1" class="resposta1">
                        <input data-test="wrong-img-input" type="text" placeholder="URL da imagem 1" class="URL1">
                    </div>
                    <div>
                        <input data-test="wrong-answer-input" type="text" placeholder="Resposta incorreta 2" class="resposta2">
                        <input data-test="wrong-img-input" type="text" placeholder="URL da imagem 2" class="URL2">
                    </div>
                    <div>
                        <input data-test="wrong-answer-input" type="text" placeholder="Resposta incorreta 3" class="resposta3">
                        <input data-test="wrong-img-input" type="text" placeholder="URL da imagem 3" class="URL3">
                    </div>
                </li>
            </ul>
        </div>
        `
  }
  expandir(1);
}

function verificarPerguntasCriadas(qtdPerguntas) {
  //buscar valores dos inputs de perguntas para validar dados
  let verifPerguntas = { questions: [] }
  let i = 0
  let x = 0

  //Verificar os campos das perguntas e criar variavel com objeto das pergunsta para envio ao servidor
  for (i = 0; x < qtdPerguntas; i++) {
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
      x++
    } else {
      perguntaerro()
      return
    }
  }
  if (x === qtdPerguntas) {
    DadosCriarNovoQuizz.questions = verifPerguntas.questions
    criarNiveis()
  }
}

function criarNiveis() {
  //criar titulo, botão e box de cadastro de niveis para renderizar campos de cadastro dos niveis
  document.querySelector('.tela-3-2').classList.add('escondido')
  document.querySelector('.tela-3-3').classList.remove('escondido')
  let conteudoTela33 = document.querySelector('.tela-3-3')
  conteudoTela33.innerHTML = ''
  conteudoTela33.innerHTML += `
            <h2>Agora, decida os níveis!</h2>
            <div class="box-niveis">
            </div>
            <button data-test="finish" class="criar-niveis-bt" onclick="VerificaNivel(${qtdNiveisUsuario})">
            Finalizar Quizz
            </button>
            `
  renderizarNiveis()
}

function renderizarNiveis() {
  //função renderizar nveis de acordo quantidade estipulada na criação com informações basicas
  let BoxNiveis = document.querySelector('.tela-3-3 .box-niveis')
  BoxNiveis.innerHTML = ''
  for (let i = 1; i <= qtdNiveisUsuario; i++) {
    BoxNiveis.innerHTML += `
        <div data-test="level-ctn" class="criar-niveis">
            <ul id="${i}" class="niveis${i}">
                <div data-test="toggle" onclick="expandirN(${i})">
                <h2>Nível ${i}</h2>
                <img class="img-nivel${i}"src="./assets/imagens/create.svg">
                </div>
                <li>
                    <input data-test="level-input" type="text" placeholder="Título do nível" class="titulo">
                    <input data-test="level-percent-input" type="text" placeholder="% de acerto mínima" class="acerto">
                    <input data-test="level-img-input" type="text" placeholder="URL da imagem do nível" class="urlNivel">
                    <textarea data-test="level-description-input" type="text" placeholder="Descrição do nível" class="descricaonivel"></textarea>
                </li>
                
            </ul>
        </div>
        `
  }
}

function VerificaNivel(qtdNiveisUsuario) {
  //buscar valores dos inputs de Niveis para validar dados
  let i = 0
  let x = 0
  let arraynivel = []
  let check
  //Verificar os campos das perguntas e criar variavel com objeto das pergunsta para envio ao servidor
  for (i = 0; i < qtdNiveisUsuario; i++) {
    let nivel = document.querySelector(`.niveis${i + 1}`)
    let titulo = nivel.querySelector('.titulo').value
    let acerto = Number(nivel.querySelector('.acerto').value)
    let URLNivel = nivel.querySelector('.urlNivel').value
    let descricaonivel = nivel.querySelector('.descricaonivel').value
    console.log(descricaonivel.length)
    if (acerto === 0) {
      check = true
    }

    if (
      titulo.length > 10 &&
      acerto >= 0 &&
      acerto < 100 &&
      testeurl(URLNivel) &&
      descricaonivel.length >= 30
    ) {
      let Niveis = {
        title: titulo,
        image: URLNivel,
        text: descricaonivel,
        minValue: acerto
      }
      arraynivel.push(Niveis)
      x++
    } else {
      nivelerro()
      return
    }
  }

  if (check === true && x === qtdNiveisUsuario) {
    DadosCriarNovoQuizz.levels = arraynivel

    SendQuizzAPI()
  } else {
    nivelerro()
  }
}

function SendQuizzAPI() {
  const ObjetoPerguntas = {
    title: DadosCriarNovoQuizz.title,
    image: DadosCriarNovoQuizz.image,
    questions: DadosCriarNovoQuizz.questions,
    levels: DadosCriarNovoQuizz.levels
  }

  axios
    .post(
      'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes',
      ObjetoPerguntas
    )
    .then(objeto => {
      renderizarQuizCriado(objeto)
      localStorage.setItem(`${objeto.data.id}`, JSON.stringify(objeto.data))
    })
}
function renderizarQuizCriado(quiz) {
  quiz = axios
    .get(
      `https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${Quiz.data.id}`
    )
    .then(Quiz => {
      let tela3 = document.querySelector('.tela-3-3')
      tela3.classList.add('escondido')
      let quizCriado = document.querySelector('.desktop-11')
      quizCriado.innerHTML = `<h2>Seu Quiz esta pronto!!</h2>
        <div data-test="success-banner" class = "card-quiz">
        <div class="background"></div>
        <img src="${Quiz.data.image}">
        <p>${Quiz.data.title}</p>
        </div>
        <button data-test="go-quiz" BuscarQuizz(${Quiz.data.id})>Acessar Quiz</button>
        <button data-test="go-home" class="white" onclick="backHome()>Voltar para home</button>`
      quizCriado.classList.remove('escondido')
    })
}

function zerarVariaveis() {
  DadosCriarNovoQuizz = {}
  qtdNiveisUsuario
}

function expandir(id) {
  const SelecionadoAnteriormente = document.querySelector(
    `.criar-pergunta .expandir`
  )
  console.log(SelecionadoAnteriormente)

  if (SelecionadoAnteriormente !== null) {
    document
      .querySelector(`.criar-pergunta .escondido`)
      .classList.toggle('escondido')

    SelecionadoAnteriormente.classList.toggle('expandir')
  }

  if (
    SelecionadoAnteriormente !==
    document.querySelector(`.criar-pergunta .pergunta${id}`)
  ) {
    const botao = document.querySelector(`.criar-pergunta .pergunta${id}`)

    botao.classList.toggle('expandir')

    document
      .querySelector(`.criar-pergunta .img-pergunta${id}`)
      .classList.toggle('escondido')
  }
}

function expandirN(id) {
  const SelecionadoAnteriormente = document.querySelector(
    `.criar-niveis .expandir`
  )
  console.log(SelecionadoAnteriormente)

  if (SelecionadoAnteriormente !== null) {
    document
      .querySelector(`.criar-niveis .escondido`)
      .classList.toggle('escondido')

    SelecionadoAnteriormente.classList.toggle('expandir')
  }

  if (
    SelecionadoAnteriormente !==
    document.querySelector(`.criar-niveis .niveis${id}`)
  ) {
    const botao = document.querySelector(`.criar-niveis .niveis${id}`)

    botao.classList.toggle('expandir')

    document
      .querySelector(`.criar-niveis .img-nivel${id}`)
      .classList.toggle('escondido')
  }
}

function restartQuizz() {
  const telaResultado = document.querySelector('.tela-resultado')
  telaResultado.classList.add('escondido')
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  document.querySelectorAll('.cardQuizz.selected').forEach(card => {
    card.classList.remove('selected')
  })
}

function backHome() {
  document.querySelector('.tela-2').classList.add('escondido')
  document.querySelector('.containerQuizz').classList.remove('escondido')
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function selecionarCard(event) {
    let verif = event.parentNode.querySelector('.selected')
    if(verif!==null){
        return;
    }else{

    let teste = event.parentNode;
    console.log(teste)
    const cards = teste.querySelectorAll(`.cardQuizz`)
    console.log(cards)

  console.log(cards)
  cards.forEach(cardQuizz =>
    cardQuizz.addEventListener('click', selecionarCard)
  )

  console.log(event)
  cards.forEach(card => {
    if (card !== event) {
      card.classList.remove('selected')
      card.classList.add('not-selected')
    }
  })

  event.classList.add('selected')
  event.classList.add('wrong-answer')
  event.classList.remove('not-selected')

  setTimeout(() => {
    window.scrollBy({
      top: 450,
      behavior: 'smooth'
    })
  }, 2000)

    event.classList.add('selected')
    event.classList.add('wrong-answer')
    event.classList.remove('not-selected')



    verificaresp(event);
}
}

function verificaresp(event) {
  let teste = event.parentNode
  console.log(teste)
  const cards = teste.querySelectorAll(`.opcao`)
  console.log(cards)
  const certa = teste.querySelectorAll(`.correta`)

  console.log(cards)
  cards.forEach(cardQuizzz =>
    cardQuizzz.addEventListener('click', verificaresp)
  )

  console.log(event)
  cards.forEach(card => {
    if (card !== event) {
      card.classList.remove('correct-answer')
      card.classList.add('wrong-answer')
    }
  })
  for (i = 0; i < cards.length; i++) {
    teste.querySelector(`.correta`).classList.add('correct-answer')
    teste.querySelector(`.correta`).classList.remove('wrong-answer')
  }
  exibirresultado()
}

function exibirresultado() {
  let position
  let qtselect = document.querySelectorAll('.selected')
  let qtdquestion = document.querySelectorAll('.container-quizz-tela2')
  console.log(qtselect.length)
  console.log(qtdquestion.length)

  if (qtselect.length === qtdquestion.length) {
    let contagem = document.querySelectorAll('.selected.correct-answer')
    let porcentagem = Math.round((contagem.length / qtdquestion.length) * 100)
    let niveis = umquizz.levels
    console.log(porcentagem)

    for (i = 0; i < umquizz.levels.length; i++) {
      let valorMinimo = umquizz.levels[i].minValue

      if (porcentagem >= valorMinimo) {
        position = i
      }
    }
    let resultad = document.querySelector('.tela-resultado')
    console.log(resultad)
    console.log(position)

    resultad.innerHTML = `<div class="header-resultado">
                 <h2 data-test="answer-text">${porcentagem}% de acerto: ${umquizz.levels[position].minValue}</h2>
            </div>
             <div class="conteudo-resultado">
             <img data-test="level-img"
               src="${umquizz.levels[position].image}"
               alt="" />
              <p data-test="level-text">${umquizz.levels[position].text}</p>
            </div>
            <div class="buttons-resultado">
                <button data-test="restart" class="restart-quizz" onclick="restartQuizz()">
                    Reiniciar Quizz
                </button>
                <button data-test="go-home" class="back-home" onclick="backHome()">
                    Voltar pra home
                </button>
            </div>
    `
    document.querySelector('.tela-resultado').classList.remove('escondido')
  }
}
