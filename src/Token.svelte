<script>
    import { createEventDispatcher } from 'svelte';
    import ColorBlock from "./ColorBlock.svelte";
    import {currentDice} from "./stores";

    const dispatch = createEventDispatcher();

    export let token;
    export let position;

    $: mayMoveBackward = $currentDice && ( position > 0 && ((!$currentDice[0].moved && $currentDice[0].color === 'back')
        || (!$currentDice[1].moved && $currentDice[1].color === 'back')))


    $: mayMoveForward =$currentDice &&( position < 19 &&((!$currentDice[0].moved && $currentDice[0].color === 'all')
        || (!$currentDice[1].moved && $currentDice[1].color === 'all')
        || (!$currentDice[0].moved && token.colors.indexOf($currentDice[0].color) !== -1)
        || (!$currentDice[1].moved && token.colors.indexOf($currentDice[1].color) !== -1)));


    function move(direction) {
        dispatch('movePlayer', {
            player: token,
            direction
        });

        const usedDiceIdx = usedDice(token, direction);
        if(usedDiceIdx === undefined) {
            // undefined behaviour
            console.log('wäääh');
        }

        const updatedDice = [...$currentDice];
        updatedDice[usedDiceIdx].moved = true;
        currentDice.set(updatedDice);
    }

    function moveForward() {
        move(1);
    }

    function moveBackward() {
        move(-1);
    }

    function usedDice(player, direction) {
        // determine which color was used
        const [col1, col2] = player.colors;

        if(direction == -1 && !$currentDice[0].moved && $currentDice[0].color == 'back') {
            return 0;
        }

        if(direction == -1 && !$currentDice[1].moved && $currentDice[1].color == 'back') {
            return 1;
        }

        if(!$currentDice[0].moved && $currentDice[0].color == col1) {
            return 0;
        }

        if(!$currentDice[1].moved && $currentDice[1].color == col1) {
            return 1;
        }

        if(!$currentDice[0].moved && $currentDice[0].color == col2) {
            return 0;
        }

        if(!$currentDice[1].moved && $currentDice[1].color == col2) {
            return 1;
        }

        if(!$currentDice[0].moved && $currentDice[0].color == 'all') {
            return 0;
        }

        if(!$currentDice[1].moved && $currentDice[1].color == 'all') {
            return 1;
        }

        return undefined;
    }

</script>

<div class="player">
    {#if mayMoveBackward}
        <button on:click={moveBackward}>Move Back</button>
    {/if}
    <ColorBlock color1="{token.colors[0]}" color2="{token.colors[1]}"/>
    {#if mayMoveForward}
        <button on:click={moveForward}>Move</button>
    {/if}
</div>

<style>
    .player {
        display: flex;
    }
</style>