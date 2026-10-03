/* =========================================================
   DTM ENTERPRISE
   MASTER JAVASCRIPT
   Delivering Projects. Driving Results.
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    let menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    /*
       If the HTML does not contain a menu button,
       create one automatically.
    */

    if (!menuToggle && navLinks) {

        const navContainer =
            navLinks.closest(".nav-container") ||
            navLinks.closest(".navbar");

        if (navContainer) {

            menuToggle = document.createElement("div");

            menuToggle.className = "menu-toggle";

            menuToggle.setAttribute(
                "aria-label",
                "Toggle navigation menu"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';

            navContainer.appendChild(menuToggle);
        }
    }


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                if (isOpen) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-times");

                } else {

                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        });


        /*
           Close mobile menu when a navigation
           link is clicked.
        */

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }



    /* =====================================================
       SCROLL PROGRESS BAR
    ===================================================== */

    const progressBar =
        document.getElementById("progress-bar");


    function updateScrollProgress() {

        if (!progressBar) return;

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (documentHeight <= 0) {

            progressBar.style.width = "0%";

            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width =
            Math.min(progress, 100) + "%";
    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topBtn =
        document.getElementById("topBtn");


    if (topBtn) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 400) {

                    topBtn.classList.add("show");

                } else {

                    topBtn.classList.remove("show");
                }
            },
            { passive: true }
        );


        topBtn.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }



    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader =
        document.getElementById("loader");


    if (loader) {

        window.addEventListener(
            "load",
            function () {

                setTimeout(
                    function () {

                        loader.classList.add("hidden");

                    },
                    500
                );
            }
        );
    }



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(".nav-links a")
        .forEach(function (link) {

            const linkPage =
                link.getAttribute("href");

            if (!linkPage) return;

            /*
               Ignore external links and anchors.
            */

            if (
                linkPage.startsWith("#") ||
                linkPage.startsWith("http") ||
                linkPage.startsWith("mailto:") ||
                linkPage.startsWith("tel:")
            ) {
                return;
            }

            const cleanLink =
                linkPage.split("#")[0];


            if (
                cleanLink === currentPage ||
                (
                    currentPage === "" &&
                    cleanLink === "index.html"
                )
            ) {

                link.classList.add("active");
            }
        });



    /* =====================================================
       SMOOTH INTERNAL SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (anchor) {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                }
            );
        });



    /* =====================================================
       ANIMATED STATISTICS COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    const statsSection =
        document.querySelector(".stats-section");

    let countersStarted = false;


    function startCounters() {

        if (countersStarted) return;

        countersStarted = true;


        counters.forEach(function (counter) {

            const target =
                parseInt(
                    counter.getAttribute("data-target"),
                    10
                );


            if (isNaN(target)) return;


            const duration = 1800;

            const startTime =
                performance.now();


            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                /*
                   Smooth ease-out effect.
                */

                const easedProgress =
                    1 - Math.pow(
                        1 - progress,
                        3
                    );


                const currentValue =
                    Math.floor(
                        easedProgress * target
                    );


                counter.textContent =
                    currentValue;


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target;
                }
            }


            requestAnimationFrame(
                updateCounter
            );
        });
    }


    /*
       Start counters only when the statistics
       section becomes visible.
    */

    if (statsSection && counters.length > 0) {

        if ("IntersectionObserver" in window) {

            const statsObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    startCounters();

                                    statsObserver.disconnect();
                                }
                            }
                        );
                    },
                    {
                        threshold: 0.25
                    }
                );


            statsObserver.observe(
                statsSection
            );

        } else {

            startCounters();
        }
    }



    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("visible");

                                revealObserver.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );
            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );
            }
        );
    }



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    document
        .querySelectorAll(".current-year")
        .forEach(function (element) {

            element.textContent =
                new Date().getFullYear();
        });



    /* =====================================================
       IMAGE ERROR CHECK
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    console.warn(
                        "DTM Enterprise image could not be loaded:",
                        image.src
                    );
                }
            );
        });



    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !navLinks ||
                !menuToggle ||
                !navLinks.classList.contains("active")
            ) {
                return;
            }


            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                navLinks.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-times"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );
                }
            }
        }
    );

});
