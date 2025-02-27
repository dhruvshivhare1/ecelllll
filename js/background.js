class Background {
    constructor() {
        this.container = document.getElementById('bg-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.particles = [];
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Setup camera
        this.camera.position.z = 30;

        // Create particles
        this.createParticles();

        // Add event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));

        // Start animation
        this.animate();
    }

    createParticles() {
        const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: 0xab73b8, // Match your website's secondary color
            transparent: true,
            opacity: 0.6
        });

        for (let i = 0; i < 150; i++) { // Reduced number of particles
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            // Random position
            particle.position.x = Math.random() * 60 - 30;
            particle.position.y = Math.random() * 60 - 30;
            particle.position.z = Math.random() * 30 - 15;
            
            // Random speed (slower movement)
            particle.velocity = new THREE.Vector3(
                Math.random() * 0.01 - 0.005,
                Math.random() * 0.01 - 0.005,
                Math.random() * 0.01 - 0.005
            );

            this.particles.push(particle);
            this.scene.add(particle);
        }
    }

    onMouseMove(event) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Subtle camera movement
        this.camera.position.x += (mouseX * 2 - this.camera.position.x) * 0.02;
        this.camera.position.y += (mouseY * 2 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Update particles
        this.particles.forEach(particle => {
            particle.position.add(particle.velocity);

            // Wrap around edges
            if (particle.position.x > 30) particle.position.x = -30;
            if (particle.position.x < -30) particle.position.x = 30;
            if (particle.position.y > 30) particle.position.y = -30;
            if (particle.position.y < -30) particle.position.y = 30;
            if (particle.position.z > 15) particle.position.z = -15;
            if (particle.position.z < -15) particle.position.z = 15;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize background
new Background();
