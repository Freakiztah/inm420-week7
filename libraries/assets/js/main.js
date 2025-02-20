// lightbox JS
        document.addEventListener("DOMContentLoaded", function () {
            if (typeof lightbox !== 'undefined') {
                lightbox.option({
                    'resizeDuration': 200,
                    'wrapAround': true
                });
            } else {
                console.error("Lightbox.js failed to load.");
            }
        });

// leaflet JS

        // Initialize the map and set view to Palawan's coordinates
        var map = L.map('map').setView([10.2155, 118.8921], 8); // Lat, Long, Zoom Level

        // Add a Tile Layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker at Puerto Princesa (Palawan's Capital)
        L.marker([9.7392, 118.7353]).addTo(map)
            .bindPopup("<b>Puerto Princesa</b><br>The capital of Palawan.")
            .openPopup();


// Granim
var granimInstance = new Granim({
    element: '#canvas-image-blending',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,
    image: {
        source: '../assets/images/bgpalawan.jpg',
        blendingMode: 'multiply',
        stretchMode: ['stretch', 'stretch'] // Ensure it covers the entire canvas
    },
    states: {
        "default-state": {
            gradients: [
                ['#29323c', '#485563'],
                ['#FF6B6B', '#556270'],
                ['#80d3fe', '#7ea0c4'],
                ['#f0ab51', '#eceba3']
            ],
            transitionSpeed: 7000
        }
    }
});

// Resize Canvas to Fullscreen
function resizeCanvas() {
    var canvas = document.getElementById('canvas-image-blending');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Re-initialize Granim to apply the new size
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
                    ['#29323c', '#485563'],
                    ['#FF6B6B', '#556270'],
                    ['#80d3fe', '#7ea0c4'],
                    ['#f0ab51', '#eceba3']
                ],
                transitionSpeed: 7000
            }
        }
    });
}

// Apply resizing on window resize
window.addEventListener("resize", resizeCanvas);

// Initial resize on load
document.addEventListener("DOMContentLoaded", resizeCanvas);












