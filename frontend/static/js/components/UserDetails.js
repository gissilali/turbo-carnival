import config from "../config.js";
import BaseComponent from "./BaseComponent.js";

export default class UserDetails extends BaseComponent {
  constructor(props) {
    super(props);
  }

  async fetchUser() {
    const response = await fetch(
      `${config.baseUrl}/getUserByEmail?email=${this.props.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data;
  }

  async renderView() {
    let user;
    let errorMessage;
    try {
      user = await this.fetchUser();
      console.log(user);
    } catch (error) {
      errorMessage = "Failed to fetch user.";
    }

    if (errorMessage) {
      return /*html*/ `
      <div>
        <h1>Error: ${errorMessage}</h1>
      </div>
      `;
    }
    return /*html*/ `
        <div>
            ${user.name}
        </div>
    `;
  }
}
