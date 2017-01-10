import React from 'react';
import styles from './list.css';
import Loading from './loading';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  shouldComponentUpdate() {
    this.setState({
      active: 0,
    });
    return true;
  }

  onClickHandler(e, url, index) {
    this.setState({
      active: index,
    });
    this.props.gotoUrl(e, url);
  }

  render() {
    const { isLoadingList, list } = this.props;
    return (
      <Loading isLoading={isLoadingList}>
        <div className={styles.list}>
          <ul>
            {
              list.map((item, index) => {
                const classActive = this.state.active === index ? styles['item--active'] : '';
                return (
                  <li className={`${styles['list-item']} ${classActive}`} key={index}>
                    <p onClick={e => this.onClickHandler(e, item.url, index)}>
                      {item.title}
                    </p>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </Loading>
    );
  }
}

export default List;
