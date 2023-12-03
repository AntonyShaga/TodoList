import {Provider} from "react-redux";
import {AppRootState} from "../app/store";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/Todolists/tasks-reducer";
import {todolistReducer} from "../features/Todolists/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers(
    {
        tasks:tasksReducer,
        todolists:todolistReducer,
        app:appReducer
    }
)

const initialGlobalState:AppRootState = {
    todolist: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus:'idle',addedDate:'',order:0},
        {id: "todolistId2", title: "What to buy", filter: "all",entityStatus:'idle',addedDate:'',order:0}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,todoListId:"todolistId1",description:'',
                startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,todoListId:"todolistId1",description:'',
                startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Book", status: TaskStatuses.Completed,todoListId:"todolistId2",description:'',
                startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,todoListId:"todolistId2",description:'',
                startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
        ]
    },
    app:{
        error:null,
        status:"idle"
    }

};

export const storyBookStore = createStore(rootReducer,initialGlobalState)

export const ReduxStoreProviderDecoration = (storyFn:any) => {
    return(
        <Provider
            store={storyBookStore}>{storyFn()}
        </Provider>
    )
}