<script lang='ts'>
    import { afterUpdate, onMount } from 'svelte'
    import { v4 as uuid } from 'uuid'

    import type { updatableTodoData } from '../types/updatableTodoData'
    import type { Todo } from '../types/interfaces/todoInterface'
    import type { FilterOption, FilterOptions } from '../types/interfaces/filterOptions'
    import { filterOrders } from '../types/interfaces/filterOptions'

    import Todos from './Todos.svelte'
    import AddTodo from './AddTodo.svelte'

    let todos: Todo[] = []

    const { ascending, descending } = filterOrders
    let filterOptions: FilterOptions = {
        date: { enabled: true, order: descending },
        name: { enabled: false, order: descending }
    }

    const flipOrder = (filterOption: FilterOption) => {
        const currentOrder = filterOptions[filterOption].order
        filterOptions = {
            ...filterOptions,
            [filterOption]: currentOrder === descending ? ascending : descending
        }
    }

    const filterByDate = () => {
        const { date, name } = filterOptions
        filterOptions = {
            date: { ...date, enabled: true },
            name: { ...name, enabled: false }
        }
    }

    const filterByName = () => {
        const { date, name } = filterOptions
        filterOptions = {
            date: { ...date, enabled: false },
            name: { ...name, enabled: true }
        }
    }

    const loadTodos = () => {
        const todosData = localStorage.getItem('todos')
        if (todosData) {
            todos = JSON.parse(todosData)
        }
    }

    const saveTodos = () => {
        const todosData = JSON.stringify(todos)
        localStorage.setItem('todos', todosData)
    }

    const createTodo = (text: string) => {
        todos = [...todos, {
            id: uuid(),
            text,
            isCompleted: false,
            dateCreated: new Date()
        }]
    }

    const clearTodos = () => {
        todos = todos.filter(todo => {
            const todosToKeep = todo.text && !todo.isCompleted
            return todosToKeep
        })
    }

    const updateTodo = (id: string, whatToUpdate: updatableTodoData, newData: updatableTodoData) => {
        todos = todos.map(todo => {
            const isTodoToUpdate = todo.id === id
            if (isTodoToUpdate) {
                const updatedTodo = { ...todo, [whatToUpdate]: newData }
                return updatedTodo
            }

            return todo
        })
    }

    onMount(loadTodos)
    afterUpdate(saveTodos)
</script>

<div class='todos-manager'>


    <Todos {todos} {clearTodos} {updateTodo} />

    <AddTodo {createTodo} />
</div>

<style>
    .todos-manager {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>