<script>
    import {currentTurn, currentDice, currentPlayer, tokens, players, currentState} from "./stores";
    import {randomColor} from "./utils";
    import Field from "./Field.svelte";
    import DiceBlock from "./DiceBlock.svelte";
    import Player from "./Player.svelte";
    import {STATE_END} from "./states";


    const fieldCount = 20;

    const fields = new Array(fieldCount);

    console.log(currentDice);


    $: currentPlayerName = $players[$currentPlayer]?.name;
    $: canUseDice = !$currentDice || ($currentDice[0].moved && $currentDice[1].moved) || !hasPossibleMoves($currentDice, $tokens)

    // TODO: gucken ob es unspielbare züge gibt

    function playerOnPosition(pos) {
        return $tokens.find(p => p.position === pos);
    }

    function roll() {
        currentDice.set([{
            color: randomColor(),
            moved: false
        }, {
            color: randomColor(),
            moved: false
        }]);

        currentTurn.set($currentTurn + 1);


    }

    function hasPossibleMoves(dices, tokens) {
        console.log('call hasPossibleMoves');

        const colors = dices.filter(({moved}) => !moved);

        for (let i in colors) {
            const color = colors[i].color;

            console.log(color);

            if (color === 'back') {
                return tokens.some(({position}) => position > 0).length && tokens.some(({position}) => position < 19);
            }

            if (color === 'all') {
                return tokens.some(({position}) => position < 19);
            }

            console.log('hehe', tokens.some(({colors, position}) => colors.indexOf(color) !== -1 && position < 19))
            return tokens.some(({colors, position}) => colors.indexOf(color) !== -1 && position < 19);
        }

        console.log('uhh');

        return false;
    }

    currentTurn.subscribe(turn => {

        let nextPlayer = $currentPlayer + 1;
        if (nextPlayer > ($players.length - 1)) {
            nextPlayer = 0;
        }

        // wenn man aus dem localstorage einen state läd, der beides moved auf true hat, dann
        // springt der hier immer u_u
        currentPlayer.set(nextPlayer);
    })

    tokens.subscribe(tokens => {
        if (tokens.every(token => token.position === 19)) {
            console.log('done!');


            console.log(tokens);

            currentState.set(STATE_END);
        }
    })


</script>

<div>


    <div class="dice">
        <div>
            Aktuell am Zug: {currentPlayerName}

        </div>
        <div>
            <button class="dice-button" on:click={roll} disabled="{!canUseDice}">Würfeln 🎲</button>
        </div>


        {#if $currentDice}
            <div>
                <DiceBlock dice="{$currentDice}"/>
            </div>
        {/if}

    </div>

    <ul class="fields">
        {#each fields as field, i}
            <Field pos="{i}"/>
        {/each}

    </ul>

    <div class="players">

        {#each $players as player, i}
            <Player player="{player}"/>
        {/each}

    </div>
</div>


<style>


    .fields {
        margin: 50px auto;
        width: 720px;
        list-style-type: none;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        gap: 5px 5px;
        grid-template-areas:
    "a b c d e f g"
    "t . . . . . h"
    "s . . . . . i"
    "r . . . . . j"
    "q p o n m l k";
    }


    .dice {
        border: 2px solid black;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    .dice-button {
        font-size: 24px;
        padding: 10px;
    }

    .players {
        border: 2px solid black;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        margin-bottom: 100px;
    }

</style>