<script>

    import {currentState, lastState} from "./stores";

    function back() {
        currentState.set($lastState);
    }
</script>

<div class="start">

        <p class="intro">Spielablauf / Regeln:</p>
    <ul>
        <li>Jeder/Jede SpielerIn bekommt eine Farbkombination zugelost. Diese ist geheim und kann nach dem Spielbeginn unten eingeblendet werden, aber bitte aufpassen, dass die anderen dabei die Augen zu halten!</li>
        <li>Der/Die SpielerIn, der/die am Zug ist, würfelt zwei Würfel und kann danach Spielfiguren entsprechend der gewürfelten Farben bewegen.</li>
            <ul>
                <li>Bei einer Farbe, darf die Spielfigur ein Feld nach vorne. Besetzte Felder können übersprungen werden</li>
                <li>Bei Schwarz geht es ein Feld zurück</li>
                <li>Bei im lustigen Farbverlauf darf jede Farbe gespielt werden</li>
            </ul>
        <li>Das Spiel ist vorbei, wenn alle im Ziel sind</li>
        <li>Der/Die, dessen zugeordnete Spielfigur als letztes im Ziel ist, ist GewinnerIn</li>
    </ul>

    <button class="startBtn" on:click={back} >Zurück</button>


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

    ul li {
        margin-bottom: 10px;
    }

    ul ul {
        padding-left: 20px;
        margin-bottom: 10px;
    }


</style>