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
	//Menu
	$("#LinkDeadness").on("click",function(){
		$("#DeadnessContainer").animate({left: '0px'}, 1000);
	});
	$("#LinkGameClock").on("click",function(){
		$("#DeadnessContainer").animate({left: '-100%'}, 1000);
	});
	$("#LinkShotClock").on("click",function(){
		$("#DeadnessContainer").animate({left: '-100%'}, 1000);
	});
	$("#LinkScore").on("click",function(){
		$("#DeadnessContainer").animate({left: '-100%'}, 1000);
	});
});