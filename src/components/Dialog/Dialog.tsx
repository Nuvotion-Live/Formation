import React, { useState, createContext, useContext, useRef, useEffect, Children } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Gap, Button, TextInput, Break, Fit } from '../../internal'

interface DialogConfig {
  mode: 'alert' | 'confirm' | 'prompt'
  message?: string
  children?: React.ReactNode
  callback?: (value: boolean | string | null) => void
  placeholder?: string
}

interface DialogContextType {
  isOpen: boolean
  config?: DialogConfig
  openDialog: (config: DialogConfig) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType>({
  isOpen: false,
  openDialog: () => {},
  closeDialog: () => {},
})

export const useDialog = () => useContext(DialogContext)

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<DialogConfig | undefined>()

  const openDialog = (config: DialogConfig) => {
    setConfig(config)
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setConfig(undefined)
  }

  return (
    <DialogContext.Provider value={{ isOpen, config, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  )
}

/**
 * `Dialog` is a versatile modal component that functions as an alert, confirmation, or prompt dialog.
 * It is designed to be interactive and requires user interaction to be closed. The dialog integrates
 * with a context to manage its open/close state and configuration, and it can optionally be centered on the screen.
 * The dialog supports customizable messages, additional content, and input fields.
 *
 * This component must be wrapped in a `DialogProvider` component to provide the necessary context.
 * You can use the `openDialog` function from the `useDialog` hook to open the dialog from anywhere in your application.
 *
 * @component
 * @param {boolean} [center=false] - Whether to center the dialog vertically on the screen.
 *
 * @property {boolean} isOpen - Indicates if the dialog is currently open.
 * @property {DialogConfig} config - Configuration object for the dialog, defining its mode, message, and callback.
 * @property {function} closeDialog - Function to close the dialog, which invokes the callback with the user response.
 *
 * @returns {JSX.Element} The rendered dialog component.
 */

export const Dialog = ({ center }: { center?: boolean }) => {
  const { isOpen, config, closeDialog } = useDialog()
  const [inputValue, setInputValue] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const [shouldShake, setShouldShake] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setShouldShake(true)
        setTimeout(() => setShouldShake(false), 500)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleClose = (value: boolean | string | null) => {
    closeDialog()
    config?.callback?.(value)
  }

  useEffect(() => {
    setInputValue('')
  }, [isOpen])

  return (
    <S.DialogContainer 
      show={isOpen}
      center={center}
    >
      <S.Dialog 
        ref={dialogRef} 
        id='F_Dialog' 
        show={isOpen} 
        shake={shouldShake}
        center={center}
      >
        <S.DialogContent>
          <Gap gap={0.5} autoWidth center>
            {
              config?.message && <S.Message>{config.message}</S.Message>
            }
            {
              config?.children
            }
            
            <Break />
            {
              config?.mode === 'prompt' && (
                <>
                  <TextInput 
                    value={inputValue} 
                    onChange={val => setInputValue(val)} 
                    placeholder={config.placeholder}
                    autoFocus
                    onEnter={() => handleClose(inputValue)}
                  />
                  <Break />
                </>
              )
            }
            <Fit gap={0.5}>
              {config && (
                config.mode === 'alert' ? <Button onClick={() => handleClose(null)} primary expand>OK</Button> :
                config.mode === 'confirm' ? (
                  <>
                    <Button onClick={() => handleClose(true)} primary>Yes</Button>
                    <Button onClick={() => handleClose(false)}>No</Button>
                  </>
                ) :
                config.mode === 'prompt' ? (
                  <>
                    <Button onClick={() => handleClose(inputValue)} primary expand>OK</Button>
                    <Button onClick={() => handleClose(null)} expand>Cancel</Button>
                  </>
                ) : null
              )}
            </Fit>
          </Gap>
        </S.DialogContent>
      </S.Dialog>
    </S.DialogContainer>
  )
}

const slideDown = keyframes`
  from {
    transform: translateY(-100%)
  }
  to {
    transform: translateY(0)
  }
`

const shake = keyframes`
  0% { transform: translateX(0) }
  20% { transform: translateX(-10px) }
  40% { transform: translateX(10px) }
  60% { transform: translateX(-10px) }
  80% { transform: translateX(10px) }
  100% { transform: translateX(0) }
`

const S = {
  DialogContainer: styled.div<{
    show?: boolean
    center?: boolean
  }>`
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: center;
    background: var(--F_Backdrop_Light);
    align-items: ${props => props.center ? 'center' : 'flex-start'};
  `,
  Dialog: styled.div<{
    show?: boolean
    shake?: boolean
    center?: boolean
  }>`
    box-shadow: var(--F_Outline_Outset);
    background: var(--F_Background);
    border-radius: .5rem;
    max-width: calc(100vw - 2rem);
    animation: ${props => props.show ? css`${slideDown} 0.125s ease-out` : 'none'},
               ${props => props.shake ? css`${shake} 0.5s ease` : 'none'};
    margin-top: ${props => props.center ? '0' : '2rem'};
    width: 400px;
  `,
  DialogContent: styled.div`
    padding: 1rem;
  `,
  Message: styled.div`
    width: auto;
    color: var(--F_Font_Color);
    font-size: var(--F_Font_Size);
    line-height: 1.5;
    user-select: none;
  `
}
