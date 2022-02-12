export enum filterOrders {
    ascending = 'ascending',
    descending = 'descending'
}

export interface FilterOption {
    enabled: boolean
    order: filterOrders.ascending | filterOrders.descending
}

export interface FilterOptions {
    date: FilterOption
    name: FilterOption
}