import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router"; 
import './index.css';
import Router from "./config/Router.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Check your HTML file.");
}

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
