import * as React from 'react'
import PropTypes from 'prop-types'
import { Button, HStack, Input } from '@chakra-ui/react'

export const SimpleForm = ({ onFormSubmit, buttonText, inputPlaceholder }) => {
  const [value, setValue] = React.useState('')
  return (
    <HStack
      as="form"
      onSubmit={async (e) => {
        e.preventDefault()
        if (value !== '') {
          await onFormSubmit(value)
          setValue('')
        }
      }}
    >
      <Input
        colorScheme="facebook"
        variant="outline"
        placeholder={inputPlaceholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <Button colorScheme="facebook" type="submit" flex="none">
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
