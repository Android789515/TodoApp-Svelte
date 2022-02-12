export interface FilterOption {
    enabled: boolean
    order: 'ascending' | 'descending'
}

export interface FilterOptions {
    date: FilterOption
    name: FilterOption
}