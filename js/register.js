document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const addMemberBtn = document.getElementById('addMember');
    const teamMembers = document.getElementById('teamMembers');
    const modal = document.getElementById('confirmationModal');
    const closeModal = document.querySelector('.close-modal');
    let memberCount = 1;

    // Handle adding new team members
    addMemberBtn.addEventListener('click', () => {
        if (memberCount < 4) { // Maximum 4 additional members
            memberCount++;
            const memberDiv = document.createElement('div');
            memberDiv.className = 'member-inputs';
            memberDiv.innerHTML = `
                <div class="input-group">
                    <input type="text" id="member${memberCount}Name">
                    <label for="member${memberCount}Name">Member ${memberCount} Name</label>
                </div>
                <div class="input-group">
                    <input type="email" id="member${memberCount}Email">
                    <label for="member${memberCount}Email">Member ${memberCount} Email</label>
                </div>
            `;
            teamMembers.appendChild(memberDiv);

            if (memberCount === 4) {
                addMemberBtn.style.display = 'none';
            }
        }
    });

    // Form submission handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // Phone number validation
        const phone = document.getElementById('leaderPhone');
        if (phone.value && !phone.value.match(/^[0-9]{10}$/)) {
            isValid = false;
            phone.classList.add('error');
        }

        if (isValid) {
            // Collect form data
            const formData = {
                teamName: document.getElementById('teamName').value,
                leader: {
                    name: document.getElementById('leaderName').value,
                    email: document.getElementById('leaderEmail').value,
                    phone: document.getElementById('leaderPhone').value,
                    college: document.getElementById('leaderCollege').value
                },
                members: [],
                project: {
                    title: document.getElementById('projectTitle').value,
                    description: document.getElementById('projectDescription').value,
                    category: document.getElementById('category').value
                }
            };

            // Collect team members data
            for (let i = 1; i <= memberCount; i++) {
                const memberName = document.getElementById(`member${i}Name`);
                const memberEmail = document.getElementById(`member${i}Email`);
                if (memberName && memberName.value) {
                    formData.members.push({
                        name: memberName.value,
                        email: memberEmail.value
                    });
                }
            }

            // Here you would typically send the data to your server
            console.log('Form Data:', formData);

            // Show success modal
            modal.style.display = 'block';
            
            // Reset form
            form.reset();
        }
    });

    // Modal close handlers
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Input field animations
    const inputs = document.querySelectorAll('.input-group input, .input-group textarea');
    inputs.forEach(input => {
        // Add placeholder for animation
        input.setAttribute('placeholder', ' ');
        
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});
