import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Center, SimpleGrid } from '@chakra-ui/react'
import { TaskGroup } from '../components/TaskGroup'
import { Task } from '../components/Task'
import { getBoard, createTaskGroup } from '../utils/api'
import { SimpleForm } from '../components'

const Board = () => {
  const { id } = useParams()
  const [board, setBoard] = React.useState({})

  const fetchData = React.useCallback(async () => {
    const data = await getBoard(id)
    setBoard(data)
  }, [id])

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
              await createTaskGroup(Number(id), value)
              fetchData()
            }}
          />
          <Center>
            <SimpleGrid mt="10" columns="2" spacingX="20px" spacingY="20px">
              {
                // eslint-disable-next-line no-shadow
                board.taskGroups?.map(({ name, id, taskIds }) => (
                  <TaskGroup key={id} title={name} color="blue.500">
                    {board.tasks
                      ?.filter((tasks) => taskIds.includes(tasks.id))
                      // eslint-disable-next-line no-shadow
                      .map(({ id, name, content }) => (
                        <Task key={id} title={name} content={content} />
                      ))}
                    <SimpleForm
                      buttonText="Add task"
                      inputPlaceholder="Task name"
                      onFormSubmit={async (value) => value}
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
