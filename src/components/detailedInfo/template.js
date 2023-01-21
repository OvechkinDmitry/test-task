export let getDetailedPageTemplate = (company) => `
                        <div class="go__back"><i class='bx bx-arrow-back'></i></div>
                        <div class="page__detailed detailed">
                        <div class="detailed__info">
                            <div class="detailed__img">
                                <img src=${company.logo}>
                            </div>
                             <div class="detailed__heading">
                                <div class="detailed__title">${company.name}</div>
                                <div class="detailed_phrase">"${company.catchPhrase}"</div>
                            </div>
                        </div>
                        <div class="detailed__info">
                            <div class="map__container">
                                <div id="map" class="map"></div>
                            </div>
                            <ul class="detailed__data">
                                   <li>Phone number: ${company.phone}</li>
                                   <li>Company Type: ${company.type}</li>
                                   <li>Company Industry: ${company.industry}</li>
                                   <li>Full adress: ${company.adress}</li>
                            </ul>
                        </div>
                     </div>`;