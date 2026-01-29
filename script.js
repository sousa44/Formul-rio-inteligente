/*

Classe abstrata: Campo

Métodos: validar()

Classes:

CampoTexto

CampoEmail

CampoNumero

Validação visual

Estado salvo



*/

/*dados DOM */

// inputs
let nomeInput = document.getElementById("nome")
let emailInput = document.getElementById("email")
let idadeInput = document.getElementById("idade")
let telefoneInput = document.getElementById("telefone")

// botoes
const botaoSalvar = document.querySelector(".buttonSalvar")

// paragrafors

const textEstado = document.getElementById("textEstado")
let erroNome = document.querySelector(".erroNome")
let erroEmail = document.querySelector(".erroEmail")
let erroIdade = document.querySelector(".erroIdade")
let erroTelefone = document.querySelector(".erroTelefone")



// divs 
let dadosNome = document.getElementById("dadosNome")
let dadosEmail = document.getElementById("dadosEmail")
let dadosIdade = document.getElementById("dadosIdade")
let dadosTelefone = document.getElementById("dadosTelefone")


// regex
const regexSimbolos = /[^\p{L}\p{N}\s]/u
const apenasNumeros = /^\d+$/;



// classe abstrata

class Campo {
    constructor() {
        if (this.constructor === Campo) {
            throw new Error("Classe Campo não pode ser usada diretamente")
        }
    }

    // métodos

    validar() {
        throw new Error("A classe validar precisa ser implementada")
    }
}


// classes concretas

// Class CampoNome
class CampoNome extends Campo {

    constructor(nome) {
        super()
        this.nome = nome
    }

    // método obrigatório

    validar() {


        if (this.nome === "") {
            erroNome.textContent = "Nome é obrigatório"
            return false
        }

        if (this.nome.length < 3) {
            erroNome.textContent = "Nome muito pequeno"
            return false

        }

        if (regexSimbolos.test(this.nome)) {

            erroNome.textContent = "Não pode conter simbolos"
            return false

        }

        erroNome.textContent = ""
        return true




    }

}

// evento de nome

nomeInput.addEventListener("blur", () => {


    const nome = nomeInput.value.trim()
    const nomes = new CampoNome(nome)
    nomes.validar()

})

// Class CampoEmail

class CampoEmail extends Campo {
    constructor(email) {
        super()
        this.email = email
    }


    // método 

    validar() {

        if (this.email === "") {
            erroEmail.textContent = "Email é obrigatório"
            return false
        }

        if (!this.email.includes("@")) {
            erroEmail.textContent = "Adicione um @"
            return false
        }

        const partes = this.email.split("@")

        if (partes.length !== 2) {
            erroEmail.textContent = "Email inválido"
            return false
        }

        if (partes[0].trim() === "") {
            erroEmail.textContent = "Adicione um nome antes do @"
            return false
        }

        if (partes[1].trim() === "") {
            erroEmail.textContent = "Adicione um domínio"
            return false
        }

        if (!partes[1].includes(".")) {
            erroEmail.textContent = "Domínio inválido"
            return false
        }

        // limpar erro

        erroEmail.textContent = ""
        return true


    }
}

// evento de email

emailInput.addEventListener("blur", () => {

    const email = emailInput.value.trim()

    const emails = new CampoEmail(email)

    emails.validar()
})



// CampoIdade

class CampoIdade extends Campo {
    constructor(idade) {
        super()
        this.idade = idade
    }

    // método

    validar() {
        if (!Number.isInteger(this.idade) || this.idade <= 0 || this.idade > 120) {
            erroIdade.textContent = "Digite uma idade válida"
            return false
        }

        erroIdade.textContent = ""
        return true
    }





}

// evento de idade

idadeInput.addEventListener("blur", () => {



    const idade = Number(idadeInput.value)

    const idades = new CampoIdade(idade)

    idades.validar()

})


// CampoTelefone

class CampoTelefone extends Campo {
    constructor(numero) {
        super()
        this.numero = numero


    }

    // método

    validar() {

        const numeros = this.numero.replace(/\D/g, ""); // remove tudo que não é número
        // remove tudo que não é numero

        if (numeros === "") {
            erroTelefone.textContent = "Telefone é obrigatório"

            return false
        }

        if (numeros.length < 10) {
            erroTelefone.textContent = "Número inválido"
            return false

        }

        // limpar erro

        erroTelefone.textContent = ""
        return true




    }
}

// evento de numero

telefoneInput.addEventListener("blur", () => {


    const numero = telefoneInput.value

    const numeros = new CampoTelefone(numero)
    numeros.validar()
})










/*-------------------------------------------------------------*/



// função salvar

const remover = document.getElementById("remover")



function renderizarPessoa(nome, email, idade, telefone) {
    const divNomes = document.createElement('div')
    const divEmail = document.createElement('div')
    const divIdade = document.createElement("div")
    const divTelefone = document.createElement("div")

    divNomes.innerHTML = `<b>${nome}</b>`
    divEmail.innerHTML = `<b>${email}</b>`
    divIdade.innerHTML = `<b>${idade}</b>`
    divTelefone.innerHTML = `<b>${telefone}</b>`

    divNomes.classList.add("p-2", "border", "border-dark")
    divEmail.classList.add("p-2", "border", "border-dark")
    divIdade.classList.add("p-2", "border", "border-dark")
    divTelefone.classList.add("p-2", "border", "border-dark")

    dadosNome.appendChild(divNomes)
    dadosEmail.appendChild(divEmail)
    dadosIdade.appendChild(divIdade)
    dadosTelefone.appendChild(divTelefone)
}

// evento de salvar()
botaoSalvar.addEventListener("click", () => {
    const nomeValido = new CampoNome(nomeInput.value.trim()).validar()
    const emailValido = new CampoEmail(emailInput.value.trim()).validar()
    const idadeValida = new CampoIdade(Number(idadeInput.value)).validar()
    const telefoneValido = new CampoTelefone(telefoneInput.value).validar()


    // validar se são verdadeiros

    if (nomeValido && emailValido && idadeValida && telefoneValido) {
        let nome = nomeInput.value.trim()
        let email = emailInput.value.trim()
        let idade = idadeInput.value
        let telefone = telefoneInput.value

        salvar(nome, email, idade, telefone)


    }

    // limpar inputs

    nomeInput.value=""
    idadeInput.value=""
    emailInput.value=""
    telefoneInput.value=""


})



function obterPessoas() {
    return JSON.parse(localStorage.getItem("pessoas")) || []
}

function salvar(nome, email, idade, telefone) {
    const pessoas = obterPessoas()

    pessoas.push({ nome, email, idade, telefone })

    localStorage.setItem("pessoas", JSON.stringify(pessoas))

    renderizarPessoa(nome, email, idade, telefone)

    textEstado.textContent = "Salvo"
}

window.addEventListener("DOMContentLoaded", () => {
    const pessoas = obterPessoas()

    pessoas.forEach(pessoa => {
        renderizarPessoa(
            pessoa.nome,
            pessoa.email,
            pessoa.idade,
            pessoa.telefone
        )
    })

})


remover.addEventListener("click", () => {
    localStorage.removeItem("pessoas")

    dadosNome.innerHTML = ""
    dadosEmail.innerHTML = ""
    dadosIdade.innerHTML = ""
    dadosTelefone.innerHTML = ""

    textEstado.textContent = ""
})










