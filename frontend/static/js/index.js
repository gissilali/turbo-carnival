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
  let modal = document.querySelector(".modal");
  let closeModalButton = document.querySelector(".close");

  registerForm?.addEventListener("submit", new Register().submitForm);

  closeModalButton?.addEventListener("click", () => {
    modal.classList.remove("show-modal");
  });

  new Dashboard().attachEventHandlers();

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
