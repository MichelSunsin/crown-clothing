import { useState } from 'react';

import CollectionPreviewProps from 'models/collection';

import CollectionPreview from 'components/collection-preview/collection-preview.component';

import SHOP_DATA from './shop.data.js';

const Shop = (): JSX.Element => {
  const [collection] = useState<CollectionPreviewProps[]>(SHOP_DATA);

  return (
    <div className='shop-page'>
      {collection.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default Shop;
