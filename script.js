document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       MOBILE MENU
    ========================================== */

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-links");

    if (toggle && menu) {

        toggle.addEventListener("click", function () {

            const open = menu.classList.toggle("open");

            toggle.setAttribute(
                "aria-expanded",
                String(open)
            );

            document.body.classList.toggle(
                "menu-open",
                open
            );

        });


        /* Close menu when link is clicked */

        menu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                menu.classList.remove("open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

    }


    /* ==========================================
       SCROLL HEADER
    ========================================== */

    const header = document.querySelector(".site-header");

    if (header) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 30) {

                    header.classList.add("scrolled");

                } else {

                    header.classList.remove("scrolled");

                }

            },
            { passive: true }
        );

    }


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* ==========================================
       NUMBER COUNTER
    ========================================== */

    const counters =
        document.querySelectorAll("[data-counter]");

    if ("IntersectionObserver" in window && counters.length) {

        const counterObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const element =
                            entry.target;

                        const target =
                            Number(
                                element.dataset.counter
                            );

                        let current = 0;

                        const duration = 1200;

                        const step =
                            Math.max(
                                1,
                                Math.ceil(
                                    target / 60
                                )
                            );

                        const interval =
                            setInterval(
                                function () {

                                    current += step;

                                    if (current >= target) {

                                        current =
                                            target;

                                        clearInterval(
                                            interval
                                        );

                                    }

                                    element.textContent =
                                        current.toLocaleString();

                                },
                                duration / 60
                            );

                        counterObserver.unobserve(
                            element
                        );

                    });

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    }

});

/* =========================================================
   STEP 6B — PREMIUM SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const animatedItems = document.querySelectorAll(
        ".service-card, " +
        ".portfolio-card, " +
        ".insight-card, " +
        ".testimonial-card, " +
        ".expertise-card, " +
        ".industry-card, " +
        ".objective-card, " +
        ".process-step"
    );

    if (!animatedItems.length) return;

    animatedItems.forEach(function (item, index) {
        item.classList.add("scroll-reveal");

        item.style.transitionDelay =
            Math.min((index % 3) * 80, 160) + "ms";
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("scroll-visible");

                    revealObserver.unobserve(entry.target);
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        document
            .querySelectorAll(".scroll-reveal")
            .forEach(function (item) {
                revealObserver.observe(item);
            });

    } else {

        document
            .querySelectorAll(".scroll-reveal")
            .forEach(function (item) {
                item.classList.add("scroll-visible");
            });

    }

});