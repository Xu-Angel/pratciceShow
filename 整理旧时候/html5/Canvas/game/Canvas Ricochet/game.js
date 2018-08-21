(function(){//以后将所有的javascriptdai代码都放到这个自执行函数中，从而防止变量泄露到全局范围
	
	//一个用来容纳2D绘图环境的空变量
	var ctx = null;

	var Game={
		canvas:document.getElementById('canvas'),
		setup:function(){
			if(this.canvas.getContext){
				ctx = this.canvas.getContext('2d');
				//从canvas元素中获取宽高值
				this.width=this.canvas.width;
				this.height=this.canvas.height;

				Screen.welcome();
				this.canvas.addEventListener('click',this.runGame,false);//添加新的事件监听器
				Ctrl.init();
			}
		},
		runGame:function(){
			Game.canvas.removeEventListener('click',Game.runGame,false);//事件触发后就去除事件监听器
			//点击后初始化游戏界面
			Game.init();

			Game.animate();
		},
		animate:function(){
			Game.play=requestAnimFrame(Game.animate);
			Game.draw();
		},
		//init()包含了所有的对象实例
		init:function(){
			Background.init();
			Hub.init();

			Ball.init();
			Paddle.init();
			Bricks.init();

			
		},
		//draw()用于处理所有更新并绘制对象的逻辑
		draw:function(){
			//将canvas绘图板清空，每次更新他时，之前绘制的图形就会被清除
			ctx.clearRect(0,0,this.width,this.height);

			Background.draw();
			Bricks.draw();
			Paddle.draw();
			Hub.draw();
			Ball.draw();
		},
		levelUp:function(){
			Hub.lv+=1;
			Bricks.init();
			Ball.init();
			Paddle.init();
		},
		levelLimit:function(lv){
			return lv>5?5:lv;//将砖块限定为最高只能到达5行;
		},
		restartGame:function(){
			Game.canvas.removeEventListener('click',Game.restartGame,false);
			Game.init();
		}
	};
	
	//自此而下的这些对象包含了游戏的所有可视化资源
	var Background={
		init:function(){
			this.ready=false;
			this.img=new Image();
			this.img.src='background.jpg';

			this.img.onload=function(){
				Background.ready=true;
			}
		},
		draw:function(){
			if(this.ready){
				ctx.drawImage(this.img,0,0)
			}
		}
	};

	var Bricks={
		gap:2,
		col:5,
		w:80,
		h:15,
		init:function(){
			this.row=2+Game.levelLimit(Hub.lv);//砖块的行数现在和所处关卡匹配起来
			this.total=0;

			this.count=[this.row];
			//砖块数组由砖块的行列号数据所构成
			for(var i=0;i<this.row;i++){
				this.count[i]=[this.col];
			}
		},
		draw:function(){
			var i,j;
			for(i=0;i<this.row;i++){
				for(j=0;j<this.col;j++){
					if(this.count[i][j]!==false){
						//保存的砖块都会绘制在这里，除非有砖块被设置为false(代表他们被销毁)
						if(Ball.x>=this.x(j)&&Ball.x<=(this.x(j)+this.w)&&Ball.y>=this.y(i)&&Ball.y<=this.y(i)+this.h){
							this.collide(i,j);
							continue;
						}

						ctx.fillStyle = this.gradient(i);
						ctx.fillRect(this.x(j),this.y(i),this.w,this.h)
					}
				}
			};
			if(this.total===(this.row*this.col)){
				Game.levelUp()
			}
		},

		collide:function(i,j){
			Hub.score+=1;//每当砖块被摧毁时，就递增得分计数器
			this.total+=1;//递增砖块总数，以便让游戏知道何时结束————所有砖块都摧毁了
			this.count[i][j]=false;
			Ball.sy = -Ball.sy;
		},

		x:function(col){
				return (col*this.w)+(col*this.gap);
		},

		y:function(row){
				return (row*this.h)+(row*this.gap);
		},
		//自动根据砖块所属的行号，使同一行砖块的颜色形成漂亮的渐变颜色
		gradient:function(row){
			switch(row){
				//第一行：紫色
				case 0:
					return this.gradientPurple?this.gradientPurple:this.gradientPurple=this.makeGradient(row,'#bd06f9','#9604c7');
				//第二行：红色
				case 1:
					return this.gradientRed?this.gradientRed:this.gradientRed=this.makeGradient(row,'#f9064A','#C7043B');
				//第三行：绿色
				case 2:
					return this.gradientGreen?this.gradientGreen:this.gradientGreen=this.makeGradient(row,'#05FA15','#04C711');
				//第四行(或序号大于四的行):橙色
				default:
					return this.gradientOrange?this.gradientOrange:this.gradientOrange=this.makeGradient(row,'#FAA105','#C77F04');
			}
		},

		makeGradient:function(row,color1,color2){
			var y=this.y(row);
			var grad = ctx.createLinearGradient(0,y,0,y+this.h);
			grad.addColorStop(0,color1);//渐变起始颜色为color1
			grad.addColorStop(1,color2);//渐变终止颜色为color2

			return grad;
		}
	};

	var Ball={
		r:10,//用于确定小球大小的半径变量r
		init:function(){
			//init()只包含一些如果游戏当前正在运行则需要重置的值，由于半径r这样的变量是持久性变量，所以将他们单列出来。
			this.x=120;
			this.y=120;
			//小球的速度要和当前所处关卡匹配起来
			this.sx=1+(0.4*Hub.lv);//sx是x轴上的速度增量
			this.sy=-1.5-(0.4*Hub.lv);//sy是y轴上的速度增量

		},
		draw:function(){
			this.edges();
			this.collide();
			this.move();

			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
			ctx.closePath();
			ctx.fillStyle='#eee';
			ctx.fill();
		},
		edges:function(){
			if(this.y<1){//游戏容器的上边界
				this.y=1;
				this.sy=-this.sy;
			}else if(this.y>Game.height){//游戏容器的下边界
				this.sy = this.sx = 0;
				//用一些方法和对象来隐藏小球并出发游戏结束状态
				this.y=this.x = 1000;
				Screen.gameover();
				canvas.addEventListener('click',Game.restartGame,false)
				return;
			}

			if(this.x<1){
				this.x=1;
				this.sx = -this.sx;
			}else if(this.x>Game.width){
				this.x=Game.width-1;
				this.sx = -this.sx;

			}
		},

		//碰撞侦测
		collide:function(){
			if(this.x>=Paddle.x&&this.x<=(Paddle.x+Paddle.w)&&this.y>=Paddle.y&&this.y<=(Paddle.y+Paddle.h)){
				//根据小球碰撞到球拍上的具体位置，修改小球在偏向弹回时的x坐标
				this.sx = 7*((this.x-(Paddle.x+Paddle.w/2))/Paddle.w);
				this.sy = -this.sy;
				console.log(this.sy);
			}
		},
		move:function(){
			//使小球运动起来
			this.x+=this.sx;
			this.y+=this.sy;
		}
	};

	var Paddle={
		w:90,
		h:20,
		r:10,
		init:function(){
			this.x = 100;
			this.y = 210;
			this.speed = 4;
		},
		draw:function(){
			this.move();
			ctx.beginPath();
			ctx.moveTo(this.x,this.y);
			ctx.lineTo(this.x+this.w,this.y)
			ctx.arc(this.x+this.w,this.y+this.r,this.r,-Math.PI/2,Math.PI/2)
			ctx.lineTo(this.x,this.y+this.r*2);
			ctx.arc(this.x,this.y+this.r,this.r,Math.PI/2,-Math.PI/2)
			
			ctx.closePath();

			ctx.fillStyle = this.gradient();
			ctx.fill();
		},
		move:function(){
			//球拍边界侦测
			if(Ctrl.left&&this.x>-(this.w/2)&&this.x<Game.width-(this.w/2)){
				//使球拍水平移动
				this.x+=-this.speed;
				console.log(this.x)
			}else if(Ctrl.right&&this.x>-(this.w/2)&&this.x<Game.width-(this.w/2)){
				this.x+=this.speed;
			}
		},

		gradient:function(){
			if(this.gradientCache){
				return this.gradientCache
			}
			this.gradientCache=ctx.createLinearGradient(this.x,this.y,this.x,this.y+20);
			this.gradientCache.addColorStop(0,'#eee');
			this.gradientCache.addColorStop(1,'#999');

			return this.gradientCache;
		}
	};
	//实现键盘、鼠标及触摸控制
	var Ctrl={
		init:function(){
			window.addEventListener('keydown',this.keyDown,true);
			window.addEventListener('keyup',this.keyUp,true);
			window.addEventListener('mousemove',this.movePaddle,true);

			Game.canvas.addEventListener('touchstart',this.movePaddle,false);
			Game.canvas.addEventListener('touchmove',this.movePaddle,false);
			Game.canvas.addEventListener('touchmove',this.stopTouchScroll,false);

		},
		keyDown:function(event){
			switch(event.keyCode){
				case 39://39监视玩家的右箭头键
					Ctrl.right = true;
					break;
				case 37://37监视玩家的左箭头键
					Ctrl.left = true;
					break;
				default:
					break;
			}
		},
		keyUp:function(event){//当释放按键时，keyUp将重新设置Ctrl的键盘监控
			switch(event.keyCode){
				case 39:
					Ctrl.right = false;
					break;
				case 37:
					Ctrl.left = false;
					break;
				default:
					break;
			}
		},
		movePaddle:function(event){
			var mouseX = event.pageX;
			if(event.touches){
				var mouseX = event.touches[0].pageX
			}
			var canvasX = Game.canvas.offsetLeft;

			var paddleMid = Paddle.w/2;

			if(mouseX>canvasX&&mouseX<canvasX+Game.width){
				var newX = mouseX - canvasX;
				newX-=paddleMid;
				Paddle.x = newX;
			}

		},
		stopTouchScroll:function(event){
			//触摸滚动功能在这个游戏上会造成一些问题，所以只好屏蔽掉这个触摸一定的默认功能。
			event.preventDefault();
		}
	};

	//得分与关卡输出
	var Hub = {
		init:function(){
			this.lv=1;
			this.score=0;
		},
		draw:function(){
			//指定文本的显示属性
			ctx.font = '12px helvetica,arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'left';
			ctx.fillText('Score:'+this.score,5,Game.height-5);//创建得分文本

			ctx.textAlign = 'right';
			ctx.fillText('Lv:'+this.lv,Game.width-5,Game.height -5);//创建关卡文本
		}
	};
	//创建一个欢迎界面
	var Screen={
		welcome:function(){
			this.text = 'CANVAS RICOCHEN';
			this.textSub = 'Click To Start';
			this.textColor = 'white';

			this.create();
		},
		create:function(){
			ctx.fillStyle ='black';
			ctx.fillRect(0,0,Game.width,Game.height);

			ctx.fillStyle =this.textColor;
			ctx.textAlign = 'center';
			ctx.font='40px helvetica,arical';
			ctx.fillText(this.text,Game.width/2,Game.height/2);

			ctx.fillStyle = '#999999';
			ctx.font='20px helvetica,arical';
			ctx.fillText(this.textSub,Game.width/2,Game.height/2+30)
		},
		gameover:function(){
			this.text = 'Game Over';
			this.textSub = 'Click To Retry';
			this.textColor = 'red';

			this.create();
		}
	}

	window.requestAnimFrame=function(callback){
			window.setTimeout(callback,1000/60)
	};
	
	//window.onload的作用是防止代码在其他所有资源完全加载前运行
	window.onload=function(){
		Game.setup();
	};

})()