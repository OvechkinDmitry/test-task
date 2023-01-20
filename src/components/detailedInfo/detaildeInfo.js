import {getDetailedPageTemplate} from "./template.js";

class DetailedInfo{
    constructor(company, container) {
        this.company = company
        this.container = container
    }
    init = () => {
        this.container.innerHTML = this.render(this.company)
        this.goBackBtn = this.container.querySelector('.go__back')
    }
    render = () => getDetailedPageTemplate(this.company)
}

export default DetailedInfo