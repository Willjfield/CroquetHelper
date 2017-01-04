$(document).ready(function(){
	$(".BallHit .BallStatus").on("click",function(){
		if(!$(this).hasClass('dead')){
			$(this).addClass('dead');
			$(this).animate({width: '100%', height: '100%', 'border-radius':'0px'}, 500);
		}else{
			$(this).removeClass('dead');
			$(this).animate({width: '67%', height: '67%', 'border-radius':'50%'}, 500);
		}
	});
});