let DadosCriarNovoQuizz = {};
let qtdNiveisUsuario;


axios.defaults.headers.common['Authorization'] = 'vqgonafhaOZTHsJVhkbESWSg'

listarQuizes()
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
            <div class="background"></div>
      <img src="${quiz.image}">
      <p>${quiz.title}</p>
      </div>`
        })
    })
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
    document.querySelector('.tela-3-1').classList.remove('escondido');
    document.querySelector('.containerQuizz').classList.add('escondido');

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
                DadosCriarNovoQuizz.title = titulo;
                DadosCriarNovoQuizz.image = url;
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

function testeCor(cor) {
    //validador dos campos de cores, se possuem formato hexadecimal
    let hex = /^#[0-9A-F]{6}$/i;
    return (hex.test(cor));
}

function criarPerguntas(qtdPerguntas) {
    //criar titulo, botão e box de perguntas para renderizar perguntas
    document.querySelector('.tela-3-1').classList.add('escondido')
    document.querySelector('.tela-3-2').classList.remove('escondido');
    let conteudoTela32 = document.querySelector('.tela-3-2');
    conteudoTela32.innerHTML = '';
    conteudoTela32.innerHTML += `
            <h2>Crie suas perguntas</h2>
            <div class="box-perguntas">
            </div>
            <button class="criar-pergunta-bt" onclick="verificarPerguntasCriadas(${qtdPerguntas})">
                Prosseguir para criar níveis
            </button>
            `;
    renderizarPergunta(qtdPerguntas);
}

function renderizarPergunta(qtdPerguntas) {
    //função renderizar perguntas de acordo quantidade estipulada na criação com informações basicas
    let Box = document.querySelector(".tela-3-2 .box-perguntas");
    Box.innerHTML='';
    for (let i = 1; i <= qtdPerguntas; i++) {
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
        `;
    }
}

function verificarPerguntasCriadas(qtdPerguntas) {
    //buscar valores dos inputs de perguntas para validar dados
    let verifPerguntas = { questions: [] };
    let i = 0;
    let x = 0;

    //Verificar os campos das perguntas e criar variavel com objeto das pergunsta para envio ao servidor
    for (i = 0; x < qtdPerguntas; i++) {
        let pergunta = document.querySelector(`.pergunta${i + 1}`);
        let titulo = pergunta.querySelector(".titulo").value;
        let cor = pergunta.querySelector(".cor").value;
        let respostaCorreta = pergunta.querySelector(".respostaCorreta").value;
        let URLCorreta = pergunta.querySelector(".urlCorreta").value;
        let resposta1 = pergunta.querySelector(".resposta1").value;
        let URL1 = pergunta.querySelector(".URL1").value;
        let resposta2 = pergunta.querySelector(".resposta2").value;
        let URL2 = pergunta.querySelector(".URL2").value;
        let resposta3 = pergunta.querySelector(".resposta3").value;
        let URL3 = pergunta.querySelector(".URL3").value;

        if (titulo.length > 20 && testeCor(cor) && respostaCorreta != "" && testeurl(URLCorreta) && resposta1 != "" && testeurl(URL1) || resposta2 != "" && testeurl(URL2) || resposta3 != "" && testeurl(URL3)) {
            let respostas = [];
            respostas.push({
                text: respostaCorreta,
                image: URLCorreta,
                isCorrectAnswer: true
            });
            if (resposta1 != "" && testeurl(URL1)) {
                respostas.push({
                    text: resposta1,
                    image: URL1,
                    isCorrectAnswer: false
                });
            }
            if (resposta2 != "" && testeurl(URL2)) {
                respostas.push({
                    text: resposta2,
                    image: URL2,
                    isCorrectAnswer: false
                });
            }
            if (resposta3 = "" && testeurl(URL3)) {
                respostas.push({
                    text: resposta3,
                    image: URL3,
                    isCorrectAnswer: false
                });
            }
            let perguntas = {
                title: titulo,
                color: cor,
                answers: respostas
            };
            verifPerguntas.questions.push(perguntas);
            x++;            
        } else {
            perguntaerro();
            return;
        }
    }
    if (x === qtdPerguntas) {
        DadosCriarNovoQuizz.questions = verifPerguntas.questions;
        criarNiveis();
    }
}

