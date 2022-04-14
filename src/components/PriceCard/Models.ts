export interface IPriceCard extends IPriceModel {
  onEditButtonClick?: (item: IPriceModel) => void;
  onDeleteButtonClick?: (item: IPriceModel) => void;
}

export interface IPriceModel {
  price: string;
  name: string;
  description: string;
  id?: number;
}

export const emptyPriceCard:IPriceModel = {
  price: "",
  name: "",
  description: "",
  id: 0,
};
