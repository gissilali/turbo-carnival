import config from "../config.js";
import BaseComponent from "./BaseComponent.js";
import UserDetails from "./UserDetails.js";

export default class Dashboard extends BaseComponent {
  constructor() {
    super();
    this.setTitle("Dashboard");
    this.intervalId = null;
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

  async getUsers() {
    let users;
    let errorMessage;

    try {
      users = await this.fetchUsers();
    } catch (error) {
      errorMessage = "Failed to fetch users.";
    }

    return { users, errorMessage };
  }

  async refreshView() {
    const { users, errorMessage } = await this.getUsers();

    const table = document.getElementById("usersTable");
    if (table) {
      const onlineUserList =
        JSON.parse(localStorage.getItem("onlineUserList")) || [];
      table.innerHTML = this.renderUserList(users, onlineUserList);
      this.attachEventHandlers();
    }
  }

  attachEventHandlers() {
    const userTableRow = document.querySelectorAll("tr.user-row");
    let modalContent = document.getElementById("modal-content");
    let modal = document.querySelector(".modal");

    userTableRow.forEach((element) => {
      element.addEventListener("click", async (event) => {
        const email = event.target.parentElement.getAttribute("data-id");
        const userDetails = new UserDetails({ email });
        modalContent.innerHTML = await userDetails.renderView();
        modal.classList.add("show-modal");
      });
    });
  }

  renderUserList(users, onlineUserList) {
    return users
      .map((user) => {
        const isOnline = onlineUserList.includes(user.email);
        return /*html*/ `
        <tr class="user-row" data-id="${user.email}">
          <td>${user.name} | ${user.email}</td>
          <td>${user.entrance_time}</td>
          <td>${user.last_update_time}</td>
          <td>${user.ip_address}</td>
          <td>
            <span class="badge  ${isOnline ? "online" : "offline"}">
            ${isOnline ? "online" : "offline"}
            </span>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  async renderView() {
    const { users, errorMessage } = await this.getUsers();

    if (errorMessage) {
      return /*html*/ `
      <div>
        <h1>Error: ${errorMessage}</h1>
      </div>
      `;
    }

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let greeting = `<h1>Welcome</h1>`;

    const onlineUserList =
      JSON.parse(localStorage.getItem("onlineUserList")) || [];

    if (currentUser) {
      greeting = `<h1>Welcome, ${currentUser.name}</h1>`;
      onlineUserList.push(currentUser.email);
    }

    localStorage.setItem("onlineUserList", JSON.stringify(onlineUserList));

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(async () => {
      await this.refreshView();
    }, 3000);

    return /*html*/ `
      <div>
        <header class="header">
            <div class="header-content container mx-auto">
                <a class="logo" href="/dashboard">
                    <img src="../../../static/images/logo-full.png" alt="" />
                </a>
                <div class="user-profile">
                    <div class="avatar">G</div>
                    <span class="user-name">Gibson Silali</span>
                </div>
            </div>
        </header>
        <div class="container mx-auto body-content">
            ${greeting}
            <div class="content-header">
              <h2>Users</h2>
              <a target="_blank" href="/">New Registration</a>
            </div>
            <div class="card">
                <div class="card-content">
                    <div class="table-wrapper">
                    <div >
                    <table  class="clickable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Update Time</th>
                            <th>Entrance Time</th>
                            <th>User IP</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="usersTable">
                        ${this.renderUserList(users, onlineUserList)}
                    </tbody>
                </table>
                    </div>
                        
                    </div>
                </div>
            </div>
        </div>
      </div>
    `;
  }
}
