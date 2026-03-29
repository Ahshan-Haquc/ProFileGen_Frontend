// App.jsx
import "./App.css";
import "./assets/customStyle.css";

import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CVprovider } from "./context/UserCVContext";
import { SkillsProvider } from "./context/SkillsAddingContext";
import routes from "./routes";

function App() {
  return (
    <div className="flex p-0 m-0 min-h-screen max-h-fit w-full overflow-x-hidden">
      <AuthProvider>
        <CVprovider>
          <SkillsProvider>
            <RouterProvider router={routes} />
          </SkillsProvider>
        </CVprovider>
      </AuthProvider>
    </div>
  );
}

export default App;