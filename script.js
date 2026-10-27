// =========================================================
// DILIP KUMAR SHARMA — AI SYSTEMS & CIVICTECH ARCHITECT
// EXECUTIVE PORTFOLIO ENGINE
// Features:
// 1. Subtle Bio-Flame & Ember Cursor Engine (Canvas)
// 2. Global Coding Bits Matrix Rain Canvas
// 3. Cyber Matrix Binary Canvas in Skills Section
// 4. AI Executive Voice Engine (Web Speech API)
// 5. Typewriter Effect
// 6. Interactive Project Filters & Neon Skills Category Switcher
// 7. Stat Numbers Counter with Scroll Intersection
// 8. Mobile Menu, Smooth Scrollspy & Interactive Contact
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // =======================================================
  // 1. LIGHTWEIGHT SUBTLE FIRE EMBER CURSOR ENGINE ("Halka Fire")
  // =======================================================
  const canvas = document.getElementById('fireTrailCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    let mouse = { x: width / 2, y: height / 2, lastX: width / 2, lastY: height / 2 };

    // Authentic flame spark embers (Warm gold, amber, fire orange, cyber cyan & emerald)
    const flameColors = [
      '#f59e0b', // Amber / Gold
      '#fbbf24', // Warm Flame
      '#f97316', // Orange Fire
      '#10b981', // CleanConnect Emerald
      '#06b6d4', // Cyber Cyan
      '#ef4444'  // Deep Ember
    ];

    class FlameSparkParticle {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 6;
        this.y = y + (Math.random() - 0.5) * 6;
        
        this.vx = (Math.random() - 0.5) * 0.9;
        this.vy = -(Math.random() * 1.5 + 0.6); // Soft buoyant upward rise
        
        this.size = Math.random() * 2.8 + 1.6; // Small, delicate spark (2-4px)
        this.initialSize = this.size;
        this.life = 0;
        this.maxLife = Math.random() * 22 + 16; // Quick, graceful fade
        this.color = flameColors[Math.floor(Math.random() * flameColors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy -= 0.02; // gentle float upward
        this.vx *= 0.96;
        
        this.life++;
        const progress = this.life / this.maxLife;
        this.size = this.initialSize * (1 - progress);
        
        return this.life < this.maxLife && this.size > 0.2;
      }

      draw() {
        const progress = this.life / this.maxLife;
        const alpha = Math.max(0, 1 - progress);
        
        ctx.save();
        ctx.globalAlpha = alpha * 0.88;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function emitFlameSpark(x, y, count = 1) {
      const maxParticles = window.innerWidth < 768 ? 20 : 48;
      for (let i = 0; i < count; i++) {
        if (particles.length < maxParticles) {
          particles.push(new FlameSparkParticle(x, y));
        }
      }
    }

    // Smooth, throttled mouse tracking
    window.addEventListener('mousemove', (e) => {
      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 7) {
        emitFlameSpark(e.clientX, e.clientY, 1);
        mouse.lastX = e.clientX;
        mouse.lastY = e.clientY;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    let lastTouchEmit = 0;
    window.addEventListener('touchmove', (e) => {
      const now = performance.now();
      if (now - lastTouchEmit > 40 && e.touches.length > 0) {
        lastTouchEmit = now;
        emitFlameSpark(e.touches[0].clientX, e.touches[0].clientY, 1);
      }
    }, { passive: true });

    function renderFlameCursor() {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const alive = particles[i].update();
        if (alive) {
          particles[i].draw();
        } else {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(renderFlameCursor);
    }
    renderFlameCursor();
  }


  // =======================================================
  // 2. 3D CARD TILT & PROFILE AURA ENGINE
  // =======================================================
  const profileCard = document.getElementById('profileCard');
  if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;
      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    profileCard.addEventListener('mouseleave', () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }


  // =======================================================
  // 3. AI EXECUTIVE VOICE BRIEFING ENGINE (Web Speech API)
  // =======================================================
  const voiceTriggerBtn = document.getElementById('voiceTriggerBtn');
  const voicePlayBtn = document.getElementById('voicePlayBtn');
  const voiceCard = document.getElementById('voiceCard');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const voiceStatusText = document.getElementById('voiceStatusText');
  const voiceWaveIndicator = document.getElementById('voiceWaveIndicator');
  const dialectBtns = document.querySelectorAll('.dialect-pill');

  let selectedAccent = 'indian';
  let isSpeaking = false;
  let speechUtterance = null;

  const executiveSpeechText = "Namaste! I am Dilip Kumar Sharma, AI Systems Developer and Full-Stack Architect from Gorakhpur, Uttar Pradesh. Currently pursuing BCA at ITM GIDA Gorakhpur, I engineer production-grade civic intelligence platforms like CleanConnect AI, featuring Google Gemini Vision, automated SSIM verification, and zero-cost cloud microservices. Welcome to my official executive space.";

  function getBestVoice(accent) {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    if (accent === 'indian') {
      const inVoice = voices.find(v => (v.lang === 'en-IN' || v.name.includes('India')) && !v.name.toLowerCase().includes('female') && !v.name.toLowerCase().includes('zira') && !v.name.toLowerCase().includes('heera'));
      if (inVoice) return inVoice;
      const fallbackIn = voices.find(v => v.lang === 'en-IN');
      if (fallbackIn) return fallbackIn;
    } else if (accent === 'uk') {
      const ukVoice = voices.find(v => (v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('George')) && !v.name.toLowerCase().includes('female'));
      if (ukVoice) return ukVoice;
    } else {
      const usVoice = voices.find(v => (v.lang === 'en-US' || v.name.includes('David') || v.name.includes('Guy')) && !v.name.toLowerCase().includes('female') && !v.name.toLowerCase().includes('zira'));
      if (usVoice) return usVoice;
    }

    return voices.find(v => v.lang.startsWith('en')) || voices[0];
  }

  function setVoiceUIState(speaking) {
    isSpeaking = speaking;
    if (speaking) {
      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
      if (voiceWaveIndicator) voiceWaveIndicator.classList.add('active');
      if (voiceStatusText) voiceStatusText.textContent = "Transmitting Dilip's AI executive statement...";
      if (voiceTriggerBtn) voiceTriggerBtn.classList.add('playing');
    } else {
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
      if (voiceWaveIndicator) voiceWaveIndicator.classList.remove('active');
      if (voiceStatusText) voiceStatusText.textContent = "Tap play to listen to Dilip's official statement";
      if (voiceTriggerBtn) voiceTriggerBtn.classList.remove('playing');
    }
  }

  function playExecutiveSpeech() {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setVoiceUIState(false);
      return;
    }

    window.speechSynthesis.cancel();

    speechUtterance = new SpeechSynthesisUtterance(executiveSpeechText);
    const chosenVoice = getBestVoice(selectedAccent);
    if (chosenVoice) speechUtterance.voice = chosenVoice;

    speechUtterance.rate = 0.95;
    speechUtterance.pitch = 0.98;

    speechUtterance.onstart = () => setVoiceUIState(true);
    speechUtterance.onend = () => setVoiceUIState(false);
    speechUtterance.onerror = () => setVoiceUIState(false);

    window.speechSynthesis.speak(speechUtterance);
  }

  if (voicePlayBtn) {
    voicePlayBtn.addEventListener('click', playExecutiveSpeech);
  }

  if (voiceTriggerBtn) {
    voiceTriggerBtn.addEventListener('click', () => {
      if (voiceCard) {
        voiceCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        voiceCard.style.boxShadow = '0 0 35px rgba(16, 185, 129, 0.6)';
        setTimeout(() => {
          voiceCard.style.boxShadow = '';
        }, 1500);
      }
      playExecutiveSpeech();
    });
  }

  if (dialectBtns.length) {
    dialectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dialectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAccent = btn.getAttribute('data-accent') || 'indian';
        if (isSpeaking) {
          playExecutiveSpeech(); // restart with new voice
        }
      });
    });
  }


  // =======================================================
  // 4. TYPEWRITER EFFECT
  // =======================================================
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const phrases = [
      "AI Systems Architect & CivicTech Pioneer",
      "Lead Architect — CleanConnect AI (EcoTrack)",
      "FastAPI Microservices & Multimodal Vision",
      "BCA Scholar @ ITM GIDA, Gorakhpur",
      "Zero-Cost Cloud Architect ($0 Vercel & Render)"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function tickTypewriter() {
      const current = phrases[phraseIdx];

      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 35;
      } else {
        typewriterEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 75;
      }

      if (!isDeleting && charIdx === current.length) {
        typeSpeed = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(tickTypewriter, typeSpeed);
    }
    tickTypewriter();
  }


  // =======================================================
  // 5. NAVBAR SCROLL & SCROLLSPY
  // =======================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    let current = '';
    const scrollPos = window.scrollY + 180;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });


  // =======================================================
  // 6. MOBILE MENU TOGGLE
  // =======================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }


  // =======================================================
  // 7. PROJECT / VENTURE FILTER
  // =======================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          if (filterVal === 'all' || categories.includes(filterVal)) {
            card.style.display = '';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }


  // =======================================================
  // 8. NEON SKILLS CATEGORY TAB SWITCHER
  // =======================================================
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.neon-skill-card');
  const skillsDeck = document.getElementById('skillsDeck');

  if (skillTabs.length && skillCards.length) {
    skillTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = tab.getAttribute('data-target');

        skillTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        if (target === 'all') {
          if (skillsDeck) skillsDeck.classList.add('show-all');
          skillCards.forEach(c => c.classList.add('active'));
        } else {
          if (skillsDeck) skillsDeck.classList.remove('show-all');
          skillCards.forEach(c => {
            if (c.getAttribute('data-category') === target) {
              c.classList.add('active');
            } else {
              c.classList.remove('active');
            }
          });
        }
      });
    });
  }


  // =======================================================
  // 9. STAT COUNTER ANIMATION
  // =======================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach((stat) => {
          const target = parseFloat(stat.getAttribute('data-target')) || 0;
          let current = 0;
          const isDecimal = target % 1 !== 0;
          const increment = isDecimal ? target / 35 : Math.max(1, Math.ceil(target / 40));

          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = isDecimal ? target.toFixed(1) : target;
              clearInterval(interval);
            } else {
              stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.4 });

  const statBar = document.querySelector('.stat-bar');
  if (statBar) {
    countObserver.observe(statBar);
  }


  // =======================================================
  // 10. GLOBAL MATRIX RAIN CANVAS (0, 1 Moving Streams)
  // =======================================================
  function initGlobalMatrixRain() {
    const canvas = document.getElementById('globalCodeMatrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    const bits = ['0', '1', '0', '1', '1', '0', '01', '10', '{', '}', '<', '>', '/', '?', '0', '1'];
    let columns = [];

    function initCols() {
      const isMobile = width < 768;
      const colSpacing = isMobile ? 42 : 28;
      const count = Math.floor(width / colSpacing);
      columns = [];
      for (let i = 0; i < count; i++) {
        columns.push({
          x: i * colSpacing + (isMobile ? 14 : 10),
          y: Math.random() * height,
          speed: 1.1 + Math.random() * 1.4,
          len: Math.floor((isMobile ? 6 : 8) + Math.random() * (isMobile ? 8 : 10)),
          chars: []
        });
      }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initCols();
      }, 120);
    }, { passive: true });
    initCols();

    let last = 0;
    function renderGlobal(now) {
      requestAnimationFrame(renderGlobal);
      const minInterval = window.innerWidth < 768 ? 36 : 28;
      if (now - last < minInterval) return;
      last = now;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${fontSize}px 'JetBrains Mono', Consolas, monospace`;

      const len = columns.length;
      for (let i = 0; i < len; i++) {
        const col = columns[i];
        col.y += col.speed;
        if (col.y > height + col.len * fontSize) {
          col.y = 0;
          col.speed = 1.1 + Math.random() * 1.4;
        }

        for (let j = 0; j < col.len; j++) {
          const cy = col.y - j * fontSize;
          if (cy < 0 || cy > height) continue;
          const fade = 1 - j / col.len;

          if (j === 0) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 6;
          } else {
            ctx.fillStyle = `rgba(0, 255, 136, ${fade * 0.38})`;
            ctx.shadowBlur = 0;
          }

          if (Math.random() < 0.05 || !col.chars[j]) {
            col.chars[j] = bits[Math.floor(Math.random() * bits.length)];
          }
          ctx.fillText(col.chars[j], col.x, cy);
        }
      }
    }
    requestAnimationFrame(renderGlobal);
  }
  initGlobalMatrixRain();


  // =======================================================
  // 11. SKILLS BINARY STREAM CANVAS
  // =======================================================
  function initSkillsBinaryCanvas() {
    const canvas = document.getElementById('skillsBinaryCanvas');
    const section = document.getElementById('skills');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let columns = [];
    const fontSize = 15;
    const bits = ['0', '1', '0', '1', '1', '0', '0', '1', '{', '}', '<', '>', '/', '?', '01', '10', '0', '1'];

    function resize() {
      const rect = section.getBoundingClientRect();
      width = canvas.width = section.clientWidth || rect.width || window.innerWidth;
      height = canvas.height = section.clientHeight || rect.height || 620;
      const isMobile = width < 768;
      const colSpacing = isMobile ? 32 : 22;
      const count = Math.floor(width / colSpacing);
      columns = [];
      for (let i = 0; i < count; i++) {
        columns.push({
          x: i * colSpacing + (isMobile ? 12 : 8),
          y: Math.random() * height,
          speed: 1.2 + Math.random() * 1.6,
          len: Math.floor(8 + Math.random() * 12),
          chars: []
        });
      }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }, { passive: true });
    resize();

    let lastTime = 0;
    function renderSkills(now) {
      requestAnimationFrame(renderSkills);
      if (now - lastTime < 30) return;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${fontSize}px 'JetBrains Mono', Consolas, monospace`;

      const len = columns.length;
      for (let i = 0; i < len; i++) {
        const col = columns[i];
        col.y += col.speed;
        if (col.y > height + col.len * fontSize) {
          col.y = 0;
          col.speed = 1.2 + Math.random() * 1.6;
        }

        for (let j = 0; j < col.len; j++) {
          const cy = col.y - j * fontSize;
          if (cy < 0 || cy > height) continue;
          const fade = 1 - j / col.len;

          if (j === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00d2ff';
            ctx.shadowBlur = 6;
          } else {
            ctx.fillStyle = `rgba(0, 210, 255, ${fade * 0.45})`;
            ctx.shadowBlur = 0;
          }

          if (Math.random() < 0.04 || !col.chars[j]) {
            col.chars[j] = bits[Math.floor(Math.random() * bits.length)];
          }
          ctx.fillText(col.chars[j], col.x, cy);
        }
      }
    }
    requestAnimationFrame(renderSkills);
  }
  initSkillsBinaryCanvas();


  // =======================================================
  // 12. TOAST NOTIFICATION SYSTEM
  // =======================================================
  const toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
  window.showToast = showToast;


  // =======================================================
  // 13. EXECUTIVE CONTACT FORM
  // =======================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName')?.value || 'Guest';
      const email = document.getElementById('senderEmail')?.value || '';
      const subject = document.getElementById('senderSubject')?.value || 'Collaboration Inquiry';
      const message = document.getElementById('senderMessage')?.value || '';

      const mailtoUrl = `mailto:digitalminddilip0906@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Executive Transmission to Dilip Kumar Sharma:\n\nSender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.open(mailtoUrl, '_blank');
      showToast(`Opening transmission to digitalminddilip0906@gmail.com...`);
      contactForm.reset();
    });
  }


  // =======================================================
  // 14. BACK TO TOP BUTTON
  // =======================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
