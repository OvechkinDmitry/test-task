import {getHeaderTemplate} from "./template.js";

class Header{
    constructor(container,logoName) {
        this.container = container
        this.logoName = logoName
    }
    init = () => this.container.innerHTML = getHeaderTemplate(this.logoName)
}

export default Header