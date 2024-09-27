class Admin {
  constructor() {
    this.form = document.getElementById("form");
  }
  bindEvents() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const form = {};
      for (const [key, value] of formData.entries()) {
        form[key] = value;
      }

      if (localStorage.getItem("items")) {
        const result = JSON.parse(localStorage.getItem("items")).concat([form]);
        localStorage.setItem("items", JSON.stringify(result));
      } else {
        localStorage.setItem("items", JSON.stringify([form]));
      }
      window.location.reload();
    });
  }
}
const instance = new Admin();
instance.bindEvents();
