
function changeTheme(themeName) {
    var body = document.getElementById('app-body');
    body.className = 'app-theme-' + themeName;
}

// Scroll animation using IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll('.box');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    boxes.forEach(box => {
        observer.observe(box);
    });
});



const card = document.querySelector('.project-card');
const inner = card.querySelector('.project-card-inner');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    inner.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener('mouseleave', () => {
    inner.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
});
