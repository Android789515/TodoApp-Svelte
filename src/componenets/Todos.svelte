<script lang='ts'>
    import { afterUpdate, onMount } from 'svelte'

    import { todos } from '../todos'

    import Todo from './Todo.svelte'

    const loadTodos = () => {
        const todosData = localStorage.getItem('todos')
        if (todosData) {
            todos.initialize(JSON.parse(todosData))
        }
    }

    const saveTodos = () => {
        const todosData = JSON.stringify($todos)
        localStorage.setItem('todos', todosData)
    }

    onMount(loadTodos)
    afterUpdate(saveTodos)
</script>

<ul class='unstyledUl todos' aria-label='Todos' role='list'>
    {#if $todos}
        {#each $todos as { id, text, isCompleted } (id)}
            <Todo {id} {text} {isCompleted} />
        {/each}
    {/if}
</ul>

<style>
    .todos {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 1em;
        justify-content: center;

        list-style: none;

        width: 100%;

        padding: 0;
        margin-bottom: 3em;
    }
</style>