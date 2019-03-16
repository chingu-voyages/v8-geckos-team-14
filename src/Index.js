import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Fronpage from './components/Frontpage.jsx';


const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Fronpage />, wrapper) : false;