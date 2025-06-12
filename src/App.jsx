import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Contacts from "./pages/Contacts";
import HomeLayout from "./components/HomeLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import RestrictedRoute from "./components/RestrictedRoute";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/settings",
          element: (
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          ),
        },
        {
          path: "/contacts",
          element: <Contacts />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <RestrictedRoute>
          <Login />
        </RestrictedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <RestrictedRoute>
          <Signup />
        </RestrictedRoute>
      ),
    },
  ]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
