document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality - Updated code
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            mobileMenuButton.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('Menu clicked'); // Debug line
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Events section
    const eventsContainer = document.querySelector('.events-container');
    const events = [
        {
            title: 'Entrecon\'24',
            intro: ' The annual flagship event of the Entrepreneurship Cell aims to inspire and empower students by connecting them with industry experts and emerging startups, fostering entrepreneurial spirit and learning.',
            description: 'Entrecon is our premier annual event designed to bridge the gap between aspiring entrepreneurs and the dynamic world of startups. This comprehensive event brings together industry leaders, successful entrepreneurs, and passionate students to create a vibrant ecosystem of innovation and learning.',
            // Updated paths for GitHub Pages
            image: '/ecelllll/assets/events/entrecon1.JPG',
            gallery: [
                '/ecelllll/assets/events/entrecon1.JPG',
                '/ecelllll/assets/events/entrecon2.JPG',
                '/ecelllll/assets/events/entrecon3.JPG',
                '/ecelllll/assets/events/entrecon4.JPG'
            ]
        },
        {
            title: 'Orientation\'24',
            intro: 'The E-Cell hosted an inspiring orientation, igniting entrepreneurial passion among students. The event showcased the E-Cell\'s vision, upcoming opportunities, and success stories, motivating students to embark on their journey of innovation and leadership.',
            image: '/ecelllll/assets/events/orientation1.jpeg',
            description: 'Our annual Orientation Program is a transformative event that introduces students to the exciting world of entrepreneurship. Through engaging presentations, interactive sessions, and inspiring talks, we aim to kindle the entrepreneurial spirit and provide a roadmap for innovation and leadership.',
            gallery: [
                '/ecelllll/assets/events/orientation1.jpeg',
                '/ecelllll/assets/events/orientation2.jpg',
                '/ecelllll/assets/events/orientation3.jpg',
                '/ecelllll/assets/events/orientation4.JPG'
            ]
        },
        {
            title: 'Induction Ceremony',
            intro: 'On 14th November, the E-Cell welcomed new members with engaging introductions, interactive activities, and team-building sessions. The event was filled with energy, fun, and the promise of an exciting journey ahead.',
            description: 'On 14th November, the E-Cell welcomed new members with engaging introductions, interactive activities, and team-building sessions. The event was filled with energy, fun, and the promise of an exciting journey ahead.',
            image: '/ecelllll/assets/team-cover.jpg',
            gallery: [
                '/ecelllll/assets/team-cover.jpg',
                '/ecelllll/assets/events/induction2.JPG',
                '/ecelllll/assets/events/induction3.jpg'
            ]
        },
        {
            title: 'NSIC Okhla Visit',
            intro: 'On 14th November, the E-Cell welcomed new members with engaging introductions, interactive activities, and team-building sessions. The event was filled with energy, fun, and the promise of an exciting journey ahead.',
            description: 'On 14th November, the E-Cell welcomed new members with engaging introductions, interactive activities, and team-building sessions. The event was filled with energy, fun, and the promise of an exciting journey ahead.',
            image: '/ecelllll/assets/events/nsic.png',
            gallery: [
                '/ecelllll/assets/events/nsic.png'
            ]
        },
        {
            title: 'World Entrepreneurship Day',
            intro: 'Organized an impactful event featuring esteemed entrepreneurs Jitender Girdhar, Vaneeta Aggarwal, and Shubham Maheshwari, celebrating entrepreneurial achievements and sharing valuable insights.',
            description: 'Organized an impactful event featuring esteemed entrepreneurs Jitender Girdhar, Vaneeta Aggarwal, and Shubham Maheshwari, celebrating entrepreneurial achievements and sharing valuable insights.',
            image: '/ecelllll/assets/events/world11.jpg',
            gallery: [
                 '/ecelllll/assets/events/world11.jpg',
                '/ecelllll/assets/events/world12.jpg',
                '/ecelllll/assets/events/world13.jpg',
                
            ]
        }
    ];

   events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p>${event.intro}</p>
            <button class="view-more-btn">View More</button>
        `;
        
        // Add click event for the entire card
        const viewMoreBtn = card.querySelector('.view-more-btn');
        viewMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click event
            showModal(event);
        });
        
        eventsContainer.appendChild(card);
    });


    // Add this new code for event cards animation
    const eventCards = document.querySelectorAll('.event-card');
    const eventObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                eventObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    eventCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        eventObserver.observe(card);
    });

    // Podcasts section
    const podcastsSlider = document.querySelector('.podcasts-slider');
    const podcasts = [
        'https://youtu.be/6x76SR5Ih7U?si=FHiiXztEtndzV7xn',
        'https://youtu.be/3rdJBk2sKZc?si=FkGzcRK95VM9UF3a',
        'https://youtu.be/fUxl-yTVIfQ?si=aXvZHJzgCUtAZOEl',
        'https://youtu.be/bdbQNryce-c?si=YmOjmTGgA0bWuVyV',
        'https://youtu.be/HB_S1EKntd8?si=BEBaH9tW965dTd4i',
        // Add more YouTube URLs here
    ];

    function getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    async function getYouTubeVideoTitle(videoId) {
        try {
            // Using oEmbed API to get video information
            const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
            const data = await response.json();
            return data.title;
        } catch (error) {
            console.error('Error fetching video title:', error);
            return 'Video Title';
        }
    }

    // Add scroll controls for podcasts
    let isScrolling = false;

    // Touch scrolling handling
    podcastsSlider.addEventListener('touchstart', () => {
        isScrolling = true;
    });

    podcastsSlider.addEventListener('touchend', () => {
        isScrolling = false;
    });

    // Mouse wheel horizontal scrolling
    podcastsSlider.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            podcastsSlider.scrollLeft += e.deltaY;
        }
    });

    podcasts.forEach(async (url) => {
        const videoId = getYouTubeVideoId(url);
        if (videoId) {
            const title = await getYouTubeVideoTitle(videoId);
            const card = document.createElement('div');
            card.className = 'podcast-card';
            card.innerHTML = `
                <div class="thumbnail-container">
                    <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${title}">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <h3 class="podcast-title">${title}</h3>
            `;
            card.addEventListener('click', () => window.open(url, '_blank'));
            podcastsSlider.appendChild(card);
        }
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        // Add newsletter subscription logic here
        alert('Thank you for subscribing!');
        e.target.reset();
    });

    // Sponsors section
    const sponsorRow = document.querySelector('.scroll-row');
    const sponsors = [
        'assets/d0.jpg',
        'assets/d2.jpg',
        'assets/d3.jpg',
        'assets/d4.jpg',
        'assets/d5.jpg',
        'assets/d6.jpg',
        'assets/d7.jpg',
        'assets/d8.jpg',
        'assets/d9.jpg',
        'assets/d.jpg',
       
         
    ];

    [...sponsors, ...sponsors].forEach(sponsor => {
        const img = document.createElement('img');
        img.src = sponsor;
        img.alt = 'Sponsor Logo';
        sponsorRow.appendChild(img);
    });

    // Achievement counter animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const updateCounter = () => {
                    const increment = target / 100;
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));

     // Modal functionality
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    function showModal(content) {
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <h2>${content.title}</h2>
            <div class="modal-content-inner">
                ${content.youtubeId ? `
                    <iframe width="100%" height="400" 
                        src="https://www.youtube.com/embed/${content.youtubeId}" 
                        frameborder="0" allowfullscreen>
                    </iframe>
                ` : ''}
                <p class="modal-description">${content.description}</p>
                ${content.gallery ? `
                    <div class="gallery">
                        ${content.gallery.map(image => `
                            <img src="${image}" alt="${content.title}" loading="lazy">
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        modal.style.display = 'block';
        
        // Add event listener to the newly created close button
        const closeModalBtn = modalContent.querySelector('.close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
           

    // Guest speakers section
    const guestSpeakersContainer = document.querySelector('.guest-speakers-container');
    const guestSpeakers = [
        {
            name: 'Jitender Girdhar',
            designation: 'Founder & Director, QTC and VDC',
            image: 'assets/speaker7.png'
        },
        {
            name: 'Vaneeta Aggarwal',
            designation: 'Founder, Bizemag Advisor',
            image: 'assets/speaker8.png'
        },
        {
            name: 'Shubham Maheshwari',
            designation: 'Founder, Being Chief',
            image: 'assets/speaker6.png'
        },
        {
            name: 'Dr Abhishek Tandon',
            designation: 'Joint CEO, Udhmodya Foundation',
            image: 'assets/speaker1.png'
        },
        {
            name: 'Shri Bharat Bhushan Arora',
            designation: 'Director, Udhmodya Foundation',
            image: 'assets/speaker2.png'
        },
        {
            name: 'Mr. Sunny Vaghela',
            designation: 'Co-Founder & CPO, Zyper 365',
            image: 'assets/speaker3.png'
        },
        {  
            name: 'Mr. Sumit Shah',
            designation: 'Founder And CEO Dukaan',
            image: 'assets/speaker5.png'
        },
        {
            name: 'Arijit Bhattacharyya',
            designation: 'Founder & CEO, Virtualinfocam',
            image: 'assets/speaker4.png'

        },
         {
            name: 'Mr. Rahul Lakhmani',
            designation: 'Founder & CEO, Skiify',
            image: 'assets/images.jpg'

        },
         {
            name: 'Mr. Saurabh Bajaj',
            designation: 'EVP Prepaid Marketing @ vodafone Idea',
            image: 'assets/speakers.jpg'

        },
         {
            name: 'Mr. Dilkush Kumar',
            designation: 'Founder & CEO, Rodbez',
            image: 'assets/1.jpg'

        },
         {
            name: 'Mr. Sagar Mahat',
            designation: 'Founder - IndusTreeBiz',
            image: 'assets/aspea.jpg'

        },
    ];

    guestSpeakers.forEach(speaker => {
        const card = document.createElement('div');
        card.className = 'guest-speaker-card';
        card.innerHTML = `
            <img src="${speaker.image}" alt="${speaker.name}">
            <h3>${speaker.name}</h3>
            <p>${speaker.designation}</p>
        `;
        guestSpeakersContainer.appendChild(card);
    });

    // Add this new code for about cards animation
    const aboutCards = document.querySelectorAll('.about-card');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                aboutObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    aboutCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        aboutObserver.observe(card);
    });

    // Add intersection observers for new sections
    const animatedSections = [
        { elements: document.querySelectorAll('.guest-speaker-card'), threshold: 0.2 },
        { elements: document.querySelectorAll('.newsletter-container'), threshold: 0.5 },
        { elements: document.querySelector('#newsletter-form'), threshold: 0.5 }
    ];

    animatedSections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: section.threshold
        });

        if (section.elements) {
            if (NodeList.prototype.isPrototypeOf(section.elements)) {
                section.elements.forEach(el => {
                    el.style.animationPlayState = 'paused';
                    observer.observe(el);
                });
            } else {
                section.elements.style.animationPlayState = 'paused';
                observer.observe(section.elements);
            }
        }
    });
    initPodcastsSection();
});

function initPodcastsSection() {
    const podcastsSlider = document.querySelector('.podcasts-slider');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    const scrollAmount = 300; // Amount to scroll each time

    // Add scroll button functionality
    scrollLeftBtn.addEventListener('click', () => {
        podcastsSlider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        podcastsSlider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll buttons based on scroll position
    podcastsSlider.addEventListener('scroll', () => {
        const isAtStart = podcastsSlider.scrollLeft === 0;
        const isAtEnd = podcastsSlider.scrollLeft + podcastsSlider.clientWidth >= podcastsSlider.scrollWidth;

        scrollLeftBtn.style.opacity = isAtStart ? '0.3' : '0.7';
        scrollRightBtn.style.opacity = isAtEnd ? '0.3' : '0.7';
    });

    // Rest of your existing podcast initialization code...
    const podcasts = [/* ...existing podcast array... */];
    
    // Your existing podcast card creation code...
}


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
