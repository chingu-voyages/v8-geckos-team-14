import Fronpage from './components/Frontpage.jsx';

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<Fronpage />, wrapper) : false;