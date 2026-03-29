import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SideBarVisibleInPhoneProvider } from "./context/SideBarShowInPhone";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SideBarVisibleInPhoneProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SideBarVisibleInPhoneProvider>
    {/* showing toast alert notification */}
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </StrictMode>
);
