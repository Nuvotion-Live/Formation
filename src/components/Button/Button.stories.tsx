import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AspectRatio, Button } from '../../internal'
import styled from 'styled-components'

export default {
  title: 'Input/Button',
  component: Button,
} as ComponentMeta<typeof Button>


const Template: ComponentStory<typeof Button> = args => 
  <div style={{display: 'flex'}}>
    <Button {...args} />
    <div style={{width: '100%'}} />
  </div>

export const Regular = Template.bind({})
Regular.args = {
  text: 'Download'
}

export const Secondary = Template.bind({})
Secondary.args = {
  text: 'Download',
  secondary: true,
  iconPrefix: 'fas',
  icon: 'download',
}

export const Primary = Template.bind({})
Primary.args = {
  text: 'Download',
  icon: 'download',
  iconPrefix: 'fas',
  primary: true
}

export const Compact = Template.bind({})
Compact.args = {
  text: 'Download',
  icon: 'download',
  iconPrefix: 'fas',
  compact: true
}

export const Tab = Template.bind({})
Tab.args = {
  text: 'Download',
  icon: 'download',
  iconPrefix: 'fas',
  compact: true,
  tab: true
}

export const InvertTab = Template.bind({})
InvertTab.args = {
  text: 'Download',
  icon: 'download',
  iconPrefix: 'fas',
  compact: true,
  invertTab: true
}

const S = {
  SelectedTransitionPreview: styled.div<{src: string}>`
    width: 100%;
    width: 30px;
    height: 100%;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-right: .5rem;
  `,
}

export const PrefixChildren = Template.bind({})
PrefixChildren.args = {
  text: 'Download',
  prefixChildren: <S.SelectedTransitionPreview src='/blendPreviews/Difference.jpg' />,
  compact: true
}

export const CompactSquare = Template.bind({})
CompactSquare.args = {
  icon: 'download',
  iconPrefix: 'fas',
  compact: true,
  square: true
}

export const CompactIcon = Template.bind({})
CompactIcon.args = {
  icon: 'download',
  iconPrefix: 'fas',
  compact: true,
}

export const HeroPrimary = Template.bind({})
HeroPrimary.args = {
  text: 'Download',
  hero: true,
  iconPrefix: 'fas',
  icon: 'download',
  primary: true
}

export const HeroNoIcon = Template.bind({})
HeroNoIcon.args = {
  text: 'Download',
  hero: true,
  primary: true
}

export const Square = Template.bind({})
Square.args = {
  icon: 'times',
  iconPrefix: 'fas',
  square: true,
}

export const SquareHero = Template.bind({})
SquareHero.args = {
  icon: 'times',
  iconPrefix: 'fas',
  square: true,
  hero: true
}

export const Circle = Template.bind({})
Circle.args = {
  icon: 'times',
  iconPrefix: 'fas',
  circle: true,
}

export const Minimal = Template.bind({})
Minimal.args = {
  icon: 'times',
  iconPrefix: 'fas',
  circle: true,
  minimal: true
}

export const CircleHero = Template.bind({})
CircleHero.args = {
  icon: 'times',
  iconPrefix: 'fas',
  circle: true,
  hero: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  text: 'Claim reward',
  disabled: true
}

export const Link = Template.bind({})
Link.args = {
  icon: 'external-link',
  iconPrefix: 'fas',
  text: 'Open link',
  href: 'https://www.npmjs.com/package/@avsync.live/formation'
}

export const LinkNewTab = Template.bind({})
LinkNewTab.args = {
  icon: 'external-link',
  iconPrefix: 'fas',
  text: 'Open link in new tab',
  href: 'https://www.npmjs.com/package/@avsync.live/formation',
  newTab: true
}

export const Expand = Template.bind({})
Expand.args = {
  text: 'Download',
  expand: true,
  hero: true
}

export const Blink = Template.bind({})
Blink.args = {
  text: 'Download',
  icon: 'download',
  iconPrefix: 'fas',
  expand: true,
  hero: true,
  blink: true
}

export const SingleBlink = Template.bind({})
SingleBlink.args = {
  text: 'Download',
  icon: 'download',
  iconPrefix: 'fas',
  expand: true,
  hero: true,
  singleBlink: true
}

export const LabelColorOrange = Template.bind({})
LabelColorOrange.args = {
  text: 'Download',
  labelColor: 'orange',
  primary: true
}

export const LabelColorPink = Template.bind({})
LabelColorPink.args = {
  text: 'Download',
  labelColor: 'pink',
  primary: true
}

export const LabelColorPinkSecondary = Template.bind({})
LabelColorPinkSecondary.args = {
  text: 'Download',
  labelColor: 'pink',
  secondary: true
}