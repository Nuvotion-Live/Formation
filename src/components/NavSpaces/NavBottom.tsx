import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { NavTabs } from './NavTabs'

interface Props {
  navs: {
    icon: IconName,
    iconPrefix: IconPrefix,
    title: string,
    href: string,
    active?: boolean,
    count?: number
  }[],
  trimRight?: boolean
}

export const NavBottom = ({ navs, trimRight } : Props) => {
  return (<S.Header trimRight={trimRight}>
    <NavTabs
      navs={navs}
      vertical={true}
    />
  </S.Header>)
}

const S = {
  Header: styled.div<{
    trimRight?: boolean
  }>`
    border-top: 1px solid var(--F_Surface);
    background: var(--F_Background);
    width: ${props => props.trimRight ? 'calc(100% - 1px)' : '100%'};
    border-right: ${props => props.trimRight ? '1px solid var(--F_Surface)' : 'none'};
  `,
  NavContainer: styled.div<{
    width: number
  }>`
    width: ${props => `${props.width}%`};
  `
}
