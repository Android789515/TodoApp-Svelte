<script lang='ts'>
    export let createTodo

    let text = ''

    const clearText = () => text = ''

    const handleKeyDown = (event: KeyboardEvent) => {
        const { key: keyPressed } = event

        const enterKey = 'Enter'
        if (keyPressed === enterKey) {
            if (text) {
                createTodo(text)
            }
            clearText()
        }
    }
</script>

<div class='add-todo'>
    <input
        type='text'
        placeholder='Enter a todo'
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