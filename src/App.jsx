import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Contacts from "./pages/Contacts";
import HomeLayout from "./components/HomeLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import { useEffect } from "react";
import axiosInstance from "./utils/axios";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import Cart from "./pages/Cart";

function App() {
  const dispatch = useDispatch();
  // use auth Api here to verify the token and get user detail

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/auth");
      if (response.data.user) {
        dispatch(setUser(response.data.user));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/contacts",
          element: <Contacts />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
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
