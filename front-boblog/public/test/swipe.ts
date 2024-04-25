// Initial touch position
let startX = 0;
let startY = 0;

// Threshold in pixels for a swipe to be detected
const threshold = 50;

document.getElementById('swipeZone')!.addEventListener('touchstart', (e: TouchEvent) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, false);

document.getElementById('swipeZone')!.addEventListener('touchmove', (e: TouchEvent) => {
    // Prevent scrolling by touch
    e.preventDefault();
}, { passive: false });

document.getElementById('swipeZone')!.addEventListener('touchend', (e: TouchEvent) => {
    const moveX = e.changedTouches[0].clientX - startX;
    const moveY = e.changedTouches[0].clientY - startY;

    if (Math.abs(moveX) > threshold || Math.abs(moveY) > threshold) {
        if (Math.abs(moveX) > Math.abs(moveY)) {
            // Horizontal swipe
            if (moveX > 0) {
                document.getElementById('message')!.innerText = 'Swiped Right';
            } else {
                document.getElementById('message')!.innerText = 'Swiped Left';
            }
        } else {
            // Vertical swipe
            if (moveY > 0) {
                document.getElementById('message')!.innerText = 'Swiped Down';
            } else {
                document.getElementById('message')!.innerText = 'Swiped Up';
            }
        }
    }
}, false);

