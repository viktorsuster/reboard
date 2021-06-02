import * as React from 'react'
import PropTypes from 'prop-types'
import { Text, Icon, Input, Tooltip } from '@chakra-ui/react'
import { HiUserGroup } from 'react-icons/hi'

const BrandLogo = ({ size = '3xl' }) => {
  return (
    <>
      <Text as="a" href="/" fontSize={size} fontWeight="bold" lineHeight="1">
        <Icon as={HiUserGroup} color="blue.400" mb={2} mr={2} />
        reBoard
      </Text>
      <Tooltip hasArrow placement="auto-start" label="Search tasks" bg="blue.600">
        <Input type="text" placeholder="Search ..." w="40vw" color="black" variant="filled" />
      </Tooltip>
    </>
  )
}

BrandLogo.propTypes = {
  size: PropTypes.string,
}

export { BrandLogo }
