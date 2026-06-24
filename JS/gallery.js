// To add an image: drop the file in Images/galleri/ and add an entry to the array below.
// To add a category: add a new object here AND a matching <section id="..."> in gallery.html.
const GALLERY_CONFIG = [
    {
        id: 'pool',
        images: [
            { file: 'Pool1.jpg',  alt: 'Betongpool med formgjutet däck i Västra Götaland' },
            { file: 'Pool2.JPG',  alt: 'Poolmiljö med skräddarsydd betong i Skaraborg' },
        ]
    },
    {
        id: 'uppfart',
        images: [
            { file: 'Uppfart1.JPG', alt: 'Formgjuten betonguppfart i Lidköping' },
            { file: 'Uppfart2.JPG', alt: 'Betonguppfart med präglat mönster i Skaraborg' },
            { file: 'Uppfart3.JPG', alt: 'Skräddarsydd betonguppfart – Håkans Design Betong' },
            { file: 'Uppfart4.jpg', alt: 'Betonguppfart med slät yta i Västra Götaland' },
        ]
    },
    {
        id: 'trappa',
        images: [
            { file: 'Trappa1.jpg', alt: 'Formgjuten betongtrappa utomhus i Skaraborg' },
            { file: 'Trappa2.JPG', alt: 'Betongtrappa med slät finish i Lidköping' },
            { file: 'Trappa3.JPG', alt: 'Skräddarsydd utomhustrappa i betong' },
            { file: 'Trappa4.JPG', alt: 'Betongtrappa med räcke i Västra Götaland' },
            { file: 'Trappa5.jpg', alt: 'Modern betongtrappa – Håkans Design Betong' },
            { file: 'Trappa6.jpg', alt: 'Formgjuten entrétrappa i betong i Skaraborg' },
            { file: 'Trappa7.jpg', alt: 'Betongtrappa med stenmönster i Västra Götaland' },
        ]
    },
    {
        id: 'gang',
        images: [
            { file: 'Gang1.JPG', alt: 'Betongplattad gångväg i trädgård i Lidköping' },
            { file: 'Gang2.JPG', alt: 'Formgjuten betongyta för gångväg i Skaraborg' },
            { file: 'Gang3.JPG', alt: 'Skräddarsydd betongyta utomhus – Håkans Design Betong' },
            { file: 'Gang4.JPG', alt: 'Betongyta med mönster för gångväg i Västra Götaland' },
        ]
    },
    {
        id: 'monster',
        images: [
            { file: 'Monster1.JPG', alt: 'Präglat betongmönster som liknar natursten' },
            { file: 'Monster2.JPG', alt: 'Geometriskt betongmönster – Håkans Design Betong' },
            { file: 'Monster3.JPG', alt: 'Stenmönster i formgjuten betong i Skaraborg' },
        ]
    },
    {
        id: 'kruka',
        images: [
            { file: 'Kruka1.jpg', alt: 'Formgjuten betongkruka för utomhusbruk – Håkans Design Betong' },
            { file: 'Kruka2.jpg', alt: 'Designkruka i betong, frostbeständig' },
            { file: 'Kruka3.jpg', alt: 'Skräddarsydd betongkruka i Lidköping' },
        ]
    },
    {
        id: 'bank',
        images: [
            { file: 'Bank1.JPG', alt: 'Formgjuten betongbänk för utomhusbruk i Skaraborg' },
            { file: 'Bank2.JPG', alt: 'Betongbänk med slät yta – Håkans Design Betong' },
            { file: 'Bank3.JPG', alt: 'Skräddarsydd betongbänk i Lidköping' },
            { file: 'Bank4.JPG', alt: 'Betongbänk och ställ i trädgård i Västra Götaland' },
            { file: 'Bank5.JPG', alt: 'Designad betongbänk utomhus i Skaraborg' },
        ]
    },
    {
        id: 'utomhusmobler',
        images: [
            { file: 'UtomhusMobler1.jpg', alt: 'Formgjutna betongmöbler för utomhusbruk – Håkans Design Betong' },
        ]
    },
];

document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    initializeScrollToTop();
    initializeCategoryDropdown();
    initializeCategoryNavScroll();
});

function initializeGallery() {
    GALLERY_CONFIG.forEach(category => {
        const section = document.getElementById(category.id);
        if (!section) return;
        const grid = section.querySelector('.masonry-grid');
        category.images.forEach(({ file, alt }) => {
            grid.appendChild(createGalleryItem(`Images/galleri/${file}`, alt));
        });
    });

    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.category);
            if (target) scrollToSection(target);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-section').forEach(s => observer.observe(s));
}

function createGalleryItem(imagePath, alt) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-image', imagePath.split('/').pop().split('.')[0]);

    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';

    item.appendChild(img);
    return item;
}

function scrollToSection(target) {
    const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 150;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 300);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initializeCategoryDropdown() {
    const dropdownBtn = document.querySelector('.category-dropdown-btn');
    const dropdown = document.querySelector('.category-dropdown');
    if (!dropdownBtn || !dropdown) return;

    dropdownBtn.textContent = 'Kategorier ▼';

    dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
        dropdownBtn.textContent = dropdown.classList.contains('active') ? 'Kategorier ▲' : 'Kategorier ▼';
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            dropdownBtn.textContent = 'Kategorier ▼';
        }
    });

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdownBtn.textContent = btn.textContent + ' ▼';
            dropdown.classList.remove('active');
            const target = document.getElementById(btn.dataset.category);
            if (target) scrollToSection(target);
        });
    });

    dropdownBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });

    const dropdownContent = document.querySelector('.category-dropdown-content');
    if (dropdownContent) {
        dropdownContent.addEventListener('touchstart', (e) => e.stopPropagation());
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1200) dropdown.classList.remove('active');
    });
}

function initializeCategoryNavScroll() {
    const categoryNav = document.querySelector('.category-nav');
    let lastScrollTop = 0;
    let isHidden = false;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const dropdown = document.querySelector('.category-dropdown');

        if (currentScrollTop <= 200) {
            if (isHidden) { categoryNav.classList.remove('hidden'); isHidden = false; }
            lastScrollTop = currentScrollTop;
            return;
        }

        if (Math.abs(currentScrollTop - lastScrollTop) > scrollThreshold) {
            if (currentScrollTop > lastScrollTop && !dropdown.classList.contains('active')) {
                if (!isHidden) { categoryNav.classList.add('hidden'); isHidden = true; }
            } else if (currentScrollTop < lastScrollTop) {
                if (isHidden) { categoryNav.classList.remove('hidden'); isHidden = false; }
            }
            lastScrollTop = currentScrollTop;
        }
    });
}
