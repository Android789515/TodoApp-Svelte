<script lang='ts'>
    import { filters } from '../filters'

    // Note that this is valid; the Svelte plugin
    // for Webstorm is outdated.
    $: ({ name, date, order } = $filters)
</script>

<section class='filter-options' aria-label='Filter options'>

</section>

<style>

</style>