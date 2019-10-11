import TaskController from '../controllers/TaskController';

export const actionTypes = {
  ADD_TASK_REQUEST: 'ADD_TASK_REQUEST',
  ADD_TASK_SUCCESS: 'ADD_TASK_SUCCESS',
  ADD_TASK_ERROR: 'ADD_TASK_ERROR',
  DELETE_TASK_REQUEST: 'DELETE_TASK_REQUEST',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
  DELETE_TASK_ERROR: 'DELETE_TASK_ERROR',
  UPDATE_TASK_REQUEST: 'UPDATE_TASK_REQUEST',
  UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
  UPDATE_TASK_ERROR: 'UPDATE_TASK_ERROR',
  SHOW_TASK_REQUEST: 'SHOW_TASK_REQUEST',
  SHOW_TASK_SUCCESS: 'SHOW_TASK_SUCCESS',
  SHOW_TASK_ERROR: 'SHOW_TASK_ERROR',
};

const addTaskRequest = () => ({
    type: actionTypes.ADD_TASK_REQUEST,
});

const addTaskSuccess = (task) => ({
    type: actionTypes.ADD_TASK_SUCCESS,
    task
});

const addTaskError = (task) => ({
    type: actionTypes.ADD_TASK_SUCCESS,
    task
});

const deleteTaskRequest = () => ({
    type: actionTypes.DELETE_TASK_REQUEST,
});

const deleteTaskSuccess = (task) => ({
    type: actionTypes.DELETE_TASK_SUCCESS,
    task
});

const deleteTaskError = (task) => ({
    type: actionTypes.DELETE_TASK_ERROR,
    task
});

const updateTaskRequest = () => ({
    type: actionTypes.UPDATE_TASK_REQUEST,
});

const updateTaskSuccess = (task) => ({
    type: actionTypes.UPDATE_TASK_SUCCESS,
    task
});

const updateTaskError = (task) => ({
    type: actionTypes.UPDATE_TASK_ERROR,
    task
});

const showTaskRequest = () => ({
    type: actionTypes.SHOW_TASK_REQUEST,
});

const showTaskSuccess = (task) => ({
    type: actionTypes.SHOW_TASK_SUCCESS,
    task
})

const showTaskError = (task) => ({
    type: actionTypes.SHOW_TASK_ERROR,
    task
})

export const addTask = (token,text) => async(dispatch) => {
    dispatch(addTaskRequest());
    try{
        const task = await TaskController.store(token,text);
        // console.log(task)
        dispatch(addTaskSuccess(task))
    }catch(error){
        dispatch(addTaskError(error))
    }
};

export const updateTask = (token, text, id) => async(dispatch) => {
    dispatch(updateTaskRequest());
    try{
        const task = await TaskController.update(token, text, id);
        dispatch(updateTaskSuccess(task));
    }catch(error){
        dispatch(updateTaskError(error));
    }
};

export const showTask = (token) => async(dispatch) => {
    dispatch(showTaskRequest());
    try{
        const task = await TaskController.index(token);
        dispatch(showTaskSuccess(task))
    }catch(error){
        dispatch(showTaskError(error))
    }
};

export const deleteTask = (token, id) => async(dispatch) => {
    dispatch(deleteTaskRequest());
    try{
        const task = await TaskController.delete(token, id);
        dispatch(deleteTaskSuccess(task))
        
    }catch(error){
        dispatch(deleteTaskError(error))
    }
};
