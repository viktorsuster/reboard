import React, { useEffect, useState, useRef } from 'react'
import {
  Box,
  Button,
  Center,
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
  useToast,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { createBoard, getBoards, removeBoard, updateBoard } from '../utils/api'
import { SimpleForm } from '../components'

const Boards = (onSubmit) => {
  const [boards, setBoards] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const [newBoardName, setNewBoardName] = useState('')
  const { colorMode, toggleColorMode } = useColorMode()
  const colorToggle = useColorModeValue('black', 'orange.400')
  const toast = useToast()

  const fetchData = async () => {
    const data = await getBoards()
    setBoards(data)
  }

  useEffect(() => {
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
              <DrawerHeader color={colorToggle}>Edit Boards</DrawerHeader>

              <DrawerBody>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box fontWeight="semibold" flex="1" textAlign="left">
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
                            fontWeight="normal"
                            color="red.400"
                            display="block"
                            mt="2"
                            key={board.id}
                            onClick={async () => {
                              switch (boards.length) {
                                case 1:
                                  await removeBoard(board.id)
                                  fetchData()
                                  toast({
                                    status: 'error',
                                    title: 'No boards',
                                    description: "Let's create a new board!",
                                    duration: 3000,
                                    isClosable: true,
                                  })
                                  onClose()
                                  break
                                default:
                                  await removeBoard(board.id)
                                  fetchData()
                                  toast({
                                    status: 'error',
                                    title: `Delete ${board.name}`,
                                    description: "Let's create a new board!",
                                    duration: 3000,
                                  })
                              }
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
                        <Box fontWeight="semibold" flex="1" textAlign="left">
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
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault()
                                  if (newBoardName !== '') {
                                    await onSubmit(newBoardName)
                                    setNewBoardName('')
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
                                <EditableInput
                                  key={board.id}
                                  type="text"
                                  value={newBoardName}
                                  onChange={(e) => {
                                    setNewBoardName(e.target.value)
                                  }}
                                />
                              </form>
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
                <Button onClick={toggleColorMode}>
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
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
              toast({
                status: 'success',
                title: 'Successfully',
                description: `Added board: (${value.toUpperCase()})`,
                duration: 3000,
              })
            }}
            onSubmit={async (newNameBoard) => {
              await updateBoard({ name: newNameBoard })
              fetchData()
            }}
          />
        </Box>
        <Text color="gray.400" mt="5">
          {boards.length} boards
        </Text>
        <SimpleGrid mt="10" spacingY="20px">
          {boards.map((board) => (
            <>
              <Tooltip hasArrow placement="top" label={`Open board: ${board.name}`} bg="blue.600">
                <Link key={board.id} to={String(board.id)}>
                  {board.name}
                </Link>
              </Tooltip>
            </>
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  )
}

export default Boards
