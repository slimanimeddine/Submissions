/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'

const start = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}

start()