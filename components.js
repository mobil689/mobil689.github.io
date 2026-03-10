/* ===========================
   COMPONENTS.JS — Algorythms Society
   Dynamic header/footer injection
   =========================== */

function getActivePage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
}

function loadHeader() {
    const activePage = getActivePage();

    function navClass(page) {
        return activePage === page
            ? 'magnetic-link dark:text-white font-bold border-b-2 border-violet-500 pb-1'
            : 'magnetic-link dark:text-gray-300 hover:text-black dark:hover:text-white';
    }

    function mobileNavClass(page) {
        return activePage === page
            ? 'block py-2 dark:text-white font-bold'
            : 'block py-2 dark:text-gray-300 hover:text-black dark:hover:text-white';
    }

    const headerHTML = `
    <header class="fixed top-0 left-0 w-full z-50 transition-all duration-300 content-layer">
        <div class="glass-card mx-auto mt-4 max-w-7xl rounded-full p-2">
            <div class="container mx-auto px-4 flex justify-between items-center">
                <div class="flex items-center gap-x-3">
                    <img src="https://raw.githubusercontent.com/mobil689/mobil689.github.io/main/logos/algorythmslogo.jpg" alt="Algorythms Logo" class="h-10 w-10 rounded-full object-cover">
                    <h1 class="text-xl md:text-2xl font-bold dark:text-white tracking-wider"><a href="index.html" class="magnetic-link">ALGORYTHMS</a></h1>
                </div>
                <nav class="hidden md:flex space-x-8 text-sm">
                    <a href="about.html" class="${navClass('about')}">About</a>
                    <a href="departments.html" class="${navClass('departments')}">Departments</a>
                    <a href="events.html" class="${navClass('events')}">Events</a>
                    <a href="gallery.html" class="${navClass('gallery')}">Gallery</a>
                    <a href="team.html" class="${navClass('team')}">Team</a>
                    <a href="contact.html" class="${navClass('contact')}">Contact</a>
                </nav>
                <div class="flex items-center space-x-4">
                    <button id="theme-toggle" class="magnetic-link p-2 rounded-full glass-card">
                        <svg id="theme-icon-light" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        <svg id="theme-icon-dark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm-.707 10.607a1 1 0 011.414 0l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM3 11a1 1 0 100 2h1a1 1 0 100-2H3z"></path></svg>
                    </button>
                    <a href="contact.html" class="magnetic-link bg-violet-600 text-white px-5 py-2 rounded-full font-semibold hidden md:block join-us-btn">Join Us</a>
                    <img src="https://raw.githubusercontent.com/mobil689/mobil689.github.io/main/logos/maimslogo.png" alt="MAIMS Logo" class="h-10 hidden md:block">
                    <!-- Mobile hamburger -->
                    <button id="mobile-menu-btn" class="md:hidden p-2 dark:text-white" aria-label="Toggle mobile menu">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile menu -->
        <div id="mobile-menu" class="md:hidden glass-card mx-4 mt-2 rounded-2xl px-6 py-2">
            <a href="about.html" class="${mobileNavClass('about')}">About</a>
            <a href="departments.html" class="${mobileNavClass('departments')}">Departments</a>
            <a href="events.html" class="${mobileNavClass('events')}">Events</a>
            <a href="gallery.html" class="${mobileNavClass('gallery')}">Gallery</a>
            <a href="team.html" class="${mobileNavClass('team')}">Team</a>
            <a href="contact.html" class="${mobileNavClass('contact')}">Contact</a>
        </div>
    </header>`;

    const headerContainer = document.getElementById('header-root');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }

    // Mobile menu toggle
    setTimeout(() => {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('open');
            });
        }
    }, 50);
}

function loadFooter() {
    const footerHTML = `
    <footer class="py-8 border-t border-gray-200 dark:border-white dark:border-opacity-10 content-layer">
        <div class="container mx-auto px-6 text-center text-gray-500 dark:text-gray-400">
            <p>Crafted with ⚡ by Abhisht | Tech Expert</p>
        </div>
    </footer>`;

    const footerContainer = document.getElementById('footer-root');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
}

