import { useQuery , useInfiniteQuery} from '@tanstack/react-query';

const fetchPostsPersonas = async ( {page=1}: {page?: number}) => {
  const res = await fetch(`https://randomuser.me/api/?results=10&seed=midudev&page=${page}`)
  .then(async res =>{
    if (!res.ok) throw new Error('Error al obtener los posts');
     return await  res.json();

  }).then(res => {
    const CurrentPage = Number(res.info.page);
    const nextCursor = CurrentPage > 3 ? undefined : CurrentPage + 1
      return {
      users: res.results,
      nextCursor
      }
  });
  return res;

};

export const usePostsPersonas = () => {

  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => fetchPostsPersonas({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor ? lastPage.nextCursor + 1 : undefined

    
  });

  

};