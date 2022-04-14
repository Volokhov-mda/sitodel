export interface IGalleryCard extends IGalleryModel {
  onEditButtonClick?: (item: IGalleryModel) => void;
  onDeleteButtonClick?: (item: IGalleryModel) => void;
}

export interface IGalleryModel {
  name: string;
  description: string;
  image_url: string;
  id: number;
}

export const emptyGallery:IGalleryModel = {
  name: "",
  description: "",
  image_url: "",
  id: 0,
};
