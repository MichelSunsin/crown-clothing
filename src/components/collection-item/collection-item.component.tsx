import { CollectionItemProps } from 'models/collection';

import './collection-item.styles.scss';

const CollectionItem = ({ name, price, imageUrl }: CollectionItemProps): JSX.Element => (
  <div className='collection-item'>
    <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
    <div className='collection-footer'>
      <span className='name'>{name}</span>
      <span className='price'>{price}</span>
    </div>
  </div>
);

export default CollectionItem;
