import React, { Image, StyleSheet, Text, View } from 'react-native-web'

const Title = ({ children }) => <Text style={styles.title}>{children}</Text>

const Summary = ({ children }) => (
  <View style={styles.text}>
    <Text style={styles.subtitle}>{children}</Text>
  </View>
)

class App extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Image
          source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
          style={styles.image}
        />
        <Title>React Native Web</Title>
        <Summary>Build high quality web apps using React</Summary>
      </View>
    )
  },
})

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 40
  },
  image: {
    height: 40,
    marginRight: 10,
    width: 40,
  },
  text: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '1rem'
  }
})
