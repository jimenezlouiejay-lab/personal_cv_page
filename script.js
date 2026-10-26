const loader = document.getElementById("pageLoader");
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const links = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const floatingTop = document.getElementById("floatingTop");

window.addEventListener("load", () => {
    window.setTimeout(() => loader?.classList.add("loaded"), 220);
});

document.getElementById("year").textContent = new Date().getFullYear();

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("menu-open", isOpen);
});

links.forEach(link => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
});

function updateNavigation() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 12);
    floatingTop.classList.toggle("show", y > 650);

    let current = "home";
    sections.forEach(section => {
        const top = section.offsetTop - 140;
        if (y >= top) current = section.id;
    });

    links.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", updateNavigation, { passive: true });
updateNavigation();

floatingTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    revealObserver.observe(element);
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
});
