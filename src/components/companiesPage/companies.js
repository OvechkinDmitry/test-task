import DetailedInfo from '../detailedInfo/detaildeInfo.js'
import CompanyCard from "../companyCard/companyCard.js";
import {getPageTemplate} from "./template.js";
import {makePagination} from "../pagination/makePagination.js";


class CompaniesPage {
  constructor(container) {
    this.container = container
    this.companyCards = []
  }

  init = () => {
    this.container.innerHTML = getPageTemplate()
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
      card.onclick= () => {
        let [company] = this.companyCards.filter((el) => el.uid === card.id )
        let detailedPage = new DetailedInfo(company,this.container)
        detailedPage.init()
        window.scrollTo(0,0)
        detailedPage.goBackBtn.onclick = () =>{
          this.container.innerHTML = getPageTemplate(
              this.companyCards.reduce((html, card) => html + card.render(), ""))
          this.renderCards(this.companyCards)
        }
      }
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
        }).catch(err => console.log(err))
  };

  sortCompanies = (e) => {
    let filterName = this.inputs[0].value.toLowerCase().trim();
    let filterType = this.inputs[1].value.toLowerCase().trim();
    let filterIndystry = this.inputs[2].value.toLowerCase().trim();
    const checkField = (param1, param2) => !param2.trim() || param1 === param2;
    this.renderCards(this.companyCards.filter((card) => {
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
export default CompaniesPage



