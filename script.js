  // Navigation beim Scrollen
        const navbar = document.getElementById("navbar");

        function updateNavbar() {
            navbar.classList.toggle("scrolled", window.scrollY > 20);
        }

        window.addEventListener("scroll", updateNavbar, { passive: true });
        updateNavbar();

        // Mobile Navigation
        const navToggle = document.getElementById("navToggle");
        const navLinks = document.getElementById("navLinks");

        navToggle.addEventListener("click", () => {
            const open = navLinks.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(open));
            navToggle.textContent = open ? "×" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.textContent = "☰";
            });
        });

        // Scroll-Reveal
        const revealElements = document.querySelectorAll(".reveal");

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => revealObserver.observe(element));

        // Kleine Parallax-Bewegung der Dashboard-Vorschau
        const dashboard = document.querySelector(".dashboard");

        if (dashboard && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const dashboardWrap = document.querySelector(".dashboard-wrap");

            dashboardWrap.addEventListener("mousemove", (event) => {
                if (window.innerWidth <= 900) return;

                const rect = dashboardWrap.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                dashboard.style.transform =
                    `rotateY(${x * 7}deg) rotateX(${y * -4}deg)`;
            });

            dashboardWrap.addEventListener("mouseleave", () => {
                dashboard.style.transform = "rotateY(-5deg) rotateX(2deg)";
            });
        }