(function() {
    'use strict';
    console.log('reading js');

    //------------------Resize backpage to be same as main form page------------------
    let frame = document.getElementById('rotatedFrame');
    let mainPage = document.getElementById('mainPage');

    function resizeFrame(toSet, toCopy) {
        toSet.style.height = toCopy.offsetHeight + 'px';
        toSet.style.width = toCopy.offsetWidth + 'px';
    }

    window.addEventListener('resize', function(event) {
        resizeFrame(frame, mainPage);
    });

    window.addEventListener('load', function(event) {
        resizeFrame(frame, mainPage);
    });

    //-------------------------------Random Spawn Ghost-------------------------------
    const ghost = document.getElementById('ghost');
    const spawns = [[15, 2, 41, 0], [15, 2, 80, 30], [20, 55, 8, -15], [10, 60, 83, 30], [25, 73, 83, -10]];
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

    var timer =  setInterval(spawnGhost, 15000);

    //------------------------Function To Hide and Show Element------------------------
    function toDisplay(element, show) {
        if(show) {
            element.style.visibility = 'visible';
            element.style.opacity = '1';
        } else {
            element.style.visibility = 'hidden';
            element.style.opacity = '0';
        }
    }

    //---------------------------------Submitting Form---------------------------------

    function assignVal(id1, id2) {
        for(let id of id1) {
            document.getElementById(id).innerText = document.getElementById(id2).value;
        }
        document.getElementById(id2).value = '';
    }

    const formPage = document.getElementById('formPage');
    const form = document.getElementById('myForm');
    const story = document.getElementById('story');
    const again = document.querySelector('#story button');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        assignVal(['fr1', 'fr11', 'fr12'], 'relation1');
        assignVal(['vb1'], 'verb');
        assignVal(['loc'], 'room1');
        assignVal(['fr2'], 'relation2');
        assignVal(['ad1'], 'adj1');
        assignVal(['feeling'], 'feel1');

        toDisplay(formPage, false);
        toDisplay(story, true);
    });

    //-----------------------------------Play Again-----------------------------------
    again.addEventListener('click', function(event) {
        toDisplay(formPage, true);
        toDisplay(story, false);
    });
}());