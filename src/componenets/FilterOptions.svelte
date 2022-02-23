<script lang='ts'>
    import { todos } from '../todos'

    enum SortOrders {
        ascending = 'Ascending',
        descending = 'Descending'
    }

    let order = SortOrders.ascending

    const sort = (sortFunc) => {
        sortFunc()
        // Sort will change order so this sets it back
        if (order === SortOrders.descending) {
            todos.flipOrder()
        }
    }

    const setOrder = () => {
        order = order === SortOrders.ascending ? SortOrders.descending : SortOrders.ascending
        todos.flipOrder()
    }
</script>

<h4 class='sort-by'>Sort by</h4>

<ul class='unstyledUl filter-options popout' aria-label='Filter options' role='list'>

    <li class='clickable' on:click={() => sort(todos.sortByName)}>
        Name
    </li>

    <li class='clickable' on:click={() => sort(todos.sortByDate)}>
        Date
    </li>

    <li class='clickable' on:click={setOrder}>
        Order: {order}
    </li>
</ul>

<style>
    .sort-by {
        margin-bottom: .5em;
    }

    .filter-options {
        list-style: none;

        display: flex;
        justify-content: space-between;

        padding: .25em .5em;
        margin-bottom: 2em;
    }
</style>