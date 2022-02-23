import { writable } from 'svelte/store'

enum filterOrders {
    ascending = 'ascending',
    descending = 'descending'
}

export interface Filters {
    date: boolean
    name: boolean
    order: filterOrders
}

const createFilters = () => {
    const filters = writable<Filters>({
        date: true,
        name: false,
        order: filterOrders.descending
    })
    const { subscribe, update } = filters

    const filterByDate = () => update(prevFilters => {
        return { ...prevFilters, date: true, name: false }
    })

    const filterByName = () => update(prevFilters => {
        return { ...prevFilters, name: true, date: false }
    })

    const flipOrder = () => update(prevFilters => {
        const isOrderDescending = prevFilters.order === filterOrders.descending
        if (isOrderDescending) {
            return { ...prevFilters, order: filterOrders.ascending }
        } else {
            return { ...prevFilters, order: filterOrders.descending }
        }
    })

    return {
        subscribe,
        filterByName,
        filterByDate,
        flipOrder
    }
}

export const filters = createFilters()