import React from 'react';
import './index.css';
import {createRoot} from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import {AppWithRedux} from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {AppWithReduser} from "./app/AppWithReduser";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<Provider store={store}> <AppWithRedux/></Provider>);
//root.render( <AppWithReduser/>);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
