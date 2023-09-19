type FilterNameValue = {
    id: number|null;
    name: string;
    brand: number|null;
}
type FilterNameValueBrandModel = {
    id: number|null;
    name: string;

}
type FilterOrder = {
    ordering: string;
}


export type { FilterNameValue,FilterOrder,FilterNameValueBrandModel};
