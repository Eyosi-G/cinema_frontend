import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import rootSaga from "./saga";
import createSagaMiddleware from 'redux-saga'

const sagaMiddleWare = createSagaMiddleware()
const store = createStore(reducer,applyMiddleware(...[sagaMiddleWare]))
sagaMiddleWare.run(rootSaga)

export default store