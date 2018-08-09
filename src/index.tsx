import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppComponent from './Components/AppComponent/AppComponent';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <AppComponent />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
