import App from './components/App'
import React, { StyleSheet } from 'react-native-web'
import ReactDOM from 'react-dom'

const reactRoot = document.getElementById('react-root')
const reactStyleSheet = document.getElementById('react-stylesheet')

ReactDOM.render(<App />, reactRoot)
reactStyleSheet.textContent = StyleSheet.renderToString()
