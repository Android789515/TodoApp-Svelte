<script lang='ts'>
    import AppTitle from './componrnets/AppTitle.svelte'
    import TodosManager from './componrnets/TodosManager.svelte'
</script>

<main class='app'>
    <AppTitle />

    <TodosManager />
</main>

<style>
    :global(.popout) {
        --dark-border: #b3ad00;
        --light-bg: #fff700;

        padding-left: .125em;
        background: var(--light-bg);
        border-bottom: solid var(--dark-border) 2px;
        border-left: solid var(--dark-border) 3px;
        border-radius: 0;
    }

    .app {
        --side-space: minmax(2em, 1fr);

        display: grid;
        grid-template-columns: var(--side-space) auto var(--side-space);
        justify-content: center;

        max-width: 38.9375em;

        padding-top: 5em;
        margin: auto;
    }

    :global(.app > *) {
        grid-column: 2 / -2;
    }

    @media (min-width: 24.375em) {
        .app {
            grid-template-columns: var(--side-space) 70% var(--side-space);
        }
    }
</style>