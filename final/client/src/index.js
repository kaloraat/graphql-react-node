import React from "react";
import { hydrate, render } from "react-dom";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// render(
//     <BrowserRouter>
//         <AuthProvider>
//             <App />
//         </AuthProvider>
//     </BrowserRouter>,
//     document.getElementById('root')
// );
