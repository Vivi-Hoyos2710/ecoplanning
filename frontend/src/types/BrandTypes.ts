import { Model } from './ModelTypes';
type Brand = {
  id: number;
  name: string;
};

type BrandInfo = {
  name: string;
};
type BrandModel = {
  id: number;
  name: string;
  models: Model[];
};

export type { Brand, BrandInfo, BrandModel };
