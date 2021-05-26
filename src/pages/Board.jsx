import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Center, Input, SimpleGrid } from '@chakra-ui/react'
import { TaskGroup } from '../components/TaskGroup'
import { Task } from '../components/Task'
import { getBoard, createTaskGroup } from '../utils/api'

const Board = () => {
  const { id } = useParams()
  const [board, setBoard] = React.useState({})
  const [taskGroupName, setTaskGroupName] = React.useState('')

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
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await createTaskGroup(Number(id), taskGroupName)
              setTaskGroupName('')
              fetchData()
            }}
          >
            <Input
              colorScheme="facebook"
              variant="outline"
              width="50vw"
              ml="3"
              mr="3"
              placeholder="Name of the new task group..."
              value={taskGroupName}
              onChange={(e) => {
                setTaskGroupName(e.target.value)
              }}
            />
            <Button mb="1" colorScheme="facebook" type="submit">
              Add task group
            </Button>
          </form>
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
