import React from 'react';
import styles from './webview.css';

const openExternal = require('electron').remote.shell.openExternal;

class Webview extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      webviewCanGoBack: false,
    };
  }

  componentDidMount() {
    const webviewElement = document.getElementById('foo');

    // 站外链接用默认浏览器打开
    webviewElement.addEventListener('new-window', (e) => {
      openExternal(e.url);
    });

    webviewElement.addEventListener('will-navigate', () => {
      this.setState({
        isLoading: true,
      });
    });

    webviewElement.addEventListener('did-navigate', () => {
      this.setState({
        isLoading: false,
        webviewCanGoBack: webviewElement.canGoBack(),
      });
    });

    this.onGoBack = () => {
      webviewElement.goBack();
    };
  }

  render() {
    const itemList = this.props;
    const isLoading = this.state.isLoading;
    const loadingClassName = isLoading ? styles['loading--active'] : '';

    return (
      <div className={styles.wrapper}>
        <webview className={styles.webview} id="foo" src={itemList.url} />
        <button className={styles.button} onClick={this.onGoBack}>back</button>
        <div className={`${styles.loading} ${loadingClassName}`}>{isLoading}</div>
      </div>
    );
  }
}

export default Webview;
