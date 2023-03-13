(() => {
    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('scroll', () => {
            const btnUp = document.querySelector('.up');
            if (window.pageYOffset > 100)
                btnUp.style.display = 'block';
            else
                btnUp.style.display = 'none';

            btnUp.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
        });
    }, { passive: true });
})()