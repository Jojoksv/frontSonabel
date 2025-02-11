import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../components/layouts/auth/index.jsx";
import AdminLayout from "../components/layouts/admin/index.jsx";
import authRoutes from "./authRoutes.jsx";
import { endPoints } from "./endPoints.js";
import { adminRoutes } from "./adminRoutes.js";
import { Loader } from "../components/ui/loader.jsx";

const NotFound = React.lazy(() => import('../pages/notFound/index.jsx'))

const createRoutesElements = (element) => {
    const Element = element;
    return(
        <React.Suspense fallback={<Loader />} >
            <Element />
        </React.Suspense>
    );
}

const renderRoutes = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: authRoutes.map(({index, path, element}) => ({
            ...(index ? {index} : {path}),
            element: createRoutesElements(element),
        }))
    },
    {
        path: endPoints.Admin.DASHBOARD,
        element: <AdminLayout />,
        children: adminRoutes.map(({index, path, element}) => ({
            ...(index ? {index} : {path}),
            element: createRoutesElements(element),
        }))
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export const AppRoutes = () => (<RouterProvider router={renderRoutes} />)