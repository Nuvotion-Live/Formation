import React from 'react'
import styled from 'styled-components'

import { Dropdown } from '../Dropdown/Dropdown'

const genPastelFromGuid = (guid : string) => {
  if (guid) {
    const range = guid?.split('').map(i => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % 100
    var hue = Math.floor((range / 100) * 360);
    var pastel = 'hsl(' + hue + ', 100%, 80%)'   
    return pastel 
  }
  return 'white'
}

const initials = (name : string) => name?.split(" ").map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join("")

interface Props {
  key?: any,
  title?: string,
  avatar?: boolean,
  status?: string,
  statusColor?: string,
}

export const Slot = ({ avatar,
  title,
  status,
  statusColor,
}: Props): JSX.Element => {
  
  // const renderStatusChip = (PositionInviteStatus) => {
  //   switch (PositionInviteStatus.type) {
  //     case PositionInviteStatus.confirmed:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.awaitintResponse:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.inviteDenied:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.inviteNotSent:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.applicationReceived:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.applicationDenied:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //   }
  // }

  return (
    <>
      <S.ListItem avatar={avatar}>
        
        <S.AvatarContainer>
          <S.Avatar color={title ? genPastelFromGuid(title) : ''}>
            {
              title ? initials(title) : '?'
            }
          </S.Avatar>
        </S.AvatarContainer>
        
        <S.ResponsiveWrap>
          <S.ResponsiveTitleContainer>
            <S.Title>{title ? title : `Unassigned`}</S.Title>
            
            {/* {
              renderStatusChip(PositionInviteStatus)
            } */}
          </S.ResponsiveTitleContainer>
        </S.ResponsiveWrap>
        
        <S.Absolute>
          <Dropdown
            options={[
              {
                icon: 'ellipsis-v',
                iconPrefix: 'fas',
                dropDownOptions: [
                  {
                    icon: 'envelope',
                    text: 'Message',
                  },
                  {
                    icon: 'paper-plane',
                    text: 'Invite'
                  },
                  {
                    icon: 'check-square',
                    text: 'Assign',
                  },
                  {
                    icon: 'trash-alt',
                    text: 'Remove',
                  },
                ]
              }
            ]}
          />
        </S.Absolute>
      </S.ListItem>
    </>
  )
}

interface ListItemProps {
  avatar?: boolean
}


interface StatusChipProps {
  status?: string,
  statusColor?: string
}

const S = {
  ListItem: styled.div<ListItemProps>`
    width: calc(100% - 1.5rem);
    background: ${props => props.avatar ? 'var(--EC_White_100)' : 'var(--EC_Action_Orange)'};
    display: flex;
    align-items: center;
    padding: .75rem .75rem;
    border-bottom: 1px solid #bbb;
    position: relative;
    cursor: pointer;
    &:hover {
      background: var(--Surface_2);
    }
  `,
  AvatarContainer: styled.div`
    height: 100%;
  `,
  Avatar: styled.div`
    height: 2.25rem;
    min-width: 2.25rem;
    border-radius: 50%;
    background: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--Outline_Label);
  `,
  ResponsiveWrap: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
  `,
  ResponsiveTitleContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
  `,
  Title: styled.div`
    font-size: var(--Font_Size);
    font-weight: 400;
    color: var(--Font_Color);
    padding-left: .75rem;
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  `,
  StatusChip: styled.div<StatusChipProps>`
    width: fit-content;
    height: 1rem;
    padding: 0 .5rem;
    display: ${props => props.status ? 'flex' : 'none'};
    align-items: center;
    font-size: var(--Font_Size_Tiny);
    color: var(--EC_Black_700);
    line-height: 8px;
    text-transform: lowercase;
    border-radius: 12px;
    margin-left: 0.75rem;
    background: ${props => props.statusColor};
    margin-top: .25rem;
  `,
  Absolute: styled.div`
    position: absolute;
    height: 100%;
    right: .75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  `
}