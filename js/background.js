class Background {
    constructor() {
        this.container = document.getElementById('bg-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.particles = [];
        this.planets = [];
        this.spaceships = [];
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Setup camera
        this.camera.position.z = 30;

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // Create particles
        this.createParticles();

        // Create planets
        this.createPlanets();

        // Create spaceships
        this.createSpaceships();

        // Add event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('click', this.onMouseClick.bind(this));

        // Start animation
        this.animate();
    }

    createParticles() {
        const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });

        for (let i = 0; i < 300; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            // Random position
            particle.position.x = Math.random() * 60 - 30;
            particle.position.y = Math.random() * 60 - 30;
            particle.position.z = Math.random() * 30 - 15;
            
            // Random speed
            particle.velocity = new THREE.Vector3(
                Math.random() * 0.02 - 0.01,
                Math.random() * 0.02 - 0.01,
                Math.random() * 0.02 - 0.01
            );

            this.particles.push(particle);
            this.scene.add(particle);
        }
    }

    createPlanets() {
        const planetColors = [0x3498db, 0xe74c3c, 0x2ecc71, 0xf1c40f];
        
        for (let i = 0; i < 4; i++) {
            const radius = Math.random() * 1.5 + 0.5;
            const segments = 32;
            const planetGeometry = new THREE.SphereGeometry(radius, segments, segments);
            const planetMaterial = new THREE.MeshPhongMaterial({
                color: planetColors[i],
                shininess: 15,
                specular: 0x333333
            });
            
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            
            // Random position
            const angle = (i / 4) * Math.PI * 2;
            const distance = Math.random() * 10 + 15;
            planet.position.x = Math.cos(angle) * distance;
            planet.position.y = Math.sin(angle) * distance;
            planet.position.z = Math.random() * 10 - 5;
            
            // Random rotation
            planet.rotation.x = Math.random() * Math.PI;
            planet.rotation.y = Math.random() * Math.PI;
            
            // Orbit data
            planet.orbitRadius = distance;
            planet.orbitSpeed = 0.0003 + Math.random() * 0.0002;
            planet.rotationSpeed = 0.005 + Math.random() * 0.005;
            planet.startAngle = angle;
            
            this.planets.push(planet);
            this.scene.add(planet);

            // Add rings to some planets
            if (Math.random() > 0.5) {
                const ringGeometry = new THREE.TorusGeometry(radius * 1.5, 0.1, 16, 100);
                const ringMaterial = new THREE.MeshPhongMaterial({
                    color: planetColors[(i + 1) % 4],
                    shininess: 10,
                    transparent: true,
                    opacity: 0.6
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.rotation.x = Math.PI / 2;
                planet.add(ring);
            }
        }
    }

    createSpaceships() {
        const shipGeometry = new THREE.ConeGeometry(0.3, 1, 4);
        const shipMaterial = new THREE.MeshPhongMaterial({
            color: 0xcccccc,
            shininess: 30
        });

        for (let i = 0; i < 5; i++) {
            const spaceship = new THREE.Mesh(shipGeometry, shipMaterial);
            
            // Random position
            spaceship.position.x = Math.random() * 40 - 20;
            spaceship.position.y = Math.random() * 40 - 20;
            spaceship.position.z = Math.random() * 20 - 10;
            
            // Random movement
            spaceship.velocity = new THREE.Vector3(
                Math.random() * 0.04 - 0.02,
                Math.random() * 0.04 - 0.02,
                Math.random() * 0.04 - 0.02
            );

            spaceship.rotation.x = Math.PI / 2;
            
            this.spaceships.push(spaceship);
            this.scene.add(spaceship);
        }
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update camera slightly based on mouse position
        this.camera.position.x += (this.mouse.x * 2 - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.mouse.y * 2 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);
    }

    onMouseClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Check intersections with planets
        const intersects = this.raycaster.intersectObjects(this.planets);
        
        if (intersects.length > 0) {
            const planet = intersects[0].object;
            planet.scale.multiplyScalar(1.2);
            setTimeout(() => {
                planet.scale.multiplyScalar(1/1.2);
            }, 300);
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = this.clock.getElapsedTime();

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

            particle.rotation.x += 0.01;
            particle.rotation.y += 0.01;
        });

        // Update planets
        this.planets.forEach(planet => {
            // Orbit movement
            planet.position.x = Math.cos(time * planet.orbitSpeed + planet.startAngle) * planet.orbitRadius;
            planet.position.y = Math.sin(time * planet.orbitSpeed + planet.startAngle) * planet.orbitRadius;
            
            // Self rotation
            planet.rotation.y += planet.rotationSpeed;
        });

        // Update spaceships
        this.spaceships.forEach(spaceship => {
            spaceship.position.add(spaceship.velocity);

            // Wrap around edges
            if (spaceship.position.x > 20) spaceship.position.x = -20;
            if (spaceship.position.x < -20) spaceship.position.x = 20;
            if (spaceship.position.y > 20) spaceship.position.y = -20;
            if (spaceship.position.y < -20) spaceship.position.y = 20;
            if (spaceship.position.z > 10) spaceship.position.z = -10;
            if (spaceship.position.z < -10) spaceship.position.z = 10;

            // Rotate to face movement direction
            spaceship.lookAt(
                spaceship.position.x + spaceship.velocity.x,
                spaceship.position.y + spaceship.velocity.y,
                spaceship.position.z + spaceship.velocity.z
            );
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize background
new Background();
