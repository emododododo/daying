import React from 'react';
import styles from './nav.css';

const itemNav = [{
  title: '知乎日报',
  id: 'dailyZhihu',
}, {
  title: '简书',
  id: 'jianshu',
}, {
  title: '前端',
  id: 'qianduan',
}, {
  title: 'github',
  id: 'github',
}, {
  title: 'cnblogs',
  id: 'cnblogs',
}, {
  title: 'csdn',
  id: 'csdn',
}, {
  title: 'wanqu',
  id: 'wanqu',
}, {
  title: 'ithome',
  id: 'ithome',
}, {
  title: 'solidot',
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
    });
    this.props.onChangeTitle(itemNav[index].id);
  }

  render() {
    const isSelected = this.state.isSelected;
    const isFolded = this.state.isFolded;
    const listClassName = isFolded ? styles.list : styles['list--active'];
    const onClickWrapper = this.onClickWrapper.bind(this);
    const onChangeTitle = this.onChangeTitle.bind(this);

    return (
      <div onClick={onClickWrapper}>
        <p>{itemNav[isSelected].title}</p>
        <ul className={listClassName}>
          {
            itemNav.map((item, index) => {
              const onChange = () => {
                onChangeTitle(index);
              };
              return <li key={index} onClick={onChange} ><a>{item.title}</a></li>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default Nav;
