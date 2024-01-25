import BaseComponent from "./BaseComponent.js";
import config from "../config.js";
import { navigateTo } from "../index.js";

export default class Register extends BaseComponent {
  constructor() {
    super();
    this.setTitle("Register to start");
  }

  submitForm(event) {
    event.preventDefault();

    let name = event.target.elements.name.value;
    let email = event.target.elements.email.value;

    const data = { name, email };

    fetch(`${config.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigateTo("/dashboard");
      })
      .catch((error) => console.error("Error:", error));
  }

  renderView() {
    return /*html*/ `
      <div>
        <h2>Register to start</h2>
        <div>
          <form id="registerForm" method="POST">
            <div>
              <label>Name</label>
              <input type="text" required name="name" id="name">
            </div>
            <div>
              <label>Email</label>
              <input type="email" required name="email" id="email">
            </div>
            <div>
              <button type="submit">Start</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
