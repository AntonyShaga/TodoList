import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer, updateTaskAC
} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC, SetTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {TasksStateType} from "../../app/App";

const startState: TasksStateType = {
    "todolistId1": [
        {id: "1", title: "CSS", status: TaskStatuses.New,todoListId:"todolistId1",description:'',
            startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
        {id: "2", title: "JS", status: TaskStatuses.Completed,todoListId:"todolistId1",description:'',
            startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
        {id: "3", title: "React", status: TaskStatuses.Completed,todoListId:"todolistId1",description:'',
            startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low}
    ],
    "todolistId2": [
        {id: "1", title: "bread", status: TaskStatuses.New,todoListId:"todolistId2",description:'',
            startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
        {id: "2", title: "milk", status: TaskStatuses.Completed,todoListId:"todolistId2",description:'',
            startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
        {id: "3", title: "tea", status: TaskStatuses.New,todoListId:"todolistId2",description:'',
            startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low}
    ]
};

test('correct task shoud be deleted from correct arrey', () => {


    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState,action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every(t=>t.id != "2")).toBeTruthy()
})

test('correct task shoud be added to correct arrey', () => {

    //const action = addTaskAC("juce", "todolistId2");
    const action = addTaskAC({
        id:"",
        todoListId: "todolistId2",
        description: "bl",
        status:TaskStatuses.New,
        priority: 3,
        title: "juce",
        addedDate:"",
        deadline: '',
        order: 0,
        startDate:""
    });

    const endState = tasksReducer(startState,action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)

})
test('status of specified task should be changed', () => {

    const action = updateTaskAC("2", {status:TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState,action)

    expect(endState["todolistId2"][1].status).toBeFalsy()
    expect(endState["todolistId1"][1].status).toBeTruthy()
})
test('title of specified task should be changed', () => {

    const action = updateTaskAC("2", {title:"Milkyway"}, "todolistId2");

    const endState = tasksReducer(startState,action)

    expect(endState["todolistId2"][1].title).toBe("Milkyway")
    expect(endState["todolistId1"][1].title).toBe("JS")
})
test('new property with new array should be added when new todolist is added', () => {

    const action = AddTodolistAC({
        id: "string",
        title: "",
        addedDate: "",
        order: 0,
    });

    const endState = tasksReducer(startState,action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k=> k != "todolistId1" && k != "todolistId2")

    if (!newKey) {
        throw Error("new key shold be added")
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState,action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).toBeUndefined()
})

test ('emty arrays shoud be added when we set todolists', () => {
    const action = SetTodolistsAC([
        {id:"1",title:"title 1", order:0, addedDate:""},
        {id:"2",title:"title 2", order:0, addedDate:""}
    ])

    const endState = tasksReducer({},action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test ('tasks should be added for todolists', () => {
    const action = setTasksAC(startState["todolistId1"],"todolistId1")

    const endState = tasksReducer({
        "todolistId2":[],
        "todolistId1":[]
    },action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})
