const displayMenu = (usrClick) => {
	if (usrClick.style.display === "none") {
		usrClick.style.display = 'block'
	} else {
		usrClick.style.display = 'none'
	}
}

(function(){
	/*const usrChild = document.querySelector('.usrChild');
	document.getElementById('usrManagement').addEventListener("click", displayMenu(usrChild));
*/
	/* product menu */
	/*const prdChild = document.querySelector('.prdChild');
	document.getElementById('prdManagement').addEventListener("click", displayMenu(prdChild));
*/
	document.getElementById('logo').addEventListener('click', () => { location.href ='../index.html'})
})();

