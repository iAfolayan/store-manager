(function(){
	document.getElementById('logo').addEventListener('click', () => { location.href ='../index.html'});



const slideMobileMenu = () => {
		document.querySelector('#menuDrop').classList.toggle("showMenu");
	}

window.onclick = (event) => {
	 if (!event.target.matches('.mobileMenu')) {
		const dropdowns = document.querySelector('.menuDropContent');
		for(const counter of dropdowns) {
			const openMenu = dropdowns[counter];

			if (openMenu.classList.contains('showMenu')) {
				openMenu.classList.remove('showMenu');
			}	
		}
		
	}
}

document.querySelector('.mobileMenu').addEventListener("click", slideMobileMenu);

})();
