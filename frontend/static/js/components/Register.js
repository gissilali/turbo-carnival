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
        const onlineUserList =
          JSON.parse(localStorage.getItem("onlineUserList")) || [];
        console.log({ onlineUserList });
        onlineUserList.push(data.email);
        localStorage.setItem("onlineUserList", JSON.stringify(onlineUserList));

        //tracking the current user per tab
        sessionStorage.setItem("currentUser", JSON.stringify(data));

        navigateTo("/dashboard");
      })
      .catch((error) => console.error("Error:", error));
  }

  renderView() {
    return /*html*/ `
      <div>
      <header class="header">
            <div class="header-content container mx-auto">
                <a class="logo" href="/dashboard">
                    <img src="../../../static/images/logo-full.png" alt="" />
                </a>
            </div>
        </header>
        <div class="container mx-auto">
            <div class="card sm mx-auto" style="margin-top:3rem">
            <div class="form-wrapper">
            <form class="form" id="registerForm" method="POST">
            <h3>Register to Start</h3>
            <div class="form-group">
              <label>Name</label>
              <input class="form-control" type="text" required name="name" id="name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input class="form-control" type="email" required name="email" id="email">
            </div>
            <div>
              <button class="btn" type="submit">Start</button>
            </div>
          </form>
          </div>
            </div>
        </div>
      </div>
    `;
  }
}
