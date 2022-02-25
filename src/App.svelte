<script>


    import {currentDice, currentPlayer, currentState, currentTurn, lastState, players, tokens} from "./stores";
    import {STATE_END, STATE_START, STATE_RULES, STATE_GAME} from "./states";
    import StateStart from "./StateStart.svelte";
    import StateGame from "./StateGame.svelte";
    import StateEnd from "./StateEnd.svelte";
    import StateRules from "./StateRules.svelte";

    const stateMap = {
        [STATE_START]: StateStart,
        [STATE_GAME]: StateGame,
        [STATE_END]: StateEnd,
        [STATE_RULES]: StateRules
    }

    $: currentStateComponent = stateMap[$currentState];

    function restart() {
        currentDice.set(null);
        currentTurn.set(0);
        currentState.set(STATE_START)
    }

    function rules() {
        lastState.set($currentState);
        currentState.set(STATE_RULES)
    }

    console.log(stateMap)
</script>

<div>
    <div class="title">Lahme Farben <button on:click={restart}>Neu starten</button> <button on:click={rules}>Regeln</button></div>
    <main>
        <svelte:component this={currentStateComponent} />
    </main>
</div>


<style>

    main {
        padding: 0 50px;
    }
</style>