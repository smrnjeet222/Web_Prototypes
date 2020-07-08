// select DOM Items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBran = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// intial state
let showMenu = false;

menuBtn.addEventListener('click', toogleMenu);

function toogleMenu() {
    if (!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuBran.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));

        //set Menu State
        showMenu = true;
    } else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuBran.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));

        //set Menu State
        showMenu = false;

    }
}