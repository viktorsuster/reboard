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

export const Task = ({ name, content, editTask }) => {
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
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Edit {name}</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Input type="text" placeholder="New task name ..." />
            </PopoverBody>
            <PopoverFooter>
              <Button colorScheme="blue">Edit</Button>
            </PopoverFooter>
          </PopoverContent>
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
}
