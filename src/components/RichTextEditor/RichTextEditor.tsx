import React, { useState, useEffect, FC, useRef } from 'react'
import styled from 'styled-components'
import { 
  Button, 
  Gap, 
  StyleHTML, 
  insertCSS,
} from '../../internal'
import { quillStyles } from './quillStyles'
import { IconPrefix } from '@fortawesome/fontawesome-common-types'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  outline?: boolean
  iconPrefix?: IconPrefix
  autoFocus?: boolean
  minimal?: boolean
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  placeholder?: string
  p?: number,
  pb?: number,
  pt?: number,
  pr?: number,
  pl?: number,
  px?: number,
  py?: number,
  children?: React.ReactNode
}
export const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  outline,
  iconPrefix,
  autoFocus,
  minimal,
  onKeyDown,
  placeholder,
  children,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false)
  const quillRef = useRef(null)

  useEffect(() => {
    if (autoFocus && quillRef?.current) {
      (quillRef.current as any).getEditor().focus()
    }
  }, [autoFocus])

  const [headerValue, setHeaderValue] = useState('normal')

  useEffect(() => {
    insertCSS(quillStyles)
    import('react-quill').then(() => {
      setLoaded(true)
    })
  }, [])

  const CustomToolbar = ({ handlers }: any) => (
    <S.Toolbar id='custom-toolbar'>
      <Gap disableWrap gap={.25}>
        <S.Select 
          className='ql-header' 
          onChange={handlers.handleHeaders} 
          value={headerValue}
          onClick={e => e.stopPropagation()}
          title='Format'
        >
          <option value='1'>H1</option>
          <option value='2'>H2</option>
          <option value='3'>H3</option>
          <option value='4'>H4</option>
          <option value='normal'>Normal</option>
        </S.Select>
        <Button type='button' icon={'bold'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleBold} compact minimal square title='Bold' />
        <Button type='button' icon={'italic'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleItalic} compact minimal square title='Italic' />
        <Button type='button' icon={'underline'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleUnderline} compact minimal square title='Underline' />
        <Button type='button' icon={'list-ol'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleListOrdered} compact minimal square title='Ordered List' />
        <Button type='button' icon={'list-ul'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleListBullet} compact minimal square title='Unordered List' />
        <Button type='button' icon={'link'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleLink} compact minimal square title='Insert Link' />
        <Button type='button' icon={'image'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleImage} compact minimal square title='Insert Image' />
        <Button type='button' icon={'clapperboard'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleVideo} compact minimal square title='Insert Video' />
        <Button type='button' icon={'code'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleIframe} compact minimal square title='Insert Iframe' />
        <Button type='button' icon={'terminal'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleCode} compact minimal square title='Code Block' />
        <Button type='button' icon={'quote-right'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleBlockquote} compact minimal square title='Blockquote' />
        <Button type='button' icon={'eraser'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleClean} compact minimal square title='Clear Formatting' />
      </Gap>
    </S.Toolbar>
  )
  
  const handlers = {
    handleBold: () => {
      const quill = (quillRef.current as any).getEditor()
      quill.format('bold', !quill.getFormat().bold)
    },
    handleItalic: () => {
      const quill = (quillRef.current as any).getEditor()
      quill.format('italic', !quill.getFormat().italic)
    },
    handleUnderline: () => {
      const quill = (quillRef.current as any).getEditor()
      quill.format('underline', !quill.getFormat().underline)
    },
    handleListOrdered: () => {
      const quill = (quillRef.current as any).getEditor()
      const format = quill.getFormat()
      quill.format('list', format.list === 'ordered' ? false : 'ordered')
    },
    handleListBullet: () => {
      const quill = (quillRef.current as any).getEditor()
      const format = quill.getFormat()
      quill.format('list', format.list === 'bullet' ? false : 'bullet')
    },
    handleLink: () => {
      const quill = (quillRef.current as any).getEditor()
      const tooltip = quill.theme.tooltip
      const scrollPosition = quill.scrollingContainer.scrollTop
    
      const originalSave = tooltip.save
      const originalHide = tooltip.hide
    
      tooltip.save = function() {
        const range = quill.getSelection(true)
        const value = this.textbox.value
        if (value) {
          quill.format('link', value)
          this.hide()
        }
        quill.scrollingContainer.scrollTop = scrollPosition
      }
    
      tooltip.hide = function() {
        this.save = originalSave
        this.hide = originalHide
      }
    
      tooltip.textbox.addEventListener('click', (event: any) => {
        event.stopPropagation()
      })
    
      tooltip.edit('link')
      tooltip.textbox.placeholder = 'Enter link URL'
    },
    handleImage: () => {
      const quill = (quillRef.current as any).getEditor()
      const tooltip = quill.theme.tooltip
  
      const scrollPosition = quill.scrollingContainer.scrollTop
  
      const originalSave = tooltip.save
      const originalHide = tooltip.hide
  
      tooltip.save = function() {
        const range = quill.getSelection(true)
        const value = this.textbox.value
        if (value) {
          quill.insertEmbed(range.index, 'image', value)
          this.hide()
        }
  
        quill.scrollingContainer.scrollTop = scrollPosition
      }
  
      tooltip.hide = function() {
        this.save = originalSave
        this.hide = originalHide
      }
  
      tooltip.textbox.addEventListener('click', (event: any) => {
        event.stopPropagation()
      })
  
      tooltip.edit('image')
      tooltip.textbox.placeholder = 'Insert Image URL'
    },
    handleVideo: () => {
      const quill = (quillRef.current as any).getEditor()
      const tooltip = quill.theme.tooltip
      
      const originalSave = tooltip.save
      const originalHide = tooltip.hide
    
      tooltip.save = function() {
        const range = quill.getSelection(true)
        const value = this.textbox.value
        if (value) {
          quill.insertEmbed(range.index, 'video', value)
          this.hide()
        }
      }
    
      tooltip.hide = function() {
        this.save = originalSave
        this.hide = originalHide
      }
    
      tooltip.textbox.addEventListener('click', (event: any) => {
        event.stopPropagation()
      })
    
      tooltip.edit('video')
      tooltip.textbox.placeholder = 'Insert Video URL'
    },
    handleCode: () => {
      const quill = (quillRef.current as any).getEditor()
      quill.format('code-block', !quill.getFormat()['code-block'])
    },
    handleClean: (quill: any) => {
      quill.removeFormat(quill.getSelection())
    },
    handleIframe: () => {
      const quill = (quillRef.current as any).getEditor()
      const tooltip = quill.theme.tooltip
    
      const originalSave = tooltip.save
      const originalHide = tooltip.hide
    
      tooltip.save = function() {
        const range = quill.getSelection(true)
        const iframeHtml = this.textbox.value
        if (iframeHtml) {
          quill.clipboard.dangerouslyPasteHTML(range.index, iframeHtml, 'user')
          this.hide()
        }
      }
    
      tooltip.hide = function() {
        this.save = originalSave
        this.hide = originalHide
      }
    
      tooltip.textbox.addEventListener('click', (event: any) => {
        event.stopPropagation()
      })
    
      tooltip.edit('iframe')
      tooltip.textbox.placeholder = 'Insert Iframe HTML'
    },
    handleHeaders: () => {
      const quill = (quillRef.current as any).getEditor()
      const selectedValue = (document.querySelector('.ql-header') as any).value
      setHeaderValue(selectedValue)
      if (selectedValue === 'normal') {
        quill.removeFormat(quill.getSelection())
      } else {
        quill.format('header', parseInt(selectedValue, 10))
      }
    },
    handleBlockquote: () => {
      const quill = (quillRef.current as any).getEditor()
      const format = quill.getFormat()
      quill.format('blockquote', format.blockquote ? false : true)
    },
  }

  const focus = () => {
    const quill = (quillRef.current as any).getEditor()
    if (quill) {
      quill.focus()
    }
  }

  const ReactQuill = require('react-quill')

  const [isEditorEmpty, setIsEditorEmpty] = useState(!value)

  useEffect(() => {
    const checkContentEmpty = () => {
      const editor = (quillRef.current as any).getEditor()
      const text = editor.getText().trim()
      setIsEditorEmpty(text.length === 0)
    }

    if (quillRef.current) {
      const editor = (quillRef.current as any).getEditor()
      editor.on('text-change', checkContentEmpty)
      return () => {
        editor.off('text-change', checkContentEmpty)
      }
    }
  }, [quillRef.current])

  return (
    <S.RichTextEditor 
      outline={outline}
      onClick={focus}
      {...rest}
    >
      <StyleHTML>
      {
        !minimal && (
          <CustomToolbar handlers={handlers} />
        )
      }
      <ReactQuill
        ref={quillRef}
        value={value}
        defaultValue={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        modules={{
          toolbar: minimal ? false : '#custom-toolbar',
          clipboard: {
            matchVisual: false
          }
        }}
        placeholder={isEditorEmpty ? 'Compose an epic...' : ''}
      />
      </StyleHTML>
      {
        ((value === '' || value === '<p><br></p>') && placeholder) &&
          <S.Placeholder minimal={minimal}>
            { placeholder }
          </S.Placeholder>
      }
      <S.Absolute minimal={minimal}>
        {
          children
        }
      </S.Absolute>
    </S.RichTextEditor>
  )
}

