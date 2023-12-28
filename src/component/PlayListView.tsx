import { useQuery } from 'react-query';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {getAccessToken} from "./Token";
import axios from 'axios'

import {Skeleton, AspectRatio, Flex, Box, Image, Stack, Heading, Text} from '@chakra-ui/react';


interface Album {
  id: string;
  name: string;
  artists: Array<{
    name: string;
  }>;
  images: Array<{
    url: string;
  }>;  
}

interface PlayList{
  album: Album;
  name: string;
}

interface Props {
  id: string;
}


const fetchPlaylists = async (query: Props) => {

  try {
    getAccessToken();
    const token = window.localStorage.getItem('token');
    console.log(token);
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${query.id}`, {
      params: {
        sort: 'popularity',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error fetching data from Spotify API:', error);
    throw error;
  }
};

const PlayListView: React.FC<{ query: Props }> = ({ query }) => {

  const { data: playListResult, isLoading, isError } = useQuery(['playlists', query], () => fetchPlaylists(query));

  return (
    <>
      {isLoading ? (
        <AspectRatio ratio={1} flex="1" m={5}>
          <Skeleton w="100%" h="100%" />
        </AspectRatio>
      ) : isError ? (
        <Text color="red.500">Error fetching data from Spotify API</Text>
      ) : (
          <Box key={playListResult.id} p={5} pt={0} w={['100%', '50%', '33.33%', '25%']} flexShrink="0">
            <Link to= "/playList" state={{data: playListResult}}>
              <Image rounded='md' src={playListResult.images[0].url} alt="Album Cover" h="85%" objectFit="cover" />
            </Link>
            <Link to="/playList">
              <Text mt={3} noOfLines={1} fontSize="lg">{playListResult.name}</Text>
            </Link>
          </Box>
      )}
    </>
  );
};

export default PlayListView;