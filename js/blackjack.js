function Deck(custom){

	//create custom decks
	// if(argumenets.length == 1){
	// 	var o = 0 ;
	// 	var userAnswer=[];
	// 	var customSuits = [];
	// 	do{
			
	// 		userAnswer[o] = prompt("Please enter the suit names here! q to quit");
			
	// 	}while(userAnswer[o++] != q);
	// 	for(var e = 0; e<o; e++){
	// 		customSuits[e] = createSuit(userAnswer[e]);
	// 	}
	// 	this.deck(customSuits)
	// }
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
	* 
	*/
	function createDeck(suits){
		var cDeck = [];
		var suitsLength = arguments.length;
		var suitHand = "";

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
	function shuffle(array) {
	
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
	* same as function above but allows it to be used as a seperate function
	*
	*/
	this.shuffle = function(array){
		var o = arary.length;
		var r;
		var q;
		while(o > 0){
			q = Math.floor(Math.random() * o--);

			r = array[o];
			array[o] = array[q];
			array[q] = r;
		}

		return array;
	}


	/**
	* deal(num)
	* deal a number of cards and returns the dealt cards 
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

	/**
	* addToDeck(importDeck)
	* add a suffled deck object to the current deck if the need to add shuffled decks arises 
	*
	* params 
	* importDeck = a deck object to loop through
	* 
	*
	* returns the new deck 
	*/
	this.addToDeck = function(importDeck){
		impoDeckLength = importDeck.length;
		//look through the deck to add each card
		for(var i = 0; i < impoDeckLength; i++ ){
			
			//return the value in the deck and push
			this.shuffledeck.push(importDeck[i]);
		}
		//return the deck itself
		return this.deck;
	};
}

function blackJack() {

	this.handvalue = function(dealthand) {
		var hand = 0;
		var currentCard;

		for (i=0; i<dealthand.length; i++) {
			currentCard = dealthand[i].substring(0,2);
			switch (currentCard)
			{
				case "10": 
				case "J_": 
				case "Q_": 
				case "K_":  hand += 10;
							break;

				case "2_": hand += 2;
						   break;
				case "3_": hand += 3;
						   break;
				case "4_": hand += 4;
						   break;
				case "5_": hand += 5;
						   break;
				case "6_": hand += 6;
						   break;
				case "7_": hand += 7;
						   break;
				case "8_": hand += 8;
						   break;
				case "9_": hand += 9;
						   break;
				case "A_": if ( (hand+11) <= 21) {
							 hand += 11;
						   }else { 
						   	hand += 1;
						   }
							break;
			}
			// hand+=value;
		}
		return hand;	
	};

	/**
	* rules (player_1, player_2)
	* the rules of the blackJack Game, who wins, who loses!
	*
	*
	*/
	this.rules = function(player_1, player_2) {
		var delay = 550;
		setTimeout(function(){
			if(player_2 > 21){ // bust
				alert("Player one wins");
				return null;
			}
			if(player_1 > 21){
				alert("Player two wins");
				return null;
			} 
			if(player_1 > player_2 ) {
				alert("Player one wins");
				return null;
			}
		    if(player_2 > player_1){
				alert("Player two wins!");
				return null;
			}
			if(player_1 == player_2){
				alert("No One wins...");
				return null;
			}
		}, delay);
		
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
				computerHand.push(currentHand[0][0]);
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

	//ensure the board has a nice opacity 
	$('.guiCard').fadeTo(0, 0.1);
	$('.guiCard span').fadeTo(0, 0.1);

	//set all the variables to be used but don't institate so nothing can be done
	var currentHand;
	var playerHand;
	var computerHand;
	var gameDeck;
	var game;
	var playerValue;
	var computerValue;
	var anotherDeck = new Deck();

	//set the GUI to be nicer
	//patience is a virture or something
	var deck_position = $('#guiDeck').position();
	var top_card_count;
	var btm_card_count;
	var played;
	var player_1_played; 

	//Buttons & actions
	//clicking the start!
	$('#strt_btn').on("click", function() {

		//hide the start button now!
		$(this).hide();

		//clean up the board 
		$('.guiCard').fadeTo(0, 0.1);
		$('.guiCard span').fadeTo(0, 0.1);

		//start the game institate values here, don't forget!
		game = new blackJack();
		gameDeck = new Deck();
		currentHand = [];
		playerHand = [];
		computerHand = [];
		playerValue = 0;
		compValue = 0;
		top_card_count = 0;
		btm_card_count = 0;
		
		played = false;
		player_1_played = false; 

		//add another deck for many different cards
		
		//show the player total
		$('#btm-total-value').html("total value: " + playerValue);
	});

	//what happens when the player wants to hit
	$('#hit').on("click", function() {
		//player has played 
		player_1_played = true;
		currentHand = game.hit(playerHand, gameDeck);

		//go through the hand and push the the card back
		for(var h = 0; h<currentHand.length; h++){
			playerHand.push(currentHand[h]);
		}
		//display the cards correctly
		for (var card in playerHand){
			btm_card_count++;
			$('#btm-player-' + btm_card_count + " span").html(playerHand[card]).fadeTo(1, 1);
			$('#btm-player-' + btm_card_count).fadeTo(1,1);
		}
		btm_card_count = 0;

		playerValue = game.handvalue(playerHand);
		if(playerValue == 21){
			$("#hold").click();
		}
		$('#btm-total-value').html("total value: " + playerValue);
		if (playerValue > 21) {

			alert("Player 2 Wins!");
			$("#strt_btn").show();

		}
	});

	$('#hold').on("click", function() {
			var delay = 10000;

			if(playerValue <= 21  && played == false && player_1_played == true){
				played = true;
				currentHand = game.hit(computerHand, gameDeck);
				var cHandLength = currentHand.length;
				for(h = 0; h<cHandLength; h++){
					computerHand.push(currentHand[h]);
				}
				top_card_count = 0;

				for (var card in computerHand){
					top_card_count++;
					$('#top-player-' + top_card_count + " span").html(computerHand[card]).fadeTo(1, 1);
					$('#top-player-' + top_card_count).fadeTo(1,1);
				}
				if(game.handvalue(computerHand) == 21 && playerValue != 21 ){
					setTimeout(function(){
						alert("The Computer has Blackjacked.");
					}, delay);
				}else{
					compHand = game.computerPlay(computerHand,gameDeck);
					var compLength = compHand.length;
					computerValue = game.handvalue(computerHand);
					game.rules(playerValue,computerValue);
				}
				setTimeout(function(){
					$("#strt_btn").show();
				},delay);
			}
	});

	//Debug Tools
	$('#db-deal-top').on("click", function() {
		guiDealCard("top-player");
	});

	$('#db-deal-btm').on("click", function() {
		guiDealCard("btm-player");
	});

});