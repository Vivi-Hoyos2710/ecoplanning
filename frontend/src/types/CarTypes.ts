type Car = {
  user: number;
  brand: number;
  brand__name: string;
  license_plate: string;
  model: number;
};
type CarInfo = {
  id:number;
  user: number;
  brand: number;
  brand__name: string;
  license_plate: string;
  model: number;
  model__name: string;
};
type DriverFormData = {
  carModel : string;
  origin: string;
  destination: string;
  battery : string;
}
export type { Car,CarInfo, DriverFormData };
