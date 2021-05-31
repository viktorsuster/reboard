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
  useToast,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const Task = ({ name, content, editTask, onSubmit }) => {
  const [newTaskName, setNewTaskName] = React.useState('')
  const toast = useToast()

  if (!name.length) {
    toast({
      status: 'error',
      title: 'Oi! Something went wrong!',
      description: 'We will fix the problem as soon as possible.',
    })
  }

  return (
    <Box p="3" h="max-content" borderRadius="md" shadow="base">
      <Popover>
        <PopoverTrigger>
          <Button onClick={editTask} size="sm" float="right">
            Edit
          </Button>
        </PopoverTrigger>
        <Portal>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit(newTaskName)
              setNewTaskName('')
            }}
          >
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Edit task</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Input type="text" value={name} disabled />
                <Input
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
  editTask: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
