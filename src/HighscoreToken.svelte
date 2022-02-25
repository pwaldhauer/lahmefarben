<script>

    import ColorBlock from "./ColorBlock.svelte";
    import {players} from "./stores";

    export let token;
    export let pos;

    $: playerName = $players.find(player => player.colors[0] == token.colors[0] && player.colors[1] == token.colors[1])?.name

</script>

<li class="highscore"><ColorBlock color1={token.colors[0]} color2={token.colors[1]} /> <strong>{playerName || 'KI' }</strong>
    {#if pos == 0}war zuletzt im Ziel und hat damit Gewonnen!{/if}</li>

<style>
    .highscore {
        display: flex;
        gap: 20px;
    }
</style>