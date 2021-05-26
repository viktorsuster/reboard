import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Center, SimpleGrid } from '@chakra-ui/react'
import { TaskGroup } from '../components/TaskGroup'
import { Task } from '../components/Task'
import { getBoard } from '../utils/api'

const Board = () => {
  const { id } = useParams()
  const [board, setBoard] = React.useState({})

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoard(id)
        setBoard(data)
      }
      fetchData()
    } catch (e) {
      // do nothing
    }
  }, [id])

  return (
    <Box h="100vh">
      <Center>
        <Box>
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
