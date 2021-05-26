import * as React from 'react'
import { Box, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

export const TaskGroup = ({ title, color, children }) => {
  return (
    <Box p="3" w="250px" h="max-content" borderRadius="md" shadow="base">
      <Box borderRadius="md" shadow="base">
        <Text
          p="7"
          backgroundColor={color}
          borderTopRadius="md"
          textAlign="center"
          color="white"
          fontSize="2xl"
          fontWeight="bold"
        >
          {title}
        </Text>
        {children}
        {/* <Link to={linkTo}>More</Link> */}
      </Box>
    </Box>
  )
}
TaskGroup.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
}
