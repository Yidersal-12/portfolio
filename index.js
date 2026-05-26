  window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 600);
        });

        // Cursor
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            document.addEventListener('mousemove', e => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        }

        // Typing
        const typingText = "Information Systems Student @ BiT | Web Developer | Systems Analyst";
        let i = 0;
        function type() {
            const el = document.getElementById('typing');
            if (el && i < typingText.length) {
                el.innerHTML += typingText.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        setTimeout(type, 1200);

        // Scroll reveal
        const revealElements = document.querySelectorAll('.reveal');
        const observerOptions = { threshold: 0.1 };
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        revealElements.forEach(el => revealObserver.observe(el));

        // Progress bar
        window.addEventListener('scroll', () => {
            const scroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            document.getElementById('progress').style.width = (scroll / height) * 100 + '%';
        });

        // Particles
        const canvas = document.getElementById('particles');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
            window.addEventListener('resize', resizeCanvas); resizeCanvas();
            const particles = [];
            for (let p=0; p<70; p++) particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*2, s: Math.random()*0.5+0.2 });
            function animate() {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.fillStyle = "rgba(0,229,255,0.3)";
                particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                    ctx.fill();
                    p.y+=p.s;
                    if(p.y>canvas.height) p.y=0;
                });
                requestAnimationFrame(animate);
            }
            animate();
        }

        // Theme toggle
        const toggleBtn = document.getElementById('themeToggle');
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            toggleBtn.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
        });

        // Hamburger menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Active nav link on scroll
        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const top = section.offsetTop - 120;
                if (pageYOffset >= top) current = section.getAttribute('id');
            });
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) link.classList.add('active');
            });
        });

        // Form handling
        const form = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            const data = new FormData(form);
            try {
                const resp = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
                if (resp.ok) {
                    formStatus.style.display = 'block';
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
                    form.reset();
                } else throw new Error('fail');
            } catch {
                formStatus.style.display = 'block';
                formStatus.innerHTML = 'Oops! Something went wrong. Please try again.';
            }
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
            setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
        });