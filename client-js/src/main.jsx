import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";

import FormPage from "./pages/FormPage.jsx";
import Profile from "./pages/Profile.jsx";
import VotePage from "./pages/VotePage.jsx"
import AdminPage from "./pages/AdminPage.jsx";
import AdminConsole from "./pages/AdminConsole.jsx";

import getUser from "./api/user.js";
import getConsole from "./api/console.js";

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
            element: <Profile />,
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
            path: "/vote",
            element: <VotePage />,
            loader: async () => {
                let user = await getUser();
                let Console = await getConsole();

                if (user.message === "No session.") {
                    return (window.location.href = "/register");
                }
                if (Console.vote !== true && user.status !== "CONFIRMED") {
                    return (window.location.href = "/register/profile");
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
