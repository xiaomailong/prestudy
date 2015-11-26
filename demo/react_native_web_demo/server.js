import App from './components/App'
import React, { StyleSheet } from 'react-native-web'

const html = React.renderToString(<App />);
const css = StyleSheet.renderToString();

const Html = () => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta content="initial-scale=1,width=device-width" name="viewport" />
      <style id="react-stylesheet" dangerouslySetInnerHTML={{ __html: css } />
    </head>
    <body>
      <div id="react-root" dangerouslySetInnerHTML={{ __html: html }} />
    </body>
  </html>
)
