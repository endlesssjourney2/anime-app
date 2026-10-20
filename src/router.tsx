import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./pages/Main/Main";
import AnimeDetails from "./pages/Title/AnimeDetails";
import Character from "./pages/Character/Character";
import CharacterSearch from "./pages/CharacterSearch/CharacterSearch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: "characters", element: <CharacterSearch /> },
      { path: "anime/:id", element: <AnimeDetails /> },
      { path: "character/:id", element: <Character /> },
    ],
  },
]);
