import React from 'react';
import styles from './loading.css';

class Loading extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loadingBarClassName: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    // handle loading
    if (nextProps.isLoading !== this.state.isLoading) {
      const loadingBarClassName = this.state.isLoading ? 'finished' : 'loading';
      this.setState({
        loadingBarClassName,
        isLoading: nextProps.isLoading,
      });
    }
  }

  render() {
    const { isLoading, bar, children, className } = this.props;
    const loadingClass = isLoading ? styles.loading : '';
    if (bar) {
      return (
        <div className={`${styles['bar-wrapper']} ${className}`}>
          <div className={`${styles[this.state.loadingBarClassName]} ${styles['loading-bar']}`} />
          {children}
        </div>
      );
    }

    return (
      <div className={`${styles.wrapper} ${loadingClass} ${className}`}>
        <div className={styles.children}>
          {children}
        </div>
        <div className={styles.left} />
        <div className={styles.right} />
      </div>
    );
  }
}

export default Loading;
