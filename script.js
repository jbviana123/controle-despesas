const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputtransactionsName = document.querySelector("#text")
const inputtransactionsAmount = document.querySelector("#amount")

//nao vai ser mais usado na implementaçao do localstorage
// let transactions = [
//     { id: 1, name: "bolo de brigadeiro", amount: -20 },
//     { id: 2, name: "salario", amount: 330 },
//     { id: 3, name: "torta de frango", amount: -10 },
//     { id: 4, name: "bolo de brigadeiro", amount: 150 }

// ]

// Inserindo os dados no Localstorage
// aqui o array no local storage e pasreado para tipo json
const localStoragetransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStoragetransactions : []

const removetransactions = ID => {
    // selecione a referencia em seguida pressione para altera todas as referencias crt + shift +  l 
    transactions = transactions
        .filter(transactions => transactions.id !== ID)
        updateLocalStorage()
    init()

}
const addtransactionsIntoDom = transactions => {

    const operator = transactions.amount < 0 ? '-' : '+'
    const CSSClass = transactions.amount < 0 ? 'minus' : 'plus'
    const amountWhithoutOperator = Math.abs(transactions.amount)
    const li = document.createElement('li')
    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transactions.name} <span>${operator} R$ ${amountWhithoutOperator}</span>
    <button class="delete-btn" onClick="removetransactions(${transactions.id})">
    x
    </button>
    `
    transactionsUl.append(li)
}

const updateBalanceValues = () => {
    const transactionsAmount = transactions.map(transactions => transactions.amount)
    const total = transactionsAmount
        .reduce((accumulator, transactions) => accumulator + transactions, 0)
        .toFixed(2)
    const income = transactionsAmount
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)

    const expense = Math.abs(transactionsAmount
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value,0)
        .toFixed(2))


    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`

    // minuto 42:24

}
const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addtransactionsIntoDom)
    updateBalanceValues()
}
init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => { //funçao que recebe o click no submit avisa se os input forma preenchidos
    event.preventDefault()

    const transactionsName = inputtransactionsName.value.trim()
    const transactionsAmount = inputtransactionsAmount.value.trim()

    if (transactionsName === '' || transactionsAmount === '') {
        alert('Por favor preenchas os campos em branco ')
        return
    }
    // aqui e adicionado os valores do input da tela no array de objetos
    const transaction = {
        id: generateID(),
        name: transactionsName,
        amount: Number(transactionsAmount)
    }

    // agora temos que adicionar esse novo objeto na nossa lista de objetos

    transactions.push(transaction)
    init()
    updateLocalStorage()

    // aqui e resetado nosso inputs da tela 
    inputtransactionsName.value = ''
    inputtransactionsAmount.value = ''


})