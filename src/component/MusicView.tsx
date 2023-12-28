import { useQuery } from 'react-query';
import {useState} from 'react';
import {getAccessToken} from "./Token";
import axios from 'axios'

import {Skeleton, AspectRatio, Flex, Box, Image, Stack, Heading, Text, SimpleGrid} from '@chakra-ui/react';

import {ChevronRightIcon} from '@chakra-ui/icons'


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

interface Track{
  album: Album;
  external_urls: {spotify:string};
  name: string;
}

interface Tracks {
  track: Track;
}
//https://stackoverflow.com/questions/42130591/most-popular-tracks-list-using-the-spotify-api

interface Props {
  limit: number;
  title: string;
  id: string;
}


const fetchPlaylists = async (query: Props) => {
  
  try {
    getAccessToken();
    const token = window.localStorage.getItem('token');
    console.log(token);
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${query.id}`, {
      params: {
        limit: query.limit,
        sort: 'popularity',
        
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log(response.data.tracks.items);

    const data = response.data.tracks.items.slice(0,query.limit);
  
    return data;
  } catch (error) {
    console.error('Error fetching data from Spotify API:', error);
    throw error;
  }
};

const MusicView: React.FC<{ query: Props }> = ({ query }) => {


  function linkTo(url: string) {
    window.location.href = url;
  }
  
  const { data: playListResult, isLoading, isError } = useQuery(['playlists', query], () => fetchPlaylists(query));

  return (
    <Box py={5}>
      {isLoading ? (
      <Stack>
        <Skeleton h="50px" w="300px" />
        <Flex w="100%" justify="space-between">
          {Array(5).fill(null).map((_, index) => (
            <AspectRatio key={index} ratio={1} flex="1" m={5}>
              <Skeleton w="100%" h="100%" />
            </AspectRatio>
          ))}
        </Flex>
      </Stack>
      ) : isError ? (
      <Text color="red.500">Error fetching data from Spotify API</Text>
      ) : (
        <Stack>
          <Heading>
            {query.title}
            <ChevronRightIcon viewBox="0,2,24,24"/>
          </Heading>
          <SimpleGrid minChildWidth="200px" gridTemplateRows="repeat(4, 1fr)" gridTemplateColumns="repeat(4, 1fr)" alignItems="center">
            {playListResult?.map((track: Tracks) => (
              <Box key={track.track.album.id}>
                <Flex px={6} flexShrink="0" alignItems="center">
                  <Image rounded="md" src={track.track.album.images[0].url} alt="Album Cover" maxH="40px" onClick={()=>linkTo(track.track.external_urls.spotify)} cursor={"pointer"}/>
                  <Box ml={3}>
                    <Text noOfLines={1} fontSize="md" onClick={()=>linkTo(track.track.external_urls.spotify)} cursor={"pointer"}>{track.track.name}</Text>
                    <Text noOfLines={1} color="gray" fontSize="sm">{track.track.album.artists[0].name}</Text>
                  </Box>
                </Flex>
                <Box borderBottom="1px" borderColor="gray.300" my={1} ml={3} mr={3}></Box>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      )}
    </Box>
  );
};

export default MusicView;