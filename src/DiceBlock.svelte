<script>
	export let dice;

</script>

<div class="colorBlock">
	<div class="color-{dice[0].color} {dice[0].moved ? 'dice-moved' : 'dice-unmoved'}">{!dice[0].moved ? ' ' : '☑️'}</div>
	<div class="color-{dice[1].color} {dice[1].moved ? 'dice-moved' : 'dice-unmoved'}">{!dice[1].moved ? ' ' : '☑️'}</div>
</div>

<style>

	.colorBlock {
		width: 100px;
	}

	.colorBlock {

	}

	.dice-moved {
		font-size: 40px;
		color: white;
		text-align: center;
	}
	.dice-unmoved {
	}

</style>