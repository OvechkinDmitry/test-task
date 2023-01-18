class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateOnSubmit();
    this.checkLocalStorage();
  }

  validateOnSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fieldsResults = this.fields.map((field) => {
        const input = document.querySelector(`#${field}`);
        return this.validateFields(input);
      });
      if (fieldsResults.every((f) => f)) {
        localStorage.setItem("user", 1);
        this.form.submit();
      }
    });
  }

  checkLocalStorage = () =>
    localStorage.getItem("user") ? this.form.submit() : false;

  validateFields(field) {
    if (field.value.trim() === "") {
      return this.setStatus(
        field,
        `${field.previousElementSibling.innerText} поле не может быть пустым`,
        "error"
      );
    } else {
      if (field.type === "password") {
        if (field.value.length < 5) {
          return this.setStatus(
            field,
            `длина ${field.previousElementSibling.innerText} поля должна составялять более 5 знаков`,
            "error"
          );
        } else return this.setStatus(field, null, "success");
      } else return this.setStatus(field, null, "success");
    }
  }

  setStatus(field, message, status) {
    const errorMessage = field.parentElement.querySelector(".error-message");
    if (status == "error") {
      errorMessage.innerText = message;
      field.classList.add("input-error");
      return false;
    }
    if (status === "success") {
      if (errorMessage) errorMessage.innerText = "";
      field.classList.remove("input-error");
      return true;
    }
  }
}

const form = document.querySelector(".login-form__body");

if (form) {
  const fields = ["username", "password"];
  const validator = new Login(form, fields);
}
// window.location.href = "login";
