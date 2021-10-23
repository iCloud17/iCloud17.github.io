(function() {
    'use strict';
    console.log('reading js');

    //VERSION 3
    const form = document.getElementById('myForm');
    const article = document.getElementById('madlib');
    var words = [];
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = document.querySelectorAll('input[type=text]');
        processForm(formData);
    });

    function processForm(formData) {
        let emptyFields = 0;
        for (let eachField of formData) {
            if (eachField.value) {
                words.push(eachField.value);
                eachField.value = '';
            } else {
                emptyFields++;
            }
        }
        if (emptyFields) {
            article.textContent = 'Please fill out the form so that I can make your Mad Lib!';
        } else {
            makeMadLib(words);
            words = [];
        }
    }

    function makeMadLib(wordsAr) {
        let myText = `Here are the words; ${wordsAr[0]}, ${wordsAr[1]}, ${wordsAr[2]}, and ${wordsAr[3]}`;
        article.textContent = myText;
    }
}());