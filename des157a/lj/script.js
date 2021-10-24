(function() {
    'use strict';
    console.log('reading js');

    // Add lots of stars for each level
    // function getRandomInt(lo, hi) {
    //     return Math.floor(((hi - lo + 1) * Math.random()) + lo);
    // }
    
    // function addStars(n, element) {
    //     var boxShadows = '';
    //     for(var i = 1; i < n; i++) {
    //         // console.log(i);
    //         boxShadows += `${getRandomInt(0, 2000)}px ${getRandomInt(0, 2000)}px #FFF, `;
    //     }
    //     boxShadows += `${getRandomInt(0, 2000)}px ${getRandomInt(0, 2000)}px #FFF`;
    //     element.style.boxShadows = boxShadows;
    //     console.log(element.style.boxShadows);
    // }
    // var stars = document.querySelector('#stars');
    // addStars(700, stars);
    // var stars1 = document.querySelector('#stars1');
    // addStars(350, stars1);
    // var stars2 = document.querySelector('#stars2');
    // addStars(175, stars2);
    
    // Add event listeners for each article to open onclick
    const articles = document.querySelectorAll('.articleCol article');
    for(let i = 0; i < articles.length; i++) {
        // console.log(articles[i]);
        let title = articles[i].querySelector('.title');
        title.addEventListener('click', function(event) {
            let article = event.target;
            while(article.tagName != 'ARTICLE') {
                article = article.parentNode;
            }
            let arrow = article.querySelector('.arrow')
            let contentDivs = article.querySelector('.contentCover');
            let para = contentDivs.querySelector('p');
            // console.log(event.target, article.tagName, contentDivs.style.height, arrow);
            if(contentDivs.style.height == '0px' || contentDivs.style.height == '') {
                arrow.style.transform = "rotate(90deg)";
                contentDivs.style.height = `${para.offsetHeight}px`;
            } else {
                contentDivs.style.height = '0';
                arrow.style.transform = "rotate(0)";
            }
        });
    }
}());