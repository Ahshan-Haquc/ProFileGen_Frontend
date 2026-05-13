// App.jsx
import "./App.css";
import "./assets/customStyle.css";

import { RouterProvider } from "react-router-dom";
import { useGetMeQuery } from "./redux/features/auth/authApi";
import routes from "./routes";

function App() {
  useGetMeQuery();

  return (
    <div className="flex p-0 m-0 min-h-screen max-h-fit w-full overflow-x-hidden">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;