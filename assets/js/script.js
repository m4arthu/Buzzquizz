let qtdNiveisUsuario, informacoesBasicas;
let verifPerguntas = { questions: [] };

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
function Exibirtela3(){
    document.querySelector('.tela-3-1').classList.remove('escondido');
    document.querySelector('.containerQuizz').classList.add('escondido');
    
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
                criarPerguntas(qtdPerguntas);

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

        let urls = new URL(url);
        return true;

    } catch (err) {
        return false;
    }
}

function listarQuizes() {
  let promessa = axios.get(
    'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes'
  ) // promessa da lista de todos os quizes incluindo os do  usuario !!
  let cardsContainer = document.querySelector('#todososquizes')
  

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
