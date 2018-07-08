(() => {
    //容纳2D绘图环境容器
    let ctx = null,
        //游戏对象
        Game = {
            canvas: document.getElementById('canvas'),

            setup: () => { //设置画布
                ctx = Game.canvas.getContext('2d');
                Game.canvas.width = 408;
                Game.canvas.height = 250;
                Game.init();
            },

            animate: () => {
                Game.play = requestAnimate(Game.animate);
                Game.draw();
            },

            init: () => { //初始化所有对象实例
                Background.init();
                Bricks.init();
                Ball.init();
                Paddle.init();
                Game.animate();
            },

            draw: () => { //TODO:处理更新并绘制对象逻辑
                Background.draw();
                Bricks.draw();
                Ball.draw();
                Paddle.draw();
            },
        },

        //背景对象
        Background = {
            init: () => {
                Background.ready = false;
                Background.img = new Image();
                Background.img.src = "background.jpg";
                Background.img.onload = () => {
                    Background.ready = true;
                };
            },
            draw: () => {
                if (Background.ready) {
                    ctx.drawImage(Background.img, 0, 0);
                }
            },
        },
        //滑板对象
        Paddle = {
            w: 90,
            h: 20,
            init: () => {
                Paddle.x = 100;
                Paddle.y = 210;
                Paddle.speed = 4;
            },
            draw: () => {
                Paddle.move();
                ctx.beginPath();
                ctx.fillStyle = "#ccc";
                ctx.rect(Paddle.x, Paddle.y, Paddle.w, Paddle.h);
                ctx.closePath();
                ctx.fill();
            },
            move: () => {
                Paddle.x += Paddle.speed;
            }
        },
        //砖块对象
        Bricks = {
            gap: 2,
            col: 5,
            w: 80,
            h: 15,
            init: () => {
                Bricks.row = 3;
                Bricks.total = 0;
                Bricks.count = [];
                for (var i = 0; i < Bricks.row; i++) {
                    Bricks.count[i] = [];
                }
            },
            draw: (o,k,l) => {
                for (var i = 0; i < Bricks.row; i++) {
                    for (var j = 0; j < Bricks.col; j++) {
                        if (Boolean(Bricks.count[i][j]) !== false) {
                            continue;
                        }
                        ctx.fillStyle = Bricks.gradient(i);
                        ctx.fillRect(Bricks.x(j), Bricks.y(i), Bricks.w, Bricks.h);
                    }
                }
            },
            collide: () => {
                Bricks.total++;
            },
            x: (col) => {
                //根据砖块所在列，计算横坐标
                return (Bricks.w + Bricks.gap) * col;
            },
            y: (row) => {
                //根据砖块所在行，计算纵坐标
                return (Bricks.h + Bricks.gap) * row;
            },
            gradient: (row) => {
                switch (row) {
                    case 0:
                        return Bricks.gradientPurple ? Bricks.gradientPurple : Bricks.gradientPurple = Bricks.makeGradient(row, '#bd06f9', '#9604c7');
                    case 1:
                        return Bricks.gradientRed ? Bricks.gradientRed : Bricks.gradientRed = Bricks.makeGradient(row, '#f9064a', '#c7043b');
                    case 2:
                        return Bricks.gradientGreen ? Bricks.gradientGreen : Bricks.gradientGreen = Bricks.makeGradient(row, '#05fa15', '#04c711');
                    default:
                        return Bricks.gradientOrange ? Bricks.gradientOrange : Bricks.gradientOrange = Bricks.makeGradient(row, '#faa105', '#c77f04');
                }
            },
            makeGradient: (row, color1, color2) => {
                var y = Bricks.y(row);
                var grad = ctx.createLinearGradient(0, y, 0, y + Bricks.h);
                grad.addColorStop(0, color1);
                grad.addColorStop(1, color2);
                return grad;
            }
        },
        //小球对象
    
        Ball = {
            r: 10,
            init: () => {
                //初始化球的坐标，速度
                Ball.x = 120;
                Ball.y = 120;
                Ball.sx = 2;
                Ball.sy = -2;
            },
            draw: () => {
                //检测小球
                Ball.edges();
                Ball.collide();
                Ball.move();
                //画出小球
                ctx.beginPath();
                ctx.arc(Ball.x, Ball.y, Ball.r, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fillStyle = "#ccc";
                ctx.fill();
            },
            //TODO:边界检测
            edges: () => {},
            //TODO:碰撞检测
            collide: () => {},
            //使小球移动
            move: () => {
                Ball.x += Ball.sx;
                Ball.y += Ball.sy;
            },
        },
        //TODO:控制对象
        Ctrl = {
            init: () => {},
            draw: () => {},
        };

    window.requestAnimate = function (callback) {
        window.setTimeout(callback, 1000 / 60);
    }; //自定义

    //加载初始化
    window.onload = function () {
        Game.setup();
    };
})();