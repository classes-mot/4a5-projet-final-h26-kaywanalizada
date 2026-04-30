import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from "./components/AuthContext/AuthContext";
import Login from "./Pages/Login";
import EditGame from "./Pages/Edit";
import ErrorPage from "./Pages/Error";
import Add from "./Pages/Add";
import RootLayout from "./Pages/RootLayout";
import QuizList from "./components/QuizList/QuizList";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "gameList", element: <QuizList /> },
      { path: "login", element: <Login /> },
      { path: "add", element: <Add /> },
      { path: "edit/:id", element: <EditGame /> },
    ],
  },
]);

function App() {
  return (
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  );
}

export default App;