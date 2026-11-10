/**
 * ==============================================================================
 * Cognifyz Technologies - Web Development Internship (Level 3 Showcase)
 * Pure Vanilla JavaScript (Clean, Modern, Modular & Beginner Friendly)
 * ==============================================================================
 * 
 * Features:
 *  1. Mobile Navigation & Sticky Header
 *  2. Active Section Highlighting on Scroll
 *  3. Automatic Image Slideshow (Task 1 - Image Manipulation)
 *  4. Interactive Image Gallery & Lightbox Modal (Task 1 - Image Manipulation)
 *  5. Interactive Readiness Checker (Task 2 - Qualifications)
 *  6. Internship Application Form Validation (Task 2 - Landing Page CTA)
 *  7. Smooth Scrolling & Back to Top Controller
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================================
  // 1. STICKY HEADER & MOBILE NAVIGATION DRAWER
  // ============================================================================
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  // Handle sticky header shadow on scroll
  const handleScrollHeader = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Toggle mobile navigation
  const toggleMobileMenu = () => {
    const isOpen = mainNav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    mobileBackdrop.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    mainNav.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileBackdrop.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close mobile drawer when a navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // ============================================================================
  // 2. ACTIVE NAVIGATION LINK ON SCROLL
  // ============================================================================
  const sections = document.querySelectorAll('section[id], footer[id]');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ============================================================================
  // 3. TASK 1: AUTOMATIC IMAGE SLIDESHOW
  // ============================================================================
  const slides = document.querySelectorAll('.slide-item');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playPauseText = document.getElementById('playPauseText');
  const pauseIcon = document.getElementById('pauseIcon');
  const playIcon = document.getElementById('playIcon');
  const dotBtns = document.querySelectorAll('.dot-btn');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const slideshowWrapper = document.getElementById('slideshowWrapper');
  const slideshowProgressBar = document.getElementById('slideshowProgressBar');

  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  const slideDuration = 4500; // 4.5 seconds per slide
  let slideTimer = null;
  let progressInterval = null;
  let progressStartTime = 0;
  let isAutoPlaying = true;
  let isHovered = false;

  // Render the selected slide
  const showSlide = (index) => {
    // Wrap around boundaries
    if (index >= totalSlides) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = totalSlides - 1;
    } else {
      currentSlideIndex = index;
    }

    // Update slide classes
    slides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update dot buttons
    dotBtns.forEach((dot, i) => {
      const isActive = i === currentSlideIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });

    // Update numerical counter display
    if (currentSlideNum) {
      currentSlideNum.textContent = String(currentSlideIndex + 1);
    }

    // Reset and restart the progress bar
    resetProgressBar();
  };

  // Next / Previous navigation actions
  const nextSlide = () => {
    showSlide(currentSlideIndex + 1);
  };

  const prevSlide = () => {
    showSlide(currentSlideIndex - 1);
  };

  // Progress bar animation
  const resetProgressBar = () => {
    if (progressInterval) clearInterval(progressInterval);
    if (!slideshowProgressBar) return;

    if (!isAutoPlaying || isHovered) {
      slideshowProgressBar.style.width = '0%';
      return;
    }

    slideshowProgressBar.style.width = '0%';
    progressStartTime = Date.now();

    progressInterval = setInterval(() => {
      const elapsed = Date.now() - progressStartTime;
      const percentage = Math.min((elapsed / slideDuration) * 100, 100);
      slideshowProgressBar.style.width = `${percentage}%`;

      if (elapsed >= slideDuration) {
        clearInterval(progressInterval);
      }
    }, 50);
  };

  // Start automatic timer
  const startSlideshow = () => {
    stopSlideshow();
    if (!isAutoPlaying || isHovered) return;

    resetProgressBar();
    slideTimer = setInterval(() => {
      nextSlide();
    }, slideDuration);
  };

  // Stop automatic timer
  const stopSlideshow = () => {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  };

  // Play / Pause toggle
  const togglePlayPause = () => {
    isAutoPlaying = !isAutoPlaying;

    if (isAutoPlaying) {
      playPauseText.textContent = 'Pause Auto';
      pauseIcon.classList.remove('hidden');
      playIcon.classList.add('hidden');
      playPauseBtn.setAttribute('aria-label', 'Pause Slideshow');
      startSlideshow();
    } else {
      playPauseText.textContent = 'Play Auto';
      pauseIcon.classList.add('hidden');
      playIcon.classList.remove('hidden');
      playPauseBtn.setAttribute('aria-label', 'Play Slideshow');
      stopSlideshow();
      if (slideshowProgressBar) slideshowProgressBar.style.width = '0%';
    }
  };

  // Event Listeners for Slideshow Controls
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      nextSlide();
      if (isAutoPlaying) startSlideshow();
    });
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      prevSlide();
      if (isAutoPlaying) startSlideshow();
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }

  // Dots direct selection
  dotBtns.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
      if (!isNaN(targetIndex)) {
        showSlide(targetIndex);
        if (isAutoPlaying) startSlideshow();
      }
    });
  });

  // Pause on hover for enhanced user convenience
  if (slideshowWrapper) {
    slideshowWrapper.addEventListener('mouseenter', () => {
      isHovered = true;
      stopSlideshow();
      if (slideshowProgressBar) slideshowProgressBar.style.width = '0%';
    });

    slideshowWrapper.addEventListener('mouseleave', () => {
      isHovered = false;
      if (isAutoPlaying) {
        startSlideshow();
      }
    });
  }

  // Initialize Slideshow
  showSlide(0);
  startSlideshow();

  // ============================================================================
  // 4. TASK 1: INTERACTIVE IMAGE GALLERY & LIGHTBOX ENLARGEMENT
  // ============================================================================
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Lightbox Modal Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxSpinner = document.getElementById('lightboxSpinner');
  const lightboxBadge = document.getElementById('lightboxBadge');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');

  // Complete data repository for gallery items
  const galleryData = [
    {
      index: 0,
      src: 'assets/images/gallery/web-design.jpg',
      category: 'Web Design',
      categoryKey: 'web-design',
      title: 'Responsive Web Design',
      desc: 'Crafting responsive user interfaces with semantic HTML5 and modern CSS3. Features fluid typography, CSS variables, and layout flexibility across desktop, tablet, and mobile screens.',
      tech: 'HTML5 • CSS3'
    },
    {
      index: 1,
      src: 'assets/images/gallery/frontend-code.jpg',
      category: 'Development',
      categoryKey: 'code',
      title: 'Frontend Architecture & DOM',
      desc: 'Writing clean, maintainable vanilla JavaScript. Implementing dynamic event listeners, smooth animations, modular functions, and robust client-side validation without heavy external libraries.',
      tech: 'Vanilla JavaScript'
    },
    {
      index: 2,
      src: 'assets/images/gallery/ui-ux-design.jpg',
      category: 'Mobile & UI/UX',
      categoryKey: 'mobile',
      title: 'User Experience & Wireframing',
      desc: 'Designing user-centered web journeys through structured wireframes, accessible color contrasts, clear visual hierarchy, and intuitive interactive feedback states.',
      tech: 'UI/UX • CSS Grid'
    },
    {
      index: 3,
      src: 'assets/images/gallery/team-collaboration.jpg',
      category: 'Development',
      categoryKey: 'code',
      title: 'Collaborative Engineering',
      desc: 'Mastering professional software workflows, code documentation, peer code reviews, and Git version control through the guided Cognifyz internship levels.',
      tech: 'Teamwork • Mentorship'
    },
    {
      index: 4,
      src: 'assets/images/gallery/mobile-dev.jpg',
      category: 'Mobile & UI/UX',
      categoryKey: 'mobile',
      title: 'Mobile-First Adaptability',
      desc: 'Ensuring fast load times, finger-friendly touch targets, and responsive media queries so web applications deliver an exceptional mobile experience everywhere.',
      tech: 'Media Queries • Flexbox'
    },
    {
      index: 5,
      src: 'assets/images/gallery/cloud-tech.jpg',
      category: 'Web Design',
      categoryKey: 'web-design',
      title: 'Cloud Deployment & Hosting',
      desc: 'Deploying static web projects to public cloud hosts such as GitHub Pages and Netlify, making student projects immediately shareable on resumes and LinkedIn.',
      tech: 'Git • CI/CD Hosting'
    }
  ];

  let currentLightboxIndex = 0;
  let activeFilteredData = [...galleryData];

  // Open Lightbox with specified index in filtered set
  const openLightbox = (filteredIndex) => {
    if (filteredIndex < 0 || filteredIndex >= activeFilteredData.length) return;

    currentLightboxIndex = filteredIndex;
    const item = activeFilteredData[currentLightboxIndex];

    // Show loading spinner while image renders
    lightboxSpinner.classList.add('visible');
    lightboxImg.style.opacity = '0';

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;

    lightboxImg.onload = () => {
      lightboxSpinner.classList.remove('visible');
      lightboxImg.style.opacity = '1';
    };

    lightboxImg.onerror = () => {
      lightboxSpinner.classList.remove('visible');
      lightboxImg.style.opacity = '1';
    };

    // Update metadata content
    lightboxBadge.textContent = item.category;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lightboxCounter.textContent = `Image ${currentLightboxIndex + 1} of ${activeFilteredData.length}`;

    // Open modal & prevent background scroll
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    lightboxClose.focus();
  };

  // Close Lightbox
  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Navigate inside Lightbox
  const showNextLightboxImage = () => {
    let nextIdx = currentLightboxIndex + 1;
    if (nextIdx >= activeFilteredData.length) nextIdx = 0;
    openLightbox(nextIdx);
  };

  const showPrevLightboxImage = () => {
    let prevIdx = currentLightboxIndex - 1;
    if (prevIdx < 0) prevIdx = activeFilteredData.length - 1;
    openLightbox(prevIdx);
  };

  // Attach click listeners to gallery cards and thumbnail wrappers
  galleryCards.forEach(card => {
    const rawIndex = parseInt(card.getAttribute('data-gallery-index'), 10);
    
    // Clicking anywhere on card thumbnail wrapper enlarges the image
    const thumbWrapper = card.querySelector('.thumbnail-wrapper');
    if (thumbWrapper) {
      thumbWrapper.addEventListener('click', () => {
        // Find index in current activeFilteredData
        const targetFilteredIdx = activeFilteredData.findIndex(item => item.index === rawIndex);
        if (targetFilteredIdx !== -1) {
          openLightbox(targetFilteredIdx);
        } else {
          // If filtered out, open directly from master list
          activeFilteredData = [...galleryData];
          openLightbox(rawIndex);
        }
      });
    }
  });

  // Lightbox controls listeners
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextLightboxImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightboxImage);

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextLightboxImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevLightboxImage();
    }
  });

  // Gallery Category Filter Tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter');

      // Update filtered dataset for Lightbox
      if (filterVal === 'all') {
        activeFilteredData = [...galleryData];
      } else {
        activeFilteredData = galleryData.filter(item => item.categoryKey === filterVal);
      }

      // Filter gallery cards in DOM
      galleryCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ============================================================================
  // 5. INTERACTIVE QUALIFICATIONS READINESS CHECKER
  // ============================================================================
  const readinessCheckboxes = document.querySelectorAll('.readiness-check');
  const gaugeScore = document.getElementById('gaugeScore');
  const gaugeStatus = document.getElementById('gaugeStatus');

  const updateReadinessGauge = () => {
    let totalScore = 0;
    readinessCheckboxes.forEach(cb => {
      if (cb.checked) {
        totalScore += parseInt(cb.getAttribute('data-score') || '25', 10);
      }
    });

    if (gaugeScore) gaugeScore.textContent = `${totalScore}%`;

    if (gaugeStatus) {
      if (totalScore === 100) {
        gaugeStatus.textContent = 'Fully Ready to Apply!';
        gaugeStatus.style.color = '#10b981';
      } else if (totalScore >= 75) {
        gaugeStatus.textContent = 'Great Foundation!';
        gaugeStatus.style.color = '#00d2ff';
      } else if (totalScore >= 50) {
        gaugeStatus.textContent = 'Good Start - Keep Learning!';
        gaugeStatus.style.color = '#fbbf24';
      } else {
        gaugeStatus.textContent = 'Explore Foundations & Join!';
        gaugeStatus.style.color = '#f87171';
      }
    }
  };

  readinessCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateReadinessGauge);
  });

  // ============================================================================
  // 6. TASK 2: APPLICATION FORM VALIDATION & CONFIRMATION
  // ============================================================================
  const internshipForm = document.getElementById('internshipForm');
  const formSuccessBox = document.getElementById('formSuccessBox');
  const successApplicantName = document.getElementById('successApplicantName');
  const appRefCode = document.getElementById('appRefCode');
  const resetFormBtn = document.getElementById('resetFormBtn');
  const submitBtn = document.getElementById('submitBtn');

  // Input fields
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const collegeInput = document.getElementById('college');
  const statementInput = document.getElementById('statement');
  const agreementInput = document.getElementById('agreement');

  // Error indicators
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const collegeError = document.getElementById('collegeError');
  const statementError = document.getElementById('statementError');
  const agreeError = document.getElementById('agreeError');

  // Email validation helper
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Form submission handler
  if (internshipForm) {
    internshipForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Full Name Validation
      if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 2) {
        fullNameInput.classList.add('error');
        nameError.classList.add('visible');
        isValid = false;
      } else {
        fullNameInput.classList.remove('error');
        nameError.classList.remove('visible');
      }

      // Email Validation
      if (!isValidEmail(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailInput.classList.remove('error');
        emailError.classList.remove('visible');
      }

      // Phone Validation
      const phoneVal = phoneInput.value.trim();
      if (!phoneVal || phoneVal.replace(/[^0-9]/g, '').length < 8) {
        phoneInput.classList.add('error');
        phoneError.classList.add('visible');
        isValid = false;
      } else {
        phoneInput.classList.remove('error');
        phoneError.classList.remove('visible');
      }

      // College Validation
      if (!collegeInput.value.trim()) {
        collegeInput.classList.add('error');
        collegeError.classList.add('visible');
        isValid = false;
      } else {
        collegeInput.classList.remove('error');
        collegeError.classList.remove('visible');
      }

      // Statement Validation (min 20 chars)
      if (!statementInput.value.trim() || statementInput.value.trim().length < 20) {
        statementInput.classList.add('error');
        statementError.classList.add('visible');
        isValid = false;
      } else {
        statementInput.classList.remove('error');
        statementError.classList.remove('visible');
      }

      // Agreement Checkbox Validation
      if (!agreementInput.checked) {
        agreeError.classList.add('visible');
        isValid = false;
      } else {
        agreeError.classList.remove('visible');
      }

      // If form is valid, simulate successful processing
      if (isValid) {
        // Button loading state
        submitBtn.disabled = true;
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <span>Submitting Application...</span>
          <div class="lightbox-spinner visible" style="width:20px;height:20px;border-width:2px;display:inline-block;position:static;margin-left:8px;"></div>
        `;

        setTimeout(() => {
          // Generate unique reference ID
          const randomCode = Math.floor(1000 + Math.random() * 9000);
          const generatedRef = `COG-WEB-2026-${randomCode}`;

          successApplicantName.textContent = fullNameInput.value.trim();
          appRefCode.textContent = generatedRef;

          // Hide form and display confirmation box
          internshipForm.classList.add('hidden');
          formSuccessBox.classList.remove('hidden');

          // Reset button state
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;

          // Scroll into view
          formSuccessBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 900);
      }
    });

    // Reset button to allow another submission
    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        internshipForm.reset();
        formSuccessBox.classList.add('hidden');
        internshipForm.classList.remove('hidden');
        internshipForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // Clear error on input focus / change
    [fullNameInput, emailInput, phoneInput, collegeInput, statementInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('error');
        });
      }
    });

    if (agreementInput) {
      agreementInput.addEventListener('change', () => {
        agreeError.classList.remove('visible');
      });
    }
  }

  // ============================================================================
  // 7. BACK TO TOP BUTTON
  // ============================================================================
  const backToTop = document.getElementById('backToTop');

  const handleBackToTopVisibility = () => {
    if (window.scrollY > 350) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Log successful initialization for developer verification
  console.log('Cognifyz Technologies - Level 3 Showcase Initialized Successfully!');
});
