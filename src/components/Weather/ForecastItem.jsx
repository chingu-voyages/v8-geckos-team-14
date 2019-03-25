import React from "react";
import styled from "styled-components";
import moment from 'moment'

/* Forecast Item*/
const Forecast = styled.div`
  flex: 1 1 11.111%;
  text-align: center;
`;
const ForecastDay = styled.div`
  margin: 0 1.5px;
  padding: 4px 2px;
  border-radius: 3px;
  cursor: pointer;
  white-space: nowrap;
  color: #fff;
`;

const ForecastLabel = styled.div`
  font-size: 10px;
  font-weight: 500;
  opacity: 0.6;
  text-transform: uppercase;
`;
const ForecastIcon = styled.div`
  margin-bottom: 0;
  margin-right: 1px;
  display: inline-block;
  font-size: 17px;
  line-height: 90% !important;
  opacity: 0.85;
  vertical-align: -20%;
`;

const ForecastHigh = styled.div`
  opacity: 0.85;
  font-size: 12px;
  color: #fff;
`;

const ForecastLow = styled.div`
  padding-left: 3px;
  opacity: 0.4;
  font-size: 10px;
  color: #fff;
`;

const Wrapper = styled.div`
  display: flex;
  wrap: no-wrap;
  flex-direction: row;
  align-items: center;
`;

const ForecastItem = (props) => {
    const { day } = props;
   const date = (moment(day.date).format('dddd'))
   const weekday = date.substring(0,3)
   const roundedHigh = Math.round(day.day.maxtemp_c)
   const roundedLow = Math.round(day.day.mintemp_c)
    return (
      <Forecast>
        <ForecastDay>
          <ForecastLabel>{weekday}</ForecastLabel>
        </ForecastDay>
        <Wrapper>
          <ForecastIcon>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              width="40"
              height="40"
            />
          </ForecastIcon>
          <ForecastHigh>{roundedHigh}°</ForecastHigh>
          <ForecastLow>{roundedLow}°</ForecastLow>
        </Wrapper>
      </Forecast>
    );
}

export default ForecastItem;
