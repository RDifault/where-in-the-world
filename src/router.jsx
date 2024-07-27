import {Navigate, createBrowserRouter} from "react-router-dom";
import CountryDetail from "./views/CountryDetail";
import Home from "./views/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/country/:code",
        element: <CountryDetail />,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
]);

export default router;