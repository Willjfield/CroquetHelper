$(document).ready(function(){
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
		setInterval(function(){
			if(!gamePaused){
				curgameTime = new Date();
				gameTimeleft = (startgameTime-curgameTime+gameMakeupTime);
				gameTimeleft+=GameLength;
				gameTimeleft/=1000;
				gameMinutesLeft = Math.floor(gameTimeleft/60).toFixed(0);
				gameSecondsLeft = "0"+Math.floor(gameTimeleft%60).toFixed(0);
				gameSecondsLeft = gameSecondsLeft.substr(gameSecondsLeft.length - 2); // => "Tabs1"

				//gameSecondsLeft == 60 ? gameSecondsLeft = 0 :{};

			}
			
			if(gameTimeleft>0){
				$('#GameTime').text(gameMinutesLeft+":"+gameSecondsLeft);
			}	
		},100);
	});

	$("#GamePause").on("click",function(){
		gamePaused = !gamePaused;
		if(gamePaused){
			pausegameTime = new Date();
			$('#gamePause').text("UNPAUSE");
		}else{
			var unpausegameTime = new Date();
			gameMakeupTime = unpausegameTime-pausegameTime+gameMakeupTime;
			$('#gamePause').text("PAUSE");
		}
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
		shotMakeupTime = 0;
		setInterval(function(){
			if(!shotPaused){
				curShotTime = new Date();
				shotTimeleft = (startShotTime-curShotTime+shotMakeupTime)/1000;
				shotTimeleft+=45;
			}
			
			if(shotTimeleft>0){
				$('#ShotTime').text(":"+shotTimeleft.toFixed(0));
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