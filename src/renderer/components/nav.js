import React from 'react';
import styles from './nav.css';

const itemNav = [{
  title: '知乎日报',
  id: 'dailyZhihu',
}, {
  title: '前端',
  id: 'qianduan',
}, {
  title: '博客园',
  id: 'cnblogs',
}, {
  title: 'csdn',
  id: 'csdn',
}, {
  title: '湾区',
  id: 'wanqu',
}, {
  title: 'IT之家',
  id: 'ithome',
}, {
  title: 'solidot奇客',
  id: 'solidot',
}];

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 0,
      isFolded: true,
    };
  }

  onClickWrapper() {
    const isFolded = this.state.isFolded;
    this.setState({
      isFolded: !isFolded,
    });
  }

  onChangeTitle(index) {
    this.setState({
      isSelected: index,
      isFolded: !this.state.isFolded,
    });
    this.props.onChangeTitle(itemNav[index].id);
  }

  render() {
    const isSelected = this.state.isSelected;
    const isFolded = this.state.isFolded;

    let listClassName = '';
    let arrowActive = '';
    let borderArrowActive = '';

    if (!isFolded) {
      listClassName = styles['list-wrapper--active'];
      arrowActive = styles['arrow--active'];
      borderArrowActive = styles['border-arrow--active'];
    }

    const onClickWrapper = this.onClickWrapper.bind(this);
    const onChangeTitle = this.onChangeTitle.bind(this);

    return (
      <div className={styles.nav}>
        <div className={styles['title-wrapper']} onClick={onClickWrapper}>
          <p className={styles.title}>{itemNav[isSelected].title}</p>
          <img className={`${styles.arrow} ${arrowActive}`} src="../assets/arrow_down.png" alt="" />
        </div>
        <img className={`${styles['border-arrow']} ${borderArrowActive}`} src="../assets/modal_arrow.svg" alt="" />
        <div className={`${styles['list-wrapper']} ${listClassName}`}>
          <ul className={styles.list}>
            {
              itemNav.map((item, index) => {
                const activeClass = isSelected === index ? styles['list-title-active'] : '';
                const onChange = () => {
                  onChangeTitle(index);
                };
                return <li className={`${styles['list-title']} ${activeClass}`} key={index} onClick={onChange} ><a>{item.title}</a></li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
