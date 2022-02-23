import { writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

import type { Todo, updatableTodoData } from './types'
import type { TodoKeys } from './types'

const createStore = () => {
    const todos = writable<Todo[]>([])
    const { subscribe, update, set } = todos

    let initialized = false
    const initialize = (todos: Todo[]) => {
        if (!initialized) {
            initialized = true
            set(todos)
        }
    }

    const addTodo = (text: string) => {
        const newTodo = {
            id: uuid(),
            text,
            isCompleted: false,
            dateCreated: new Date()
        }
        update(todos => [...todos, newTodo])
    }

    const clearTodos = () => {
        update(todos => todos.filter(todo => {
            const todosToKeep = todo.text && !todo.isCompleted
            return todosToKeep
        }))
    }

    const updateTodo = (id: string, whatToUpdate: TodoKeys, newData: updatableTodoData) => {
        update(todos => todos.map(todo => {
            const isTodoToUpdate = id === todo.id
            if (isTodoToUpdate) {
                return { ...todo, [whatToUpdate]: newData }
            }

            return todo
        }))
    }

    const compareTodoText = (todo1: Todo, todo2: Todo) => {
        return todo1.text.localeCompare(todo2.text)
    }

    const sortByName = () => {
        update(todos => [...todos].sort(compareTodoText))
    }

    const compareTodoDates = (todo1: Todo, todo2: Todo) => {
        if (todo1.dateCreated < todo2.dateCreated) return -1
        if (todo1.dateCreated > todo2.dateCreated) return 1
        return 0
    }

    const sortByDate = () => {
        update(todos => [...todos.sort(compareTodoDates)])
    }

    const flipOrder = () => {
        update(todos => [...todos].reverse())
    }

    return {
        subscribe,
        initialize,
        addTodo,
        clearTodos,
        updateTodo,
        sortByName,
        sortByDate,
        flipOrder
    }
}

export const todos = createStore()