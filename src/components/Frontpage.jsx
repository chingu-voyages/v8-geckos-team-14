import React, { Component } from "react";

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
        <div>Hello world!</div>
    );
  }
}
export default Frontpage;