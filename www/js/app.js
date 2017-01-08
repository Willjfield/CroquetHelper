
$(document).ready(function(){

	//console.log(Media);
	//var beep = new Media('cdvfile://localhost/img/beep.wav');
	//Deadness Board
	var marginLeftPx = $(".BallHit .BallStatus").css("margin-left");
	$(".BallHit").on("click",function(){
		var ballMarker = $(this).children('.BallStatus');
		if(!$(ballMarker).hasClass('dead') && !$(ballMarker).hasClass('half-dead')){
			$(ballMarker).addClass('dead');
			$(ballMarker).animate({width: '100%', height: '100%', 'border-radius':'0px','margin-left': '0px'}, 500);
		}else if($(ballMarker).hasClass('dead')){
			$(ballMarker).removeClass('dead');
			$(ballMarker).addClass('half-dead');
			$(ballMarker).animate({width: '50%', height: '100%', 'margin-left': '0px'}, 500);

		}else{
			$(ballMarker).removeClass('half-dead');
			$(ballMarker).animate({width: '60%', height: '60%', 'border-radius':'50%', 'margin-left': marginLeftPx}, 500);
		}
	});

		$(".BallPlayed").on("click",function(){
			$(this).parent().
			children('.BallHit').
			children('.BallStatus').
			animate({
				width: '60%', 
				height: '60%', 
				'border-radius':'50%',
				'margin-left': marginLeftPx
			}, 500);
			$(this).parent().
			children('.BallHit').
			children('.BallStatus').removeClass('dead half-dead');
		});
	
	//Game Clock
	var GameLength = 4500000;
	var startgameTime = 0;
	var gameTimeleft = 0;
	var pausegameTime = 0;
	var gamePaused = false;
	var gameMakeup=0;
	var curgameTime = 0;
	var gameMakeupTime = 0;
	var gameMinutesLeft = '';
	var gameSecondsLeft = '';
	$('#GameStart').on("click",function(){
		startgameTime = new Date();
		gameMakeupTime = 0;
		var playedBeep = false;
		gamePaused = false;
		$('#GamePause').text("PAUSE");
		setInterval(function(){
			if(!gamePaused){
				curgameTime = new Date();
				gameTimeleft = (startgameTime-curgameTime+gameMakeupTime);
				gameTimeleft+=GameLength;
				gameTimeleft/=1000;
				gameMinutesLeft = Math.floor(gameTimeleft/60).toFixed(0);
				gameSecondsLeft = "0"+Math.floor(gameTimeleft%60).toFixed(0);
				gameSecondsLeft = gameSecondsLeft.substr(gameSecondsLeft.length - 2);

				//gameSecondsLeft == 60 ? gameSecondsLeft = 0 :{};

			}
			
			if(gameTimeleft>0){
				$('#GameTime').css("color","white");
				$('#GameTime').text(gameMinutesLeft+":"+gameSecondsLeft);
			}else{
				//beep.play();
				if(!playedBeep){
					playAudio('/android_asset/www/img/beep.wav');
					$('#GameTime').css("color","red");
					playedBeep = true;
				}
			}	
		},100);
	});

	$("#GamePause").on("click",function(){
		gamePaused = !gamePaused;
		if(gamePaused){
			pausegameTime = new Date();
			$('#GamePause').text("UNPAUSE");
		}else{
			var unpausegameTime = new Date();
			gameMakeupTime = unpausegameTime-pausegameTime+gameMakeupTime;
			$('#GamePause').text("PAUSE");
		}
	});

	$("#GameSet").on("click",function(){
		//if(!$("#SetGameTime").hasClass('active')){
			$('#GameTime').css("color","white");
			$("#SetGameTime").animate({
				bottom: 0},
				500);
		//}
	});

	$("#SubmitGameLength").on("click",function(){
		startgameTime = 0;
		gameTimeleft = 0;
		pausegameTime = 0;
		gamePaused = false;
		gameMakeup=0;
		curgameTime = 0;
		gameMakeupTime = 0;
		gameMinutesLeft = '';
		gameSecondsLeft = '';
		GameLength = $("#LengthInput").val()*60*1000;
		if(isNaN(GameLength)){
			$('#GameTime').css("font-size", '4em');
			$('#GameTime').text('Please enter a valid number');

		}else{
			$('#GameTime').css("font-size", '10em');
			gameTimeleft=GameLength;
			gameTimeleft/=1000;
			gameMinutesLeft = Math.floor(gameTimeleft/60).toFixed(0);
			gameSecondsLeft = "0"+Math.floor(gameTimeleft%60).toFixed(0);
			gameSecondsLeft = gameSecondsLeft.substr(gameSecondsLeft.length - 2);
			$('#GameTime').text(gameMinutesLeft+":"+gameSecondsLeft);
			$("#SetGameTime").animate({
					bottom: '-50%'},
					500);
		}
		AndroidFullScreen.isSupported(function(){
                AndroidFullScreen.isImmersiveModeSupported(function(){
                    AndroidFullScreen.immersiveMode();
                });
        }); 
	});

	//Shot Clock
	var startShotTime = 0;
	var shotTimeleft = 0;
	var pauseShotTime = 0;
	var shotPaused = false;
	var shotMakeup=0;
	var curShotTime = 0;
	var shotMakeupTime = 0;
	$('#ShotStart').on("click",function(){
		startShotTime = new Date();
		curShotTime = new Date();
		shotMakeupTime = 0;
		shotPaused = false;
		var playedBeep = false;
		$('#ShotPause').text("PAUSE");
		$('#ShotTime').css("color","white");

		setInterval(function(){
			if(!shotPaused){
				curShotTime = new Date();
				shotTimeleft = (startShotTime-curShotTime+shotMakeupTime)/1000;
				shotTimeleft+=45;
			}
			
			if(shotTimeleft>0){
				shotTimeleft = (startShotTime-curShotTime+shotMakeupTime)/1000;
				shotTimeleft+=45;
				shotTimeleft = "0"+shotTimeleft.toFixed(0);
				shotTimeleft = shotTimeleft.substr(shotTimeleft.length - 2);
				$('#ShotTime').text(":"+shotTimeleft);
			}else{
				if(!playedBeep){
					playAudio('/android_asset/www/img/beep.wav');
					$('#ShotTime').css("color","red");
					playedBeep = true;
				}
			}	
		},100);
	});

	$("#ShotPause").on("click",function(){
		shotPaused = !shotPaused;
		if(shotPaused){
			pauseShotTime = new Date();
			$('#ShotPause').text("UNPAUSE");
		}else{
			var unpauseShotTime = new Date();
			shotMakeupTime = unpauseShotTime-pauseShotTime+shotMakeupTime;
			$('#ShotPause').text("PAUSE");
		}
	});

	
	
	//Menu
	$("#LinkDeadness").on("click",function(){
		SwapInOut($("#DeadnessContainer"));
	});
	$("#LinkGameClock").on("click",function(){
		SwapInOut($("#GameClock"));
	});
	$("#LinkShotClock").on("click",function(){
		SwapInOut($("#ShotClock"));
	});
	$("#LinkScore").on("click",function(){
		SwapInOut($("#Score"));
	});
});

function playAudio(url) {
    // Play the audio file at url
    var my_media = new Media(url,
        // success callback
        function () { console.log("playAudio():Audio Success"); },
        // error callback
        function (err) { console.log("playAudio():Audio Error: " + err); }
    );

    // Play audio
    my_media.play();

    // Pause after 10 seconds
    setTimeout(function () {
        my_media.pause();
    }, 10000);
}

function SwapInOut(divIn){
	divOut = $('.active');
	if(!$(divIn).hasClass('active')){
		if(divOut.length>0){
			$(divOut).animate({left: '-100%'}, 500,function(){
				$(divIn).animate({left: '0px'}, 500, function(){
					$(divIn).addClass('active');
					$(divOut).removeClass('active');
				});
			});
		}else{
			$(divIn).animate({left: '0px'}, 500, function(){
					$(divIn).addClass('active');
				});
		}
	}
}