// Lightbox JS
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lightbox !== 'undefined') {
        lightbox.option({ resizeDuration: 200, wrapAround: true });
    } else {
        console.error("Lightbox.js failed to load.");
    }

    resizeCanvas(); // Ensure canvas resizes on page load
});

// Leaflet JS - Initialize Map
const map = L.map('map').setView([10.2155, 118.8921], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker([9.7392, 118.7353]).addTo(map)
    .bindPopup("<b>Puerto Princesa</b><br>The capital of Palawan.")
    .openPopup();

// Granim - Background Animation
let granimInstance = new Granim({
    element: '#canvas-image-blending',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,
    image: {
        source: '../assets/images/bgpalawan.jpg',
        blendingMode: 'multiply',
        stretchMode: ['stretch', 'stretch']
    },
    states: {
        "default-state": {
            gradients: [
                ['#29323c', '#485563'], ['#FF6B6B', '#556270'],
                ['#80d3fe', '#7ea0c4'], ['#f0ab51', '#eceba3']
            ],
            transitionSpeed: 7000
        }
    }
});

// Resize Canvas to Fullscreen
function resizeCanvas() {
    const canvas = document.getElementById('canvas-image-blending');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    granimInstance = new Granim({
        element: '#canvas-image-blending',
        direction: 'top-bottom',
        isPausedWhenNotInView: true,
        image: {
            source: '../assets/images/bgpalawan.jpg',
            blendingMode: 'multiply',
            stretchMode: ['stretch', 'stretch']
        },
        states: {
            "default-state": {
                gradients: [
                    ['#29323c', '#485563'], ['#FF6B6B', '#556270'],
                    ['#80d3fe', '#7ea0c4'], ['#f0ab51', '#eceba3']
                ],
                transitionSpeed: 7000
            }
        }
    });
}

// Apply resize event listener
window.addEventListener("resize", resizeCanvas);
