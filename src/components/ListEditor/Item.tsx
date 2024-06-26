import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React, { forwardRef, useContext, useMemo } from 'react'
import styled, { css } from 'styled-components'

import { Box, Break, Spacer, getLabelColor, LabelColor, Link as IntLink, LineBreak } from '../../internal'
import { SpaceIcon } from '../NavSpaces/SpaceIcon'

import { 
  Avatar, 
  getInitials, 
  LinkContext
} from '../../internal'

export type ItemProps = React.HTMLAttributes<HTMLDivElement> & {
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
  headingText?: string,
  date?: Date,
  small?: boolean,
  href?: string,
  active?: boolean,
  spaceIcon?: boolean,
  prefixChildren?: React.ReactNode,
  children?: React.ReactNode,
  indent?: boolean,
  pageTitle?: string,
  newTab?: boolean,
  value?: any,
  disableBreak?: boolean,
  compact?: boolean,
  disablePadding?: boolean,
  index?: number,
  disableTextWrap?: boolean,
  absoluteRightChildren?: boolean,
  primary?: boolean,
  hideHover?: boolean,
  borderRadius?: number
  surface?: boolean
}

/**
 * `Item` is a flexible component that can represent a list item or an interactive element. It supports various configurations such as avatars, icons, labels, and custom contentProps, and can be used as a navigation item or interactive list element.
 *
 * @component
 * @param {string} [name] - The main text or name to be displayed in the item.
 * @param {function} [onClick] - The click event handler for the item.
 * @param {IconName} [icon] - The FontAwesome icon name to display.
 * @param {IconPrefix} [iconPrefix] - The FontAwesome icon prefix, defaults to 'fas'.
 * @param {boolean} [minimalIcon] - Determines if the icon should be rendered in a minimal style.
 * @param {string} [src] - The image source URL, if the item includes an avatar or image.
 * @param {string} [text] - Additional text to be displayed alongside the name.
 * @param {LabelColor} [labelColor] - The label color type for styling the text or icon.
 * @param {string} [label] - A label to be displayed, usually in a styled badge or tag.
 * @param {string} [subtitle] - A secondary text, displayed below or after the name.
 * @param {string} [dateString] - A formatted date string to display, if relevant.
 * @param {Date} [date] - A Date object, used when the item includes date information.
 * @param {boolean} [small] - If true, the item will be styled in a smaller size.
 * @param {string} [href] - The URL to be used for navigation if the item is a link.
 * @param {boolean} [active] - If true, the item will be styled to indicate it is currently active or selected.
 * @param {boolean} [spaceIcon] - If true, a space icon will be used in place of the regular avatar or image.
 * @param {React.ReactNode} [prefixChildren] - Children to be displayed before the main text.
 * @param {React.ReactNode} [children] - Custom contentProps or additional components to render within the item.
 * @param {boolean} [indent] - If true, the item will include an indentation, often used in nested lists.
 * @param {string} [pageTitle] - A headingText to be displayed prominently, often used for page headers or section titles.
 * @param {boolean} [newTab] - If true and the item is a link, clicking it will open the href in a new tab.
 * @param {boolean} [disableBreak] - If true, line breaks will be suppressed, keeping the contentProps on one line.
 * @param {boolean} [compact] - If true, the item will have a more compact layout with less padding and spacing.
 * @param {boolean} [disablePadding] - If true, the item will not have padding applied to its container.
 * @param {number} [index] - The index of the Item, to be used to help distingish Items in an ordered list.
 * @param {boolean} [disableTextWrap] - Disable text wrap for all text in the Item.
 * @returns {JSX.Element} - The rendered component.
 *
 * @example
 * // Basic item with text and an icon
 * <Item name="Item Name" icon="user" />
 *
 * @example
 * // Item as a clickable link with a subtitle and custom prefix contentProps
 * <Item href="/profile" name="Profile" subtitle="View your profile" prefix={<CustomIcon />} />
 */
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
  headingText,
  date,
  small,
  href,
  active,
  spaceIcon,
  children,
  indent,
  pageTitle,
  newTab,
  disableBreak,
  value,
  prefixChildren,
  compact,
  disablePadding,
  index,
  disableTextWrap,
  absoluteRightChildren,
  primary,
  hideHover,
  borderRadius,
  surface,
  ...props
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
        spaceIcon && 
          <Box mr={disablePadding ? 0 : -.25}>
            <SpaceIcon
              src={src}
              onClick={onClick}
              date={date}
              href={href}
              name={headingText ? headingText : '?'}
              icon={icon}
              iconPrefix={iconPrefix}
              active={active}
              labelColor={labelColor}
            />
          </Box>
      }

      {
        index !== undefined && <S.Index>{`${index + 1}`}</S.Index>
      }
      
      {
        (name || icon || src) && !spaceIcon
          ? <Box mr={disablePadding ? 0 : -.25}>
              <S.AvatarContainer active={active}>
                <Avatar
                  name={name ? getInitials(name) : '?'}
                  labelColor={labelColor}
                  icon={icon}
                  iconPrefix={iconPrefix}
                  minimalIcon={minimalIcon}
                  src={src}
                />
              </S.AvatarContainer>
            </Box> 
          : null
      }

      {
        prefixChildren
      }

      <S.Flex minimal={minimalIcon} indent={index !== undefined}>
        {
          name && <S.Text active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap} compact={compact || small}>{ name }</S.Text>
        }

        {
          !disableBreak && <Break />
        }

        {
          label && <S.Text active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap} compact={compact || small}>{ label }</S.Text>
        }

        {
          !disableBreak && <Break />
        }

        {
          pageTitle && <S.PageTitle active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap} compact={compact || small}>{ pageTitle }</S.PageTitle>
        }

        {
          !disableBreak && <Break />
        }

        {
          headingText && <S.Title active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap} compact={compact || small}>{ headingText }</S.Title>
        }

        {
          !disableBreak && <Break />
        }
        
        {
          text && <S.Text active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap} compact={compact || small}>{ text }</S.Text>
        }

        {
          !disableBreak && <Break />
        }

        {
          subtitle && <S.Subtitle active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap} compact={compact || small}>{ subtitle }</S.Subtitle>
        }
      </S.Flex>
      <Spacer />

      {
        children
          ? absoluteRightChildren
            ? <S.AbsoluteRight>
                {
                  children
                }
              </S.AbsoluteRight>
            : children
          : null
      }
    </Box>
  )

  return (<S.Container ref={ref} {...props}>
    <S.Item 
      onClick={onClick} 
      active={active} 
      showHover={(onClick !== undefined || href !== undefined) && !hideHover}
      pageTitle={pageTitle}
      compact={compact}
      disablePadding={disablePadding}
      primary={primary}
      borderRadius={borderRadius}
      surface={surface}
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
    </S.Item>
  </S.Container>)
})

