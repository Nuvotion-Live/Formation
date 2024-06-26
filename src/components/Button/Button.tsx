import React, { FC, useContext, useMemo } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { SizeProp } from '@fortawesome/fontawesome-svg-core' // type coersion needed until FA SizeProp defintion is fixed to include "xl"

import { Icon, LabelColor, getLabelColor, LinkContext, Link as IntLink } from '../../internal'

export type ButtonProps = {
  href?: string
  hero?: boolean
  name?: string
  icon?: IconName
  onClick?: (e: React.MouseEvent) => void
  primary?: boolean
  text?: string
  blink?: boolean
  rotate?: boolean
  title?: string
  disabled?: boolean
  expand?: boolean
  minimal?: boolean
  id?: string
  iconPrefix?: IconPrefix
  minimalIcon?: boolean
  secondary?: boolean
  labelColor?: LabelColor
  singleBlink? : boolean
  tab? : boolean
  newTab?: boolean
  square?: boolean
  circle?: boolean
  expandVertical?: boolean
  compact?: boolean
  children?: React.ReactNode
  prefixChildren?: React.ReactNode
  disableCenter?: boolean
  off?: boolean
  invertTab?: boolean
  disablePadding?: boolean
  disableBorderRadius?: boolean
  type?: string
  focused?: boolean
}

/**
 * `Button` is a versatile component that can display a button with optional icons, text, and various styles.
 * It can act as a standard button, a submission button, or a link if provided with an `href`.
 * The button's look can be customized with different visual props like `hero`, `primary`, `minimal`, and others.
 * Additionally, it can handle click events and can be disabled.
 *
 * @component
 * @param {string} [href] - The URL where the button should link to if it's acting as a link.
 * @param {boolean} [hero] - If true, gives the button a prominent style.
 * @param {string} [name] - Name attribute for the button.
 * @param {IconName} [icon] - FontAwesome icon name for the icon to be displayed in the button.
 * @param {function} [onClick] - Click event handler.
 * @param {boolean} [primary] - If true, applies the primary button styling.
 * @param {string} [text] - Text to be displayed inside the button.
 * @param {boolean} [blink] - If true, applies a blinking animation.
 * @param {boolean} [rotate] - If true, the icon will rotate 90 degrees.
 * @param {string} [title] - Title attribute for the button, visible on hover as tooltip.
 * @param {boolean} [disabled] - If true, the button will be disabled.
 * @param {boolean} [expand] - If true, the button will expand to fill its container's width.
 * @param {string} [id] - The id attribute for the button.
 * @param {IconPrefix} [iconPrefix] - FontAwesome icon prefix.
 * @param {boolean} [minimalIcon] - If true, the button only shows an icon.
 * @param {boolean} [secondary] - If true, applies secondary button styling.
 * @param {LabelColor} [labelColor] - Color label for the button, influences the button's styling.
 * @param {boolean} [singleBlink] - If true, the button blinks only once.
 * @param {boolean} [tab] - If true, the button behaves as a tab for navigation purposes.
 * @param {boolean} [newTab] - If true and `href` is provided, the link opens in a new tab.
 * @param {boolean} [square] - If true, the button has a square shape.
 * @param {boolean} [circle] - If true, the button has a circular shape.
 * @param {boolean} [disableBorderRadius] - If true, sets the border radius to 0.
 * @param {boolean} [expandVertical] - If true, the button will expand to fill its container's height.
 * @param {boolean} [compact] - If true, the button has a compact style with less padding.
 * @param {React.ReactNode} [children] - Content to be rendered inside the button.
 * @param {React.ReactNode} [prefixChildren] - Content to be rendered as a prefix inside the button.
 * @param {boolean} [disableCenter] - If true, the content inside the button will not be centered.
 * @param {boolean} [off] - If true, the button will be visually turned off.
 * @param {boolean} [invertTab] - If true, the button's tab behavior will be inverted.
 * @param {boolean} [disablePadding] - If true, disables horizontal padding, ideal for use in compact layouts in conjunction with the Fit component.
 * @param {string} [type] - Type of the Button.
 *
 * @example
 * // A primary button with an icon and text
 * <Button icon="user" primary onClick={handleClick}>
 *   Click Me
 * </Button>
 *
 * @example
 * // A minimal icon button
 * <Button icon="coffee" minimalIcon />
 */
