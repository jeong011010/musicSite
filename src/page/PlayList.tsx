import { Box, Stack, Flex, Text, Image, Button } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import { useState } from "react"

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

export default function PlayList() {

  function linkTo(url: string) {
    window.location.href = url;
  }
  const location = useLocation();
  const receivedData = location.state?.data || null;

  const [data, setData] = useState(receivedData);
  console.log(data);
  return (
    <Box>
      <Stack>
        <Flex justify="center">
            <Box p={5} pt={10} maxW="400px" w="50%">
              <Image ml="auto" mr="auto" rounded="md" src={data.images[0].url} alt="Album Cover" h="100%" objectFit="cover" />
            </Box>
            
        </Flex>
        <Text m={0} textAlign="center" fontSize="2xl" fontWeight="bold" mt={5}>{data.name}</Text>
        <Text marginTop={0} textAlign="center" fontSize="lg" color={"gray"} mb={5}>{data.description}</Text>
        <Flex justify="center">
          <Button colorScheme='blackAlpha' mb={10} minW={340} onClick={()=>linkTo(data.external_urls.spotify)}>지금 듣기</Button>
        </Flex>
        <Stack align="center">
          {data.tracks.items?.map((track: Tracks) => (
            <Box key={track.track.album.id} minW="1000px" mx="auto">
              <Flex px={6} flexShrink="0" alignItems="center">
                <Image rounded="md" src={track.track.album.images[0].url} alt="Album Cover" maxH="70px" onClick={()=>linkTo(track.track.external_urls.spotify)} cursor={"pointer"}/>
                <Box ml={3}>
                  <Text noOfLines={1} fontSize="md" onClick={()=>linkTo(track.track.external_urls.spotify)} cursor={"pointer"}>{track.track.name}</Text>
                  <Text noOfLines={1} color="gray" fontSize="sm">{track.track.album.artists[0].name}</Text>
                </Box>
              </Flex>
              <Box borderBottom="1px" borderColor="gray.300" my={1} ml={3} mr={3}></Box>
            </Box>
          ))}
        </Stack>

      </Stack>
    </Box>
  );
}