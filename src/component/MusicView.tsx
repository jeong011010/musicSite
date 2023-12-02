import {useQuery, QueryKey} from 'react-query';

interface MusicResult {
  trackId: number;
  trackName: string;
}

interface MusicData {
  results: MusicResult[];
}

interface CategoryProps {
  Item: {
    name: string;
    link: string;
  };
}

export default function MusicView({ Item }: CategoryProps) {

  const { data, isLoading, error } = useQuery<MusicData, Error>(
    ['musicData', Item.name as QueryKey],
    () =>
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(Item.name)}`).then((res) => res.json())
  );


  if(isLoading){
    return <div>Loading...</div>;
  }

  if(error){
    return <div>Error: {error.message}</div>
  }

  
  return(
    <div>
      {data?.results.map((result) => (
        <div key={result.trackId}>{result.trackName}</div>
      ))}
    </div>
  )
}