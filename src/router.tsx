import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./pages/Main/Main";
import AnimeDetails from "./pages/Title/AnimeDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: "anime/:id", element: <AnimeDetails /> },
    ],
  },
]);
