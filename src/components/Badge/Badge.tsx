import styled, { css, keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'

import { getLabelColor, LabelColor } from '../../internal'

interface Props {
  labelColor: LabelColor,
  count: number,
  children: React.ReactNode
}

interface BadgeProps {
  invisible: boolean,
}

export const Badge = ({ labelColor, count, children }: Props) => {
  const [isInvisible, setIsInvisible] = useState<boolean>(true)

  useEffect(() => {
    if (count !== undefined) {
      count === 0 ? setIsInvisible(true) : setIsInvisible(false)
    }
  }, [count])
    
  return (
    <S.Container >
      { children }
      <S.Badge labelColor={labelColor} invisible={isInvisible}>
        <S.Text>
          {
            count !== 0
              ? count < 100
                ? count 
                : '99+'
              : null
          }
        </S.Text>
      </S.Badge>
    </S.Container>
  )
}

const shrinkBadge = keyframes`
  0% {
    opacity: 100%;
    transform: scale(1);
  }

  100% {
    opacity: 0%;
    transform: scale(0);
  }
`

const expandBadge = keyframes`
  0% {
    opacity: 0%;
    transform: scale(0)
  }

  100% {
    opacity: 100%;
    transform: scale(1)
  }
`

const S = {
  Container: styled.div`
    position: relative;
    max-width: fit-content;
  `,
  Badge: styled.div<{
    invisible: boolean,
    labelColor: LabelColor
  }>`
    position: absolute;
    top: -.5rem;
    right: -.65rem;
    width: 1.125rem;
    height: 1.125rem;
    min-width: 1.125rem;
    min-height: 1.125rem;
    background: ${props => getLabelColor(props.labelColor)};
    font-size: 10px;
    border-radius: 50%;
    pointer-events: none;
    animation: ${props => props.invisible
      ? css`${shrinkBadge} .25s forwards`
      : css`${expandBadge} .25s forwards`
    };
  `,
  Text: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white !important;
    line-height: 0;
  `
}