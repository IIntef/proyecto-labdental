document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('container1');

    const toggle = () => {
        container.classList.toggle('sign-in');
        container.classList.toggle('sign-up');
    };

    setTimeout(() => {
        container.classList.add('sign-in');
    }, 200);
});