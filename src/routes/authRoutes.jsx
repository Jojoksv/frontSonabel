import React from "react";

const authRoutes = [
    {
        index: true,
        element: React.lazy(() => import('../pages/auth/login'))
    }
];

export default authRoutes