import React from 'react';
import {Link} from 'react-router-dom'
import { Text, Button, Stack, useColorMode, useColorModeValue, Flex, Box } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

interface NavProps {
  openSignInModal: () => void;
}

const Nav: React.FC<NavProps> = ({ openSignInModal }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={8} >
      <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
        <Link to="/">
          <Text fontSize={'lg'} as="b">김재즈의 뮤직박스</Text>
        </Link>
        <Stack alignItems="center">
          <Stack direction={'row'} spacing={7} align="center">
            <Button size="lg" onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button size="lg" fontFamily={'Georgia'} fontSize={'lg'} fontWeight={400} onClick={openSignInModal} cursor="pointer">
              Sign In
            </Button>
            {/* ... (다른 버튼 등 추가) */}
          </Stack>
          {/* ... (다른 코드 및 메뉴 등 추가) */}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Nav;