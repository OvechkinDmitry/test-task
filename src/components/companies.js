class DetailedInfo{
  constructor(company) {
    this.company = company
  }
  render(){
    return `<div class="page__detailed detailed">
                        <div class="go__back"><i class='bx bx-arrow-back'></i></div>
                        <div class="detailed__title">
                            ${this.company.name}
                            <div class="catch_phrase">${this.company.catchPhrase}</div>
                        </div>
                        <div class="detailed__info">
                            <div class="detailed__img">
                                <img src=${this.company.logo}>
                            </div>
                            <ul class="detailed__data">
                                <li><span>Phone number: ${this.company.phone}</span></li>
                                <li><span>Company Type: ${this.company.type}</span></li>
                                <li><span>Company Industry: ${this.company.industry}</span></li>
                                <li><span>Full adress: ${this.company.adress}</span></li>
                            </ul>
                        </div>
                        <div class="detailde__map">
                            <img src="https://risanb.com/code/colorful-google-maps-marker/default-marker.jpg">
                        </div>
                    </div>`
  }
}


class CompanyCard{
  constructor(companyData){
    this.companyData = companyData
    this.uid = companyData.uid
    this.logo = this.companyData?.logo
    this.name = this.companyData?.["business_name"]
    this.industry = this.companyData?.industry
    this.type = this.companyData?.type
    this.adress = this.companyData?.["full_address"]
    this.phone =  this.companyData?.["phone_number"]
    this.catchPhrase = this.companyData?.["catch_phrase"]
  }
  render = () => {
    return `<div class="cards__card card" id=${this.uid}>
                        <div class="card__logo"><img src=${this.logo}></div>
                        <div class="card__info">
                            <div class="card__title">${this.name}</div>
                            <div class="card__description">
                                <div class="card__type">Type: ${this.type}</div>
                                <div class="card__industry">Industry: ${this.industry}</div>
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
    // this.html = "";
    this.companyCards = []
    this.addCompanies()
    this.makePagination()
    this.sortCompanies()
  }

  handleClick = () => {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', ()=> {
        let [company] = this.companyCards.filter((el) => el.uid === card.id )
        this.container.innerHTML = new DetailedInfo(company).render()
        window.scrollTo(0,0)
        document.querySelector('.go__back').addEventListener('click', () =>{
          this.renderCards(this.companyCards)
        })
      })
    })
  }

  addCompanies = async (size = 10) => {
    fetch(`https://random-data-api.com/api/company/random_company?size=${size}`).then(res =>res.json())
        .then(companiesArr => {
            companiesArr.map((data) => {this.companyCards.push(new CompanyCard(data))});
            // this.companyCards.map((card) => (this.html += card.render()));
            this.renderCards(this.companyCards)
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
    this.renderCards(cards)
  };

  makePagination(){
      window.addEventListener("scroll", () => {
          const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
          if (scrollTop + clientHeight >= scrollHeight - 5)
            if(document.querySelector('.card'))
              this.addCompanies();
        },
        { passive: true }
      );
  }
  getPageTemplate = () => {

  }
  renderCards(cards = []){
    if (cards)
      this.container.innerHTML = cards.reduce((html, card) => {return html + card.render()}, "")
    this.handleClick()
  }
}








let exit = document.querySelector('#exit')
exit.addEventListener('click', () =>{
  localStorage.removeItem('user')
  window.location.pathname = "/src/templates/login.html"
})


let cardsRoot = document.querySelector(".page__cards");
let inputName = document.querySelector("#name");
let inputType = document.querySelector("#type");
let inputIndystry = document.querySelector("#indystry");


let companiesPage = new CompaniesPage(cardsRoot, [inputName, inputType, inputIndystry,]);
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => console.log(card.innerHTML))
})
inputName.addEventListener('input', companiesPage.sortCompanies)
inputType.addEventListener('input', companiesPage.sortCompanies)
inputIndystry.addEventListener('input', companiesPage.sortCompanies)




