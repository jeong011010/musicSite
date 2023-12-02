// MainLayout.tsx
import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Nav from './Nav';
import SignInModal from './SignIn';

type PageProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<PageProps> = (props) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <>
      <Nav openSignInModal={openSignInModal} />
      <Box p={4}>{props.children}</Box>

      {/* SignIn 모달 */}
      <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} />
    </>
  );
};

export default MainLayout;
