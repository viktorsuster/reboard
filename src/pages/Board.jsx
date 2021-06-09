import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Center, SimpleGrid, Text, useToast } from '@chakra-ui/react'
import { TaskGroup } from '../components/TaskGroup'
import { Task } from '../components/Task'
import {
  getBoard,
  createTaskGroup,
  createTask,
  removeTaskGroup,
  updateTaskGroup,
  updateTask,
  updateBoard,
} from '../utils/api'
import { SimpleForm } from '../components'

const Board = () => {
  const { id: boardID } = useParams()
  const [board, setBoard] = React.useState({})
  const toast = useToast()

  const fetchData = React.useCallback(async () => {
    const data = await getBoard(boardID)
    setBoard(data)
  }, [boardID])

  React.useEffect(() => {
    try {
      fetchData()
    } catch (e) {
      // do nothing
    }
  }, [fetchData])

  return (
    <Box h="100vh">
      <Center>
        <Box mt="10">
          <SimpleForm
            buttonText="Add task group"
            inputPlaceholder="Name of the new task group..."
            onFormSubmit={async (value) => {
              await createTaskGroup(Number(boardID), value)
              fetchData()
              toast({
                status: 'success',
                title: 'Successfully',
                description: `Added task group: (${value.toUpperCase()})`,
                duration: 3000,
              })
            }}
            onSubmit={async (newBoardName) => {
              await updateBoard(Number(boardID), { name: newBoardName })
              fetchData()
            }}
          />
          <Center>
            <SimpleGrid mt="10" columns="4" spacingX="20px" spacingY="20px">
              {
                // eslint-disable-next-line no-shadow
                board.taskGroups?.map(({ name: newName, id: taskGroupID, taskIds }) => (
                  <>
                    <Text fontWeight="thin" color="gray.400" position="absolute" mt="-35">
                      {board.taskGroups.length} groups
                    </Text>
                    <TaskGroup
                      key={taskGroupID}
                      title={newName}
                      color="blue.500"
                      onDelete={async () => {
                        await removeTaskGroup(taskGroupID)
                        fetchData()
                        toast({
                          status: 'error',
                          title: `Delete group: ${newName.toUpperCase()}`,
                          description: "Let's create a new group!",
                          duration: 3000,
                        })
                      }}
                      onSubmit={async (newTaskGroupName) => {
                        await updateTaskGroup(taskGroupID, { name: newTaskGroupName })
                        fetchData()
                        toast({
                          status: 'success',
                          title: 'Successfully',
                          description: `Edit group name from (${newName.toUpperCase()}) to (${newTaskGroupName.toUpperCase()})`,
                          duration: 3000,
                        })
                      }}
                    >
                      {board.tasks
                        ?.filter((tasks) => taskIds.includes(tasks.id))
                        // eslint-disable-next-line no-shadow
                        .map(({ id: taskID, name, content }) => (
                          <Task key={taskID} name={name} content={content} />
                        ))}

                      <Text color="gray.400" mt="5">
                        {taskIds.length} tasks
                      </Text>
                      <SimpleForm
                        buttonText="Add"
                        inputPlaceholder="Task name"
                        onFormSubmit={async (value) => {
                          await createTask(Number(boardID), Number(taskGroupID), { name: value })
                          fetchData()
                          toast({
                            status: 'success',
                            title: 'Successfully',
                            description: `Added task: (${value.toUpperCase()})`,
                            duration: 3000,
                          })
                        }}
                        onSubmit={async (newTaskName) => {
                          await updateTask(taskIds, { name: newTaskName })
                          fetchData()
                        }}
                      />
                    </TaskGroup>
                  </>
                ))
              }
            </SimpleGrid>
          </Center>
        </Box>
      </Center>
    </Box>
  )
}

export default Board
