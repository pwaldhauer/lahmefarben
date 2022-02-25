<script>
    import { createEventDispatcher } from 'svelte';
    import ColorBlock from "./ColorBlock.svelte";
    import {currentDice, currentTurn, players, tokens} from "./stores";
    import Player from "./Player.svelte";
    import Token from "./Token.svelte";

    const dispatch = createEventDispatcher();

    export let pos;

    $: playerOnPosition = $tokens.filter(p => p.position === pos);


    function movePlayer(ev) {
        console.log('ev', ev.detail);

        const idx = $tokens.indexOf(ev.detail.player);

        let nextPosition = ev.detail.player.position + ev.detail.direction;

        if(nextPosition < 19) {
            while(nextPosition != 19 && $tokens.find(p => p.position === nextPosition)) {
                nextPosition = nextPosition + ev.detail.direction;
            }
        }

        if(nextPosition < 0) {
            return;
        }

        // TODO max fields
        if(nextPosition > 19) {
            return;
        }

        const updatedPlayers = [...$tokens];
        updatedPlayers[idx].position = nextPosition;

        if(nextPosition === 19) {
            updatedPlayers[idx].finishedTurn = $currentTurn;
        }

        tokens.set(updatedPlayers);

        // Reset dice

    }


</script>

<li class="field">
    {#if playerOnPosition}
        {#each playerOnPosition as player}
            <Token position="{pos}" token="{player}" on:movePlayer={movePlayer} />
        {/each}
    {/if}

</li>

<style>
    .field {
        width: 100px;
        aspect-ratio: 1;

        border: 1px #999 solid;
    }
</style>