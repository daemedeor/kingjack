function Deck(){

	//create custom decks
	
	//standard deck
	this.hearts = createSuit("H");//hearts is an object inside object Deck
	this.spades = createSuit("S");
	this.clubs = createSuit("C");
	this.diamonds = createSuit("D");
	this.deck = createDeck(this.hearts,this.spades,this.clubs,this.diamonds);//object deck merges the Deck (note the capital) together
	this.shuffledeck = shuffle(this.deck);

	/**
	* createSuit(suitname)
	*
	* params 
	* str suitName = a name you want to create.
	*
	* returns 
	* an array of a created suit. 
	*/
	function createSuit(suitName){
		//create the suit array
		var cardSuit = [];

		//get the first 10 numbers autogenerate
		for(var i=2; i<=10; i++){

			cardSuit.push(i+"_"+suitName);
		}

		//add the final special cards
		cardSuit.push("J_"+suitName);
		cardSuit.push("Q_"+suitName);
		cardSuit.push("K_"+suitName);
		cardSuit.push("A_"+suitName);

		//return the array
		return cardSuit;
	}

	/**
	* createDeck(suits)
	*
	* params 
	* array suits = a variable number of arrays to make an array, must be at least four
	*
	* returns 
	* array of the deck 
	* null if the suits aren't at least 13 cards long 
	*/
	function createDeck(suits){
		var cDeck = [];
		var suitsLength = arguments.length;
		var suitHand = "";
		
		//check how long suits are needs to pass at least two
		if(suitsLength <=1 ){
			return null;
		}
		//go through all the array
		for(var i =0; i < suitsLength; i++ ){
			//get the suit itself
			suitHand = arguments[i];
			//loop through all the cards
			for(var k =0; k<13; k++){
				//add it to the deck
				cDeck.push(suitHand[k]);
			}
		}
		//return the created deck
		return cDeck;
	}

	/**
	* shuffle(array)
	*
	* params 
	* str array = a deck array to shuffle
	*
	* returns 
	* an array of a shuffled deck
	*/
	function shuffle (array) {
	
		var m = array.length;
		var t;//this is an element that is going to be switched 
		var i;//this is another element that is going to be switched

		while (m > 0) {

			// Pick a remaining element..
			i = Math.floor(Math.random() * m--);

			// swapping
			t = array[m];
			array[m] = array[i];
			array[i] = t;

		}

		return array;
	}

	/**
	* deal(num)
	*
	* params 
	* integer num = a number of dealt cards. (can only be ints)
	*
	* returns 
	* an array of dealt cards
	* null if it can't deal any more cards 
	*/
	this.deal = function(num){
		//make sure the cards are whole cards
		this.num = Math.floor(num);
		var i = 0;
		var dealt = [];

		//check if the deck is empty 
		if(this.deck.length === 0){
			alert("no more cards in the deck");
			return null;
		}
		//push each card to a hand
		while(i < num){
			dealt.push(this.deck.shift());
			i++;
		}

		return dealt;
	};

	this.addToDeck = function(importDeck){
		
		for(var i = 0; i < deck.shuffledeck.length; i++ ){
			this.deck.push(importDeck[i]);
		}

		this.deck.shuffle(this.deck);
		return this.deck;
	};
}

