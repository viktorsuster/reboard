import * as React from 'react'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { EditIcon } from '@chakra-ui/icons'

export const TaskGroup = ({ title, color, children, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      tabIndex={-1}
      aria-label="Focus moved to this box"
      p="3"
      w="250px"
      h="max-content"
      borderRadius="md"
      shadow="base"
    >
      <Box borderRadius="md">
        <Text
          p="7"
          backgroundColor={color}
          borderRadius="md"
          textAlign="center"
          color="white"
          fontSize="2xl"
          fontWeight="bold"
          mb="2"
        >
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              display="block"
              float="right"
              rightIcon={<EditIcon />}
            />
            <MenuList>
              <MenuItem color="black" fontSize="xs" onClick={onOpen}>
                Edit
              </MenuItem>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>vwniovonogf</Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <MenuItem color="black" fontSize="xs" onClick={onDelete}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
          {title}
        </Text>
        <VStack alignItems="stretch" spacing="2">
          {children}
        </VStack>
      </Box>
    </Box>
  )
}

TaskGroup.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  onDelete: PropTypes.func.isRequired,
}
