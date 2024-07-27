import {Navigate, createBrowserRouter} from "react-router-dom";
import CountryDetail from "./views/CountryDetail";
import Home from "./views/Home";

const router = createBrowserRouter([
    {
        path: "/where-in-the-world/",
        element: <Home />,
    },
    {
        path: "/where-in-the-world/country/:code",
        element: <CountryDetail />,
    },
    {
        path: "*",
        element: <Navigate to="/where-in-the-world/" />,
    },
]);

export default router;