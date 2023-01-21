import {getDetailedPageTemplate} from "./template.js";
import {mapSettings, placemarkSettings, zoomSettings} from "./mapConfig.js";

class DetailedInfo {
    constructor(company, container) {
        this.company = company
        this.container = container
    }

    init = () => {
        this.container.innerHTML = this.render(this.company)
        this.goBackBtn = this.container.querySelector('.go__back')
        ymaps.ready(this.crateMap())
    }

    crateMap = () => {
        let coords = [this.company.latitude, this.company.longitude]
        var placemark = new ymaps.Placemark(coords,{},placemarkSettings(this.company.logo))
        let map = new ymaps.Map('map', mapSettings(coords))
        map.controls.add('zoomControl', zoomSettings);
        map.geoObjects.add(placemark)
        return map
    }
    render = () => getDetailedPageTemplate(this.company)
}


export default DetailedInfo