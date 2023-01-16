// import fetch from "node-fetch"
let cardsRoot = document.querySelector('.page__cards')
let inputName = document.querySelector('#name')
let inputType = document.querySelector('#type')
let inputIndystry = document.querySelector('#indystry')


let getCardTemplate = (companyData) => `<div class="cards__card card">
                        <div class="card__logo"><img src=${companyData['logo']}></div>
                        <div class="card__info">
                            <div class="card__title">${companyData['business_name']}</div>
                            <div class="card__description">
                                <div class="card__industry">Industry: ${companyData['industry']}</div>
                                <div class="card__type">Type: ${companyData['type']}</div>
                            </div>
                        </div>
                    </div>`


const addCompanies = async (size = 10) => {
    let companiesArr = await fetch(`https://random-data-api.com/api/company/random_company?size=${size}`)
    if (companiesArr.ok){
        companiesArr = await companiesArr.json()
        companiesArr = companiesArr.map(el => getCardTemplate(el))
        companiesArr.map(card => cardsRoot.innerHTML += card)
    }
}

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5)
        addCompanies();
}, {
    passive: true
});
const sortCompanies = () => {
    filterName = inputName.value.toLowerCase()
    filterType = inputType.value.toLowerCase()
    filterIndystry = inputIndystry.value.toLowerCase()
    let cards = document.querySelectorAll(".cards__card")
    const checkField = (param1, param2) => !param2.trim() || param1 === param2
    cards.forEach(card => {
        comName = card.querySelector('.card__title').innerText.toLowerCase()
        comType = card.querySelector('.card__type').innerText.split(": ")[1].toLowerCase()
        comIndystry = card.querySelector('.card__industry').innerText.split(": ")[1].toLowerCase()
        if(!checkField(comName, filterName) || !checkField(comType, filterType) || !checkField(comIndystry, filterIndystry)){
            if(!card.classList.contains('hidden'))
                card.classList.add('hidden')
        }
        else{
            if(card.classList.contains('hidden'))
                card.classList.remove('hidden')
        }
    })
}


const sortHandler = () => {
    sortCompanies()
}

inputName.addEventListener('input', sortHandler)
inputType.addEventListener('input', sortHandler)
inputIndystry.addEventListener('input', sortHandler)




