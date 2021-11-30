(function() {
    "use strict";
    console.log('using js');


    window.addEventListener('load', function() {

        const pages = [document.getElementById('introduction'), document.getElementById('game'), document.getElementById('report')];
        const container = document.querySelector('#container');
        const play = document.getElementById('playGame');
        const playAgain = document.getElementById('again');
        const btns = document.querySelectorAll('#actions button');
        const scoreEle = document.getElementById('score');
        const timeEle = document.getElementById('time');
        const timeContainer = document.getElementById('timer');
        const lvlEle = document.getElementById('lvl');
        const quitBtn = document.getElementById('quit');
        const openOverlay = document.querySelector('.open');
        const closeOverlay = document.querySelector('.close');
        const overlay = document.getElementById('overlay');
        const audios = [new Audio('audio/mixkit-game-ball-tap-2073.wav'), new Audio('audio/mixkit-quick-jump-arcade-game-239.wav'), new Audio('audio/mixkit-negative-guitar-tone-2324.wav'), new Audio('audio/mixkit-bonus-extra-in-a-video-game-2064.wav')];
        const actionAudio = 0;
        const rightAudio = 1;
        const wrongAudio = 2;
        const gameOverAudio = 3;
        let curPage = 0;
        const buttons = [];
        const directions = ['LEFT', 'RIGHT'];
        const reportColors = ['#6d34d6', '#6FD08C', '#e49400'];
        const bgColors = ['#50279c', '#4f9464', '#b47500'];
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

        function playAudio(index) {
            audios.forEach((audio) => {audio.pause();});
            audios[index].currentTime = 0;
            audios[index].play();
        }

        //#region Change Pages

        play.addEventListener('click', function(event) {
            event.preventDefault();
            document.body.className = 'pFadeOut';
            playAudio(actionAudio);
            setTimeout(function() {
                pages[curPage++].className = 'hidden';
                pages[curPage].className = 'show';
                document.body.className = 'pFadeIn';
                // setTimeout(startTimer, 500);
            }, 500);
        });

        quitBtn.addEventListener('click', function() {
            gameOver();
            stopTimer();
        });

        function gameOver() {
            document.body.className = 'pFadeOut';
            playAudio(gameOverAudio);
            setTimeout(function() {
                pages[curPage++].className = 'hidden';
                pages[curPage].className = 'show';
                let accuracy = (score + misses) ? (score / (score + misses)) : 0;
                let message = '';
                let performance = Math.floor(score * accuracy / 10);
                switch(performance) {
                    case 0: message = 'ᕦ(ò_ó)ᕤ <br> Try harder next time! <br> Increase your score * accuracy!';
                        break;
                    case 1: message = '\\(oᴗo)/ <br> That was a decent effort! <br> Increase your score * accuracy!';
                        break;
                    case 2: message = 'ヾ(。⌒∇⌒)ノ <br> That was amazing!';
                        break;
                    default: message = 'ヾ(。⌒∇⌒)ノ <br> That was amazing!';
                    break;
                }
                pages[curPage].querySelector('#over p').innerHTML = `${message} <br> Score = ${score} <br> Misses = ${misses} <br> Accuracy = ${(accuracy * 100).toFixed(2)}% <br> Rate = ${(score / totTime).toFixed(2)}/s <br> Levels Completed = ${lvl-1}`;
                pages[curPage].style.backgroundColor = reportColors[performance];
                container.style.backgroundColor = reportColors[performance];
                document.body.style.backgroundColor = bgColors[performance];
                document.body.className = 'pFadeIn';
            }, 500);
        }

        playAgain.addEventListener('click', function(event) {
            event.preventDefault();
            playAudio(actionAudio);
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
                        playAudio(wrongAudio);
                    } else {
                        score += 1;
                        setInnerTxt(scoreEle, score, 'white');
                        playAudio(rightAudio);
                    }
                } else {
                    if (btn.id == dir) {
                        score += 1;
                        setInnerTxt(scoreEle, score, 'white');
                        playAudio(rightAudio);
                    } else {
                        misses += 1;
                        playAudio(wrongAudio);
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
            timeContainer.style.animationPlayState = 'running';
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
            timeContainer.style.animationPlayState = 'paused';
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
            console.log(event.target.id);
            if(event.target.id !== 'overlayArticle' && event.target.id !== '' && overlay.className === 'showing') {
                startTimer();                
                overlay.className = 'hidden';
                console.log('close overlay');
            }
        });
        //#endregion

    });
}());
