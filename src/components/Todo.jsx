import React from "react";
import styled from 'styled-components';

const Heading = styled.h1`
  color: black;
  font-size: 2em;
  font-weight: bold;
`;

// currently a filler component, just for testin
export default class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Heading>TODO STUFF</Heading>);
    }
}
