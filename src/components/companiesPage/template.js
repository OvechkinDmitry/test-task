export let getPageTemplate = (cards = '') => {
    return `<div class="page__filter filter">
                        <input type="text" placeholder="company name" id="name">
                        <input type="text" placeholder="company type" id="type">
                        <input type="text" placeholder="company indystry" id="indystry">
                </div>
                <div class="page__cards cards">
                    ${cards}
                </div>
                <div class="page__loader-container">
                    <div class="loader"></div>
                </div>`
}