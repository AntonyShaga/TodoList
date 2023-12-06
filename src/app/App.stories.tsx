import React from "react";
import {ReduxStoreProviderDecoration} from "../stories/ReduxStoreProviderDecoration";
import App from "./App";

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