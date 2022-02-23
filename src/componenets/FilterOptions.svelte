<script lang='ts'>
    import { filters } from '../filters'

    // Note that this is valid; the Svelte plugin
    // for Webstorm is outdated.
    $: ({ name, date, order } = $filters)
</script>

<h4>Sort by</h4>

<ul class='unstyledUl filter-options' aria-label='Filter options' role='list'>

    <li class='clickable' on:click={filters.filterByName}>
        Name
    </li>

    <li class='clickable' on:click={filters.filterByDate}>
        Date
    </li>

    <li class='clickable' on:click={filters.flipOrder}>
        Order: {order}
    </li>
</ul>

<style>
    .filter-options {
        list-style: none;

        display: flex;
        justify-content: space-between;

        padding: 0;
        margin-bottom: 2em;
    }
</style>