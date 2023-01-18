class CompanyCard{
  constructor(companyData){
    this.companyData = companyData
    this.logo = this.companyData?.logo
    this.name = this.companyData["business_name"]
    this.industry = this.companyData?.industry
    this.type = this.companyData?.type
  }
  render(){
    return `<div class="cards__card card">
                        <div class="card__logo"><img src=${this.logo}></div>
                        <div class="card__info">
                            <div class="card__title">${this.name}</div>
                            <div class="card__description">
                                <div class="card__industry">Industry: ${this.industry}</div>
                                <div class="card__type">Type: ${this.type}</div>
                            </div>
                        </div>
                    </div>`;
  }
}


class CompaniesPage {
  constructor(container, inputs) {
    this.container = container
    this.inputName = inputs[0]
    this.inputType = inputs[1]
    this.inputIndustry = inputs[2]
    this.html = "";
    this.companyCards = []
    this.addCompanies()
    this.makePagination()
    this.sortCompanies()
  }

  addCompanies = async (size = 10) => {
    fetch(`https://random-data-api.com/api/company/random_company?size=${size}`).then(res =>res.json())
        .then(companiesArr => {
            console.log(companiesArr)
            companiesArr.map((data) => {this.companyCards.push(new CompanyCard(data))});
            this.companyCards.map((card) => (this.html += card.render()));
            this.render(this.companyCards)
    })
  };

  sortCompanies = (e) => {
    let filterName = this.inputName.value.toLowerCase().trim();
    let filterType = this.inputType.value.toLowerCase().trim();
    let filterIndystry = this.inputIndustry.value.toLowerCase().trim();
    const checkField = (param1, param2) => !param2.trim() || param1 === param2;
    let cards = []
    for (let card of this.companyCards){
      if (card) {
        let comName = card.name.toLowerCase()
        let comType = card.type.toLowerCase()
        let comIndystry = card.industry.toLowerCase()
        if (!checkField(comName, filterName) || !checkField(comType, filterType) || !checkField(comIndystry, filterIndystry))
          continue
        else
          cards.push(card)
      }
    }
    this.render(cards)
  };

  makePagination() {
    window.addEventListener(
      "scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 1)
          this.addCompanies();
      },
      { passive: true }
    );
  }

  render(cards = []){
    if (cards)
      this.container.innerHTML = cards.reduce((html, card) => {
        return html + card.render()
      }, "")
  }
}

let cardsRoot = document.querySelector(".page__cards");
let inputName = document.querySelector("#name");
let inputType = document.querySelector("#type");
let inputIndystry = document.querySelector("#indystry");

let companiesPage = new CompaniesPage(cardsRoot, [inputName, inputType, inputIndystry,]);

inputName.addEventListener('input', companiesPage.sortCompanies)
inputType.addEventListener('input', companiesPage.sortCompanies)
inputIndystry.addEventListener('input', companiesPage.sortCompanies)
