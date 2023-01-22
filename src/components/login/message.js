export let getErrMessage = (errName, label) =>{
    switch (errName){
        case "emptyField":
            return `${label} поле не может быть пустым`
        case "smallPasword":
            return `длина ${label} поля должна составялять более 5 знаков`
    }
}