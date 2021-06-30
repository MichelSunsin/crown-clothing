import { useHistory, useRouteMatch } from 'react-router-dom';

import MenuItemProps from 'models/menu-item';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl }: MenuItemProps): JSX.Element => {
  const history = useHistory();
  const match = useRouteMatch();
  return (
    <button
      type='button'
      className={`menu-item ${size || ''}`}
      onClick={() => history.push(match.url + linkUrl)}
    >
      <div style={{ backgroundImage: `url(${imageUrl})` }} className='background-image' />
      <div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </button>
  );
};

export default MenuItem;
