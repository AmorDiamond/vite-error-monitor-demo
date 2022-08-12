import React, { Suspense } from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Divider } from 'antd'
const User = React.lazy(() => import('./pages/user'));
const Detail = React.lazy(() => import('./pages/detail'));

const AppRoutes = () => (
    <Router>
        <Link to='./user'>user</Link>
        <Divider type='vertical' />
        <Link to='./detail'>detail</Link>
        <Routes>
            <Route path="/user" element={<Suspense><User /></Suspense>} />
            <Route path="/detail" element={<Suspense><Detail /></Suspense>} />
        </Routes>
    </Router>
)
export default AppRoutes;