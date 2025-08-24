

    document.addEventListener('DOMContentLoaded', () => {

        // --- Sample Post Content ---
        const postsContent = {
            1: {
                title: 'The Art of Digital Detox: Reclaiming Focus from FOMO',
                content: `
                    <p>Fear of Missing Out (FOMO) is a powerful driver of social media overuse. This article explores practical strategies for young people to step back, unplug, and cultivate a healthier relationship with their digital devices. It's not about quitting social media entirely, but about using it with intention.</p>
                    <h4>1. Identify Your Triggers</h4>
                    <p>What makes you feel FOMO the most? Is it seeing friends hang out without you, or seeing influencers on lavish vacations? Recognizing your triggers is the first step. Keep a journal for a week and note when you feel anxious or inadequate while scrolling.</p>
                    <h4>2. Curate Your Feed Mercilessly</h4>
                    <p>Your feed should inspire, not deflate you. Unfollow accounts that consistently make you feel bad about yourself. Mute, block, and curate until your social media is a place of positivity. Follow accounts that align with your hobbies and passions instead.</p>
                    <h4>3. Schedule 'Offline' Time</h4>
                    <p>Designate specific times of the day or week as tech-free. This could be the first hour after you wake up, during meals, or for a full day on the weekend. Use this time to connect with people in person, read a book, or go for a walk. The world won't end if you're offline for a few hours.</p>
                `
            },
            2: {
                title: 'Finding Your Tribe: Building Positive Online Communities',
                content: `
                    <p>While the internet can be a hostile place, it's also home to supportive communities. Learn how to identify and engage with positive online groups that foster growth, creativity, and genuine connection. Your online tribe is out there waiting for you.</p>
                    <h4>1. Look Beyond Mainstream Platforms</h4>
                    <p>Sometimes the best communities are on niche platforms. Explore forums like Reddit (in specific, well-moderated subreddits), Discord servers dedicated to your hobbies, or platforms like Behance for artists. These spaces are often built around shared interests rather than personal image.</p>
                    <h4>2. Be a Contributor, Not Just a Lurker</h4>
                    <p>To build a community, you need to participate. Share your work, offer helpful advice, ask thoughtful questions, and encourage others. Positive engagement begets positive engagement. Be the kind of community member you'd want to interact with.</p>
                    <h4>3. Prioritize Safety and Moderation</h4>
                    <p>A healthy online community has clear rules and active moderators. Before joining, check the community guidelines. Report any harassment or hate speech. A safe space is a prerequisite for a positive one.</p>
                `
            },
            3: {
                title: 'A Parent\'s Guide to Social Media in 2024',
                content: `
                    <p>Keeping up with the latest apps and trends can feel overwhelming for parents. This guide breaks down the essential things you need to know to talk to your kids about online safety, privacy, and digital citizenship.</p>
                    <h4>1. Talk Early and Often</h4>
                    <p>Don't wait for a problem to arise. Start conversations about social media early, treating it as a normal part of life. Ask them what platforms they enjoy and what they like about them. Create an environment where they feel comfortable coming to you with questions or concerns.</p>
                    <h4>2. Understand the Platforms</h4>
                    <p>You don't need to be an expert on every app, but having a basic understanding of TikTok, Instagram, and Snapchat is crucial. Learn about their privacy settings, reporting features, and the kind of content that is popular. This knowledge will make your conversations more effective.</p>
                    <h4>3. Focus on Digital Citizenship, Not Just Rules</h4>
                    <p>Instead of a long list of "don'ts," focus on teaching "do's." Teach them to be kind online, to think critically about what they see, to respect others' privacy, and to understand that their digital footprint is permanent. These are skills that will serve them for a lifetime.</p>
                `
            }
        };

        // --- Smooth Scroll & Nav ---
        const navLinks = document.querySelectorAll('.nav-links a');
        const navToggle = document.getElementById('navToggle');
        const mainNav = document.getElementById('navLinks');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if(link.getAttribute('href').startsWith('#')){
                    e.preventDefault();
                    document.querySelector(link.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                    if (document.body.classList.contains('nav-open')) {
                        document.body.classList.remove('nav-open');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
        
        // --- Hamburger Menu Toggle ---
        navToggle.addEventListener('click', () => {
            const isNavOpen = document.body.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isNavOpen);
        });

        // --- Hide Header on Scroll ---
        let lastScrollY = window.scrollY;
        const mainHeader = document.getElementById('mainHeader');
        window.addEventListener('scroll', () => {
            if (lastScrollY < window.scrollY && window.scrollY > 100) {
                mainHeader.classList.add('hidden');
            } else {
                mainHeader.classList.remove('hidden');
            }
            lastScrollY = window.scrollY;
        });

        // --- Hero Typing Animation ---
        const typingText = document.getElementById('typing-text');
        const phrases = ["The Good, The Bad, and The In-Between.", "A Guide for a Digital Age.", "Understanding the Impact."];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex--);
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex++);
            }

            if (!isDeleting && charIndex === currentPhrase.length + 1) {
                setTimeout(() => isDeleting = true, 2000); // Pause at end
            } else if (isDeleting && charIndex === -1) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            const typingSpeed = isDeleting ? 75 : 150;
            setTimeout(type, typingSpeed);
        }
        type();

        // --- Intersection Observer for Animations ---
        const revealElements = document.querySelectorAll('.reveal');
        const statsSection = document.getElementById('stats');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger counters if it's the stats section
                    if(entry.target.id === 'stats'){
                        const counters = document.querySelectorAll('.stat-number');
                        counters.forEach(counter => {
                            if (!counter.classList.contains('animated')) {
                                animateCounter(counter);
                                counter.classList.add('animated');
                            }
                        });
                    }
                    // For single-trigger animations, unobserve
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
        if(statsSection) observer.observe(statsSection);

        // --- Animated Counters ---
        function animateCounter(element) {
            const target = +element.getAttribute('data-target');
            const duration = 2000;
            const start = 0;
            let startTime = null;

            function step(currentTime) {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const currentValue = Math.floor(progress * (target - start) + start);
                
                // Handle decimals
                if (String(target).includes('.')) {
                    element.textContent = (progress * target).toFixed(1);
                } else {
                    element.textContent = currentValue;
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    element.textContent = target; // Ensure it ends on the exact number
                }
            }
            window.requestAnimationFrame(step);
        }

        // --- Modal Logic ---
        const modal = document.getElementById('postModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const modalClose = document.getElementById('modalClose');
        const readMoreButtons = document.querySelectorAll('.read-more-btn');

        function openModal(postId) {
            const post = postsContent[postId];
            if (post) {
                modalTitle.textContent = post.title;
                modalBody.innerHTML = post.content;
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }

        readMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const postId = button.getAttribute('data-post-id');
                openModal(postId);
            });
        });
        
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });

        // --- Newsletter Form ---
        const newsletterForm = document.getElementById('newsletterForm');
        const emailInput = document.getElementById('emailInput');
        const successMessage = document.getElementById('successMessage');

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(email)) {
                newsletterForm.style.display = 'none';
                successMessage.style.display = 'block';
                newsletterForm.classList.remove('error');
            } else {
                newsletterForm.classList.add('error');
            }
        });
        emailInput.addEventListener('input', () => {
            if (newsletterForm.classList.contains('error')) {
                newsletterForm.classList.remove('error');
            }
        });

        // --- Download Guide CTA ---
        const downloadBtn = document.getElementById('downloadGuideBtn');
        downloadBtn.addEventListener('click', () => {
            const guideContent = `
One-Page Guide: Social Media & The Younger Generation

KEY TAKEAWAYS:

1. It's a Double-Edged Sword:
   - Positives: Community building, social engagement, access to information.
   - Negatives: Social comparison, cyberbullying, FOMO, sleep disruption.

2. Mental Health is a Priority:
   - Be aware of links between heavy social media use and increased anxiety/depression.
   - Watch for signs of withdrawal, mood changes, and declining self-esteem.

3. Tips for Healthy Habits:
   - Open Communication: Create a non-judgmental space to talk about online life.
   - Set Boundaries: Implement tech-free zones/times (e.g., dinners, bedrooms at night).
   - Curate Feeds: Encourage following accounts that inspire and educate, not deflate.
   - Model Behavior: Parents and educators should demonstrate healthy screen habits.
   - Teach Critical Thinking: Help youth question the authenticity of online content.

4. Digital Citizenship is Key:
   - Emphasize kindness, respect, and privacy online.
   - Discuss the concept of a permanent digital footprint.

This guide was generated from DigitalWell.
            `;
            const blob = new Blob([guideContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Social-Media-Guide.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        // --- Footer Year ---
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    });