type FilterNameValue = {
    name: string;
    value: string;
    brand: number;
}
type FilterOrder = {
    ordering: string;
}

type FilterSetNameValue = FilterNameValue[];
type FilterSetOrdering = FilterOrder[];
export type { FilterNameValue,FilterOrder };
