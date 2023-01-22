import {getErrMessage} from "./message.js";
import {getLoginPageTemplate} from "./template.js";

class Login {
  constructor(container,fields) {
    this.container = container
    this.fields = fields;
  }

  init(){
    this.container.innerHTML = getLoginPageTemplate()
    this.form = document.querySelector(".login-form__body");
    this.validateOnSubmit();
    this.checkLocalStorage();
  }

  validateOnSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fieldsResults = this.fields.map( field =>
          this.validateFields(document.querySelector(`#${field}`)))
      if (fieldsResults.every((f) => f)) {
        localStorage.setItem("user", "1");
        this.form.submit();
      }
    });
  }

  checkLocalStorage = () => localStorage.getItem("user") ? this.form.submit() : false;

  validateFields(field) {
    let label = field.previousElementSibling.innerText
    if (field.value.trim() === "")
      return this.setStatus(field, getErrMessage("emptyField", label ), "error");
    else
      if (field.type === "password")
        if (field.value.length < 5)
          return this.setStatus(field, getErrMessage("smallPasword", label), "error");
        else return this.setStatus(field, null, "success");
      else return this.setStatus(field, null, "success");
  }

  setStatus(field, message, status) {
    const errorMessage = field.parentElement.querySelector(".error-message");
    switch (status){
      case "error":{
        errorMessage.innerText = message;
        field.classList.add("input-error");
        return false;
      }
      case "success":{
        if (errorMessage)
          errorMessage.innerText = "";
        field.classList.remove("input-error");
        return true;
      }
    }
  }
}

const container = document.querySelector('body')
const fields = ["username", "password"];
const loginPage = new Login(container, fields);
loginPage.init()
