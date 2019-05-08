import React from "react";
import styled from "styled-components";

const Clock = styled.div`
  font-size: 10vw;
  font-weight: 700;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Icon = styled.div`
  color: white;
  font-size: 2vw;
  padding: 1vw;
  &:hover {
    display: block;
    cursor: pointer;
  }
}
`;

const Time = props => {
    return (
      <div>
        <Clock>
          {props.currentTime}
          <Icon onClick={props.onClick}>
            <i className="far fa-clock" />
          </Icon>
        </Clock>
      </div>
    );
  }

export default Time;
