import PlayListView from "./PlayListView";

import {Skeleton, AspectRatio, Flex, Box, Image, Stack, Heading, Text} from '@chakra-ui/react';

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

interface ids{
  id: string;
}

interface Props {
  title: string;
  playListId: string[];
}


const PlayLists: React.FC<{ query: Props }> = ({ query }) => {

  return (
    <Box py={5} >
      <Stack>
        <Heading>
          {query.title}
          <ChevronRightIcon viewBox="0,2,24,24"/>
        </Heading>
        <Flex overflowX='auto'
          sx={{
            '&::-webkit-scrollbar': {
              borderRadius: '8px',
              backgroundColor: `rgba(0, 0, 0, 0.1)`,
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '8px',
              backgroundColor: `rgba(0, 0, 0, 0.5)`,
            },
          }}>
          {query.playListId?.map((id) => (
            <PlayListView key={id} query={{ id }} />
          ))}
        </Flex>
      </Stack>
    </Box>
  );
};

export default PlayLists;