function criarNiveis() {
    //criar titulo, botão e box de cadastro de niveis para renderizar campos de cadastro dos niveis
    document.querySelector('.tela-3-2').classList.add('escondido')
    document.querySelector('.tela-3-3').classList.remove('escondido');
    let conteudoTela33 = document.querySelector('.tela-3-3');
    conteudoTela33.innerHTML = '';
    conteudoTela33.innerHTML += `
            <h2>Agora, decida os níveis!</h2>
            <div class="box-niveis">
            </div>
            <button class="criar-niveis-bt" onclick="VerificaNivel(${qtdNiveisUsuario})">
            Finalizar Quizz
            </button>
            `;
    renderizarNiveis();
}

function renderizarNiveis() {
    //função renderizar nveis de acordo quantidade estipulada na criação com informações basicas
    let BoxNiveis = document.querySelector(".tela-3-3 .box-niveis");
    BoxNiveis.innerHTML ='';
    for (let i = 1; i <= qtdNiveisUsuario; i++) {
        BoxNiveis.innerHTML += `
        <div class="criar-niveis">
            <ul id="${i}" class="niveis${i}">
                <div onclick="expandirniveis(${i})">
                <h2>Nível ${i}</h2>
                <img class="img-nivel${i}"src="./assets/imagens/create.svg">
                </div>
                <li>
                    <input type="text" placeholder="Título do nível" class="titulo">
                    <input type="text" placeholder="% de acerto mínima" class="acerto">
                    <input type="text" placeholder="URL da imagem do nível" class="urlNivel">
                    <textarea type="text" placeholder="Descrição do nível" class="descricaonivel"></textarea>
                </li>
                
            </ul>
        </div>
        `;
    }
}

function VerificaNivel(qtdNiveisUsuario) {

    //buscar valores dos inputs de Niveis para validar dados
    let i = 0;
    let x=0;
    let arraynivel = [];
    let check;
    //Verificar os campos das perguntas e criar variavel com objeto das pergunsta para envio ao servidor
    for (i = 0; i < qtdNiveisUsuario; i++) {
        let nivel = document.querySelector(`.niveis${i + 1}`);
        let titulo = nivel.querySelector(".titulo").value;
        let acerto = nivel.querySelector(".acerto").value;
        let URLNivel = nivel.querySelector(".urlNivel").value;
        let descricaonivel = nivel.querySelector(".descricaonivel").value;
        console.log(descricaonivel.length)
        if (acerto === 0) {
            check = true;
        }

        if (titulo.length > 10 && acerto >= 0 && acerto < 100 && testeurl(URLNivel) && descricaonivel.length >= 30) {

            let Niveis = {
                title: titulo,
                image: URLNivel,
                text: descricaonivel,
                minValue: acerto
            };
            arraynivel.push(Niveis);
            x++;
        } else {
            nivelerro();
            return;
        }
    }
    
    if (check === true&&x === qtdNiveisUsuario) {
        DadosCriarNovoQuizz.levels = arraynivel;

        SendQuizzAPI();
     }else {
        nivelerro();
    }
}

function SendQuizzAPI() {

    const ObjetoPerguntas =
    {
        title: DadosCriarNovoQuizz.title,
        image: DadosCriarNovoQuizz.image,
        questions: DadosCriarNovoQuizz.questions,
        levels: DadosCriarNovoQuizz.levels
    }
    console.log(objeto)
    axios.post("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes", ObjetoPerguntas).then((objeto) => {
        renderizarQuizCriado(objeto)
    })

}
function renderizarQuizCriado(quiz) {
    quiz = axios.get("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/356")
    .then((Quiz)=> {
        let tela3 = document.querySelector(".tela-3-3")
        tela3.classList.add("escondido")
        let quizCriado = document.querySelector(".desktop-11")
        quizCriado.innerHTML = 
        `<h2>Seu Quiz esta pronto!!</h2>
        <div class = "card-quiz">
        <div class="background"></div>
        <img src="${Quiz.data.image}">
        <p>${Quiz.data.title}</p>
        </div>
        <button>Acessar Quiz</button>
        <button class="white">Voltar para home</button>`
        quizCriado.classList.remove("escondido")
    })
   
}

function zerarVariaveis(){
    DadosCriarNovoQuizz = {};
    qtdNiveisUsuario;
}