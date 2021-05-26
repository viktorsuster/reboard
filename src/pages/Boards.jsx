import * as React from 'react'
import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Input,
  SimpleGrid,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { getBoards } from '../utils/api'

const Boards = () => {
  const [boards, setBoards] = React.useState([])

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoards()
        setBoards(data)
      }
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
              Boards
            </MenuButton>
            <MenuList>
              {boards.map((board) => (
                <MenuItem key={board.id}>
                  <Link to={String(board.id)}>{board.name}</Link>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <form>
            <Input
              colorScheme="facebook"
              variant="outline"
              width="50vw"
              ml="3"
              mr="3"
              placeholder="Name of the new board..."
            />
            <Button mb="1" colorScheme="facebook" type="submit">
              Add
            </Button>
          </form>
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
