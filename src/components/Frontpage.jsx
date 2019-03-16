import React, { Component } from "react";
import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  background: #ccc;
`;

// Just delete this heading, whoever starts working on the frontpage :) 
const Heading = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: black;
  font-size: 32px;
  font-weight: bold;
`;

class Frontpage extends Component {
  constructor() {
    super();
      // State for subcomponents goes here, and gets passed as props to sub-components.
      // If props sublevels exceeds 3 (ex. Frontpage - Settings-component - Settings-categories - Setting), 
      // then we should consider using Redux.

      // If we need subpages (ex. About-page), then we should probably use React-Router
  }

  render() {
    return (
        <PageWrapper>
          <Heading>Hello World!</Heading>
        </PageWrapper>
    );
  }
}
export default Frontpage;