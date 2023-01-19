export let getDetailedPageTemplate = (company) => `<div class="page__detailed detailed">
                        <div class="go__back"><i class='bx bx-arrow-back'></i></div>
                        <div class="detailed__title">
                            ${company.name}
                            <div class="catch_phrase">${company.catchPhrase}</div>
                        </div>
                        <div class="detailed__info">
                            <div class="detailed__img">
                                <img src=${company.logo}>
                            </div>
                            <ul class="detailed__data">
                                <li><span>Phone number: ${company.phone}</span></li>
                                <li><span>Company Type: ${company.type}</span></li>
                                <li><span>Company Industry: ${company.industry}</span></li>
                                <li><span>Full adress: ${company.adress}</span></li>
                            </ul>
                        </div>
                        <div id="map" class="map">
                        </div>
              </div>`;