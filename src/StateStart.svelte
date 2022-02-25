<script>

    import {randomColor, randomPermutation, tokenPermutations} from "./utils";
    import {currentState, players, tokens} from "./stores";
    import {STATE_GAME} from "./states";

    let playerNames = ['Heinrich', 'Henriette', '', '', '', '']

    $: canStartGame = playerNames.filter(name => name.length).length > 1;

    function ensureUnique(players) {
        console.log(players);

            for(let i in players) {
                const cstr = players[i].colors.join('');
                if(players.filter(({colors}) => colors.join('') === cstr).length === 0) {
                    return;
                }

                let newperm = randomPermutation();
                while(newperm.join('') === cstr) {
                    newperm = randomPermutation()
                }
                players[i].colors = newperm;
            }

        return players;

    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function startGame() {

        const perms = [...tokenPermutations];
        shuffle(perms);

        players.set(playerNames.filter(name => name.length).map(name => {
            return {
                name,
                colors: perms.pop()
            }
        }));

        const tokenSet = [...$players.map(player => player.colors)];
        while(tokenSet.length < 6) {
            tokenSet.push(perms.pop());
        }

        console.log(tokenSet)


        tokens.set(tokenSet.map(token => {
            return {
                colors: token,
                position: 0
            }
        }))

        currentState.set(STATE_GAME);
    }
</script>

<div class="start">

        <p class="intro">Willkommen zu Lahme Farben! Bei diesem Spiel gewinnt der/die SpielerIn, der/die als letztes ins Ziel kommt. Viel Spaß!</p>


        <p class="intro">Moin, trage hier die Namen der Spieler ein (oder leer lassen, wenn es weniger sind):</p>

        <ul class="playerList">
            <li><input type="text" bind:value={playerNames[0]} /></li>
            <li><input type="text" bind:value={playerNames[1]} /></li>
            <li><input type="text" bind:value={playerNames[2]} /></li>
            <li><input type="text" bind:value={playerNames[3]} /></li>
            <li><input type="text" bind:value={playerNames[4]} /></li>
            <li><input type="text" bind:value={playerNames[5]} /></li>
        </ul>

        <button class="startBtn" on:click={startGame} disabled={!canStartGame}>Spiel starten</button>


</div>


<style>

    .start {
        max-width: 600px;
        margin: auto;
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