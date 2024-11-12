import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../components/layouts/auth/index.jsx";
import authRoutes from "./authRoutes.jsx";

const NotFound = React.lazy(() => import('../pages/notFound/index.jsx'))

const publicRoutes = [...authRoutes]

const createRoutesElements = (element) => {
    const Element = element;
    return(
        <React.Suspense fallback={""} >
            <Element />
        </React.Suspense>
    );
}

const renderRoutes = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: publicRoutes.map(({index, path, element}) => ({
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