import {getCompanyCardTemplate} from "./template.js";

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
    render = () => getCompanyCardTemplate(this.uid, this.logo, this.name, this.type, this.industry)
}

export default CompanyCard