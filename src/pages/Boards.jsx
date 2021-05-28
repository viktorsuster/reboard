import * as React from 'react'
import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
} from '@chakra-ui/react'
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { createBoard, getBoards, removeBoard } from '../utils/api'
import { SimpleForm } from '../components'

const Boards = () => {
  const [boards, setBoards] = React.useState([])

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
            <MenuButton
              w="150px"
              as={Button}
              colorScheme="facebook"
              rightIcon={<ChevronDownIcon />}
            >
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
          <SimpleForm
            buttonText="Add"
            inputPlaceholder="Name of the new board..."
            onFormSubmit={async (value) => {
              await createBoard(value)
              fetchData()
            }}
          />
        </Box>
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
