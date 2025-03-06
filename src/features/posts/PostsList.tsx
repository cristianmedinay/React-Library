/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePosts } from '../../api/postsApi';
import { usePostStore } from '../../store/zustandStore';
import { useDispatch,useSelector  } from 'react-redux';
import { setPosts, increment } from './postsSlice';
import { useEffect } from 'react';

import InfiniteScroll from "react-infinite-scroll-component";
import { usePostsPersonas } from '../../api/postsPersonas';
const PostsList = () => {
  

  //const { selectedPostId } = usePostStore(); // Se re-renderiza cuando selectedPostId cambia

  //ZUSTAND
  const setSelectedPostId = usePostStore((state) => state.setSelectedPostId);// No causa re-render
  const selectedPostId = usePostStore((state) => state.selectedPostId);



  useEffect(() => {
    console.log("Nuevo valor de selectedPostId:", selectedPostId);
  }, [selectedPostId]);

  const dispatch = useDispatch();
  //REDUX
  const { data, error:postsError, isLoading:postsLoading, fetchNextPage:fetchNextPostsPage, hasNextPage:hasNextPostsPage} = usePosts();
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
    fetchNextPage: fetchNextUserPage,
    hasNextPage: hasNextUserPage,
  } = usePostsPersonas();
  
 
  useEffect(() => {
    if (users) {
      dispatch(setPosts(users));
    }
  }, [users, dispatch]);

  const usersx = users?.pages?.flatMap((page: any) => page.users) ?? []

  
  //const pokes= data?.pages.reduce((prevMovies, pages )=> [...prevMovies, ...pages.results], []) ?? [];

  const pokes = data?.pages.flatMap((page: any) => page.results) ?? [];

  
  const value = useSelector((state) => state.posts.value); // ✅ Llamada incondicional al Hook

  if (usersError || usersLoading) return <p>Cargando...</p>; 
  if (postsLoading) return <p>Cargando...</p>; // ✅ Early return después de los Hooks
  if (postsError) return <p>Error al cargar los posts</p>;
  

  // Guardar en Redux para otra funcionalidad
  


  const handleIncrement = () => {
    dispatch(increment()); // ✅ Correcto: Despachar la acción increment
    
  };

 
  return (
    <div>
        <p>Valor: {value}</p>
        {/* <button onClick={handleIncrement}>Cargar más</button>
        <ul>
          {data.results.map((post: any) => (
              <li key={post.id} onClick={() => setSelectedPostId(post.id)}>
              {post.name}
            </li>
          ))
          
            }
        </ul> */}
    <ul>
      {
      usersx.map((post: any, index : number) => (
          <li key={index} >
            {post.name.first}
          </li>
      ))
      
        }
    </ul>
    {!usersLoading && !usersError && hasNextUserPage && <button onClick={() => fetchNextUserPage()}>Cargar más</button>}
    {<InfiniteScroll
      dataLength={pokes?.length}
      next={()=> fetchNextPostsPage()}
      hasMore={hasNextPostsPage}
      loader={<div> Cargando </div>}
    >
      <div className='container'>
        <div className='row'>
          {pokes &&
            pokes.map((post:any, index) =>  
            
            <li key={index} onClick={() => setSelectedPostId(index)}>
            {post.name}
            </li>
            
          )
          
          }
        </div>
      </div>
    </InfiniteScroll>}
    </div>
  );
};
// Hook personalizado para useDispatch con tipos
/* export const useAppDispatch = () => useDispatch<AppDispatch>();
// Hook personalizado para useSelector con tipos
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; */
export default PostsList;