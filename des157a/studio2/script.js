(function () {
	'use strict';

	console.log("reading js");

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

	window.addEventListener('load', function () {
		const posts = document.querySelectorAll('section');
		let allImgs = document.querySelectorAll('figure img');
		let fig = document.querySelector('figure');
		let footer = document.querySelector('footer');
		let postTops = [];
		let pageTop;
		let counter = 1;
		let prevCounter = 1;
		let doneResizing;

		footer.style.opacity = 1;

		const preloader = document.getElementById('preloader');
		preloader.className = 'fadeout';

		// wait until the animation has completed
		preloader.addEventListener('animationend', function () {
			//once the animation is done, remove the preloader div.
			preloader.style.display = 'none';
		});


		resetPagePosition();

		//When clicking on image, show all constellations only when in first page
		allImgs[1].addEventListener('click', function(event) {
			if(counter == 1) {
				let op = Number(event.target.style.opacity);
				op = (op + 1) % 2;
				event.target.style.opacity = `${op}`;
			}
		});

		window.addEventListener('scroll', function () {
			pageTop = window.pageYOffset + 300;

			if (pageTop > postTops[counter]) {
				counter++;
				console.log(`scrolling down ${counter}`);
			} else if (counter > 1 && pageTop < postTops[counter - 1]) {
				counter--;
				console.log(`scrolling up ${counter}`);
			}

			if (counter != prevCounter) {
				allImgs.forEach((ele) => {ele.className = 'sect' + counter;})
				//We don't want to see constellations in original image or when looking at the Milky Way Patch
				if(counter == 1 || counter == 2) {
					allImgs[1].style.opacity = '0';
				} else {
					allImgs[1].style.opacity = '1';
				}
				prevCounter = counter;
			}

		}); // end window scroll function

		window.addEventListener('resize', function () {
			clearTimeout(doneResizing);
			doneResizing = setTimeout(function () {
				resetPagePosition();
			}, 500);
		});

		function resetPagePosition() {
			postTops = [];
			posts.forEach(function (post) {
				postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
			});

			const pagePosition = window.pageYOffset + 300;
			counter = 0;

			postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });

		}

	}); // end window load function

})();