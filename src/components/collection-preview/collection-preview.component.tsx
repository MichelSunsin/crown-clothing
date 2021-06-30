import { ReactElement } from 'react';

import CollectionPreviewProps from 'models/collection';

import CollectionItem from 'components/collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }: CollectionPreviewProps): ReactElement => (
  <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {items
        .filter((_, idx: number) => idx < 4)
        .map(({ id, ...otherItemProps }) => (
          <CollectionItem key={id} {...otherItemProps} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
