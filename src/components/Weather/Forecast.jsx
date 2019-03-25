import React, { Component } from "react";
import styled from "styled-components";
import ForecastItem from "./ForecastItem.jsx";

/* Forecast */
const ForecastWrapper = styled.div`
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
`;

export default class Forecast extends Component {
  render() {
    const { forecastDays } = this.props;
    return (
      <ForecastWrapper>
        {forecastDays &&
          forecastDays.map((day, idx) => {
            return (
              <ForecastItem
                day={day}
                key={idx}
              />
            );
          })}
      </ForecastWrapper>
    );
  }
}
