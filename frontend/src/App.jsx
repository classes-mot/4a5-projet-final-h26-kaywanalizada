import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from "./components/AuthContext/AuthContext";
import Login from "./Pages/Login";
import EditGame from "./Pages/Edit";
import ErrorPage from "./Pages/Error";
import Add from "./Pages/Add";
import RootLayout from "./Pages/RootLayout";
import QuizList from "./components/QuizList/QuizList";

import "./App.css";
import Jouer from "./Pages/Jouer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "quizList", element: <QuizList /> },
      { path: "login", element: <Login /> },
      { path: "add", element: <Add /> },
      { path: "edit/:id", element: <EditGame /> },
      { path: "jouer/:id", element: <Jouer />}
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