// Join Us modal (available on all pages)
function loadJoinUsModal() {
    const modalHTML = `
    <div id="join-us-modal" class="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center hidden">
        <div class="glass-card p-8 rounded-2xl w-full max-w-lg m-4 relative transform transition-all opacity-0 -translate-y-4">
            <button id="close-modal-btn" class="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
            <h2 class="text-3xl font-bold text-center mb-6 dark:text-white">Join Algorythms</h2>
            <form id="registration-form">
                <div class="mb-4">
                    <label for="reg-name" class="block mb-2 dark:text-gray-300">Full Name</label>
                    <input type="text" id="reg-name" name="name" class="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800" required>
                </div>
                <div class="mb-4">
                    <label for="reg-email" class="block mb-2 dark:text-gray-300">Email</label>
                    <input type="email" id="reg-email" name="email" class="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800" required>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="reg-student-id" class="block mb-2 dark:text-gray-300">Student ID</label>
                        <input type="text" id="reg-student-id" name="studentId" class="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800" required>
                    </div>
                    <div>
                        <label for="reg-year" class="block mb-2 dark:text-gray-300">Year of Study</label>
                        <input type="number" id="reg-year" name="yearOfStudy" min="1" max="4" class="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800" required>
                    </div>
                </div>
                <div class="mb-6">
                    <label for="reg-reason" class="block mb-2 dark:text-gray-300">Why do you want to join?</label>
                    <textarea id="reg-reason" name="reasonToJoin" rows="4" class="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800" required></textarea>
                </div>
                <button type="submit" class="bg-violet-600 text-white px-6 py-3 rounded-full font-semibold w-full">Submit Application</button>
            </form>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Set up event listeners
    setTimeout(() => {
        const joinUsModal = document.getElementById('join-us-modal');
        const modalContent = joinUsModal ? joinUsModal.querySelector('.glass-card') : null;
        const closeJoinModalBtn = document.getElementById('close-modal-btn');
        const registrationForm = document.getElementById('registration-form');

        function openJoinModal() {
            if (!joinUsModal) return;
            joinUsModal.classList.remove('hidden');
            gsap.to(modalContent, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        }

        function closeJoinModal() {
            if (!joinUsModal) return;
            gsap.to(modalContent, {
                opacity: 0, y: -16, duration: 0.3, ease: 'power2.in',
                onComplete: () => { joinUsModal.classList.add('hidden'); }
            });
        }

        // All "Join Us" buttons across the site
        document.querySelectorAll('.join-us-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openJoinModal();
            });
        });

        if (closeJoinModalBtn) closeJoinModalBtn.addEventListener('click', closeJoinModal);
        if (joinUsModal) joinUsModal.addEventListener('click', (e) => {
            if (e.target === joinUsModal) closeJoinModal();
        });

        if (registrationForm) {
            registrationForm.addEventListener('submit', async(e) => {
                e.preventDefault();
                const submitButton = registrationForm.querySelector('button[type="submit"]');
                const formData = new FormData(registrationForm);
                const data = Object.fromEntries(formData.entries());

                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;

                try {
                    const response = await fetch('/api/handle-registration', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });
                    if (response.ok) {
                        alert('Application submitted successfully! We will get back to you soon.');
                        registrationForm.reset();
                        closeJoinModal();
                    } else {
                        const errorResult = await response.json();
                        alert(`Error: ${errorResult.message || 'Something went wrong.'}`);
                    }
                } catch (error) {
                    console.error('Registration error:', error);
                    alert('An unexpected error occurred. Please try again.');
                } finally {
                    submitButton.textContent = 'Submit Application';
                    submitButton.disabled = false;
                }
            });
        }
    }, 100);
}

// --- INIT ALL COMPONENTS ---
function initComponents() {
    loadHeader();
    loadFooter();
    loadJoinUsModal();
}
