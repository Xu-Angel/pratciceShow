
searchBoxEvent();
menuEvent();

function searchBoxEvent(){
	var searchBoxL = document.getElementById("searchBoxL");
	var searchCategory = searchBoxL.getElementsByTagName("p");
	var searchCategoryNum = searchCategory.length;
	var searchList = document.getElementById("secrch_list");	
	
	searchBoxL.addEventListener("mouseover",isShow);
	searchBoxL.addEventListener("mouseout",isHide);
	
	function isShow(){
		searchList.classList.remove("hide");
	}
	function isHide(){
		searchList.classList.add("hide");
	}
	
	searchList.addEventListener("click",function switchImg(ev){
		var ev = ev || window.event;
		var target = ev.target||ev.srcElement;
		if(target.className=="applyDown-img"){
			searchCategory[1].classList.add("hide");
			searchCategory[0].classList.remove("hide");
		}else{
			searchCategory[0].classList.add("hide");
			searchCategory[1].classList.remove("hide");
		}
		searchList.classList.add("hide");
	});
}

function menuEvent(){
	var mainMenu = document.getElementById("mainMenu");
	
	var menuChild = document.getElementById("menuChild");
	var menuChildUl = menuChild.getElementsByTagName("ul");
	var menuChildLength = menuChildUl.length;
	
	var theNum = 0;
	
	mainMenu.addEventListener("mouseover",function showChildUl(ev){
		var ev = ev || window.event;
		var target = ev.target||ev.srcElement;
		console.log(target);
		console.log(target.getAttribute("data-num"));
		
		var num = target.getAttribute("data-num");
		
		if(num !== null){
			menuChildUl[theNum].classList.add("hide");
			menuChildUl[num].classList.remove("hide");
			theNum = num;
		}
	})
	
	mainMenu.addEventListener("mouseout",function hideChildUl(){
		menuChildUl[theNum].classList.add("hide");
	})
	
}

