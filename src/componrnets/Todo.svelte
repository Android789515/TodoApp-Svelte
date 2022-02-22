<script lang='ts'>
    import { afterUpdate } from 'svelte'
    import type { updatableTodoData } from '../types'

    export let id
    export let text
    export let isCompleted
    export let clearTodos: () => void
    export let updateTodo: (id: string, whatToUpdate: updatableTodoData, newData: updatableTodoData) => void

    const todoData =  {
        id: 'id',
        text: 'text',
        isCompleted: 'isCompleted'
    }

    const toggleCompleted = () => {
        updateTodo(id, todoData.isCompleted, !isCompleted)
    }

    const updateText = (event: InputEvent) => {
        const { target: { textContent: text } } = event
        updateTodo(id, todoData.text, text)
    }

    const afterTwoSeconds = 2400
    afterUpdate(() => setTimeout(clearTodos, afterTwoSeconds))
</script>

<div class='todo' class:completed={isCompleted}>
    <input
        type='checkbox'
        class='checkbox popout clickable'
        bind:checked={isCompleted}
        on:click={toggleCompleted}
    >

    <p
        class='text popout contentEditable'
        contenteditable='true'
        on:input={updateText}
    >
        {text}
    </p>
</div>

<style>
/* Keeps brs from showing up in the to-do */
    br {
        display: none;
    }

    .todo {
        word-break: break-word;

        display: flex;
        align-items: center;
    }

    .checkbox {
        appearance: none;

        padding: .5em;
        margin-right: 1em;

        border-top: 0;
        border-right: 0;
    }

    .checkbox:checked {
        --custom-border: #0b3366;
        --custom-bg: #1a73e8;

        background: var(--custom-bg);
        border-bottom: solid var(--custom-border) 2px;
        border-left: solid var(--custom-border) 3px;
    }
    .checkbox:checked::after {
        content: '✔';

        display: block;
        position: absolute;

        color: #fff;

        margin: -.69em 0 0 -.44em;
    }

    .text {
        width: 100%;

        padding: .25em .5em .25em .25em;
        margin: 0;
    }

    .text:focus {
        outline: none;
    }
</style>