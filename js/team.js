document.addEventListener('DOMContentLoaded', () => {
    const teamData = [
        {
            name: 'Kartik Gulati',
            role: 'President',
            department: 'core',
            image: 'assets/kartik.jpg',
            linkedin: 'https://www.linkedin.com/in/kartik-gulati-291068267?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BOm8eyWxPSketQhOcmHHsgg%3D%3D',
        },
        {
            name: 'Manya Mehrotra',
            role: 'Vice President',
            department: 'core',
            image: 'assets/manya.jpg',
            linkedin: 'https://www.linkedin.com/in/manya-mehrotra-0a6b28239/',
        },
        {
            name: 'Harsh Raj',
            role: 'General Secretary',
            department: 'core',
            image: 'assets/harsh.jpg',
            linkedin: 'https://www.linkedin.com/in/harsh-raj-11304029b/',
        },
        {
            name: 'Dhruv shukla',
            role: 'Research Head',
            department: 'Research',
            image: 'assets/dhruvsh.jpg',
            linkedin: 'https://www.linkedin.com/in/dhruv-shukla-152382290/',
        },
        {
            name: 'Harshit Pant',
            role: 'Event Head',
            department: 'Event',
            image: 'assets/harshit.jpg',
            linkedin: 'https://www.linkedin.com/in/harshit-pant-a682b4212?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        },
        {
            name: 'Simran Jaiswal',
            role: 'Social Media Head',
            department: 'Social Media',
            image: 'assets/simran.JPG',
            linkedin: 'https://www.linkedin.com/in/simran-jaiswal-466100280/',
        },
        {
            name: 'Ansab Siddiqui',
            role: 'Event Head',
            department: 'Event',
            image: 'assets/ansab.jpg',
            linkedin: 'https://www.linkedin.com/in/ansab-siddiqui-4324021b4/',
        },
        {
            name: 'Ayush Gupta',
            role: 'Finance Head',
            department: 'Finance',
            image: 'assets/ayush.jpg',
            linkedin: 'https://www.linkedin.com/in/ayush-gupta-6a278525a/',
        },
        {
            name: 'Ishu Anand',
            role: 'Social Media Head',
            department: 'Social Media',
            image: 'assets/ishu.JPG',
            linkedin: 'https://www.linkedin.com/in/ishuanand13/',
        },
        {
            name: 'Avani Saxena',
            role: 'PR Head',
            department: 'PR',
            image: 'assets/avni.jpg',
            linkedin: 'https://www.linkedin.com/in/avanisa/',
        },
        {
            name: 'Akriti Sharma',
            role: 'Finance Head',
            department: 'Finance',
            image: 'assets/akriti.jpg',
            linkedin: 'https://www.linkedin.com/in/akriti-sharma-abb1a627a/',
        },
        {
            name: 'Anshuman',
            role: 'Contnent Head',
            department: 'Content',
            image: 'assets/anshuman.jpg',
            linkedin: 'https://www.linkedin.com/in/anshuman-5749371b3/',
        },
        {
            name: 'Sarthak Bhardwaj',
            role: 'Content Head',
            department: 'Content',
            image: 'assets/sarthak.jpg',
            linkedin: 'https://www.linkedin.com/in/sarthak-bhardwaj-251709272/',
        },
         {
            name: 'Dhruv Shivhare',
            role: 'Technical',
            department: 'Technical',
            image: 'assets/dhruv.jpg',
            linkedin: 'https://www.linkedin.com/in/dhruv-shivhare-466100280/',
        },
      

        // Add more team members here
    ];

    const teamGrid = document.getElementById('teamGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    // Create team member cards
    function createTeamMemberCard(member) {
        return `
            <div class="team-member" data-department="${member.department}">
                <div class="member-image">
                    <img src="${member.image}" alt="${member.name}" loading="lazy">
                    <div class="social-overlay">
                        <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="mailto:${member.email}" aria-label="Email">
                            <i class="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
            </div>
        `;
    }

    // Filter team members
    function filterTeamMembers(filter) {
        const members = document.querySelectorAll('.team-member');
        members.forEach(member => {
            if (filter === 'all' || member.dataset.department === filter) {
                member.style.display = 'block';
            } else {
                member.style.display = 'none';
            }
        });
    }

    // Initialize team grid
    function initializeTeamGrid() {
        teamGrid.innerHTML = teamData.map(member => createTeamMemberCard(member)).join('');
        
        // Add animation observer for team members
        const teamMembers = document.querySelectorAll('.team-member');
        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    teamObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        teamMembers.forEach(member => {
            member.style.animationPlayState = 'paused';
            teamObserver.observe(member);
        });
    }

    // Add filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            filterTeamMembers(filter);
        });
    });

    // Initialize the page
    initializeTeamGrid();
});
