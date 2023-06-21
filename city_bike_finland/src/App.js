import React from 'react';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import Journey from './Journey';

const queryClient = new QueryClient()
function App() {


      return (
        <QueryClientProvider client={queryClient}>
          <Journey/>
        </QueryClientProvider>
      );
    }
export default App;