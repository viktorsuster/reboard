import * as React from 'react'
import { Box, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const Task = ({ name, content }) => {
  return (
    <Box p="3" h="max-content" borderRadius="md" shadow="base">
      <Text>{name}</Text>
      <Text>{content}</Text>
    </Box>
  )
}
Task.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
}
