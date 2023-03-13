(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const toggleBtn = document.querySelector('.dropdown-toggle');
        const dropdownBlock = document.querySelector(toggleBtn.dataset.target);

        toggleBtn.addEventListener('click', () => {
            dropdownBlock.style.display = 'block';
        });

        document.addEventListener('click', event => {
            if (!dropdownBlock.contains(event.target) && dropdownBlock.style.display !== 'none' && event.target !== toggleBtn)
                dropdownBlock.style.display = 'none';
        });
    });
    
})()