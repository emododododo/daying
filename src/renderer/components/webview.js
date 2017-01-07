import React from 'react';
import styles from './webview.css';

const openExternal = require('electron').remote.shell.openExternal;

class Webview extends React.Component {

  constructor() {
    super();
    this.state = {
      // isLoading: false,
      webviewCanGoBack: false,
    };
  }

  componentDidMount() {
    const webviewElement = document.getElementById('foo');

    // 站外链接用默认浏览器打开
    webviewElement.addEventListener('new-window', (e) => {
      openExternal(e.url);
    });

    // webviewElement.addEventListener('will-navigate', () => {
    //   this.setState({
    //     isLoading: true,
    //   });
    // });

    webviewElement.addEventListener('did-navigate', () => {
      this.setState({
        // isLoading: false,
        webviewCanGoBack: webviewElement.canGoBack(),
      });
    });

    this.onGoBack = () => {
      webviewElement.goBack();
    };
  }

  render() {
    const itemList = this.props;
    // const isLoading = this.state.isLoading;
    // const loadingClassName = isLoading ? styles['loading--active'] : '';
    const arrowActive = '';
    return (
      <div className={styles.wrapper}>
        <div className={styles['webview-bar']}>
          <img className={`${styles.goBack} ${arrowActive}`} src="../assets/arrow_left.png" alt="" />
          <img className={`${styles.goForward} ${arrowActive}`} src="../assets/arrow_left.png" alt="" />
          <img className={`${styles.reload} ${arrowActive}`} src="../assets/reload.png" alt="" />
          <img className={`${styles.browser} ${arrowActive}`} src="../assets/browser.png" alt="" />
        </div>
        <webview className={styles.webview} id="foo" src={itemList.url} />
      </div>
    );
  }
}

export default Webview;
