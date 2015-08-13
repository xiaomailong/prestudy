'use strict';

var React = require('react-native');
var FAKE_BOOK_DATA = [{
  volumeInfo: {
    title: 'The Catcher in the Rye',
    authors: "J. D. Salinger",
    imageLinks: { thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }
  }
}];

var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  thumbnail: {
    flex: 1,
    width: 53,
    height: 81,
    marginRight: 10
  },
  rightContainer: {
    flex: 1,
    backgroundColor: 'red'
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  author: {
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  }
});

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    var books = FAKE_BOOK_DATA;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(books)
    });
  }

  renderBook(book) {
    return (
      <TouchableHighlight>
        <View>
          <View style={styles.container}>
            <Image
              source={{uri: book.volumeInfo.imageLinks.thumbnail}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{book.volumeInfo.title}</Text>
              <Text style={styles.author}>{book.volumeInfo.authors}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    var book = FAKE_BOOK_DATA[0];
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBook.bind(this)}
        style={styles.listView}
      />
    );
  }

}

module.exports = BookList;
