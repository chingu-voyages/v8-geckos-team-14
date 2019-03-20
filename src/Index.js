import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Frontpage from './components/Frontpage.jsx';


const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Frontpage />, wrapper) : false;