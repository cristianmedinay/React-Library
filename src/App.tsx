import { useState } from 'react'

import './App.css'
import Button from './components/Button'
import { Provider } from 'react-redux';
import { store } from './store/store';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostsList from './features/posts/PostsList';


const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
    <Provider store={store}>
      
        <QueryClientProvider  client={queryClient}>
          <h1>{count}</h1>
          <Button onClick={() => setCount(count + 1)} >Click me</Button>
          <PostsList />

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </Provider>
    </>
  )
}

export default App
