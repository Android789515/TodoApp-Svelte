import { writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

import type { Todo, updatableTodoData } from './types'
import type { todoKeys } from './types'

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

    const updateTodo = (id: string, whatToUpdate: todoKeys, newData: updatableTodoData) => {
        update(todos => todos.map(todo => {
            const isTodoToUpdate = id === todo.id
            if (isTodoToUpdate) {
                return { ...todo, [whatToUpdate]: newData }
            }

            return todo
        }))
    }

    return {
        subscribe,
        initialize,
        addTodo,
        clearTodos,
        updateTodo
    }
}

export const todos = createStore()