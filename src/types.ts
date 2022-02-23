export type updatableTodoData = boolean | string

export enum TodoKeys {
    text = 'text',
    isCompleted = 'isCompleted'
}

export interface Todo {
    id: string
    text: string
    isCompleted: boolean
    dateCreated: Date
}