const calculatePadding = (props : any) => {
  let pt = props.pt ?? props.py ?? props.p ?? 0
  let pr = props.pr ?? props.px ?? props.p ?? 0
  let pb = props.pb ?? props.py ?? props.p ?? 0
  let pl = props.pl ?? props.px ?? props.p ?? 0

  return `${pt}rem ${pr}rem ${pb}rem ${pl}rem`
}

const S = {
  RichTextEditor: styled.div<Partial<RichTextEditorProps>>`
    position: relative;
    display: flex;
    width: 100%;
    border-radius: .75rem;
    box-shadow: ${props => props.outline ? 'var(--F_Outline)' : 'none'};
    .quill {
      min-height: calc(var(--F_Input_Height) - 1px);
      padding-top: 1px;
      height: 100%;
    }
    .ql-editor {
      padding: ${props => calculatePadding(props)};
    }
    .ql-toolbar {
      padding: ${props => `0 ${props.px}rem !important`};
      margin: 1px;
      margin-top: 0;
      border-radius: ${props => props.outline ? '.75rem .75rem 0 0' : '0'};
    }
    ${props => props.outline && `
      &:hover {
        box-shadow: var(--F_Outline_Hover);

        .ql-toolbar {
          border-top: 1px solid var(--F_Surface_3);
        }
      }
      &:active, &:focus-within {
        box-shadow: var(--F_Outline_Focus);

        .ql-toolbar {
          border-top: 1px solid var(--F_Surface_4);
        }
      }
    `}
  `,
  Absolute: styled.div<{
    minimal?: boolean
  }>`
    position: absolute;
    right: 0;
    top: 0;
    top: ${props => props.minimal ? '0' : '24px'};
  `,
  Toolbar: styled.div`
    width: calc(100% - 1.5rem);
    border-bottom: 1px solid var(--F_Surface_2);
    padding: 0 .75rem;
  `,
  Select: styled.select`
    background: none;
    outline: none;
    border: none;
    option {
      background: var(--F_Background);
    }
  `,
  Placeholder: styled.div<{
    minimal?: boolean
  }>`
    position: absolute;
    top: ${props => props.minimal ? '11px' : '35px'};
    left: 16px;
    color: var(--F_Font_Color_Disabled);
    font-size: var(--F_Font_Size);
    pointer-events: none;
  `
}