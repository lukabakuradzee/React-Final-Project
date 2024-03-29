import {
  HOME_PAGE,
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
  NOT_FOUND,

} from "../constants/routes";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import NotFound from "../pages/not-found/index";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import UserProfile from "../components/UserProfile/UserProfile";

import AuthGuard from "../Guard/AuthGuard";
import GustGuard from "../Guard/GustGuard";

const routes = [
  {
    path: HOME_PAGE,
    Component: Home,
    Guard: AuthGuard,
  },
  {
    path: SIGN_IN_PAGE,
    Component: SignIn,
    Guard: GustGuard,
  },
  {
    path: SIGN_UP_PAGE,
    Component: SignUp,
    Guard: GustGuard,
  },
  {
    path: "/movie/:id",
    Component: MovieDetails,
    Guard: AuthGuard,
  },
  {
    path: "/user/:user",
    Component: UserProfile,
    Guard: AuthGuard,
  },
  {
    path: NOT_FOUND,
    Component: NotFound,
  },
];

export default routes;
