'use strict';

var React = require('react-native');
var FAKE_BOOK_DATA = [{
  volumeInfo: {
    title: 'The Catcher in the Rye',
    authors: "J. D. Salinger",
    imageLinks: { thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }
  }
}];
var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';

var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
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
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }
  // 当组件被加载到 UI 视图时，会调用 componentDidMount()函数。
  // 该函数一旦被调用，我们用数据对象中的数据来设置 datasource 属性。
  componentDidMount() {
    // var books = FAKE_BOOK_DATA;
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(books)
    // });
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.items),
        isLoading: false
      });
    })
    .done();
    // 由于不能访问Google数据，故增加如下代码防止不能获取数据
    var theThis = this;
    setTimeout(function (){
      if (theThis.state.isLoading) {
        var books = FAKE_BOOK_DATA;
        theThis.setState({
          dataSource: theThis.state.dataSource.cloneWithRows(books),
          isLoading: false
        });
      }
    }, 2000);
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

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS size='large'/>
        <Text>
          Loading books...
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }
    // var book = FAKE_BOOK_DATA[0];
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
