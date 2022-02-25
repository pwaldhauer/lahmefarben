<script>

    import {currentDice, currentState, currentTurn, tokens} from "./stores";
    import {STATE_START} from "./states";
    import HighscoreToken from "./HighscoreToken.svelte";

    function restart() {

        currentDice.set(null);
        currentTurn.set(0);
        currentState.set(STATE_START);
    }

    $: tokensSorted = $tokens.sort((a, b) => b.finishedTurn - a.finishedTurn)


</script>

<div class="start">

    <p class="intro">Juchu, alle sind im Ziel!</p>

    <ul class="highscore">
        {#each tokensSorted as token, i}
            <HighscoreToken token={token} pos={i} />
        {/each}
    </ul>

    <button class="startBtn" on:click={restart}>Spiel neu starten</button>


</div>


<style>

    .start {
        max-width: 600px;
        margin: auto;
    }


    .highscore {
        margin-bottom: 20px;
    }

    .intro {

        font-size: 18px;
        margin-bottom: 20px;
    }

    .playerList {
        list-style-type: none;
        margin-bottom: 20px;
    }

    .playerList input {
        width: 100%;
        font-size: 18px;
        padding: 5px;
    }

    .playerList li {
        padding: 10px 0;
    }

    .startBtn {
        width: 100%;
        font-size: 18px;
        padding: 5px;
    }


</style>