import React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode,
  autoWidth?: boolean,
  disableWrap?: boolean,
  gap?: number | string,
  center?: boolean
}

export const Gap = React.memo(({ 
  children, 
  autoWidth, 
  disableWrap,
  gap,
  center
}: Props) => 
  <S.Gap 
    autoWidth={autoWidth} 
    disableWrap={disableWrap}
    gap={gap}
    center={center}
  >
    { 
      children 
    }
  </S.Gap>
)

interface GapProps {
  autoWidth?: boolean,
  disableWrap?: boolean,
  gap?: number | string,
  center?: boolean
}

const S = {
  Gap: React.memo(styled.div<GapProps>`
    width: ${props => props.autoWidth ? 'auto' : '100%'};
    display: flex;
    align-items: center;
    justify-content: ${props => props.center ? 'center' : 'left'};
    flex-wrap: ${props => props.disableWrap ? 'none' : 'wrap'};
    gap: 8px;
    gap: ${props => 
      props.gap 
        ? typeof props.gap === 'string' 
          ? props.gap 
          : `${props.gap}rem`
        : '.5rem'
    };
  `)
}