function blackJack() {
	this.handvalue = function(dealthand) {
		var hand = 0;
		var value = 0;
		var currentCard;
		for (i=0; i<dealthand.length; i++) {
			currentCard = dealthand[i].substring(0,2);
			switch (currentCard)
			{
				case "10": 
				case "J_": 
				case "Q_": 
				case "K_":  value = 10;
							break;

				case "2_": value = 2;
					break;
				case "3_": value = 3;
					break;
				case "4_": value = 4;
					break;
				case "5_": value = 5;
					break;
				case "6_": value = 6;
					break;
				case "7_": value = 7;
					break;
				case "8_": value = 8;
					break;
				case "9_": value = 9;
					break;
				case "A_": if ( hand > 10) {
					value = 1;
				}else{ value= 11;
					}
					break;
			}
			hand+=value;
		}
		return hand;	
	};

	this.rules = function(player_1,player_2) {
		if(player_2 > 21){ // bust
			alert("Player one wins");
		}else if(player_1 < 22){
			if(player_1 > player_2) {
					alert("Player one wins");
			}else if(player_2 > player_1){
				alert("Player two wins");
			}else{
				alert("No One wins...");
			}
			
		}else{
			alert("Player two wins");
		}

		if(player_1 > 21){//bust
			alert("player one wins");
		}else if(player_2<22){
			if(player_1 > player_2) {
				alert("player_1 wins");
			}else if(player_2 > player_1) {
				alert("player_2 wins");
			}else{
				alert("No One wins...");
			}
		}
	};

	this.hit = function(playerHand, deck){
		var currentHand = [];
		if(playerHand.length === 0){
			currentHand = deck.deal(2);
		}
		else if(playerHand.length != 5){
			currentHand = deck.deal(1);
		}
		else{
			alert("no more cards allowed");
		}
		return currentHand;
	};

	this.computerPlay = function(computerHand, deck){
		var compCurrentHand = [];
		var compValue = this.handvalue(computerHand);
		var cValue= "";
		var currentHand =[];

		if (computerHand.length < 5){
			currentHand.push(deck.deal(1));
			compCurrentHand.push((currentHand[0][0]));
			cValue = compValue + this.handvalue(compCurrentHand);
			if(cValue < 21){
				computerHand.push(currentHand[0]);
				this.computerPlay(computerHand, deck);
			}
			else{
				return computerHand;
			}
		}
		return computerHand;
	};
}

$(document).ready(function(){

	$('.guiCard').fadeTo(0, 0.1);
	$('.guiCard span').fadeTo(0, 0.1);

	var currentHand = [];
	var playerHand =[];
	var computerHand = [];
	var gameDeck;
	var game;
	var playerValue = 0;
	var computerValue;
	//patience is a virture or something
	var deck_position = $('#guiDeck').position();
	var top_card_count = 0;
	var btm_card_count = 0;

	//Buttons & actions
	$('#strt_btn').on("click", function() {
		console.log("Start Game");
		$(this).hide();
		game = new blackJack();
		gameDeck = new Deck();
	});

	$('#hit').on("click", function() {
		currentHand = game.hit(playerHand, gameDeck);
		for(var h = 0; h<currentHand.length; h++){
			playerHand.push(currentHand[h]);
		}
		for (var card in playerHand){
			btm_card_count++;
			console.log(playerHand[card]);
			$('#btm-player-' + btm_card_count + " span").html(playerHand[card]).fadeTo(1, 1);
			$('#btm-player-' + btm_card_count).fadeTo(1,1);
		}
		btm_card_count = 0;

		playerValue = game.handvalue(playerHand);
		if(playerValue == 21){
			$("#hold").click();
		}
		$('#btm-total-value').html("total value: " + playerValue);
		if(playerValue > 21){
			alert("Computer wins!")
		}
	});

	$('#hold').on("click", function() {
		currentHand = game.hit(computerHand, gameDeck);
		var cHandLength = currentHand.length;
		for(h = 0; h<cHandLength; h++){
			computerHand.push(currentHand[h]);
		}
		if(game.handvalue(computerHand) == 21 && playerValue !== 21){
			alert("The Computer has Blackjacked.");
		}else{
			compHand = game.computerPlay(computerHand,gameDeck);
			var compLength = compHand.length;
			for(var z=0; z<compLength; z++){
				computerHand.push(compHand[z]);
			}
			computerValue = game.handvalue(computerHand);
			game.rules(playerValue,computerValue);

		}

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
		var which_card_position = ++top_card_count;
		if (which_player === "btm-player") {
			which_card = ++btm_card_count;
		}
		$('#' + which_player + "-" + which_card_position).fadeTo(1000, 1);
	}


});

