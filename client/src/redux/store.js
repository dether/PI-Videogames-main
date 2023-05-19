import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk"
import reducer from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta linea sirve para conectar nuestra APP con la extension REDUX DEVTOOL DEL NAVEGADOR  

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))// esta linea sirve para que podamos hacer peticiones a una api/servidor (es nuestro)
    );

export default store;