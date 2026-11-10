import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Main";
import AnimeDetails from "./pages/Title/AnimeDetails";
import Character from "./pages/Character/Character";
import CharacterSearch from "./pages/CharacterSearch/CharacterSearch";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import Profile from "./pages/Profile/Profile";
import PublicProfile from "./pages/Profile/PublicProfile/PublicProfile";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: "characters", element: <CharacterSearch /> },
      { path: "anime/:id", element: <AnimeDetails /> },
      { path: "character/:id", element: <Character /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/:username", element: <PublicProfile /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);
