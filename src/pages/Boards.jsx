import * as React from 'react'
import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  useToast,
  MenuList,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  ModalBody,
  Input,
  ModalFooter,
} from '@chakra-ui/react'
import { ChevronDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { createBoard, getBoards, removeBoard } from '../utils/api'
import { SimpleForm } from '../components'

const Boards = () => {
  const [boards, setBoards] = React.useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  if (!boards.length) {
    toast({
      status: 'error',
      title: 'No boards',
      description: "Let's create a new board!",
    })
  }

  const fetchData = async () => {
    const data = await getBoards()
    setBoards(data)
  }

  React.useEffect(() => {
    try {
      fetchData()
    } catch (e) {
      // do nothing
    }
  }, [])

  return (
    <Box>
      <Center display="block" textAlign="center">
        <Box display="inline-list-item" mt="10">
          <Menu>
            <MenuButton as={Button} colorScheme="facebook" mr="1" rightIcon={<ChevronDownIcon />}>
              Delete board
            </MenuButton>
            <MenuList>
              {boards.map((board) => (
                <MenuItem
                  key={board.id}
                  onClick={async () => {
                    await removeBoard(board.id)
                    fetchData()
                  }}
                >
                  <DeleteIcon mr="15" />
                  {board.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} colorScheme="facebook" mr="1" rightIcon={<ChevronDownIcon />}>
              Edit board
            </MenuButton>
            <MenuList>
              {boards.map((board) => (
                <MenuItem onClick={onOpen} key={board.id}>
                  <EditIcon mr="15" />
                  {board.name}
                </MenuItem>
              ))}
            </MenuList>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit board name</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Change list name</Text>
                  <form>
                    <Input type="text" value="board name" autoFocus />
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Edit</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Menu>
          <SimpleForm
            buttonText="Add"
            inputPlaceholder="Name of the new board..."
            onFormSubmit={async (value) => {
              await createBoard(value)
              fetchData()
            }}
          />
        </Box>
        <Text color="gray.400" mt="5">
          {boards.length} boards
        </Text>
        <SimpleGrid mt="10" spacingY="20px">
          {boards.map((board) => (
            <Link key={board.id} to={String(board.id)}>
              {board.name}
            </Link>
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  )
}

export default Boards
