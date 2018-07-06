(function(){
    //把所有的代码都刚在一个自执行函数中，免得污染全局变量
    //一个用来容纳2d绘图环境的空变量
    var ctx = null;
    //Game描述整个游戏的运行
    var Game = {
        canvas:document.getElementById('canvas'),
        levelUp:function(){
            //游戏等级提升
            Hub.lv+=1;
            //每次等级升级要重新初始化砖块，小球，挡板
            Bricks.init();
            Ball.init();
            Paddle.init();
        },
        levelLimit:function(lv){
            return lv>5?5:lv;
        },
        setup:function(){
            //初始化游戏
            ctx = this.canvas.getContext('2d');
            this.canvas.width = 408;
            this.canvas.height = 250;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.init();
            Ctrl.init();
        },
        animate:function(){
            //每1秒绘制60次界面
            Game.play = requestAnimFrame(Game.animate);
            Game.draw();
        },
        init:function(){
            //init()包含了所有的对象实例
            Background.init();
            Hub.init();
            Bricks.init();
            Ball.init();
            Paddle.init();
            this.animate();

        },
        draw:function(){
            //draw()用于处理所有更新并绘制对象的逻辑
            Background.draw();
            Hub.draw();
            Bricks.draw();
            Ball.draw();
            Paddle.draw();
            

        }
    };

    var Background = {
        init:function(){
            //初始化背景，载入背景图片
            this.ready = false;
            this.img = new Image();
            this.img.src = 'background.jpg';
            this.img.onload=function(){
                Background.ready = true;
            }
        },
        draw:function(){
            //画出背景图片
            if(this.ready){
                ctx.drawImage(this.img, 0, 0);
            }
        }
    };

    var Bricks = {
        gap:2,
        col:5,
        w:80,
        h:15,
        init:function(){
            //初始化行和列数据
            this.row = 2+Game.levelLimit(Hub.lv);
            // this.row = 3;
            this.total = 0;//当前消除的砖块
            this.count = [];
            for(var i=0;i<this.row;i++){
                this.count[i] = [];
            }
        },
        draw:function(){
            //根据数组数据绘制砖块
            for(var i=0;i<this.row;i++){
                for(var j=0;j<this.col;j++){
                    if(this.count[i][j]!=false){
                        if(Ball.x>=this.x(j)&&Ball.x<=(this.x(j)+this.w)&&(Ball.y+Ball.r)>=this.y(i)&&(Ball.y+Ball.r)<=this.y(i)+this.h){
                                this.collide(i,j);
                                continue;
                        }
                        ctx.fillStyle = this.gradient(i);
                        ctx.fillRect(this.x(j),this.y(i),this.w,this.h);
                    }
                }
            }
        },
        x:function(col){
            //计算横坐标
            return (this.w+this.gap)*col
        },
        y:function(row){
            //计算纵坐标
            return (this.h+this.gap)*row
        },
        gradient:function(row){
            //根据行生成一个渐变对象
            switch(row){
                case 0:
                    return this.gradientPurple?this.gradientPurple:this.gradientPurple = this.makeGradient(row,'#bd06f9','#9604c7');
                    break;
                case 1:
                    return this.gradientRed?this.gradientRed:this.gradientRed = this.makeGradient(row,'pink','red');
                    break;

                case 2:
                    return this.gradientGreen?this.gradientGreen:this.gradientGreen = this.makeGradient(row,'#05fa15','#04c711');
                    break;
                default:
                    return this.gradientOrange?this.gradientOrange:this.gradientOrange = this.makeGradient(row,'#faa105','#c77f04');
                ;
            }
        },
        makeGradient:function(row,col1,col2){
            //根据传入的行和颜色生成渐变对象
            var y = this.y(row);
            var grad = ctx.createLinearGradient(0, y, 0, y+this.h);
            grad.addColorStop(0, col1);
            grad.addColorStop(1, col2);
            return grad;
        },
        collide:function(i,j){
            this.count[i][j] = false;
            this.total +=1;
            Hub.score+=1;
            // if(this.total==this.row*this.col){
            //     Game.levelUp();
            // }
            Ball.sy = -Ball.sy;

        }
    };

    var Ball = {
        r:10,
        init:function(){
            //初始化球的坐标，速度
            this.x = 120;
            this.y = 120;
            this.sx = 1+(Hub.lv*0.4);
            this.sy = -1.5-(Hub.lv*0.4);
        },
        draw:function(){
            //绘制小球
            //检测小球的位置；
            this.edges();//容器边沿检测
            this.collide();//碰撞检测
            this.move();
            //画出小球
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
            ctx.closePath();
            ctx.fillStyle = "#eee";
            ctx.fill();
        },
        edges:function(){
            //边沿检测
            if(this.y<1){//游戏容器的上边界
                this.y = 1;
                this.sy = -this.sy;
            }else if(this.y>Game.height){
                //容器的下边界
                this.sy = this.sx = 0;
                this.y = this.x = 1000;//用一些方法和对象来隐藏小球
                return;
            }
            if(this.x<1){
                //容器的左边界
                this.x = 1;
                this.sx = -this.sx;
            }else if(this.x>Game.width){
                //容器的右边界
                this.x = Game.width -1;
                this.sx = -this.sx;
            }

        },
        collide:function(){
            if(this.x>=Paddle.x&&this.x<=(Paddle.x+Paddle.w)&&(this.y+this.r)>=Paddle.y&&(this.y+this.r)<=Paddle.y+Paddle.h){
                this.sx = 7*(this.x-(Paddle.x+Paddle.w/2))/Paddle.w;
                this.sy = -this.sy;
            }
        },
        move:function(){
            //使小球移动
            this.x+=this.sx;
            this.y+=this.sy;
        }
    };

    var Paddle = {
        w:90,
        h:15,
        init:function(){
            this.x = 100;
            this.y = 210;
            this.speed = 4;
        },
        draw:function(){
            this.move();
            ctx.beginPath();
            ctx.fillStyle = "#eee";
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.closePath();
        },
        move:function(){
            if((this.x>-(this.w/2)&&this.x<(Game.width-this.w/2))&&Ctrl.left){
                this.x += -this.speed;                
            }else if((this.x>-(this.w/2)&&this.x<(Game.width-this.w/2))&&Ctrl.right){
                this.x += this.speed;
            }
        }
    };

    var Ctrl = {
        init:function(){
            window.addEventListener('keydown', this.keyDown);
            window.addEventListener('keyup',this.keyUp);

            window.addEventListener('mousemove',this.movePaddle);

            window.addEventListener('touchstart',this.movePaddle);
            window.addEventListener('touchmove',this.movePaddle);
            window.addEventListener('touchmove',this.stopTouchScroll);
        },
        keyDown:function(event){
            switch(event.keyCode){
                case 37:
                    Ctrl.left = true;
                    break;
                case 39:
                    Ctrl.right = true;
                    break;
                default:
                    break;
            }
        },
        keyUp:function(event){
            switch(event.keyCode){
                case 37:
                    Ctrl.left = false;
                    break;
                case 39:
                    Ctrl.right = false;
                    break;
                default:
                    break;
            }
        },
        movePaddle:function(event){
            //通过监听鼠标移动触发的回掉函数
            if(event.touches){
                var mouseX = event.touches[0].clientX;
            }else{
                var mouseX = event.clientX;
            }
            //canvas的左上角的横坐标
            var canvasX= Game.canvas.offsetLeft;
            //paddleMid表示挡板宽度的一半
            var paddleMid = Paddle.w/2;
            if(mouseX>canvasX&&mouseX<canvasX+Game.width){
                //是鼠标相对于canvas的坐标；
                var newX = mouseX - canvasX;
                //newX变成挡板左上角的横坐标
                newX -= paddleMid;
                Paddle.x = newX;
            }

        },
        stopTouchScroll:function(event){
            event.preventDefault();
        }
    };

    //记分牌
    var Hub ={
        init:function(){
            this.lv = 1;
            this.score = 0;
        },
        draw:function(){
            ctx.font = "12px '微软雅黑'";
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'left';
            ctx.fillText('得分:'+this.score,5, Game.height-5);
            ctx.textAlign = 'right';
            ctx.fillText('等级:'+this.lv,Game.width-5, Game.height-5);
        }
    };

    window.requestAnimFrame = function(callback){
        //把你传入的函数1/60秒后执行一次
        window.setTimeout(callback, 1000/60);
    }
    window.onload=function(){
        Game.setup();
    }
})()