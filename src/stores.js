import {writable} from 'svelte/store';
import {STATE_END, STATE_GAME, STATE_START} from "./states";
import {playersHighscore, tokensHighscore} from "./testValues";

function loadOrDefault(key, d, json) {
    if (localStorage.getItem(key)) {
        return json ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key);
    }

    return d;
}


export const lastState = writable('');

export const currentState = writable(loadOrDefault('currentState', STATE_START, false));
currentState.subscribe(val => localStorage.setItem('currentState', val));


export const currentTurn = writable(parseInt(loadOrDefault('currentTurn', 0, false)));
currentTurn.subscribe(val => localStorage.setItem('currentTurn', val));

export const currentPlayer = writable(parseInt(loadOrDefault('currentPlayer', 0, false)));
currentPlayer.subscribe(val => localStorage.setItem('currentPlayer', val));

export const currentDice = writable(loadOrDefault('currentDice', null, true));
currentDice.subscribe(val => localStorage.setItem('currentDice', JSON.stringify(val)));

export const players = writable(loadOrDefault('players', [], true))

players.subscribe(val => localStorage.setItem('players', JSON.stringify(val)))


export const tokens = writable(loadOrDefault('tokens', [], true));

tokens.subscribe(val => localStorage.setItem('tokens', JSON.stringify(val)));