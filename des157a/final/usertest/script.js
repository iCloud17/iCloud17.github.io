(function() {
    "use strict";
    console.log('using js');


    window.addEventListener('load', function() {

        alert("Hello there! Thanks for testing my game today! I would like you to test a couple of things:\n-->Play the game as instructed\n-->Try opening the information popup on the bottom right of the screen when the game starts by either clicking on it or pressing the 'i' key and the timer should pause in the background.\n-->Try different ways of exiting the overlay-clicking anywhere except overlay, close button, escape key, 'i' key, etc.\n-->For one trial get a 0 score to see if that breaks the maths in the results page!\nThanks again and have fun!");

        const pages = [document.getElementById('introduction'), document.getElementById('game'), document.getElementById('report')];
        let curPage = 0;
        const play = document.getElementById('playGame');
        const playAgain = document.getElementById('again');
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
        const totTime = 30;
        timeEle.innerText = `${totTime}`;
        let time = totTime;
        let lvl = 1;
        const revLvl = 10;
        let rev = false;
        let timer;

        //#region Change Pages

        play.addEventListener('click', function(event) {
            event.preventDefault();
            document.body.className = 'pFadeOut';
            setTimeout(function() {
                pages[curPage++].className = 'hidden';
                pages[curPage].className = 'show';
                document.body.className = 'pFadeIn';
                setTimeout(startTimer, 500);
            }, 500);
        });

        function gameOver() {
            document.body.className = 'pFadeOut';
            setTimeout(function() {
                pages[curPage++].className = 'hidden';
                pages[curPage].className = 'show';
                document.body.className = 'pFadeIn';
                let accuracy = (score + misses) ? (score * 100 / (score + misses)).toFixed(2) : 0;
                pages[curPage].querySelector('#over p').innerHTML = `Score = ${score} <br> Misses = ${misses} <br> Accuracy = ${accuracy}% <br> Rate = ${(score / totTime).toFixed(2)}/s <br> Levels Completed = ${lvl-1}`;
            }, 500);
        }

        playAgain.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.reload();
        });

        //#endregion

        function setInnerTxt(ele, val, color = 'black', colorRed = false) {
            ele.innerText = `${val}`;
            if(colorRed) {
                ele.style.color = 'red';
            } else {
                ele.style.color = color;
            }
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
                if(rev) {
                    if (btn.id == dir) {
                        misses += 1;
                    } else {
                        score += 1;
                        setInnerTxt(scoreEle, score, 'white');
                    }
                } else {
                    if (btn.id == dir) {
                        score += 1;
                        setInnerTxt(scoreEle, score, 'white');
                    } else {
                        misses += 1;
                    }
                }
                setInnerTxt(lvlEle, ++lvl, 'white');   
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
            if(lvl > revLvl)
                rev = Math.random() < 0.5;
            setInnerTxt(buttons[dirBtn].ele, directions[dir], 'black', rev);
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
            console.log('open overlay');
        });

        closeOverlay.addEventListener('click', function(event) {
            event.preventDefault();
            overlay.className = 'hidden';
            startTimer();
        });
    
        document.addEventListener('keydown', function(event) {
            if(event.key === 'Escape' && overlay.className === 'showing') {
                startTimer();
                overlay.className = 'hidden';
            }
            if(event.key.toLowerCase() === 'i' && curPage == 1) {
                if(overlay.className === 'hidden') {
                    event.preventDefault();
                    overlay.className = 'showing';
                    stopTimer();
                    console.log('i open overlay');
                } else {
                    startTimer();                
                    overlay.className = 'hidden';
                    console.log('i close overlay');
                }
            }
        });

        overlay.addEventListener('click', function(event) {
            if(event.target.id !== 'overlayArticle' && overlay.className === 'showing') {
                startTimer();                
                overlay.className = 'hidden';
                console.log('close overlay');
            }
        });
        //#endregion

    });
}());