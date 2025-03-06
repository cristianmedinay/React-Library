import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
  if (!res.ok) throw new Error('Error al obtener los posts');
  return res.json();
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    //staleTime: 1000 * 60 * 5, // 5 minutos en caché
  });
};