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

    interface KeydownEvent {
        target: HTMLLIElement
        key: string
    }

    const handleKeydown = ({ target: filterOption, key }: KeydownEvent) => {
        const enterKey = 'Enter'
        if (key === enterKey) {
            filterOption.click()
        }
    }
</script>

<h4 class='sort-by'>Sort by</h4>

<ul class='unstyledUl filter-options popout' aria-label='Filter options' role='list'>

    <li class='clickable'
        tabindex='1'
        on:click={() => sort(todos.sortByName)}
        on:keydown={handleKeydown}
    >
        Name
    </li>

    <li class='clickable'
        tabindex='2'
        on:click={() => sort(todos.sortByDate)}
        on:keydown={handleKeydown}
    >
        Date
    </li>

    <li class='clickable'
        tabindex='3'
        on:click={setOrder}
        on:keydown={handleKeydown}
    >
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
        justify-content: space-around;

        padding: .35em .5em;
        margin-bottom: 2em;
    }
</style>