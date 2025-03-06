import { useQuery , useInfiniteQuery} from '@tanstack/react-query';

const fetchPosts = async ( {offset}: {offset: string}) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`);
  if (!res.ok) throw new Error('Error al obtener los posts');
  const data =  res.json();
  return data;
};

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async (data) => {
      console.log(data)
      const {pageParam} = data

      const response = await fetchPosts({offset: pageParam});
      return response
    },
    initialPageParam: "0",
    getNextPageParam: (lastPage, allPages) => 

      //new URL(lastPage.next).searchParams.get('offset')
      
         lastPage.next ? new URL(lastPage.next).searchParams.get('offset') : null,
    //staleTime: 1000 * 60 * 5, // 5 minutos en caché
  });

  

};