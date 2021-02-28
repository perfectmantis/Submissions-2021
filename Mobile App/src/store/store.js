import reducers from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';


export default Store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
