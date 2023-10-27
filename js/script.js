$(document).ready(function() {
	var allowClick = true
	createStars(120)
	moveStars()

	$('.box').click(function(e){
		let mouseTop = Math.floor(e.pageY - $(this).offset().top)
		let mouseLeft = Math.floor(e.pageX - $(this).offset().left)

		if(allowClick) {
			allowClick = false
			count = 0
			max = 25
			let coef = 1
			let change = 0.1
			
			let interval = setInterval(()=>{
				count++
				if(count === max-1 ) {
					clearBox()
					clearInterval(interval)
				}

				let newElement = $("<div></div>").addClass("newEl")
				width = Math.floor((max-count)/max * 100 * coef)
				coef = coef - change
				if(change >= 0.02) change = change - 0.01

				topSet = Math.floor(count/max * mouseTop)
				leftSet = Math.floor(count/max * mouseLeft)
				
				newElement.width(`${width}%`)
				newElement.height(`${width}%`)
				newElement.offset({top:topSet,left:leftSet})
				
				$(this).append(newElement)
			},60)
		}
		

	})

	function clearBox() {

		let interval2 = setInterval(()=>{
			if($('.box').children().length == 0 ) {
				allowClick = true
				clearInterval(interval2)
			}

			$('.box').children().last().remove();
		},30)

	}

	function createStars(num) {

		let fullScreen = $(".fullScreen")
		while(num > 0) {
			num--

			let size = randomNum(2, 4)
			let speed = randomNum(1, 4)
			let topStar = randomNum(1, $(window).height() -50)
			let leftStar = randomNum(1, $(window).width() -50)
			let colorStar = randomColor()
			
			let newStar = $("<div></div>").addClass(`star speed${speed}`)
			newStar.width(`${size}px`)
			newStar.height(`${size}px`)
			newStar.css("background-color", colorStar);

			newStar.offset({top:topStar,left:leftStar})
				fullScreen.append(newStar)
			
		}
	}

	function randomNum(min,max) {
		 return Math.floor(Math.random() * (max - min + 1) + min)
	}

	function randomColor() {
		let num = Math.floor(Math.random()*16777215).toString(16);

		return `#${num}`
	}

	function moveStars() {
		
		let interval3 = setInterval(()=>{
			$(".star").each(function(){
				let speed = $(this).attr('class').split(' speed')
				speed = speed[1]
				
				let topMove = $(this).offset().top 
				let leftMove = $(this).offset().left - speed
				if(leftMove < 0) leftMove = $(window).width() -50
				
				$(this).offset({top:topMove,left:leftMove})
			})
		},200)
			
	}
	
})
