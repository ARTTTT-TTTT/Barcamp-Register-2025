import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormPage from "./Pages/FormPage.jsx";
import getUser from "./loader/getUser.js";
import getConsole from "./loader/getConsole.js";
import Profile from "./Pages/Profile.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import AdminConsole from "./Pages/admin/AdminConsole.jsx";

const check_session = (user) => {
    if (user.message === "No session.") {
        window.location.href = "/register";
    }
};

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            loader: async () => {
                let user = await getUser();
                let Console = await getConsole();

                return { user, Console };
            },
        },
        {
            path: "/form",
            element: <FormPage />,
            loader: async () => {
                let user = await getUser();
                let Console = await getConsole();

                const redirectResult = check_session(user);
                if (redirectResult) {
                    return redirectResult;
                }

                return { user, Console };
            },
        },
        {
            path: "/profile",
            element: <Profile />,
            loader: async () => {
                let user = await getUser();
                let Console = await getConsole();

                const redirectResult = check_session(user);
                if (redirectResult) {
                    return redirectResult;
                }

                return { user, Console };
            },
        },
        {
            path: "/admin",
            element: <AdminPage />,
        },
        {
            path: "/ControlPanel",
            element: <AdminConsole />,
        },
    ],
    { basename: "/register" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <div className="w-full h-screen bg-secondary-500 fixed left-0 top-0 -z-10" />
    </React.StrictMode>
);
