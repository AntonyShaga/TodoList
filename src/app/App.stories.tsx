import React from "react";
import App from "./App";
import {ReduxStoreProviderDecoration} from "../stories/ReduxStoreProviderDecoration";

export default {
    title:'App Component',
    component:App,
    decorators:[ReduxStoreProviderDecoration]
}

export const AppBaseExample = () => {
    return(
                <App/>
    )
}