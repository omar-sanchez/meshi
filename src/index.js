import '../node_modules/@fortawesome/fontawesome-free/js/all.min.js'
import './styles.css';

import '../src/js/banner'
import '../src/js/content';

window.addEventListener('scroll', () => {
    const headerDis = document.querySelector('header');
    headerDis.classList.toggle('sticky', window.scrollY > 0);
});