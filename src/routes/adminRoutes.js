import React from "react";
import { endPoints } from "./endPoints";

export const adminRoutes = [
    {
        index: true,
        element: React.lazy(() => import('../pages/admin/dashboard/index')),
    },
    {
        path: endPoints.Admin.PERSONNEL,
        element: React.lazy(() => import('../pages/admin/dashboard/personnel.jsx')),
    },
];