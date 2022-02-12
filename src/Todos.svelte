<script lang='ts'>
    import type { updatableTodoData } from '../types/updatableTodoData'

    import Todo from './Todo.svelte'

    export let todos
    export let clearTodos: () => void
    export let updateTodo: (id: string, whatToUpdate: updatableTodoData, newData: updatableTodoData) => void
</script>

<div class='todos'>
    {#if todos}
        {#each todos as { id, text, isCompleted } (id)}
            <Todo {id} {text} {isCompleted} {clearTodos} {updateTodo} />
        {/each}
    {/if}
</div>

<style>
    .todos {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 1em;
        justify-content: center;

        width: 100%;

        margin-bottom: 3em;
    }
</style>