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

export default CompanyCard