export const Button: FC<ButtonProps> = React.memo(({ 
  hero, 
  name, 
  icon, 
  onClick, 
  primary, 
  text, 
  blink, 
  rotate, 
  title, 
  disabled,
  href,
  expand,
  id,
  iconPrefix,
  minimalIcon,
  secondary,
  minimal,
  labelColor,
  singleBlink,
  tab,
  newTab,
  square,
  circle,
  expandVertical,
  compact,
  prefixChildren,
  disableCenter,
  children,
  off,
  invertTab,
  disablePadding,
  disableBorderRadius,
  type,
  focused
}: ButtonProps) => {

  const Link: any = useContext(LinkContext) || IntLink;

  const impliedSquare = circle || square

  const renderButton = () => {
    return (
      <S.Button
        onClick={onClick ? (e: React.MouseEvent) => onClick(e) : () => {}} 
        primary={primary} 
        blink={blink}
        square={impliedSquare}
        circle={circle}
        title={title ? title : ''}
        disabled={disabled}
        hero={hero}
        expand={expand}
        id={id}
        secondary={(secondary && !primary) || minimal}
        singleBlink={singleBlink}
        tab={tab}
        name={name}
        labelColor={labelColor}
        expandVertical={expandVertical}
        minimal={minimal}
        minimalIcon={minimalIcon}
        compact={compact}
        disableCenter={disableCenter}
        prefixChildren={+!!prefixChildren}
        invertTab={invertTab}
        disablePadding={disablePadding}
        disableBorderRadius={disableBorderRadius}
        type={type ? type : undefined}
        focused={focused}
      >
        {
          prefixChildren
        }
        {
          icon !== undefined
            ? <S.IconContainer square={impliedSquare} text={!!text}>
              <Icon 
                iconPrefix={iconPrefix ? iconPrefix : 'far'} 
                icon={icon}  
                rotation={rotate ? 90 : undefined}
                size={
                  hero 
                    ? ('xl' as SizeProp) // type coersion needed until FA SizeProp defintion is fixed to include "xl"
                    : minimalIcon || compact
                      ? '1x'
                      : 'lg'
                  } 
              />
              
                
              </S.IconContainer>
            : null
        }
        {
          labelColor && secondary
            ? <S.LabelCircle labelColor={labelColor} />
            : null
        }
        {
          text || children 
            ? 
              <S.Text 
                hero={hero}
                icon={icon}
                compact={compact}
                off={off}
              >
                {
                  children
                }
                {
                  text
                }
              </S.Text> 
            : null
        }
      </S.Button>
    )
  }

  return (
    <S.Container 
      disabled={disabled} 
      expand={expand} 
      square={impliedSquare} 
      hero={hero}
      expandVertical={expandVertical}
      minimalIcon={minimalIcon}
      compact={compact}
      off={off}
    >
      {
        href 
        ? 
          <Link href={href} newTab={newTab}>
            { renderButton() }
          </Link>
        : renderButton()
      }
    </S.Container>
  )
})

interface ContainerProps {
  disabled?: boolean,
  expand?: boolean,
  square?: boolean,
  hero?: boolean,
  expandVertical?: boolean,
  minimalIcon?: boolean,
  compact?: boolean,
  off?: boolean,
  disablePadding?: boolean,
  disableBorderRadius?: boolean
}

interface TextProps {
  hero?: boolean,
  icon?: string,
  compact?: boolean
  off?: boolean
}

const calculateWidth = (props: ContainerProps) => {
  if (props.minimalIcon) {
    return '1.5rem'
  }
  else if (props.expand) {
    return '100%'
  }
  else if (props.hero) {
    if (props.square) {
      return 'var(--F_Input_Height_Hero)'
    }
    else {
      return 'auto'
    }
  }
  else {
    if (props.square) {
      if (props.compact) {
        return 'var(--F_Input_Height_Compact)'
      }
      else {
        return 'var(--F_Input_Height)'
      }
    }
    else {
      return 'auto'
    }
  }
}

const calculateHeight = (props: ContainerProps) => {
  if (props.compact) {
    return 'var(--F_Input_Height_Compact)'
  }
  else if (props.minimalIcon) {
    return '1rem'
  }
  else if (props.expandVertical) {
    return '100%'
  }
  else if (props.hero) {
    if (props.square) {
      return 'var(--F_Input_Height_Hero)'
    }
    else {
      return 'var(--F_Input_Height_Hero)'
    }
  }
  else {
    if (props.square) {
      return 'var(--F_Input_Height)'
    }
    else {
      return 'var(--F_Input_Height)'
    }
  }
}

const calculatePadding = (props: ButtonProps) => {
  if (props.compact) {
    if (props.square || props.disablePadding) {
      return '0'
    }
    else if (props.prefixChildren) {
      return '0 .75rem 0 0'
    }
    else {
      return '0 .75rem'
    }
  }
  else if (props.hero) {
    if (props.square) {
      return '0'
    }
    else {
      return '0 1.75rem'
    }
  }
  else {
    if (props.square) {
      return '0'
    }
    else {
      return '0 1.125rem'
    }
  }
}

const calculateBackgroundColor = (props: ButtonProps) => {
  if (typeof props.labelColor === 'string' && props.primary) {
    return getLabelColor(props.labelColor);
  }
  if (props.primary) {
    return 'var(--F_Primary)';
  }
  if (props.blink) {
    return 'var(--Hover_Single)';
  }
  if (props.focused) {
    return 'var(--F_Surface_1)'
  }
  if (props.secondary) {
    return 'none';
  }
  return 'var(--F_Surface)';
}

