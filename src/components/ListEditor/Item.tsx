import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React, { forwardRef, useContext, useMemo } from 'react'
import styled from 'styled-components'

import { Box, Break, Spacer, getLabelColor, LabelColor, Link as IntLink, LineBreak } from '../../internal'
import { SpaceIcon } from '../NavSpaces/SpaceIcon'

import { 
  Avatar, 
  getInitials, 
  LinkContext
} from '../../internal'

export interface ItemProps {
  name?: string,
  onClick?: (e: React.MouseEvent) => void,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  minimalIcon?: boolean,
  src?: string,
  text?: string,
  labelColor?: LabelColor,
  label?: string,
  subtitle?: string,
  dateString?: string,
  title?: string,
  date?: Date,
  small?: boolean,
  href?: string,
  active?: boolean,
  spaceIcon?: boolean,
  prefix?: React.ReactNode,
  children?: React.ReactNode,
  content?: React.ReactNode,
  emphasize?: boolean,
  indent?: boolean,
  pageTitle?: string,
  newTab?: boolean,
  value?: any,
  breakText?: boolean,
  compact?: boolean
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(({
  name,
  label,
  subtitle,
  onClick,
  icon,
  iconPrefix,
  minimalIcon,
  src,
  text,
  labelColor,
  title,
  date,
  small,
  href,
  active,
  spaceIcon,
  children,
  content,
  emphasize,
  indent,
  pageTitle,
  newTab,
  breakText,
  value,
  prefix,
  compact
}: ItemProps, ref): JSX.Element => {
  const Link: any = useContext(LinkContext) || IntLink;

  const renderItem = () => (
    <Box width='100%' maxWidth={'100%'}>
      {
        indent
          ? <S.Indent active={active} />
          : null
      }
      {
        spaceIcon && <SpaceIcon
          src={src}
          onClick={onClick}
          date={date}
          href={href}
          name={title ? title : '?'}
          icon={icon}
          iconPrefix={iconPrefix}
          active={active}
          labelColor={labelColor}
        />
      }
      
      {
        (name || icon || src) && !spaceIcon
          ? <S.AvatarContainer active={active}>
              <Avatar
                name={name ? getInitials(name) : '?'}
                labelColor={labelColor}
                icon={icon}
                iconPrefix={iconPrefix}
                minimalIcon={minimalIcon}
                src={src}
              />
            </S.AvatarContainer>
          : null
      }

      {
        prefix
      }

      <S.Flex minimal={minimalIcon}>
        {
          name && <S.Text active={active}>{ name }</S.Text>
        }

        {
          label && <S.Text active={active}>{ label }</S.Text>
        }

        {
          pageTitle && <S.PageTitle active={active}>{ pageTitle }</S.PageTitle>
        }

        {
          title && <S.Title active={active}>{ title }</S.Title>
        }
        
        {
          text && <S.Text active={active}>{ text }</S.Text>
        }

        {
          breakText && <Break />
        }

        {
          subtitle && <S.Subtitle active={active}>{ subtitle }</S.Subtitle>
        }

        {
          content && <>{ content }</>
        }
      </S.Flex>

      <Spacer />

      {
        children
          ? children
          : null
      }
    </Box>
  )

  return (<S.Container ref={ref}>
    <S.ListItem 
      onClick={onClick} 
      active={active} 
      emphasize={emphasize}
      showHover={onClick !== undefined || href !== undefined}
      pageTitle={pageTitle}
      compact={compact}
    >
      {
        href !== undefined
          ? <Link href={href} newTab={newTab}>
              {
                renderItem()
              }
            </Link>
          : renderItem()
      }
    </S.ListItem>
  </S.Container>)
})

const S = {
  ListItem: React.memo(styled.span<{
    active?: boolean,
    emphasize?: boolean,
    showHover?: boolean,
    pageTitle?: string,
    compact?: boolean
  }>`
    width: calc(100% - .35rem);
    height: ${props => 
      props.compact
        ? 'var(--F_Input_Height_Compact)'
        : props.pageTitle 
            ? 'var(--F_Header_Height)' 
            : 'auto'
    };
    max-height: ${props => 
      props.compact
        ? 'var(--F_Input_Height_Compact)'
        : 'auto'
    };
    overflow: ${props => 
      props.compact
        ? 'hidden'
        : 'auto'
    };
    padding: ${props => 
      props.pageTitle 
        ? '0 .5rem' 
        : props.compact
          ? '0 .175rem'
          : '.175rem'
    };
    display: flex;
    align-items: center;
    position: relative;
    cursor: ${props => props.showHover ? 'pointer' : 'auto'};
    background: ${props => 
      props.active 
        ? 'var(--F_Surface_2)' 
        : props.emphasize
          ? 'var(--F_Emphasize)'
          : 'none'
    };
    &:hover {
      background: ${props => 
        props.showHover
          ? props.active 
              ? 'var(--F_Surface_2)' 
              : props.emphasize
                ? 'var(--F_Emphasize_Hover)'
                : 'var(--F_Surface_1)'
          : props.emphasize
            ? 'var(--F_Emphasize)'
            : 'none'
      };
    }
    &:active {
      background: ${props => 
        props.showHover
          ? props.active 
              ? 'var(--F_Surface_2)' 
              : props.emphasize
                ? 'var(--F_Emphasize_Hover)'
                : 'var(--F_Surface)'
          : 'none'
      };
    }
    a {
      width: 100%;
    }
  `),
  Flex: React.memo(styled.div<{
    minimal?: boolean
  }>`
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: .2rem;
    margin-left: ${props => props.minimal ? '-0.5rem' : '0'};
  `),
  AvatarContainer: React.memo(styled.div<{
    active?: boolean
  }>`
    height: 100%;
    display: flex;
    align-items: center;
    * {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'auto'};
    }
  `),
  Text: React.memo(styled.div<{
    active?: boolean
  }>`
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color);
    line-height: 1.33;
    padding: 0 .5rem;
    font-weight: ${props => props.active ? '400' : '400'};
  `),
  Absolute: React.memo(styled.div`
    position: absolute;
    height: 100%;
    right: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  `),
  Title: React.memo(styled.div<{
    active?: boolean
  }>`
    font-size: var(--F_Font_Size_Title);
    color: var(--F_Font_Color);
    padding: 0 .5rem;
    color: var(--F_Font_Color);
    font-weight: ${props => props.active ? '400' : '400'};
    max-width: 100%;
    overflow: hidden;
    line-height: 1.33;
    
  `),
  Subtitle: React.memo(styled.div<{
    active?: boolean
  }>`
    font-size: var(--F_Font_Size_Label);
    color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Label)'};
    padding: 0 .5rem;
    line-height: 1.33;
  `),
  PageTitle: React.memo(styled.div<{
    active?: boolean
  }>`
    font-size: var(--F_Font_Size_Title);
    color: var(--F_Font_Color);
    font-weight: 600;
    padding: 0 .5rem;
    line-height: 1.33;
  `),
  DropdownSpacer: React.memo(styled.div<{
    spaces: number
  }>`
    height: 100%;
    padding: ${props => `calc(${props.spaces} * 0.75rem)`};
  `),
  Indent: React.memo(styled.div<{
    active?: boolean
  }>`
    width: .5rem;
    min-width: .5rem;
    background: ${props => props.active ? 'var(--F_Surface)' : 'var(--F_Background)'};
  `),
  Container: React.memo(styled.div`
    display: flex;
    width: 100%;
  `)
}