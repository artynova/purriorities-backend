export type CaseSettings = {
    price: number;
    rarePercentage: number;
    legendaryPercentage: number;
};

export type WeightedOption<T> = {
    option: T;
    weight: number;
};
