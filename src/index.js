import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './firebase/configuration'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
