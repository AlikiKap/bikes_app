import React from 'react';
import DrawerAppBar from './components/DrawerAppBar';
import { Outlet } from 'react-router-dom';

export default function App2() {

    return (
        <>
            <DrawerAppBar/>
            <Outlet/>
        </>
    )
}
