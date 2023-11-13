window.onload = function(){
    let canvasWidth = 900;
    let canvasHeight = 600;
    let blockSize = 30;
    let ctx;
    let delay = 500;
    let snakee;
    let applee;
    let widthInBlock = canvasWidth/blockSize;
    let heightInBlock = canvasHeight/blockSize;
    let score;
    let timeOut;

    init();

    function init(){
        let canvas = document.createElement('canvas')
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "3px solid white";
        canvas.style.borderRadius = "18px";
        canvas.style.backgroundColor = "rgb(14, 52, 121)"
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]], "right");
        applee = new Apple([15, 9]);
        score = 0;
        refreshCanvas();

        
    }

    function refreshCanvas(){

            snakee.advance();
            if(snakee.checkColision()){

                gameOver();
            
            }else{
                if(snakee.isEatingApple(applee)){
                    score++;
                    snakee.eatApple = true;
                    do{
                        applee.setNewPosition();
                    }
                    while(applee.isOnSnake(snakee))
                    
                    //le serpent a manger la pomme
                }
                ctx.clearRect(0,0,canvasWidth, canvasHeight);
                drawScore();
                snakee.draw();
                applee.draw();
                timeOut = setTimeout(refreshCanvas,delay);

            }
        }
    function gameOver(){
        ctx.save();
        ctx.font = "40px serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseAlign = "middle";
        ctx.strokeStyle = "#DAA520";
        ctx.lineWidth = 2;
        var centerX = canvasWidth/2;
        var centerY = canvasHeight/2;
        ctx.strokeText("Vous avez perdu", centerX, centerY -60 ) ;
        ctx.fillText("Vous avez perdu", centerX, centerY  - 60) ;
        ctx.strokeText("Si tu souhaite rejouer appuis sur la touche espace", centerX, centerY +40);
        ctx.fillText("Si tu souhaite rejouer appuis sur la touche espace", centerX, centerY +40);
        ctx.restore();
    };

    function drawBlock(ctx, position){
        let x = position[0] * blockSize;
        let y = position[1] * blockSize;
        ctx.fillRect(x,y, blockSize, blockSize);
    }

    function Snake(body, direction){
        this.body = body;
        this.direction = direction;
        this.eatApple = false;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "#DAA520";
            for(let i=0; i<this.body.length;i++){
                drawBlock(ctx,this.body[i]);
            }
            ctx.restore();
        }

        this.advance = function(){
            let nextPosition = this.body[0].slice();
            switch(this.direction){
                case "left":
                    nextPosition[0]--;
                    break;
                case "right":
                    nextPosition[0]++;
                    break;
                case "down":
                    nextPosition[1]++;
                    break;
                case "up":
                    nextPosition[1]--;
                    break;
                default:
                    throw("Invalid direction");
            }

            this.body.unshift(nextPosition);
            if(!this.eatApple)
                this.body.pop();
            else
                this.eatApple = false
        };

        this.setDirection = function(newDirection){
            let allowedDirections;
            switch(this.direction){
                case "left":
                case "right":
                    allowedDirections = ["up","down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"]
                    break;
                default:
                    throw("Invalid direction");
            }

            if(allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }

        }

        this.checkColision = function(){
            let wallColision = false;
            let snakeColision = false;
            let head = this.body[0];
            let rest = this.body.slice(1);
            let snakeX = head[0];
            let snakeY = head[1];
            let minX = 0;
            let minY = 0;
            let maxX = widthInBlock - 1;
            let maxY = heightInBlock - 1;
            let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            let isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
                wallColision = true;
            }

            for(let i = 0; i < rest.length; i++){
                if(snakeX === rest[i][0] && snakeY === rest[i][1] ){
                    snakeColision = true
                }
            }

            return wallColision || snakeColision;
        };

        this.isEatingApple = function(appleToEat){
            let head = this.body[0];
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
            
        };
    }

    function Apple(position){
        this.position = position;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "rgb(210, 210, 210)"
            ctx.beginPath();
            var radius = blockSize/2;
            var x = this.position[0]*blockSize + radius;
            var y = this.position[1]*blockSize + radius;
            ctx.arc (x, y, radius, 0, Math.PI*2,true);
            ctx.fill();
            ctx.restore();
        }
        this.setNewPosition = function(){
            let newX = Math.round(Math.random() * (widthInBlock - 1));
            let newY = Math.round(Math.random() * (heightInBlock - 1));
            this.position = [newX,newY];
        };
        this.isOnSnake = function(snakeToCheck){
            let isOnSnake = false;

            for(let i = 0; i < snakeToCheck.body.length; i++){
                if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body [i][1]){
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };
    }
    
    function rejouer(){
        console.log("Restarting the game...");
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        clearTimeout(timeOut);
        refreshCanvas();
    };

    function drawScore(){
        ctx.save();
        ctx.fillStyle = "#DAA520";
        ctx.font = " 40px serif";
        ctx.fillText(score.toString(), 5, canvasHeight - 5);
        ctx.restore();
    }



    document.onkeydown = function handleKeyDown(event){
        let pressedKey = event.key;

        switch(pressedKey){
            case "ArrowLeft":
                snakee.setDirection("left");
                break;
            case "ArrowRight":
                snakee.setDirection("right");
                break;
            case "ArrowDown":
                snakee.setDirection("down");
                break;
            case "ArrowUp":
                snakee.setDirection("up");
                break;
            default:
                return;
        }
    };

    // Ajouter un événement d'écoute pour la touche espace
    document.addEventListener("keydown", function(event) {
        if (event.key === " ") {
            rejouer();
        }
    });
        snakee.setDirection();

};
