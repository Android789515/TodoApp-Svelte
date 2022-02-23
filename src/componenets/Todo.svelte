<script lang='ts'>
    import { afterUpdate } from 'svelte'

    import { todos } from '../todos'
    import { todoKeys } from '../types'

    export let id
    export let text
    export let isCompleted

    const toggleCompleted = () => {
        todos.updateTodo(id, todoKeys.isCompleted, !isCompleted)
    }

    const updateText = (event: InputEvent) => {
        const { target: { textContent: text } } = event
        todos.updateTodo(id, todoKeys.text, text)
    }

    const setCursorAtEnd = ({ target: todoText }: { target: HTMLParagraphElement }) => {
        const range = document.createRange()
        const selection = window.getSelection()
        const textLength = todoText.textContent.length

        range.setStart(todoText, textLength)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
    }

    const afterTwoSeconds = 2400
    afterUpdate(() => setTimeout(todos.clearTodos, afterTwoSeconds))
</script>

<li
    class='todo'
    class:completed={isCompleted}
    aria-label='Todo'
    role='listitem'
>
    <input
        class='checkbox popout clickable'
        type='checkbox'
        role='checkbox'
        bind:checked={isCompleted}
        on:click={toggleCompleted}
    >

    <p
        class='text popout contentEditable'
        contenteditable='true'
        aria-label='Editable todo text'
        role='textbox'
        on:input={updateText}
        on:focus={setCursorAtEnd}
        on:pointerdown={setCursorAtEnd}
    >
        {text}
    </p>
</li>

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