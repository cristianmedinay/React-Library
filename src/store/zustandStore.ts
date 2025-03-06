import { create, SetState } from 'zustand';

type PostState = {
  selectedPostId: number | null;
  setSelectedPostId: (id: number | null) => void;
};


const createPostSlice = (set: SetState<PostState>): PostState => ({

  selectedPostId: null,
    setSelectedPostId: (id) => set({ selectedPostId: id }),
});


export const usePostStore = create<PostState>((set) => ({

  ...createPostSlice(set),
  
}));

/* 
type Post = {
  id: number;
  title: string;
  body: string;
};

 type PostStore = {
    posts: Post[];  // Lista de posts
    selectedPostId: number | null;  // ID del post seleccionado
    isLoading: boolean; // Estado de carga
    error: string | null; // Manejo de errores
    fetchAllPosts: () => Promise<void>; // Función para obtener posts
    setSelectedPostId: (id: number | null) => void; // Seleccionar un post
  };
  
  const usePostStore = create<PostStore>((set) => ({
    posts: [],
    selectedPostId: null,
    isLoading: false,
    error: null,
  
    // Función para obtener los posts desde la API
    fetchAllPosts: async () => {
      set({ isLoading: true, error: null }); // Indicamos que está cargando
      try {
        const posts = await fetchPosts(); // Llamamos a la API
        set({ posts, isLoading: false });
      } catch (err) {
        set({ error: "Error al obtener posts", isLoading: false });
      }
    }, */