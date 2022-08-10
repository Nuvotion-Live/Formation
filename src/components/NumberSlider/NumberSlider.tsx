import styled from 'styled-components'

import React from 'react'

import Slider from 'rc-slider'

interface Props {
  value: number,
  min: number,
  max: number,
  onChange: (value: number) => void
}

export const NumberSlider = ({ value, min, max, onChange } : Props) => {
  return (
    <S.Container>
      <S.NumberSliderContainer>
        <S.NumberInput
          type='number'
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <S.Range
          min={min} 
          max={max} 
          value={value} 
          onChange={value => typeof value === 'number' ? onChange(value) :  null } 
        />
      </S.NumberSliderContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    color: var(--Font_Color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    width: 100%;
  `,
  NumberSliderContainer: styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 48px);
    padding: 0 8px;
    margin-right: 4px;
  `,
  NumberInput: styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    -webkit-appearance: none; 
    margin: 0;
    font-size: 16px;
    border: none;
    color: var(--Font_Color);
    background: none;
    text-align: center;

    &::-webkit-inner-spin-button, ::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
  `,
  Range: styled(Slider)`
    position: relative;
    height: 12px;
    margin: 8px 0;
    padding: 5px 0;
    width: 100%;
    border-radius: 8px;
    -ms-touch-action: none;
        touch-action: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    .rc-slider * {
      box-sizing: border-box;
      overflow: visible;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .rc-slider-rail {
      position: absolute;
      width: 100%;
      background: var(--Surface_1);
      height: 4px;
      border-radius: 8px;
      cursor: grab;
    }
    .rc-slider-track {
      position: absolute;
      left: 0;
      height: 4px;
      border-radius: 8px;
      background: var(--Primary_Variant);
    }
    .rc-slider-handle {
      position: absolute;
      width: 16px;
      height: 16px;
      cursor: pointer;
      cursor: -webkit-grab;
      margin-top: -7px;
      cursor: grab;
      border-radius: 50%;
      background: var(--Primary_Variant);
      -ms-touch-action: pan-x;
          touch-action: pan-x;
    }
  `
}