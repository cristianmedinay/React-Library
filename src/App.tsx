import { useState } from 'react'

import './App.css'
import Button from './components/Button'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostsList from './features/posts/PostsList';
import {About } from './views/About';
import {Home } from './views/Home';
import { Detalle } from './views/Detalle';

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Router>
        <Provider store={store}>
          
          <QueryClientProvider  client={queryClient}>
            <Routes>

           
              <Route
                path="/"
                element={
                  <>
                    <h1>{count}</h1>
                    <Button onClick={() => setCount(count + 1)}>Click me</Button>
                    <PostsList />
                  </>
                }
              />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/detalle" element={<Detalle />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
      </Router>
    </>
  )
}

export default App
