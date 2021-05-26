import * as React from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from '@chakra-ui/react'

export const SimpleForm = ({ onFormSubmit, buttonText, inputPlaceholder }) => {
  const [value, setValue] = React.useState('')
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await onFormSubmit(value)
        setValue('')
      }}
    >
      <Input
        colorScheme="facebook"
        variant="outline"
        width="50vw"
        ml="3"
        mr="3"
        placeholder={inputPlaceholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <Button mb="1" colorScheme="facebook" type="submit">
        {buttonText}
      </Button>
    </form>
  )
}

SimpleForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
}
