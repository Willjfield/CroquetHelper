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
	//Shot Clock
	var startTime = 0;
	var timeleft = 0;
	var pauseTime = 0;
	var paused = false;
	var makeup=0;
	var curTime = 0;
	var makeupTime = 0;
	$('#ShotStart').on("click",function(){
		startTime = new Date();
		makeupTime = 0;
		setInterval(function(){
			if(!paused){
				curTime = new Date();
				timeleft = (startTime-curTime+makeupTime)/1000;
				timeleft+=45;
			}
			
			if(timeleft>0){
				$('#ShotTime').text(":"+timeleft.toFixed(0));
			}	
		},100);
	});

	$("#ShotPause").on("click",function(){
		paused = !paused;
		if(paused){
			pauseTime = new Date();
			$('#ShotPause').text("UNPAUSE");
		}else{
			var unPauseTime = new Date();
			makeupTime = unPauseTime-pauseTime+makeupTime;
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