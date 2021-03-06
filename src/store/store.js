import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import rootSaga from "./saga";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'

const sagaMiddleWare = createSagaMiddleware()
const store = createStore(reducer,composeWithDevTools(applyMiddleware(...[sagaMiddleWare])))
sagaMiddleWare.run(rootSaga)

export default store