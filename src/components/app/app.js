import Header from '../header/header.js'
import CompaniesPage from '../companiesPage/companies.js'
import {getAppTemplate} from "./template.js";

class App{
    constructor(appName) {
        this.appName = appName
    }

    render = () => {
        document.querySelector('body').innerHTML = getAppTemplate()
        let headerConatainer = document.querySelector('.header__container')
        let pageContainer = document.querySelector('.page__container')
        new Header(headerConatainer, this.appName).init()
        new CompaniesPage(pageContainer).init()
    }
}

new App("Companies Searcher").render()
