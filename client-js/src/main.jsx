import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";

import FormPage from "./pages/FormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminConsolePage from "./pages/AdminConsolePage.jsx";
import SpecialRegisterPage from "./pages/SpecialRegisterPage.jsx";
import SpecialFormPage from "./pages/SpecialFormPage.jsx";

import { getUser, getSpecialUser } from "./api/user.js";
import { getConsole } from "./api/console.js";

import config from "./services/config.js";

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

                if (user.message === "No session.") {
                    return (window.location.href = "/register");
                }

                return { user, Console };
            },
        },
        {
            path: "/profile",
            element: <ProfilePage />,
            loader: async () => {
                let user = await getUser();
                let Console = await getConsole();

                if (user.message === "No session.") {
                    return (window.location.href = "/register");
                }

                return { user, Console };
            },
        },
        {
            path: "/admin",
            element: <AdminPage />,
        },
        {
            path: "/admin/control-panel",
            element: <AdminConsolePage />,
            loader: async () => {
                let Console = await getConsole();
                return { Console };
            },
        },
        {
            path: `/special-register/${config.SPECIAL_SECRET_URL}`,
            element: <SpecialRegisterPage />,
        },

        {
            path: `/special-register/${config.SPECIAL_SECRET_URL}/${config.SPECIAL_SECRET_FORM_URL}`,
            element: <SpecialFormPage />,
            loader: async () => {
                let user = await getSpecialUser();

                return { user };
            },
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
