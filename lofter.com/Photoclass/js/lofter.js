var i = 1;
function getShowOrHide() {
	if(i % 2 !== 0) {
		document.getElementById('second_ul').style.display = 'block';
	}
	i++;
}
