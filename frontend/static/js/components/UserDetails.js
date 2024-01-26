import config from "../config.js";
import BaseComponent from "./BaseComponent.js";

export default class UserDetails extends BaseComponent {
  constructor(props) {
    super(props);
    if (!props || !props.email) {
      throw new Error("Props or props.email is not defined");
    }
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

  async getUser() {
    let user;
    let errorMessage;

    try {
      user = await this.fetchUser();
    } catch (error) {
      errorMessage = "Failed to fetch user.";
    }

    return { user, errorMessage };
  }

  async renderView() {
    const { user, errorMessage } = await this.getUser();
    if (errorMessage) {
      return /*html*/ `
      <div>
        <h1>Error: ${errorMessage}</h1>
      </div>
      `;
    }
    return /*html*/ `
        <div class="user-details">
            <div class="avatar">
              ${user.name.at(0)}
            </div>
            <div class="bio">
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
            </div>
            <div class="details">
              <div class="detail">
                <span class="title">User Agent</span>
                <span class="info">${user.user_agent}</span>
              </div>
              <div class="detail">
              <span class="title">Entrance Time</span>
              <span class="info">${user.entrance_time}</span>
            </div>
            <div class="detail">
            <span class="title">Visit Count</span>
            <span class="info">${user.visit_count || 0}</span>
          </div>
            </div>
        </div>
    `;
  }
}
