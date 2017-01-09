import React from 'react';
import styles from './webview.css';

const openExternal = require('electron').remote.shell.openExternal;
const arrowLeft = require('../assets/arrow_left.png');
const reload = require('../assets/reload.png');
const browser = require('../assets/browser.png');

class Webview extends React.Component {

  constructor() {
    super();
    this.state = {
      canGoBack: false,
      canGoForward: false,
    };
  }

  componentDidMount() {
    const webviewElement = document.getElementById('foo');

    // 站外链接用默认浏览器打开
    webviewElement.addEventListener('new-window', (e) => {
      openExternal(e.url);
    });

    webviewElement.addEventListener('did-navigate', () => {
      this.setState({
        canGoBack: webviewElement.canGoBack(),
        canGoForward: webviewElement.canGoForward(),
      });
    });

    this.onGoBack = () => {
      webviewElement.goBack();
    };

    this.onGoForward = () => {
      webviewElement.goForward();
    };

    this.onReload = () => {
      webviewElement.reload();
    };
  }

  componentWillReceiveProps() {
    const webviewElement = document.getElementById('foo');
    this.setState({
      canGoBack: webviewElement.canGoBack(),
    });
  }

  onBrowser() {
    const url = this.props.url;
    if (url && url !== '#') {
      openExternal(url);
    }
  }

  render() {
    const itemList = this.props;
    const url = itemList.url || '#';
    const goBackClassNames = this.state.canGoBack ? `${styles.goBack} ${styles.canGoBack}` : styles.goBack;
    const goForwardClassNames = this.state.canGoForward ? `${styles.goForward} ${styles.canGoForward}` : styles.goForward;
    let reloadClassNames = styles.reload;
    let browserClassNames = styles.browser;
    const onBrowser = this.onBrowser.bind(this);
    if (url && url !== '#') {
      reloadClassNames = `${styles.reload} ${styles['icon-active']}`;
      browserClassNames = `${styles.browser} ${styles['icon-active']}`;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles['webview-bar']}>
          <a onClick={this.onGoBack} className={styles['goBack-wrapper']}><img className={goBackClassNames} src={arrowLeft} alt="" /></a>
          <a onClick={this.onGoForward} className={styles['goForward-wrapper']}><img className={goForwardClassNames} src={arrowLeft} alt="" /></a>
          <a onClick={this.onReload} className={styles['reload-wrapper']}><img className={reloadClassNames} src={reload} alt="" /></a>
          <a onClick={onBrowser} className={styles['browser-wrapper']}><img className={browserClassNames} src={browser} alt="" /></a>
        </div>
        <webview className={styles.webview} id="foo" src={url} />
      </div>
    );
  }
}

export default Webview;
