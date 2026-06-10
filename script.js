document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FONDOS DE DIAPOSITIVAS
    const backgroundPaths = [
        'fotos/bg1.jpg',
        'fotos/bg2.jpg',
        'fotos/bg3.jpg'
    ];

    const bgSlider = document.getElementById('background-slider');
    let currentBgIndex = 0;
    const bgImages = [];

    backgroundPaths.forEach((path, index) => {
        const div = document.createElement('div');
        div.classList.add('bg-image');
        div.style.backgroundImage = `url(${path})`;
        if (index === 0) div.classList.add('visible');
        if (bgSlider) bgSlider.appendChild(div);
        bgImages.push(div);
    });

    function changeBackground() {
        if (bgImages.length <= 1) return;
        bgImages[currentBgIndex].classList.remove('visible');
        currentBgIndex = (currentBgIndex + 1) % bgImages.length;
        bgImages[currentBgIndex].classList.add('visible');
    }

    if (bgImages.length > 1) {
        setInterval(changeBackground, 6000);
    }

    
    const floatingPaths = [
        'Imagenes/Foto1.jpeg',
        'Imagenes/Foto2.jpeg',
        'Imagenes/Foto3.jpeg',
        'Imagenes/Foto4.jpeg',
        'Imagenes/Foto5.jpeg',
        'Imagenes/Foto6.jpeg',
        'Imagenes/Foto7.jpeg',
        'Imagenes/Foto8.jpeg',
        'Imagenes/Foto9.jpeg',
        'Imagenes/Foto10.jpg'
    ];

    function createFloatingPhoto() {
        if (floatingPaths.length === 0) return;

        const img = document.createElement('img');
        const randomPath = floatingPaths[Math.floor(Math.random() * floatingPaths.length)];
        
        img.src = randomPath;
        img.classList.add('floating-photo');

        const size = Math.random() * 150 + 120;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;

        const maxX = window.innerWidth - size;
        const maxY = window.innerHeight - size;
        
        img.style.left = `${Math.random() * maxX}px`;
        img.style.top = `${Math.random() * maxY}px`;

        document.body.appendChild(img);

        const transitionTime = 1000; 
        const visibleDuration = 3000; 
        const totalLifecycle = transitionTime + visibleDuration + transitionTime;

        setTimeout(() => img.classList.add('active'), 50);
        setTimeout(() => img.classList.remove('active'), transitionTime + visibleDuration);
        setTimeout(() => img.remove(), totalLifecycle);
    }

    setInterval(createFloatingPhoto, 2000);
    createFloatingPhoto(); 


    // 3. EFECTOS (CONFETI Y FUEGOS)
    const fwContainer = document.getElementById('fireworks-container');
    const fireworks = new Fireworks.default(fwContainer, {
        autoresize: true, opacity: 0.7, acceleration: 1.05, friction: 0.98, gravity: 1.8,
        particles: 60, trace: 2, explosion: 6, intensity: 35, flickering: 50,
        lineStyle: 'round', hue: { min: 0, max: 360 }, delay: { min: 12, max: 22 },
        brightness: { min: 60, max: 100 }, decay: { min: 0.015, max: 0.03 }
    });

    const festiveColors = ['#ff6b6b', '#f9ca24', '#6ab0ab', '#ffffff'];

    function launchConfettiBurst(e) {
        // Por defecto, centrado por si algo falla
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;

        // Extraemos las coordenadas exactas dependiendo de si es touch o clic
        if (e.clientX !== undefined && e.clientY !== undefined) {
            x = e.clientX;
            y = e.clientY;
        } else if (e.touches && e.touches.length > 0) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            x = e.changedTouches[0].clientX;
            y = e.changedTouches[0].clientY;
        }
        
        confetti({ 
            particleCount: 45, 
            spread: 65, 
            origin: { x: x / window.innerWidth, y: y / window.innerHeight }, 
            colors: festiveColors 
        });
    }

    let confettiRainInterval;
    function startConfettiRain() {
        if (confettiRainInterval) return;
        confettiRainInterval = setInterval(() => {
            confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: festiveColors });
            confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: festiveColors });
        }, 200); 
    }

    function startFinalCelebration() {
        fireworks.start();
        startConfettiRain();
        setTimeout(() => confetti({ particleCount: 120, spread: 90, origin: { x: 0.1, y: 0.5 }, colors: festiveColors }), 100);
        setTimeout(() => confetti({ particleCount: 120, spread: 90, origin: { x: 0.9, y: 0.5 }, colors: festiveColors }), 400);
        setTimeout(() => confetti({ particleCount: 180, spread: 120, origin: { y: 0.6 }, colors: festiveColors }), 700);
    }


    // 4. NAVEGACIÓN Y EVENTOS
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    document.body.addEventListener('click', (e) => {
        // No avanzar si se hace clic en el video (para controles) o en el pastel
        if (e.target.tagName.toLowerCase() === 'video' || e.target.id === 'el-pastel') {
            return; 
        }

        launchConfettiBurst(e); 

        if (currentSlideIndex < slides.length - 1) {
            
            // Pausar el video si pasamos de tarjeta
            const currentVideo = slides[currentSlideIndex].querySelector('video');
            if(currentVideo) currentVideo.pause();

            const currentSlide = slides[currentSlideIndex];
            currentSlide.classList.remove('active');
            currentSlide.classList.add('throw-right');
            
            currentSlideIndex++;
            
            const nextSlide = slides[currentSlideIndex];
            setTimeout(() => {
                nextSlide.classList.add('active');
                
                if (nextSlide.classList.contains('celebration-trigger')) {
                    startFinalCelebration();
                }

                const video = nextSlide.querySelector('video');
                if (video) {
                    video.play().catch(err => console.log("Play manual requerido"));
                }
            }, 200);
        }
    });

    // 5. EVENTO ESPECIAL DEL PASTEL
    const pastel = document.getElementById('el-pastel');
    const textoFinal = document.getElementById('texto-final');
    const instruccionPastel = document.querySelector('.instruccion-pastel');

    if (pastel) {
        pastel.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita clics dobles en el body
            
            // Inicia la explosión del pastel
            pastel.classList.add('explode-anim');
            if (instruccionPastel) instruccionPastel.style.display = 'none';
            
            // Súper ráfaga de confeti desde el centro
            confetti({
                particleCount: 300,
                spread: 180,
                origin: { y: 0.5 },
                colors: festiveColors,
                startVelocity: 45
            });
            
            // Muestra el texto final
            setTimeout(() => {
                pastel.style.display = 'none';
                textoFinal.style.display = 'block';
                textoFinal.classList.add('fade-in-text');
            }, 400); // Se alinea con el tiempo de la animación CSS
        });
    }

});