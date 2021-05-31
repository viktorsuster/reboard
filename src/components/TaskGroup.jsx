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
  Input,
  IconButton,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { MdEdit } from 'react-icons/md'

export const TaskGroup = ({ title, color, children, onDelete, onSubmit }) => {
  const [newName, setNewName] = React.useState('')
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
            <MenuButton float="right">
              <IconButton
                as={Button}
                aria-label="Edit"
                size="md"
                variant="unstyled"
                colorScheme="white"
                ml="5px"
                icon={<MdEdit />}
              />
            </MenuButton>
            <MenuList>
              <MenuItem color="black" fontSize="xs" onClick={onOpen}>
                <EditIcon mr="3" /> Edit
              </MenuItem>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit {title}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>Change list name</Text>
                    <form>
                      <Input
                        type="text"
                        value={title}
                        onChange={(e) => setNewName(e.target.value)}
                        autoFocus
                      />
                    </form>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onSubmit(newName)
                        setNewName('')
                      }}
                    >
                      Edit
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <MenuItem color="black" fontSize="xs" onClick={onDelete}>
                <DeleteIcon mr="3" /> Delete
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
  onSubmit: PropTypes.func.isRequired,
}
