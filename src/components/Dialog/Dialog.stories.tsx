import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button, Gap, Dialog, DialogProvider, useDialog } from '../../internal'

export default {
  title: 'Input/Dialog',
  component: Dialog,
  decorators: [(Story) => (
    <DialogProvider>
      <Story />
      <Dialog />
    </DialogProvider>
  )],
} as ComponentMeta<typeof Dialog>


const UseDialogTemplate: ComponentStory<typeof Dialog> = () => {
  const { openDialog } = useDialog()
  const [response, setResponse] = useState<string | boolean | null>('')

  return (
    <Gap>
      <Button onClick={() => openDialog({
        mode: 'alert',
        message: 'This is an alert!',
        callback: (result) => setResponse(result)
      })}>
        Open Alert Dialog
      </Button>
      <p>{response !== null ? `Alert response: ${response}` : ''}</p>

      <Button onClick={() => openDialog({
        mode: 'confirm',
        message: 'Are you sure you want to proceed?',
        callback: (result) => setResponse(result)
      })}>
        Open Confirm Dialog
      </Button>
      <p>{response !== null ? `Confirm response: ${response}` : ''}</p>

      <Button onClick={() => openDialog({
        mode: 'prompt',
        message: 'Please enter your name:',
        placeholder: 'Name',
        callback: (result) => setResponse(result)
      })}>
        Open Prompt Dialog
      </Button>
      <p>{response !== null ? `Prompt response: ${response}` : ''}</p>
    </Gap>
  )
}

export const UseDialog = UseDialogTemplate.bind({})