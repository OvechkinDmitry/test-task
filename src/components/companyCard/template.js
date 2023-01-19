export let getCompanyCardTemplate = (uid, logoUrl, companyName, type, industry) =>
    `<div class="cards__card card" id=${uid}>
                        <div class="card__logo"><img src=${logoUrl}></div>
                        <div class="card__info">
                            <div class="card__title">${companyName}</div>
                            <div class="card__description">
                                <div class="card__type">Type: ${type}</div>
                                <div class="card__industry">Industry: ${industry}</div>
                            </div>
                        </div>
                    </div>`;