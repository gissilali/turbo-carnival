import Dashboard from "./components/Dashboard.js";
import Register from "./components/Register.js";

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

const registerFormHandlers = async () => {
  document
    .getElementById("registerForm")
    ?.addEventListener("submit", new Register().submitForm);
};

document.addEventListener("DOMContentLoaded", async () => {
  await router();
  registerFormHandlers();
});
