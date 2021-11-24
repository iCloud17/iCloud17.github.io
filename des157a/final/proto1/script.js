(function() {
    "use strict";
    console.log('using js');


    window.addEventListener('load', function() {
        const btns = document.querySelectorAll('#actions button');
        const scoreEle = document.getElementById('score');
        const timeEle = document.getElementById('time');
        const lvlEle = document.getElementById('lvl');
        const openOverlay = document.querySelector('.open');
        const closeOverlay = document.querySelector('.close');
        const overlay = document.getElementById('overlay');
        const buttons = [];
        const directions = ['left', 'right'];
        let dir = 0;
        let score = 0;
        let misses = 0;
        const totTime = 10;
        timeEle.innerText = `${totTime}`;
        let time = totTime;
        let lvl = 1;
        let timer;

        function setInnerTxt(ele, val) {
            ele.innerText = `${val}`;
        }

        //#region Assign Button Objects
        function Button(element, id = 0) {
            return {
                ele: element,
                id: id,
                addEventListener: function(action, func) {
                    this.ele.addEventListener(action, func);
                }
            };
        }

        let btnId = 0
        btns.forEach(function(button) {
            buttons.push(new Button(button, btnId++));
        });

        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (btn.id == dir) {
                    score += 1;
                    setInnerTxt(scoreEle, score);
                } else {
                    misses += 1;
                }
                lvl += 1;
                setInnerTxt(lvlEle, lvl);   
                randomizeInput();
            });
        });
        //#endregion

        //#region Randomly assign start
        function getRandomVal(start = 0, end = 1) {
            return Math.floor((Math.random() * end) + start);
        }

        function randomizeInput() {
            let dirBtn = getRandomVal(0, 2);
            dir = getRandomVal(0, 2);
            setInnerTxt(buttons[dirBtn].ele, directions[dir]);
            setInnerTxt(buttons[(dirBtn + 1) % buttons.length].ele, '');
        }

        randomizeInput();
        //#endregion

        //#region Timer
        function startTimer() {
            timer = setInterval(function() {
                time--;
                timeEle.innerText = `${time}`;
                if(time == 0) {
                    gameOver();
                    stopTimer();
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timer);
        }
        //#endregion
    
        //#region Overlay
        openOverlay.addEventListener('click', function(event) {
            event.preventDefault();
            overlay.className = 'showing';
            stopTimer();
        });
    
        closeOverlay.addEventListener('click', function(event) {
            event.preventDefault();
            overlay.className = 'hidden';
            startTimer();
        });
    
        document.addEventListener('keydown', function(event) {
            if (event.key == 'Escape') {
                if(overlay.className === 'showing') {
                    startTimer();
                }
                overlay.className = 'hidden';
            }
        });
        //#endregion
    
        function gameOver() {
            overlay.className = 'showing';
            overlay.querySelector('#instr').className = 'hidden';
            overlay.querySelector('#over').className = 'show';
            overlay.querySelector('#over p').innerHTML = `Score = ${score} <br> Misses = ${misses} <br> Accuracy = ${(score * 100 / (score + misses)).toFixed(2)}% <br> Rate = ${(score / totTime).toFixed(2)}/s <br> Level Reached = ${lvl} <br> Please refresh page to restart!`;
        }
    });
}());