import config from "../config.js";
import BaseComponent from "./BaseComponent.js";

export default class Dashboard extends BaseComponent {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async fetchUsers() {
    const response = await fetch(`${config.baseUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  }

  async renderView() {
    let users;
    let errorMessage;
    try {
      users = await this.fetchUsers();
    } catch (error) {
      errorMessage = "Failed to fetch users.";
    }

    if (errorMessage) {
      return /*html*/ `
      <div>
        <h1>Error: ${errorMessage}</h1>
      </div>
      `;
    }

    let userList = users
      .map(
        (user) => /*html*/ `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.ip_address}</td>
          <td>${user.user_agent}</td>
          <td>${user.entrance_time}</td>
        </tr>
      `
      )
      .join("");

    return /*html*/ `
      <div>
        <h1>Online Users</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Agent</th>
              <th>Entrance Time</th>
              <th>Visit Count</th>
            </tr>
          </thead>
          <tbody>
            ${userList}
          </tbody>
        </table>
      </div>
    `;
  }
}
