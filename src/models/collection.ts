type CollectionPreviewProps = {
  id?: number;
  title: string;
  routeName: string;
  items: CollectionItemProps[];
};

export type CollectionItemProps = {
  id?: number;
  name: string;
  imageUrl: string;
  price: number;
};

export default CollectionPreviewProps;
