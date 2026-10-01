
function initCarousel(carousel) {
    const viewport = carousel.querySelector('.game-viewport');
    const row = carousel.querySelector('.game-row');
    const prevButton = carousel.querySelector('.row-arrow.prev');
    const nextButton = carousel.querySelector('.row-arrow.next');

    
    let firstCard = 0;

    
    function getCards() {
        return row.querySelectorAll('.game-card');
    }

    function getStep() {
        const card = row.querySelector('.game-card');
        if (!card) return 0;   // todavía no llegaron las tarjetas de la API
        const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
        return card.offsetWidth + gap;
    }


    function getCardsPerPage() {
        const step = getStep();
        if (step === 0) return 1;
        return Math.max(1, Math.floor(viewport.clientWidth / step));
    }


    function getLastFirstCard() {
        return Math.max(0, getCards().length - getCardsPerPage());
    }


    function showCard(index) {

        firstCard = Math.max(0, Math.min(index, getLastFirstCard()));


        const maxOffset = Math.max(0, row.offsetWidth - viewport.clientWidth);
        const offset = Math.min(firstCard * getStep(), maxOffset);
        row.style.setProperty('--x', offset + 'px');   // el CSS mueve la fila con esta variable


        prevButton.disabled = firstCard === 0;
        nextButton.disabled = firstCard === getLastFirstCard();
    }


    function playAnimation() {
        const cardsPerPage = getCardsPerPage();

        getCards().forEach((card, index) => {
            const position = index - firstCard;   
            const isVisible = position >= 0 && position < cardsPerPage;
            card.style.setProperty('--n', isVisible ? position : 0);   
        });


        row.classList.remove('is-moving');
        void row.offsetWidth;
        row.classList.add('is-moving');
    }


    function move(direction) {
        const oldFirstCard = firstCard;

        showCard(firstCard + direction * getCardsPerPage());

     
        if (firstCard !== oldFirstCard) {
            playAnimation();
        }
    }

   
    prevButton.addEventListener('click', () => move(-1));
    nextButton.addEventListener('click', () => move(1));

   
    const observer = new ResizeObserver(() => showCard(firstCard));
    observer.observe(viewport);
    observer.observe(row);

    showCard(0);
}

document.addEventListener('DOMContentLoaded', () => {
    init();   
    document.querySelectorAll('.game-carousel').forEach(initCarousel);
});