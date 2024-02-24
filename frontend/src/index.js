// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import store from './store'

// const root = document.getElementById('root');


// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
import React from 'react';
import { createRoot } from 'react-dom/client';  // Import createRoot from react-dom/client
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
