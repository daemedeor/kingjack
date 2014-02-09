$(document).ready(function() {
	//patience is a virture or something
	var deck_position = $('#guiDeck').position();
	var top_card_count = 0;
	var btm_card_count = 0;

	$('.guiCard').fadeTo(0, .1);

	//Buttons & actions
	$('#strt_btn').on("click", function() {
		console.log("Start Game");
		$(this).hide();
		initGame();
	});

	$('#hit').on("click", function() {
		console.log("Pressed Hit");
	});

	$('#hold').on("click", function() {
		console.log("Pressed Hold");
	});


	//Debug Tools
	$('#db-deal-top').on("click", function() {
		guiDealCard("top-player");
	});

	$('#db-deal-btm').on("click", function() {
		guiDealCard("btm-player");
	});

	// 2. Dealing Triggers
	function guiDealCard(player) {

		//get Card here

		var which_player = player;
		var which_card = ++top_card_count;
		if (which_player === "btm-player") {
			which_card = ++btm_card_count;
		}
		$('#' + which_player + "-" + which_card).fadeTo(1000, 1);
	}

	function animate(){
		var pos = $('#top-player-1').position();
		console.log(pos);
		$('#guiDeck').animate({top: 93, right: 681}, 1500); // 122 to the right
		// 93 681 top
		// 410 681
	}

	// animate();
	
});