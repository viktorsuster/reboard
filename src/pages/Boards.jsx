import * as React from 'react'
import {
  Box,
  Button,
  Center,
  useToast,
  SimpleGrid,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  ListItem,
  UnorderedList,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { createBoard, getBoards, removeBoard } from '../utils/api'
import { SimpleForm } from '../components'

const Boards = () => {
  const [boards, setBoards] = React.useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const toast = useToast()

  if (!boards.length) {
    toast({
      status: 'error',
      title: 'No boards',
      description: "Let's create a new board!",
      duration: 3000,
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
          <Button ref={btnRef} colorScheme="facebook" mr="1" onClick={onOpen}>
            Edit
          </Button>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Edit Boards</DrawerHeader>

              <DrawerBody>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Delete board
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <UnorderedList>
                        {boards.map((board) => (
                          <ListItem
                            as="button"
                            fontWeight="semibold"
                            display="block"
                            mt="2"
                            key={board.id}
                            onClick={async () => {
                              await removeBoard(board.id)
                              fetchData()
                            }}
                          >
                            <DeleteIcon mr="3" />
                            {board.name}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Edit board
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <UnorderedList>
                        {boards.map((board) => (
                          <>
                            <Editable defaultValue={board.name}>
                              <EditIcon mr="3" />
                              <EditablePreview />
                              <EditableInput />
                            </Editable>
                          </>
                        ))}
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
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
