(function() {
    'use strict';
    console.log('reading js');

    //------------------Resize backpage to be same as main form page------------------
    let frame = document.getElementById('rotatedFrame');
    let formPage = document.getElementById('mainPage');

    function resizeFrame(toSet, toCopy) {
        toSet.style.height = toCopy.offsetHeight + 'px';
        toSet.style.width = toCopy.offsetWidth + 'px';
    }

    window.addEventListener('resize', function(event) {
        resizeFrame(frame, formPage);
    });

    resizeFrame(frame, formPage);

    //-------------------------------Random Spawn Ghost-------------------------------
    const ghost = document.getElementById('ghost');
    const spawns = [[15, 10, 50, 0], [15, 7, 75, 30], [20, 58, 7, -15], [10, 55, 80.5, 30], [30, 68, 77, -10]];
    const transitions = ['ease', 'ease-in', 'ease-in-out', 'ease-out'];

    function getRandomInt(lo, hi) {
        return Math.floor(((hi - lo + 1) * Math.random()) + lo);
    }


    function spawnGhost() {
        //disappear
        ghost.style.opacity = '0';
        //change location
        let durationStr = ghost.style.transitionDuration;
        let duration = Number(durationStr.substring(0, durationStr.length - 2));
        if(!duration) {
            duration = 3000;
        }
        setTimeout(function (){
            let newStatus = spawns[getRandomInt(0, spawns.length - 1)];
            ghost.style.width = newStatus[0] + '%';
            ghost.style.top = newStatus[1] + '%';
            ghost.style.left = newStatus[2] + '%';
            ghost.style.transform = `rotate(${newStatus[3]}deg)`;
            let delay = getRandomInt(2000, 4000);    
            ghost.style.transition = `${delay}ms ${transitions[getRandomInt(0, transitions.length - 1)]} opacity`;
            //reappear
            setTimeout(function () {
                ghost.style.opacity = '1';
            }, delay);
        }, duration);
    }

    // var timer =  setInterval(spawnGhost, 15000);
}());