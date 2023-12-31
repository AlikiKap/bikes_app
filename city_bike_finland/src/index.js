import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Stations from "./pages/Stations";
import Journeys from "./pages/Journeys";
import App2 from './App2';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SingleStation from './pages/SingleStation';
import UploadFile from './pages/UploadFile';

const queryClient = new QueryClient()

createRoot(document.getElementById('container')).render(
    
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <Routes>
            <Route path="/" element={<App2/>}>
                <Route index element={<Journeys/>}/>
                <Route path="/journeys" element={<Journeys/>}/>
                <Route path="/stations" element={<Stations/>}/>
                <Route path="/stations/:id" element={<SingleStation/>}/>
                <Route path="/upload" element={<UploadFile/>}/>
                </Route>
            </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)