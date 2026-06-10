document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL FONDO DE DIAPOSITIVAS (FOTOS DE JACOBIN) ---
    // Guarda tus imágenes en una carpeta llamada 'fotos' como bg1.jpg, bg2.jpg, etc.
    const backgroundPaths = [
        'fotos/bg1.jpg',
        'fotos/bg2.jpg',
        'fotos/bg3.jpg',
        'fotos/bg4.jpg',
        'fotos/bg5.jpg'
    ];

    const bgSlider = document.getElementById('background-slider');
    let currentBgIndex = 0;
    const bgImages = [];

    // Pre-cargar imágenes en el slider
    backgroundPaths.forEach((path, index) => {
        const div = document.createElement('div');
        div.classList.add('bg-image');
        div.style.backgroundImage = `url(${path})`;
        if (index === 0) div.classList.add('visible');
        bgSlider.appendChild(div);
        bgImages.push(div);
    });

    // Cambiar imagen de fondo cíclicamente
    function changeBackground() {
        if (bgImages.length <= 1) return;
        bgImages[currentBgIndex].classList.remove('visible');
        currentBgIndex = (currentBgIndex + 1) % bgImages.length;
        bgImages[currentBgIndex].classList.add('visible');
    }

    // Intervalo de 6 segundos por foto de fondo
    if (bgImages.length > 1) {
        setInterval(changeBackground, 6000);
    }


    // --- CONFIGURACIÓN DE EFECTOS VISUALES ---
    const fwContainer = document.getElementById('fireworks-container');
    const fireworks = new Fireworks.default(fwContainer, {
        autoresize: true,
        opacity: 0.7,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1.8,
        particles: 60,
        trace: 2,
        explosion: 6,
        intensity: 35,
        flickering: 50,
        lineStyle: 'round',
        hue: { min: 0, max: 360 },
        delay: { min: 12, max: 22 },
        brightness: { min: 60, max: 100 },
        decay: { min: 0.015, max: 0.03 }
    });

    const festiveColors = ['#ff6b6b', '#f9ca24', '#6ab0ab', '#ffffff'];

    // Ráfaga de confeti donde el usuario haga clic/toque
    function launchConfettiBurst(e) {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        
        confetti({
            particleCount: 45,
            spread: 65,
            origin: { x: x / window.innerWidth, y: y / window.innerHeight },
            colors: festiveColors
        });
    }

    // Lluvia constante lateral de confeti para el final
    let confettiRainInterval;
    function startConfettiRain() {
        if (confettiRainInterval) return;
        confettiRainInterval = setInterval(() => {
            confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: festiveColors });
            confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: festiveColors });
        }, 200); 
    }

    // Gran fiesta final
    function startFinalCelebration() {
        fireworks.start();
        startConfettiRain();
        
        setTimeout(() => confetti({ particleCount: 120, spread: 90, origin: { x: 0.1, y: 0.5 }, colors: festiveColors }), 100);
        setTimeout(() => confetti({ particleCount: 120, spread: 90, origin: { x: 0.9, y: 0.5 }, colors: festiveColors }), 400);
        setTimeout(() => confetti({ particleCount: 180, spread: 120, origin: { y: 0.6 }, colors: festiveColors }), 700);
    }


    // --- NAVEGACIÓN DE TARJETAS (SLIDES) ---
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    document.body.addEventListener('click', (e) => {
        // Lanzamos confeti sutil con cada transición
        launchConfettiBurst(e); 

        if (currentSlideIndex < slides.length - 1) {
            const currentSlide = slides[currentSlideIndex];
            currentSlide.classList.remove('active');
            currentSlide.classList.add('throw-right');
            
            currentSlideIndex++;
            
            const nextSlide = slides[currentSlideIndex];
            setTimeout(() => {
                nextSlide.classList.add('active');
                
                // Si llegamos a la tarjeta con los nombres de ustedes, se desata el festejo masivo
                if (currentSlideIndex === slides.length - 1) {
                    startFinalCelebration();
                }
            }, 200);
        }
    });

});