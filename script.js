/**
 * Devansh Sharma // 1st Year B.Tech CSE Portfolio
 * Dark Minimalist Aesthetic • Cyberpunk, Anime & Transformers Easter Eggs
 * Interactive Script: Typewriter, Theme Switcher, ScrollSpy, Filters, Modal, Form Validation & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initNavigation();
  initScrollSpy();
  initScrollProgress();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initBackToTop();
  initCurrentYear();
  initResumeButton();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to stealth dark mode
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', initialTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    showToast(`Matrix frequency: ${newTheme.toUpperCase()} mode active ⚡`, 'info');
  });

  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  });
}

/* ==========================================================================
   2. HERO TYPEWRITER EFFECT (With Anime & Sci-Fi Easter Eggs)
   ========================================================================== */
function initTypewriter() {
  const typedTextEl = document.getElementById('typed-text');
  if (!typedTextEl) return;

  const phrases = [
    'Freshman B.Tech CSE Undergrad',
    'Leveling Up Algorithms (Solo Leveling Mode)',
    'Transforming Logic // More Than Meets The Eye',
    'Problem Solver in C++ & STL',
    'Hello, Friend. Building Scalable Web Apps',
    'Chasing O(1) Time Complexities'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 80;
  const deletingDelay = 40;
  const pauseBetweenPhrases = 1700;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let timeout = isDeleting ? deletingDelay : typingDelay;

    if (!isDeleting && charIndex === currentPhrase.length) {
      timeout = pauseBetweenPhrases;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      timeout = 350;
    }

    setTimeout(type, timeout);
  }

  type();
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  if (!menuToggle || !navMenu) return;

  function toggleMenu(isOpen) {
    menuToggle.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  menuToggle.addEventListener('click', () => {
    const willOpen = !navMenu.classList.contains('active');
    toggleMenu(willOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu(false);
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   4. SCROLL SPY (ACTIVE NAV LINK)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   5. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/* ==========================================================================
   6. PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });
}

/* ==========================================================================
   7. PROJECT DETAILS MODAL (Artifact Mission Reports)
   ========================================================================== */
const projectDetailsData = {
  'campus-connect': {
    title: 'AllSpark // CampusConnect Academic Hub',
    badge: 'Transformers // AllSpark Core',
    timeline: 'Dec 2025 – Jan 2026',
    problem: 'College freshmen struggle to track complex rotating block timetables, calculate fluctuating semester SGPA/CGPA, and share verified course notes without WhatsApp chaos.',
    solution: 'Built an offline-first web portal allowing students to configure their course timetable, track live lecture attendance with a 75% minimum warning flag, simulate GPA with weighted credits, and access syllabus handouts.',
    features: [
      'Interactive Course & GPA Simulator with custom university grade points',
      'Daily lecture schedule view with current period highlighted',
      'Attendance tracker calculating safe skip margins or required lectures',
      'Instant search filter for faculty handouts and previous year papers',
      'Zero-login LocalStorage persistence: ultra fast & private'
    ],
    techStack: ['JavaScript ES6+', 'CSS Glassmorphism', 'HTML5', 'LocalStorage API', 'Responsive UI'],
    learnings: 'Mastered modular DOM state updates, normalized JSON structures in LocalStorage, and built clean mobile-first views tested across devices.'
  },
  'sort-vision': {
    title: 'SortVision // Real-Time DSA Visualizer',
    badge: 'JJK // Domain Expansion: Algorithms',
    timeline: 'Nov 2025',
    problem: 'Abstract sorting algorithms (Quick Sort divide-and-conquer and Merge Sort recursion) are difficult to grasp without dynamic visual feedback.',
    solution: 'An interactive algorithm canvas that renders bar arrays in real-time. Students can adjust array sizes, control speeds, and hear audio tones corresponding to comparisons.',
    features: [
      'Visualizes Bubble Sort, Selection Sort, Merge Sort, and Quick Sort',
      'Real-time metrics: Array access counts, comparisons made, and elapsed time',
      'Web Audio API integration emitting pitched sine-waves for comparisons',
      'Pause, step-forward, and speed slider (1x to 10x)'
    ],
    techStack: ['HTML5 Canvas', 'Vanilla JavaScript (Promises & Async/Await)', 'Web Audio API', 'CSS3'],
    learnings: 'Understood asynchronous generator-like loops in JavaScript, preventing UI freezing during heavy calculations, and deeply strengthened recursion theory for engineering exams.'
  },
  'student-cli': {
    title: 'Cybertron Core // Student CLI & Grade Engine',
    badge: 'C++17 // Systems & Binary I/O',
    timeline: 'Oct 2025',
    problem: 'Needed a robust practical system in C++ demonstrating object-oriented principles, custom memory structures, and permanent binary file storage without SQL.',
    solution: 'Engineered a terminal application using C++17 that maintains student academic records via a doubly linked list, supports O(N) linear search or sorted binary search, and dumps structured records to encrypted binary files.',
    features: [
      'Custom Doubly Linked List implementation replacing STL for educational mastery',
      'Binary file serialization with fstream for instant load/save',
      'Auto-calculation of grades based on relative percentile grading formulas',
      'Robust input validation preventing CLI buffer crashes and type mismatches'
    ],
    techStack: ['C++17', 'Object Oriented Programming', 'Binary File I/O', 'Custom Data Structures'],
    learnings: 'Understood deep vs shallow copying, raw pointer memory management, destructor cleanups, and file stream flags (ios::binary, ios::in, ios::out).'
  },
  'hostel-budget': {
    title: 'Arcane Tracker // Student Hostel Budgeting',
    badge: 'Arcane // Hextech Analytics',
    timeline: 'Jan 2026',
    problem: 'Staying in college dorms comes with a fixed monthly allowance that often runs out unexpectedly due to unmonitored canteen snacks and book expenses.',
    solution: 'A dark aesthetic expense tracking web application tailored for college students. Logs daily expenses by Food, Academics, Travel, and Miscellaneous with visual breakdown charts.',
    features: [
      'Visual expense distribution chart using Chart.js',
      'Budget threshold alerts when 80% and 95% of monthly allowance is reached',
      'Export monthly statements to clean formatted CSV files',
      'Dark mode interface optimized for late-night hostel logging'
    ],
    techStack: ['JavaScript', 'Chart.js', 'CSS Variables', 'Blob CSV Generation'],
    learnings: 'Hands-on experience with external charting libraries, CSV data formatting, and designing distraction-free form inputs.'
  },
  'smart-study': {
    title: 'Steins;Study // AI Flashcard & Quiz Generator',
    badge: 'Steins;Gate // AI Active Recall',
    timeline: 'Feb 2026',
    problem: 'Preparing for end-semester examinations requires converting lengthy textbook notes into concise active-recall question cards.',
    solution: 'A prototype web app where students input chapter summaries or lecture transcripts. The tool formats key concepts into flip-able flashcards and quick 4-option quizzes.',
    features: [
      'Generates 5-10 question flashcards from raw study notes',
      'Interactive 3D flip animation for question/answer verification',
      'Timed practice quiz mode with immediate score breakdown',
      'Downloadable revision deck in JSON and printable Markdown'
    ],
    techStack: ['JavaScript', 'REST API Integration', 'CSS 3D Transforms', 'Responsive Design'],
    learnings: 'Learned prompt structuring for clean JSON responses, asynchronous API error handling, and CSS 3D backface visibility.'
  },
  'game-2048': {
    title: 'The Matrix // 2048 Sliding Tile Engine',
    badge: 'Matrix // Heuristic Grid',
    timeline: 'Nov 2025',
    problem: 'Understanding 2D matrix transformations, grid compression, and game state transitions by building a classic tile-merging puzzle from scratch.',
    solution: 'Initially prototyped the matrix shift, slide, and merge mechanics in C++ terminal, then ported the deterministic logic to an accessible browser game supporting touch swipes and keyboard arrow navigation.',
    features: [
      'Clean grid compression algorithms (Left, Right, Up, Down)',
      'High score tracking in localStorage with undo move capability',
      'Touch gesture swipe detection for mobile screens',
      'Animated tile merging with color-coded score scaling'
    ],
    techStack: ['C++ (Prototype)', 'JavaScript (Web)', 'CSS Transitions', 'Touch Events API'],
    learnings: 'Translating algorithmic matrix operations from compiled C++ to web DOM manipulations; handling mobile touch gestures reliably.'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalOpenButtons = document.querySelectorAll('.open-modal-btn');
  const previewButtons = document.querySelectorAll('.preview-action-btn');

  if (!modal || !modalBody) return;

  function openModalForProject(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    
    modalBody.innerHTML = `
      <div class="modal-meta-row" style="margin-bottom: 1rem; display: flex; gap: 0.8rem; flex-wrap: wrap;">
        <span class="timeline-badge badge-active">${data.badge}</span>
        <span class="timeline-badge">${data.timeline}</span>
      </div>

      <h4>Problem Statement</h4>
      <p>${data.problem}</p>

      <h4>Solution &amp; Implementation</h4>
      <p>${data.solution}</p>

      <h4>Key Features</h4>
      <ul>
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h4>Key Engineering Learnings</h4>
      <p>${data.learnings}</p>

      <h4>Tech Stack</h4>
      <div class="tech-stack-pills" style="margin-top: 0.5rem;">
        ${data.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
      </div>

      <div class="modal-actions">
        <a href="https://github.com/devanshsharma" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <span>Source on GitHub</span>
        </a>
        <a href="#contact" class="btn btn-secondary btn-sm" onclick="document.getElementById('project-modal').close()">
          <span>Signal Devansh</span>
        </a>
      </div>
    `;

    modal.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.close();
    document.body.style.overflow = '';
  }

  modalOpenButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      if (projKey) openModalForProject(projKey);
    });
  });

  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      const keys = ['campus-connect', 'sort-vision', 'student-cli', 'hostel-budget', 'smart-study', 'game-2048'];
      const projKey = keys[(parseInt(id, 10) - 1)] || 'campus-connect';
      openModalForProject(projKey);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeModal();
    }
  });

  modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION & HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input, isValid, errorMsgId) {
    const errorEl = document.getElementById(errorMsgId);
    if (!isValid) {
      input.classList.add('is-invalid');
      if (errorEl) errorEl.style.display = 'block';
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorEl) errorEl.style.display = 'none';
      return true;
    }
  }

  nameInput?.addEventListener('input', () => {
    validateField(nameInput, nameInput.value.trim().length >= 2, 'name-error');
  });

  emailInput?.addEventListener('input', () => {
    validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'email-error');
  });

  subjectInput?.addEventListener('change', () => {
    validateField(subjectInput, subjectInput.value !== '', 'subject-error');
  });

  messageInput?.addEventListener('input', () => {
    validateField(messageInput, messageInput.value.trim().length >= 10, 'message-error');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2, 'name-error');
    const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'email-error');
    const isSubjValid = validateField(subjectInput, subjectInput.value !== '', 'subject-error');
    const isMsgValid = validateField(messageInput, messageInput.value.trim().length >= 10, 'message-error');

    if (!isNameValid || !isEmailValid || !isSubjValid || !isMsgValid) {
      showToast('⚠️ Please verify highlighted parameters before transmission.', 'error');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Transmitting signal...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      const senderName = nameInput.value.trim();
      form.reset();

      showToast(`Signal acknowledged, ${senderName}! Devansh will respond shortly ⚡`, 'success');
    }, 1100);
  });
}

/* ==========================================================================
   9. COPY EMAIL TO CLIPBOARD
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-address-text')?.textContent || 'devansh.sharma.cse@example.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText.trim());
      copyBtn.classList.add('copied');
      const tooltip = copyBtn.querySelector('.copy-tooltip');
      if (tooltip) tooltip.textContent = 'COPIED';

      showToast('Frequency address copied: ' + emailText.trim() + ' 📋', 'success');

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        if (tooltip) tooltip.textContent = 'Copy';
      }, 2500);
    } catch {
      showToast('Email: ' + emailText.trim(), 'info');
    }
  });
}

/* ==========================================================================
   10. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   11. CURRENT YEAR IN FOOTER
   ========================================================================== */
function initCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   12. RESUME BUTTON INTERACTION
   ========================================================================== */
function initResumeButton() {
  const resumeBtn = document.getElementById('resume-download-btn');
  if (!resumeBtn) return;

  resumeBtn.addEventListener('click', (e) => {
    showToast('Attach your real resume.pdf into the project root directory!', 'info');
  });
}

/* ==========================================================================
   13. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success' ? '⚡' : type === 'error' ? '❌' : 'ℹ️';

  toast.innerHTML = `
    <span>${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3800);
}
