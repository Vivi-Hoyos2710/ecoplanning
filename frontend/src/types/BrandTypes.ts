import { Model } from './ModelTypes';
type Brand = {
  id: number;
  name: string;
};

type BrandInfo = {
  brand:number;
  id:number;
  name: string;
  range:number;
};
type BrandModel = {
  id: number;
  name: string;
  models: Model[];
};

export type { Brand, BrandInfo, BrandModel };
