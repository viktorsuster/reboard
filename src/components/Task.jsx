import * as React from 'react'
import {
  Box,
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const Task = ({ name, content, onSubmit }) => {
  const [newTaskName, setNewTaskName] = React.useState('')
  const colorToggleTask = useColorModeValue('white', 'gray.600')
  const toast = useToast()

  return (
    <Box p="3" h="max-content" backgroundColor={colorToggleTask} borderRadius="md" shadow="base">
      <Popover>
        <PopoverTrigger>
          <Button size="sm" float="right">
            Edit
          </Button>
        </PopoverTrigger>
        <Portal>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (newTaskName !== '') {
                await onSubmit(newTaskName)
                setNewTaskName('')
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
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Edit task</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Input type="text" value={name} disabled />
                <Input
                  autoFocus
                  type="text"
                  value={newTaskName}
                  onChange={(e) => {
                    setNewTaskName(e.target.value)
                  }}
                />
              </PopoverBody>
              <PopoverFooter>
                <Button type="submit" colorScheme="blue">
                  Edit
                </Button>
                <Button type="submit" ml="2" colorScheme="blue">
                  Delete
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </form>
        </Portal>
      </Popover>
      <Text>{name}</Text>
      <Text>{content}</Text>
    </Box>
  )
}
Task.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}
