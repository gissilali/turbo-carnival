import Dashboard from "./components/Dashboard.js";
import Register from "./components/Register.js";
import UserDetails from "./components/UserDetails.js";

export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    {
      path: "/",
      component: Register,
    },
    {
      path: "/dashboard",
      component: Dashboard,
    },
  ];

  const matchingPaths = routes.map((route) => ({
    route,
    isCurrent: route.path == location.pathname,
  }));

  let currentPath = matchingPaths.find((path) => path.isCurrent);

  if (!currentPath) {
    currentPath = {
      route: routes.at(0),
      isCurrent: true,
    };
  }

  const component = new currentPath.route.component();

  document.getElementById("app").innerHTML = await component.renderView();
};

const registerEventHandlers = async () => {
  const registerForm = document.getElementById("registerForm");
  const userTableRow = document.querySelectorAll("tr.user-row");
  let modal = document.querySelector(".modal");
  let closeModalButton = document.querySelector(".close");
  let modalContent = document.getElementById("modal-content");

  registerForm?.addEventListener("submit", new Register().submitForm);

  closeModalButton?.addEventListener("click", () => {
    modal.classList.remove("show-modal");
  });

  userTableRow.forEach((element) => {
    element.addEventListener("click", async (event) => {
      const email = event.target.parentElement.getAttribute("data-id");
      const userDetails = new UserDetails({ email });
      modalContent.innerHTML = await userDetails.renderView();
      modal.classList.add("show-modal");
    });
  });

  window.onbeforeunload = function (e) {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let onlineUserList = JSON.parse(
      localStorage.getItem("onlineUserList") || []
    );

    onlineUserList = onlineUserList.filter(
      (email) => email !== currentUser?.email
    );

    localStorage.setItem("onlineUserList", JSON.stringify(onlineUserList));
  };
};

document.addEventListener("DOMContentLoaded", async () => {
  await router();
  registerEventHandlers();
});
