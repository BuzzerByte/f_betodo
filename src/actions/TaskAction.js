import TaskController from '../controllers/TaskController';


export const actionTypes = {
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  SHOW_TASK: 'SHOW_TASK',
};

const addTaskRequest = text => ({
    type: actionTypes.ADD_TASK,
    text
});

const deleteTaskRequest = () => ({
    type: actionTypes.DELETE_TASK,
});

const editTaskRequest = text => ({
    type: actionTypes.EDIT_TASK,
    text
});

const updateTaskRequest = text => ({
    type: actionTypes.UPDATE_TASK,
    text
});

const showTaskRequest = (task) => ({
    type: actionTypes.SHOW_TASK,
    task
});

export const addTask = (text) => async(dispatch) => {
    try{
        const task = await TaskController.store(text);
        dispatch(addTaskRequest(task));
    }catch(error){

    }
};

export const updateTask = (token, text, id) => async(dispatch) => {
    try{
        const task = await TaskController.updateTask(token, text, id);
        dispatch(updateTaskRequest(task));
    }catch(error){

    }
};

export const showTask = (token) => async(dispatch) => {
    try{
        const task = await TaskController.index(token);
        // console.log(task);
        dispatch(showTaskRequest(task))
    }catch(error){
        console.log('error retrieving data')
    }
};

export const deleteTask = (token, id) => async(dispatch) => {
    try{
        const task = await TaskController.deleteTask(token, id);
        dispatch(deleteTaskRequest())
    }catch(error){

    }
};