const calculateHoverBackgroundColor = (props: ButtonProps) => {
  if (typeof props.labelColor === 'string' && props.primary) {
    return getLabelColor(props.labelColor);
  }
  if (props.primary) {
    return `var(--F_Primary_Hover)`
  }
  else {
    return `var(--F_Surface_1)`
  }
}

const calculateActiveBackgroundColor = (props: ButtonProps) => {
  if (typeof props.labelColor === 'string' && props.primary) {
    return getLabelColor(props.labelColor);
  }
  if (props.primary) {
    return `var(--F_Primary)`
  } 
  return 'var(--F_Surface_2)'
}

const calculateBorderRadius = (props: ButtonProps): string => {
  if (props.disableBorderRadius) {
    return '0'
  }
  else if (props.circle) {
    return '100%'
  } 
  else if (props.tab) {
    return 'var(--F_Input_Radius) var(--F_Input_Radius) 0 0'
  } 
  else if (props.invertTab) {
    return '0 0 var(--F_Input_Radius) var(--F_Input_Radius)'
  } 
  else {
    return 'var(--F_Input_Radius)'
  }
}

const S = {
  Container: React.memo(styled.div<ContainerProps>`
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}; 
    flex-shrink: 0;
    user-select: none;
    max-height: ${props => calculateHeight(props)};
    height: ${props => calculateHeight(props)};
    max-width: ${props => calculateWidth(props)};
    width: ${props => calculateWidth(props)};
    display: flex;
    align-items: center;
    a {
      height: 100%;
    }
   
  `),
  Text: React.memo(styled.div<TextProps>`
    font-size: ${props => 
      props.hero 
        ? 'var(--F_Font_Size_Title)' 
        : props.compact
          ? 'var(--F_Font_Size_Label)'
          : 'var(--F_Font_Size)'
    };
    display: flex;
    flex-shrink: 0;
    opacity: ${props => props.off ? '.5' : '1'};
  `),
  Button: React.memo(styled.button.attrs({
    type: 'submit',
    value: 'Submit'
  })<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.prefixChildren || props.disableCenter ? 'left' : 'center'};
    width: 100%;
    padding: ${props => calculatePadding(props)}; 
    background: ${props => calculateBackgroundColor(props)}; 
    border-radius: ${props => calculateBorderRadius(props)}; 
    letter-spacing: var(--F_Letter_Spacing);
    border: none;
    position: relative;
    overflow: hidden;
    color: ${props => props.disabled
      ? 'var(--F_Font_Color_Disabled)'
      : props.labelColor !== undefined && !props.secondary 
        ? 'white' 
        : 'var(--F_Font_Color)'
    };
    pointer-events: ${props => props.disabled ? 'none' : 'default'}; 
    display: flex;
    flex: 0 0 100%;
    align-items: center;
    height: 100%;
    min-width: var(--F_Font_Size_Icon);
    width: ${props => props.square && !props.hero
      ? '52px'
      : props.expand ? '100%' : 'auto'}; 
    box-shadow: ${props => props.secondary && !props.minimal ? 'var(--F_Outline)' : 'none'};
    
    animation: ${props => props.blink 
      ? css`${blink} 1s linear infinite` 
      : props.singleBlink
          ? css`${blink} 2s linear forwards` 
          : 'none'
    };
    cursor: ${props => props.disabled ? 'default' : 'pointer'}; 
    svg {
      color: ${props => props.disabled 
        ? 'var(--F_Font_Color_Disabled)' 
        : props.secondary
          ? 'var(--F_Font_Color_Label)'
          : 'var(--F_Font_Color)'
      };
    }
    &:hover {
      background: ${props => calculateHoverBackgroundColor(props)};
      * {
        color: var(--F_Font_Color);
        color: ${props => props.labelColor !== undefined && !props.secondary ? 'white' : 'var(--F_Font_Color)'};
      }
      box-shadow: none;
      filter: ${props => props.labelColor !== undefined && !props.secondary ? 'brightness(108%)' : 'none'};
    };
  
    &:active {
      background: ${props => calculateActiveBackgroundColor(props)
      };
      transform: translateY(1px);
      filter: ${props => props.labelColor !== undefined && !props.secondary ? 'brightness(116%)' : 'none'};
    };
  `),
  IconContainer: React.memo(styled.div<{
    square?: boolean,
    text?: boolean
  }>`
    padding-right: ${props => props.text ? '.5rem' : '0'};
  `),
  LabelCircle: React.memo(styled.div<{
    labelColor: LabelColor
  }>`
    width: 1rem;
    height: 1rem;
    margin-left: -.25rem;
    margin-right: .5rem;
    border-radius: 100%;
    background: ${props => getLabelColor(props.labelColor)};
  `)
}

const blink = keyframes`
  0% {
    background: var(--F_Surface);
  }
  50% {
    background: var(--F_Primary);
  }
  100% {
    background: var(--F_Surface);
  }
`