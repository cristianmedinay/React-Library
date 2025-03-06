/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePosts } from '../../api/postsApi';
import { usePostStore } from '../../store/zustandStore';
import { useDispatch,useSelector  } from 'react-redux';
import { setPosts, increment } from './postsSlice';
import { useEffect } from 'react';

const PostsList = () => {
  

  //const { selectedPostId } = usePostStore(); // Se re-renderiza cuando selectedPostId cambia

  //ZUSTAND
  const setSelectedPostId = usePostStore((state) => state.setSelectedPostId);// No causa re-render
  const selectedPostId = usePostStore((state) => state.selectedPostId);

  
  useEffect(() => {
    console.log("Nuevo valor de selectedPostId:", selectedPostId);
  }, [selectedPostId]);


  //REDUX
  const { data, error, isLoading } = usePosts();
  const dispatch = useDispatch();



  const value = useSelector((state) => state.posts.value); // ✅ Llamada incondicional al Hook

  if (isLoading) return <p>Cargando...</p>; // ✅ Early return después de los Hooks
  if (error) return <p>Error al cargar los posts</p>;
  

  // Guardar en Redux para otra funcionalidad
  dispatch(setPosts(data));
  const handleIncrement = () => {
    dispatch(increment()); // ✅ Correcto: Despachar la acción increment
    
  };

 
  return (
    <div>
        <p>Valor: {value}</p>
        <button onClick={handleIncrement}>Cargar más</button>
    <ul>
      {data.map((post: any) => (
          <li key={post.id} onClick={() => setSelectedPostId(post.id)}>
          {post.title}
        </li>
      ))}
    </ul>
    </div>
  );
};
// Hook personalizado para useDispatch con tipos
/* export const useAppDispatch = () => useDispatch<AppDispatch>();
// Hook personalizado para useSelector con tipos
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; */
export default PostsList;