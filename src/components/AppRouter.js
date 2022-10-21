import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import AdminCreate from "../pages/AdminCreate";
import ErrorPages from "../pages/Error";
import Success from "../pages/Success";
import Form from "../pages/Form";



const AppRouter = () => {

    return (
        <Routes >
            <Route  path="admin" element={<AdminCreate />} exact />
            <Route  path="form" element={<Form />} />
            <Route  path="success" element={<Success/>} exact />
            <Route path="*" element={<ErrorPages />} />
        </Routes>

    );
}

export default AppRouter;


