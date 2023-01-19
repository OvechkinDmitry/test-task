class DetailedInfo{
    constructor(company, container) {
        this.company = company
        this.container = container
        this.container.innerHTML = this.render()
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
                        <div id="map" class="map">
                        </div>
                    </div>`
    }
}

export default DetailedInfo