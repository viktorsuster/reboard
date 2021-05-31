import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react'
import { TaskGroup } from '../components/TaskGroup'
import { Task } from '../components/Task'
import { getBoard, createTaskGroup, createTask, removeTaskGroup } from '../utils/api'
import { SimpleForm } from '../components'

const Board = () => {
  const { id: boardID } = useParams()
  const [board, setBoard] = React.useState({})

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
        <Box>
          <SimpleForm
            buttonText="Add task group"
            inputPlaceholder="Name of the new task group..."
            onFormSubmit={async (value) => {
              await createTaskGroup(Number(boardID), value)
              fetchData()
            }}
          />
          <Text color="gray.400" mt="5">
            {boardID.length} groups
          </Text>
          <Center>
            <SimpleGrid mt="10" columns="2" spacingX="20px" spacingY="20px">
              {
                // eslint-disable-next-line no-shadow
                board.taskGroups?.map(({ name: newName, id: taskGroupID, taskIds }) => (
                  <TaskGroup
                    key={taskGroupID}
                    title={newName}
                    color="blue.500"
                    onDelete={async () => {
                      await removeTaskGroup(taskGroupID)
                      fetchData()
                    }}
                  >
                    {board.tasks
                      ?.filter((tasks) => taskIds.includes(tasks.id))
                      // eslint-disable-next-line no-shadow
                      .map(({ id, name, content }) => (
                        <Task key={id} name={name} content={content} />
                      ))}
                    <SimpleForm
                      buttonText="Add"
                      inputPlaceholder="Task name"
                      onFormSubmit={async (value) => {
                        await createTask(Number(boardID), Number(taskGroupID), { name: value })
                        fetchData()
                      }}
                    />
                  </TaskGroup>
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
