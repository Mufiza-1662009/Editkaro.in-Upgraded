/* ==========================================
   WAIT FOR PAGE TO LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       LOADER
    ========================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

        }, 1200);

    });



    /* ==========================================
       PROGRESS BAR
    ========================================== */

    const progressBar = document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {

        const scrollTop = document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = progress + "%";

    });



    /* ==========================================
       BACK TO TOP
    ========================================== */

    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });



    /* ==========================================
       STICKY NAVBAR
    ========================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.padding = "14px 8%";
            navbar.style.background = "rgba(0,0,0,.75)";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

        } else {

            navbar.style.padding = "18px 8%";
            navbar.style.background = "rgba(0,0,0,.45)";
            navbar.style.boxShadow = "none";

        }

    });



    /* ==========================================
       MOBILE MENU
    ========================================== */

    const hamburger = document.querySelector(".hamburger");

    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-active");

        hamburger.classList.toggle("active");

    });



    /* ==========================================
       CLOSE MENU WHEN LINK CLICKED
    ========================================== */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-active");

            hamburger.classList.remove("active");

        });

    });



    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        });

    });

});
/* ==========================================
   PORTFOLIO FILTER
========================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        portfolioCards.forEach(card => {

            if (filter === "all" || card.classList.contains(filter)) {

                card.style.display = "block";

                setTimeout(() => {

                    card.style.opacity = "1";

                    card.style.transform = "scale(1)";

                }, 100);

            }

            else {

                card.style.opacity = "0";

                card.style.transform = "scale(.9)";

                setTimeout(() => {

                    card.style.display = "none";

                }, 250);

            }

        });

    });

});

/* ==========================================
   SEARCH
========================================== */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const searchValue = searchInput.value.toLowerCase();

    portfolioCards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();

        const category = card.querySelector("span").textContent.toLowerCase();

        if (
            title.includes(searchValue) ||
            category.includes(searchValue)
        ) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

});

/* ==========================================
   VIDEO HOVER PLAY
========================================== */

const videos = document.querySelectorAll(".video-preview video");

videos.forEach(video => {

    video.pause();

    video.addEventListener("mouseenter", () => {

        video.play();

    });

    video.addEventListener("mouseleave", () => {

        video.pause();

        video.currentTime = 0;

    });

});

/* ==========================================
   VIDEO MODAL
========================================== */

const modal = document.getElementById("videoModal");

const modalVideo = document.getElementById("modalVideo");

const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".video-preview").forEach(preview => {

    preview.addEventListener("click", () => {

        const source = preview.querySelector("source").src;

        modal.style.display = "flex";

        modalVideo.src = source;

        modalVideo.play();

        document.body.style.overflow = "hidden";

    });

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

    modalVideo.pause();

    modalVideo.currentTime = 0;

    modalVideo.src = "";

    document.body.style.overflow = "auto";

});

/* ==========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================== */

modal.addEventListener("click", e => {

    if (e.target === modal) {

        modal.style.display = "none";

        modalVideo.pause();

        modalVideo.currentTime = 0;

        modalVideo.src = "";

        document.body.style.overflow = "auto";

    }

});

/* ==========================================
   ESC KEY CLOSE MODAL
========================================== */

document.addEventListener("keydown", e => {

    if (e.key === "Escape" && modal.style.display === "flex") {

        modal.style.display = "none";

        modalVideo.pause();

        modalVideo.currentTime = 0;

        modalVideo.src = "";

        document.body.style.overflow = "auto";

    }

});
/* ==========================================
   ANIMATED COUNTERS
========================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = target / 120;

        const updateCounter = () => {

            if (count < target) {

                count += speed;

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(

    ".section, .portfolio-card, .service-card, .testimonial-card, .stat-box"

);

revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(60px)";

    element.style.transition = "all .8s ease";

});

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.15

});

revealElements.forEach(element => {

    revealObserver.observe(element);

});

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================
   CURSOR GLOW
========================================== */

const cursor = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", e => {

    cursor.style.left = e.clientX - 10 + "px";

    cursor.style.top = e.clientY - 10 + "px";

});

/* ==========================================
   TESTIMONIAL AUTO SLIDER
========================================== */

const testimonialCards = document.querySelectorAll(".testimonial-card");

let testimonialIndex = 0;

function showTestimonial(index) {

    testimonialCards.forEach(card => {

        card.style.display = "none";

    });

    testimonialCards[index].style.display = "block";

}

if (window.innerWidth > 768) {

    showTestimonial(0);

    setInterval(() => {

        testimonialIndex++;

        if (testimonialIndex >= testimonialCards.length) {

            testimonialIndex = 0;

        }

        showTestimonial(testimonialIndex);

    }, 4000);

}

/* ==========================================
   HERO PARALLAX
========================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const offset = window.scrollY * 0.3;

    hero.style.backgroundPositionY = offset + "px";

});

/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

const buttons = document.querySelectorAll(

    ".btn-primary, .btn-secondary, .watch-btn"

);

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log("%c Editkaro Portfolio Loaded Successfully!",

"color:#00d4ff;font-size:18px;font-weight:bold;");

console.log("%cDesigned with  using HTML, CSS & JavaScript",

"color:#8b5cf6;font-size:14px;");
// Newsletter Google Sheet Integration

/* ==========================================
   GOOGLE SHEET FORM INTEGRATION
========================================== */


const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5Jw3fewelUWVNtiTNMW8aN8jERZUSjpC182OHWDPd3jJEGPbeMDdKteuQTHIomDZQ/exec";



/* NEWSLETTER FORM */

const newsletterForm = document.getElementById("newsletterForm");


if(newsletterForm){

    newsletterForm.addEventListener("submit", function(e){

        e.preventDefault();


        const email =
        document.getElementById("subscriberEmail").value;


        fetch(GOOGLE_SCRIPT_URL, {

            method:"POST",

            mode:"no-cors",

            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify({

                type:"Newsletter",

                name:"",

                email:email,

                subject:"",

                message:""

            })

        });


        alert("Thank you for subscribing!");

        newsletterForm.reset();


    });

}





/* CONTACT FORM */

const contactForm = document.getElementById("contactForm");


if(contactForm){


    contactForm.addEventListener("submit", function(e){

        e.preventDefault();


        const formData = new FormData(contactForm);



        fetch(GOOGLE_SCRIPT_URL, {

            method:"POST",

            mode:"no-cors",

            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify({

                type:"Contact",

                name:formData.get("name"),

                email:formData.get("email"),

                subject:formData.get("subject"),

                message:formData.get("message")

            })

        });


        alert("Your message has been submitted!");

        contactForm.reset();


    });


}