import * as React from 'react'
import { Box, Center, SimpleGrid } from '@chakra-ui/react'
import { TaskGroup } from '../components/TaskGroup'
import { Task } from '../components/Task'

const Dashboard = () => {
  return (
    <Box h="100vh">
      <Center>
        <SimpleGrid mt="10" columns="4" spacingX="20px" spacingY="20px">
          <TaskGroup title="Backlog" color="blue.500">
            <Task name="Your first task" content="Your first task" />
          </TaskGroup>
          <TaskGroup title="Todo" color="orange.500" />
          <TaskGroup title="Doing" color="orange.500" />
          <TaskGroup title="Done" color="blue.500" />
        </SimpleGrid>
      </Center>
    </Box>
  )
}

export default Dashboard
