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
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { MdEdit } from 'react-icons/md'

export const TaskGroup = ({ title, color, children, onDelete, onSubmit }) => {
  const [newName, setNewName] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const colorToggle = useColorModeValue('black', 'white')
  const colorToggleGroup = useColorModeValue('white', 'gray.900')
  const toast = useToast()
  return (
    <>
      <Box
        backgroundColor={colorToggleGroup}
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
                <MenuItem color={colorToggle} fontSize="xs" onClick={onOpen}>
                  <EditIcon mr="3" /> Edit
                </MenuItem>
                <MenuItem color={colorToggle} fontSize="xs" onClick={onDelete}>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {title}</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (newName !== '') {
                await onSubmit(newName)
                setNewName('')
                onClose()
              } else {
                toast({
                  title: 'Empty',
                  description: 'You must enter text',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                })
              }
            }}
          >
            <ModalBody>
              <Text>Change list name</Text>
              <Input type="text" value={title} disabled />
              <Input
                autoFocus
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value)
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="submit">
                Edit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

TaskGroup.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
