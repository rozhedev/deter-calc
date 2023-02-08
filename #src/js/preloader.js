// * PRELOADER

window.onload = function () {
    document.body.classList.add('loaded-hiding');
    document.body.style.overflow = 'hidden';
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded-hiding');
        document.body.style.overflow = 'auto';
    }, 500);
}