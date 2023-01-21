export let zoomSettings = {
                            size: 'large',
                            float: 'right',
                            position: {
                                bottom: '250px',
                                right: '20px'
                            }
                        }

export let mapSettings = (coords) => {
    return {
        center: coords,
        zoom:10,
        controls:[],
    }
}

export let placemarkSettings = (image) => {
    return {
        iconLayout:'default#imageWithContent',
        iconImageHref: image,
        iconImageSize: [120, 50],
    }
}