const S = {
  Item: React.memo(styled.span<{
    active?: boolean
    showHover?: boolean
    pageTitle?: string
    compact?: boolean
    disablePadding?: boolean
    primary?: boolean
    borderRadius?: number
    surface?: boolean
  }>`
     width: ${props => 
      props.disablePadding
        ? '100%'
        : props.pageTitle
          ? 'calc(100% - 1rem)'
          : props.compact
            ? 'calc(100% - 0.35rem)'
            : 'calc(100% - 0.35rem)'
    };
    padding: ${props => 
      props.disablePadding
        ? '0'
        : props.pageTitle 
          ? '0 .5rem' 
          : props.compact
            ? '0 .175rem'
            : '.175rem'
    };
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
    display: flex;
    align-items: center;
    position: relative;
    cursor: ${props => props.showHover ? 'pointer' : 'auto'};
    border-radius: ${props => props.borderRadius ? `${props.borderRadius}rem` : '0'};
    background: ${props => 
      props.primary && props.active
        ? 'var(--F_Primary)'
        : props.active
          ? 'var(--F_Surface_2)'
          : props.surface
            ? 'var(--F_Surface)'
            : 'none'
    };
    &:hover {
      background: ${props =>
        props.primary && props.active
          ? 'var(--F_Primary_Hover)'
          : props.showHover
            ? props.active
              ? 'var(--F_Surface_2)'
              : 'var(--F_Surface_1)'
            : 'none'};
    }
    &:active {
      background: ${props => 
        props.primary && props.active
          ? 'var(--F_Primary_Active)'
          : props.showHover && props.active
            ? 'var(--F_Surface_2)'
            : props.surface
              ? 'var(--F_Surface_2)'
              : 'none'
      };
    }
    a {
      width: 100%;
    }
  `),
  Flex: React.memo(styled.div<{
    minimal?: boolean,
    indent?: boolean
  }>`
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    left: ${props => props.indent ? '1.55rem' : 'auto'};
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
    active?: boolean,
    disablePadding?: boolean,
    disableTextWrap?: boolean,
    compact?: boolean
  }>`
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color);
    line-height: 1.33;
    padding: ${props => 
      props.disablePadding 
        ? '0' 
        : props.compact
          ? '0 .25rem'
          : '0 .5rem'
    };
    font-weight: ${props => props.active ? '400' : '400'};
    ${props => props.disableTextWrap && css`
      overflow: hidden;
      white-space: nowrap;
    `}
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
    active?: boolean,
    disablePadding?: boolean,
    disableTextWrap?: boolean,
    compact?: boolean
  }>`
    font-size: var(--F_Font_Size_Title);
    color: var(--F_Font_Color);
    padding: ${props => 
      props.disablePadding 
        ? '0' 
        : props.compact
          ? '0 .25rem'
          : '0 .5rem'
    };
    color: var(--F_Font_Color);
    font-weight: ${props => props.active ? '400' : '400'};
    max-width: 100%;
    overflow: hidden;
    line-height: 1.33;
    ${props => props.disableTextWrap && css`
      overflow: hidden;
      white-space: nowrap;
    `}
  `),
  Subtitle: React.memo(styled.div<{
    active?: boolean,
    disablePadding?: boolean,
    disableTextWrap?: boolean,
    compact?: boolean
  }>`
    font-size: var(--F_Font_Size_Label);
    color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Label)'};
    padding: ${props => 
      props.disablePadding 
        ? '0' 
        : props.compact
          ? '0 .25rem'
          : '0 .5rem'
    };
    line-height: 1.33;
    ${props => props.disableTextWrap && css`
      overflow: hidden;
      white-space: nowrap;
    `}
  `),
  PageTitle: React.memo(styled.div<{
    active?: boolean,
    disablePadding?: boolean,
    disableTextWrap?: boolean,
    compact?: boolean
  }>`
    font-size: var(--F_Font_Size_Title);
    color: var(--F_Font_Color);
    font-weight: 600;
    padding: ${props => 
      props.disablePadding 
        ? '0' 
        : props.compact
          ? '0 .25rem'
          : '0 .5rem'
    };
    line-height: 1.33;
    ${props => props.disableTextWrap && css`
      overflow: hidden;
      white-space: nowrap;
    `}
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
  `),
  Index: styled.div`
    font-size: var(--F_Font_Size_Label);
    font-family: monospace;
    color: var(--F_Font_Color);
    font-weight: 600;
    position: absolute;
    width: 1rem;
    min-width: .75rem;
    text-align: center;
    left: .3rem;
  `,
  AbsoluteRight: styled.div`
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    height: 100%;
    align-items: center;
  `
}