import DetailedInfo from './detaildeInfo.js'
import CompanyCard from "./companyCard.js";
import {getPageTemplate} from "./templates.js";
import {makePagination} from "./makePagination.js";


class CompaniesPage {
  constructor(container) {
    this.container = container
    this.container.innerHTML = getPageTemplate()
    this.companyCards = []
    this.handleInputs()
    this.addCompanies()
    makePagination(this.addCompanies)
  }

  handleInputs = () => {
    this.inputs = ['name', 'type', 'indystry'].map(id => {
        let input = document.querySelector(`#${id}`)
        input.oninput = () => this.sortCompanies()
        return input
      })
  }


  handleClick = () => {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', ()=> {
        let [company] = this.companyCards.filter((el) => el.uid === card.id )
        new DetailedInfo(company,this.container)
        window.scrollTo(0,0)
        document.querySelector('.go__back').onclick = () =>{
          this.container.innerHTML = getPageTemplate(this.companyCards.reduce((html, card) => {return html + card.render()}, ""))
          this.renderCards(this.companyCards)
        }
      })
    })
  }

  addCompanies = async (size = 10) => {
    let loader = document.querySelector('.page__loader-container')
    loader.style.display = 'flex'
    fetch(`https://random-data-api.com/api/company/random_company?size=${size}`).then(res =>res.json())
        .then(companiesArr => {
            companiesArr.map((data) => {this.companyCards.push(new CompanyCard(data))});
            this.renderCards(this.companyCards)
            loader.style.display = 'none'
    })
  };

  sortCompanies = (e) => {
    let filterName = this.inputs[0].value.toLowerCase().trim();
    let filterType = this.inputs[1].value.toLowerCase().trim();
    let filterIndystry = this.inputs[2].value.toLowerCase().trim();
    const checkField = (param1, param2) => !param2.trim() || param1 === param2;
    this.renderCards(
        this.companyCards.filter((card) => {
          let comName = card.name.toLowerCase()
          let comType = card.type.toLowerCase()
          let comIndystry = card.industry.toLowerCase()
          if (checkField(comName, filterName) && checkField(comType, filterType) && checkField(comIndystry, filterIndystry))
            return card
        })
    )
  };

  renderCards(cards = []){
    let cardsContainer = document.querySelector('.cards')
    cardsContainer.innerHTML = cards.reduce((html, card) => {return html + card.render()}, "")
    this.handleClick()
    this.handleInputs()
  }
}

let exit = document.querySelector('#exit')
exit.addEventListener('click', () =>{
  localStorage.removeItem('user')
  window.location.pathname = "/src/templates/login.html"
})

if(!localStorage.getItem('user'))
  window.location.pathname = "/src/templates/login.html"

let cardsRoot = document.querySelector(".page__container");
let companiesPage = new CompaniesPage(cardsRoot);



