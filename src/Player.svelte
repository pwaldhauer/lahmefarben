<script>
    import ColorBlock from "./ColorBlock.svelte";


    export let player;

    let showColors = false;

    function show() {
        showColors = true;
    }

    function hide() {
        showColors = false;
    }


</script>

<div class="player">
    <h4>{player.name}</h4>
    {#if showColors}
        <ColorBlock color1="{player.colors[0]}" color2="{player.colors[1]}"/>
        <button on:click={hide}>Verstecken</button>
    {:else}
        <button on:click={show}>Anzeigen</button>
    {/if}
</div>

<style>
    .player button {
        display: block;
    }
</style>