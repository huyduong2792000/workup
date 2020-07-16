import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import RootReducer from './RootReducer'
import createSagaMiddleware from 'redux-saga' 
import RootSaga from './RootSaga'

const sagaMiddleware = createSagaMiddleware() 


const store = createStore(
    RootReducer,
    applyMiddleware(
        sagaMiddleware
      )
    );
sagaMiddleware.run(RootSaga)
export default store;