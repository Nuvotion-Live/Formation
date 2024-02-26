import React, { FC, useState, useRef, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, DropdownProps } from '../../internal'
import styled from 'styled-components'

interface ContextMenuProps {
  dropdownProps: DropdownProps,
  disabled?: boolean,
  children: React.ReactNode
}

export const ContextMenu: FC<ContextMenuProps> = ({ children, dropdownProps, disabled }) => {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const holdTimer = useRef<NodeJS.Timeout>()

  const openMenu = useCallback((x: number, y: number) => {
    if(!disabled) {   // Check if disabled before opening
      setMenuPosition({ x, y })
      setIsOpen(false)
      setTimeout(() => setIsOpen(true), 0)
    }
  }, [disabled])

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    openMenu(event.clientX, event.clientY)
  }, [openMenu])

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClose, isOpen])

  useEffect(() => {
    const element = containerRef.current

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault()
      const touchX = event.touches[0].clientX
      const touchY = event.touches[0].clientY

      holdTimer.current = setTimeout(() => {
        openMenu(touchX, touchY)
      }, 300)
    }

    const handleTouchEnd = () => {
      if (holdTimer.current) {
        clearTimeout(holdTimer.current)
      }
    }

    element?.addEventListener('touchstart', handleTouchStart, { passive: false })
    element?.addEventListener('touchend', handleTouchEnd)

    return () => {
      element?.removeEventListener('touchstart', handleTouchStart)
      element?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [openMenu])

  return (
    <S.ContextMenu 
      ref={containerRef}
      onContextMenu={handleContextMenu}
    >
      { children }
      {
        isOpen && ReactDOM.createPortal(
          <div 
            ref={dropdownRef}
            style={{ 
              position: 'fixed', 
              top: menuPosition.y, 
              left: menuPosition.x 
            }}
          >
            <Dropdown 
              {...dropdownProps}
              xPosition={menuPosition.x}
              yPosition={menuPosition.y}
              externalOpen={isOpen}
              hideTriggerButton
            />
          </div>,
          document.body
        )
      }
    </S.ContextMenu>
  )
}

const S = {
  ContextMenu: styled.div`
    width: 100%;
    height: 100%;
  `
}