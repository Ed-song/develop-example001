$(function(){
	function resize(){
			//获取屏幕宽度
	    var windowWidth=$(window).width();
		//判断屏幕宽度是大还是小
	    var isSmallScreen=windowWidth<768;
		//根据屏幕宽度的大小设置背景图
		$("#main_id > .carousel-inner > .item").each(function(i,item){
	         var $item=$(item);
	         var imgSrc=isSmallScreen?$item.data('image-xs'):$item.data('image-lg');
	         $item.css("backgroundImage",'url("'+imgSrc+'")');
	         if(isSmallScreen){
               $item.html("<img src='"+imgSrc+"'/>");
	         }
	         else{
	         	 $item.html("");
	         }
		});
	}

	$(window).on("resize",resize).trigger("resize");
	//初始化tooltips
	$('[data-toggle="tooltip"]').tooltip()

	// 控制标签页的标签容器宽度
	var $ulContainer=$('.nav-tabs');
	//获取所有子元素的宽度和
	var width=30;
	//遍历子元素
	$ulContainer.children().each(function(index,element){
		//console.log(element.clientWidth)
		//console.log($(element).width())
		width+=element.clientWidth;
	})
	//此时width等于所有li的宽度总和
	// $ulContainer.width(width);
	//判断当前ul的宽度是否超出了屏幕的宽度,如果超出了则设置ul横向滚动
	if(width>$(window).width()){
		$ulContainer
		  .css('width',width)
		  .parents().css("overflow-x","scroll");
	}
	/*新闻专栏a点击注册事件*/
	$("#news>.container>.row ul>li>a").on('click',function(){
		var $title=$(this).data('title');
		$(".new-title").text($title);
	})
      //获取界面上的轮播图容器
      var $carousels=$('.carousel');
      var startX,endX;
      var offset=50;
      //注册滑动事件
      $carousels.on('touchstart',function(e){
      	startX=e.originalEvent.touches[0].clientX;
      })
      
      $carousels.on('touchmove',function(e){
      	//变量重复赋值
      	endX=e.originalEvent.touches[0].clientX;
      	
      })

      $carousels.on('touchend',function(e){
      	//控制精度
      	//控制每次运动的距离,当距离大于一定值时,认为是方向变化
      	var distance=Math.abs(startX-endX)
      	if (distance>offset) {
      		//运动距离大于阈值,则我们认为发生了切换界面请求
            //1.获取手指在轮播图元素上的滑动方向
		     //2.根据获取到的方向选择上一张或者下一张
		     //-$('a').click();
		     //原生的carousel方法实现
            // $carousels.carousel(startX>endX?'next':'prev');
             $(this).carousel(startX>endX?'next':'prev');

      	}
      })
     

	
})
