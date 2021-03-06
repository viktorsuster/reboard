import * as React from 'react'
import PropTypes from 'prop-types'
import { Button, HStack, Input, Tooltip, useToast } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export const SimpleForm = ({ onFormSubmit, buttonText, inputPlaceholder }) => {
  const [value, setValue] = React.useState('')
  const toast = useToast()
  return (
    <HStack
      as="form"
      onSubmit={async (e) => {
        e.preventDefault()
        if (value !== '') {
          await onFormSubmit(value)
          setValue('')
        } else {
          toast({
            title: 'Empty',
            description: 'You must enter text',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }}
    >
      <Tooltip
        hasArrow
        placement="top-start"
        label="Start typing here"
        bg="blue.600"
        openDelay={1000}
      >
        <Input
          colorScheme="facebook"
          variant="outline"
          width="full"
          placeholder={inputPlaceholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
      </Tooltip>
      <Button leftIcon={<AddIcon />} colorScheme="facebook" type="submit" flex="none">
        {buttonText}
      </Button>
    </HStack>
  )
}

SimpleForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
}
