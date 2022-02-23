<script lang='ts'>
    import { todos } from '../todos'

    let text = ''

    const clearText = () => text = ''

    const handleKeyDown = (event: KeyboardEvent) => {
        const { key: keyPressed } = event

        const enterKey = 'Enter'
        if (keyPressed === enterKey) {
            if (text) {
                todos.addTodo(text)
            }
            clearText()
        }
    }
</script>

<div class='add-todo'>
    <input
        type='text'
        placeholder='Enter a todo'
        aria-label='Enter a todo'
        role='textbox'
        bind:value={text}
        on:keydown={handleKeyDown}
    >
</div>

<style>
    .add-todo {
        display: block;

        margin: auto;
    }
</style>