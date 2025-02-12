import React from "react";
import { endPoints } from "./endPoints";

export const adminRoutes = [
    {
        index: true,
        element: React.lazy(() => import('../pages/admin/dashboard/index')),
    },
    {
        path: endPoints.Admin.PERSONNEL,
        element: React.lazy(() => import('../pages/admin/dashboard/personnel')),
    },
    {
        path: endPoints.Admin.MISSION,
        element: React.lazy(() => import('../pages/admin/dashboard/missions')),
    },
    {
        path: endPoints.Admin.NEWMISSION,
        element: React.lazy(() => import('../pages/admin/missions/newMissions')),
    },
    {
        path: endPoints.Admin.REPPORT,
        element: React.lazy(() => import('../pages/admin/dashboard/Report')),
    },
    {
        path: `${endPoints.Admin.REPPORT}/:id`,
        element: React.lazy(() => import('../pages/admin/Rapports/detailsRapports')),
    },
    {
        path: `${endPoints.Admin.MISSION}/:id`,
        element: React.lazy(() => import('../pages/admin/Rapports/detailsMission.jsx')),
    }    
];