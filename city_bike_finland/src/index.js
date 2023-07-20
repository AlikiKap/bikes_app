import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Stations from "./pages/Stations";
import Journeys from "./pages/Journeys";
import Home from "./pages/Home";
import App2 from './App2';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query';


const queryClient = new QueryClient()

createRoot(document.getElementById('container')).render(
    
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Stations" element={<Stations/>}/>
            <Route path="/Journeys" element={<Journeys/>}/>
            </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)