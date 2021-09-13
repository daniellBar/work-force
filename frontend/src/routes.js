import { EmployeeApp } from "./pages/EmployeeApp.jsx";
import { Home } from "./pages/Home.jsx";

export default [
  {
    path: "/employee/",
    component: EmployeeApp,
  },
  {
    path: "/",
    component: Home,
  },
];
