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
    let companiesArr = await fetch(`https://random-data-api.com/api/company/random_company?size=${size}`);
    if (companiesArr.ok) {
      companiesArr = await companiesArr.json();
      companiesArr.map((data) => {this.companyCards.push(new CompanyCard(data))});
      // this.companyCards.map((card) => (this.html += card.render()));
    }
    this.render()
    console.log(this.companyCards.length)
  };

  sortCompanies = () => {
    let filterName = this.inputName.value.toLowerCase();
    let filterType = this.inputType.value.toLowerCase();
    let filterIndystry = this.inputIndustry.value.toLowerCase();
    let cards = this.container.querySelectorAll(".cards__card");
    const checkField = (param1, param2) => !param2.trim() || param1 === param2;
    cards.forEach((card) => {
      let comName = card.querySelector(".card__title").innerText.toLowerCase();
      let comType = card.querySelector(".card__type").innerText.split(": ")[1].toLowerCase();
      let comIndystry = card.querySelector(".card__industry").innerText.split(": ")[1].toLowerCase();
      if (!checkField(comName, filterName) || !checkField(comType, filterType) || !checkField(comIndystry, filterIndystry)) {
        if (!card.classList.contains("hidden")) card.classList.add("hidden");
      } else {
        if (card.classList.contains("hidden")) card.classList.remove("hidden");
      }
    });
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

  render(){
    this.container.innerHTML = this.companyCards.reduce((html, card) => {

      return html + card.render()
    }, "")
    // this.container.innerHTML = this.html
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
// companiesPage.render()
