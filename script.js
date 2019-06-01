const header = $("#header");
const headerHeight = header.outerHeight();
const scrollArrow = $("#scroll-down-arrow");

const randomizeNumber = (min, max) => {
	return (Math.random() * (max - min)) + min;
}

const makeStars = (maxTop, maxStars) => {
	for(let stars=0; stars<maxStars; stars++){
		const minSize = 1;
		const maxSize = 4;
		const minTop = headerHeight; //stars start after header
		const minLeft = maxSize;
		const maxLeft = $("#main").width() - maxSize;

		//Randomized variables within a certain range
		const top = randomizeNumber(minTop, maxTop);
		const left = randomizeNumber(minLeft, maxLeft);
		const size = randomizeNumber(minSize, maxSize);

		//Possible glow speeds
		const glowSpeedValues = ["1s", "1.5s", "2s"];
		const glowSpeed = glowSpeedValues[Math.floor(Math.random() * glowSpeedValues.length)];

		//Possible opacities
		const opacityValues = ["0.5", "0.75", "1"];
		const opacity = opacityValues[Math.floor(Math.random() * opacityValues.length)];

		const star = $(document.createElement('div'));
		star.addClass("star");
		star.css({
			"height": size + "px",
			"width": size + "px",
			"top": top + "px",
			"left": left + "px",
			"border": "1px solid #ffff4c",
			"opacity": opacity,
			"animation" : `glow ${glowSpeed} infinite linear`
		});

		$("#main").append(star);
	}
} //end of makeStar

const generateStars = () => {
	//generates stars for the welcome section of page
	const welcomeMaxTop = $("#welcome").outerHeight();
	makeStars(welcomeMaxTop, 20);

	//generates stars for the main section of page
	const mainMaxTop = $("#main").outerHeight() - $("#footer").outerHeight(); //stars are generated before footer
	makeStars(mainMaxTop, 50);
}

//regenerates stars on window resize
$(window).resize(() => {
	//removes current stars
	$("div.star").remove();
	generateStars();
});

const fadeInHeader = () => {
	const windowTop = $(window).scrollTop();
	//Header will have a solid background when not at the top of the page
	if(windowTop>0){
		header.addClass("blue-header");
	}
	else{
	//Background of header will be transparent at the top of the page for non responsive
		if(!$("#main-nav-links").hasClass("responsive-menu")){
			header.removeClass("blue-header");
		}
		scrollArrow.fadeIn();
	}
}

const fadeInSections = () => {
	//fade in sections on scroll
	//Referenced https://stackoverflow.com/questions/15590236/fade-in-element-on-scroll-down-using-css
	$('.fade').each(function() {
		const sectionTop = $(this).offset().top;
		const windowBottom = $(window).scrollTop() + $(window).height();
		if (sectionTop < windowBottom) {
			$(this).animate({
				"opacity": "1"
			}, 750);
		}
	});
}

const fadeInScrollArrow = () => {
	const welcomeSection = $("#welcome");

	//scroll arrow dissapears as user scrolls down
	const top = $(this).scrollTop() + headerHeight;
	const arrowTop = scrollArrow.offset().top;
	const arrowBottom = arrowTop + scrollArrow.outerHeight();
	const welcomeSectionBottom = welcomeSection.offset().top + welcomeSection.outerHeight(true);
	if(top >= arrowTop){
		//scroll down arrow dissapears when top of screen is past the arrow
		$("#scroll-down-arrow").fadeOut("slow");
	}
	if(top<welcomeSectionBottom - arrowBottom){
		//scroll down arrow reappears on welcome section
		$("#scroll-down-arrow").fadeIn("slow");
	}
}

$(window).scroll(function () {
	fadeInHeader();
	fadeInSections();
	fadeInScrollArrow();
});

const addEmailAnimation = () => {
	//envelope opens on mouse enter, closes on mouse leave
	$("#email-button").mouseenter( () => {
		$("#email-button-icon").html("<i class='fas fa-envelope-open'></i>");
	});

	$("#email-button").mouseleave(()=>{
		$("#email-button-icon").html("<i class='fas fa-envelope'></i>");
	});
}

const hideSections = () => {
	//When page loads, hides main content and only shows welcome section
	$(".fade").each(function(){
		$(this).css({
			"opacity": "0"
		})
	});
}

//Gets main navigation links and main sections
const mainNavLinks = document.querySelectorAll(".main-nav-link");
const mainSections = document.querySelectorAll("section");

$(document).ready(()=>{
	//adds event listeners to main navigation links
	//when main navigation link is clicked, scrolls associated section into view

	mainNavLinks.forEach((link)=>{
		link.addEventListener("click", function(e){
			e.preventDefault();
			const section = $(this).attr("data-link");
			const sectionTop = $(section).offset().top - headerHeight;
			window.scroll({ top: sectionTop, behavior: "smooth" });
		});
	});

	//when scroll down arrow is clicked, scrolls to next section
	scrollArrow.on("click", ()=>{
		const sectionTop = mainSections[1].offsetTop - headerHeight;
		window.scroll({ top: sectionTop, behavior: "smooth" });
	});

	//When hamburger menu icon is clicked, displays menu
	const hamburgerMenu = document.getElementById("hamburger-menu-icon");
	hamburgerMenu.addEventListener("click", function(){
		header.addClass("blue-header");
		$('#main-nav-links').toggleClass("responsive-menu");
		$('#main-nav-links').find("li").toggleClass("block");
		$("#header-content").toggleClass("align-top");
	});
	hideSections();
	generateStars();
	addEmailAnimation();

}); //end of document ready
