import styled from 'styled-components';

export const Display = styled.div`
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  background: rgba(0,0,0,0.4);
  border-radius: 15px;
  width: 18em;
  height: 24em;
  overflow-x: hidden;
  display: flex;
  flex-direction:column;
  justify-content: center;
`;

export const RangeSlider = styled.input.attrs(({ inputType, min, max }) => ({
  type: inputType,
  min: min,
  max: max
}))`
    -webkit-appearance: none;
    width: 70%;
    border-radius: 5px;  
    margin: 0 0 1em 15%;
    height: 1em;
    background: #d3d3d3;
    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        border-radius: 50%;  
        width: 25px;
        height: 25px;
        background: #fff;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 25px;
        height: 25px;
        background: #fff;
        cursor: pointer;
    }
`;

//the number which display the minutes remaining to work
export const TimerDisplay = styled.h1`
  color: white;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5em;
  margin-right: 1em;
`;

//the number which display the minutes remaining to work
export const Explainer = styled.h2`
  margin-bottom: 0.5em;
  color: white;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.5);
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;