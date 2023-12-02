// SignInModal.tsx
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent pos="fixed" top="0" bottom="0" margin="auto" height="500px">
        <ModalHeader textAlign="center">Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {/* ID 입력창 */}
            <Input type="text" placeholder="Enter your ID" />

            {/* PW 입력창 */}
            <Input type="password" placeholder="Enter your password" />

            {/* 로그인 버튼 */}
            <Button colorScheme="blue">
              Login
            </Button>

            {/* 작은 텍스트 버튼들 */}
            <Stack direction="row" justify="space-between" fontSize="sm">
              <Text as="span" color="blue.500">
                Create Account
              </Text>
              <Text as="span" color="blue.500">
                Forgot Password
              </Text>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignInModal;
