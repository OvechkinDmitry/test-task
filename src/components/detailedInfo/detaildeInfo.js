import {getDetailedPageTemplate} from "./template.js";

class DetailedInfo{
    constructor(company, container) {
        this.company = company
        this.container = container
        this.container.innerHTML = this.render(this.company)
    }
    render = () => getDetailedPageTemplate(this.company)
}

export default DetailedInfo