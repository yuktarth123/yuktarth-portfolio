// ---------- Helpers ----------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function mdBold(str) {
  return escapeHtml(str).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
function nl2br(str) {
  return escapeHtml(str).replace(/\n/g, '<br>');
}

// ---------- Render ----------
function renderHero(c) {
  document.getElementById('heroEyebrow').textContent = c.eyebrow;
  document.getElementById('heroHeadline').innerHTML =
    `${escapeHtml(c.headline)}<br><span class="highlight">${escapeHtml(c.headlineHighlight)}</span>${escapeHtml(c.headlineEnd)}`;
  document.getElementById('heroSubhead').innerHTML = mdBold(c.subhead);
  document.getElementById('heroCtas').innerHTML = `
    <a href="${escapeHtml(c.ctaPrimaryHref)}" class="btn btn-primary">${escapeHtml(c.ctaPrimaryLabel)}</a>
    <a href="${escapeHtml(c.ctaSecondaryHref)}" class="btn btn-ghost">${escapeHtml(c.ctaSecondaryLabel)}</a>
  `;
}

function renderAbout(c) {
  document.getElementById('aboutKicker').textContent = c.kicker;
  document.getElementById('aboutTitle').innerHTML = nl2br(c.title);
  document.getElementById('aboutText').innerHTML = mdBold(c.text);
  document.getElementById('aboutStats').innerHTML = c.stats.map(s => `
    <div class="stat reveal">
      <span class="stat-num" data-count="${s.count}" data-suffix="${escapeHtml(s.suffix)}">0</span>
      <span class="stat-label">${nl2br(s.label)}</span>
    </div>
  `).join('');
}

function renderExperience(exp, impact) {
  document.getElementById('experienceKicker').textContent = exp.kicker;
  document.getElementById('experienceTitle').textContent = exp.title;
  document.getElementById('timeline').innerHTML = exp.roles.map(r => `
    <div class="timeline-item reveal">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="timeline-head">
          <span class="timeline-icon">${r.icon}</span>
          <div>
            <h3>${escapeHtml(r.role)}</h3>
            <p class="timeline-company">${escapeHtml(r.company)}</p>
          </div>
          <span class="timeline-date">${escapeHtml(r.dates)}</span>
        </div>
        <ul class="timeline-list-2col">
          ${r.bullets.map(b => `<li>${mdBold(b)}</li>`).join('')}
        </ul>
        ${r.chips && r.chips.length ? `<div class="feature-chips">${r.chips.map(ch => `<span>${escapeHtml(ch)}</span>`).join('')}</div>` : ''}
      </div>
    </div>
  `).join('');

  document.getElementById('impactTitle').textContent = impact.title;
  document.getElementById('impactSub').textContent = impact.sub;
  document.getElementById('impactCols').innerHTML = impact.columns.map(col => `
    <div class="impact-col">
      <h4>${escapeHtml(col.heading)}</h4>
      <div class="impact-stats">
        ${col.stats.map(s => `<div class="impact-stat"><span>${escapeHtml(s.value)}</span>${escapeHtml(s.label)}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects(sec, recognition, projects) {
  document.getElementById('projectsKicker').textContent = sec.kicker;
  document.getElementById('projectsTitle').textContent = sec.title;
  document.getElementById('projectsIntro').textContent = sec.intro;
  document.getElementById('projectsStatLine').textContent = sec.statLine;
  document.getElementById('projectsSubhead').textContent = sec.subhead;

  document.getElementById('recognition').innerHTML = `
    <div class="recognition-grid">
      <div class="recognition-content">
        <span class="recognition-badge">${escapeHtml(recognition.badge)}</span>
        <h3>${escapeHtml(recognition.title)}</h3>
        <p>${escapeHtml(recognition.text)}</p>
        <p class="recognition-quote">"${escapeHtml(recognition.quote)}"<br><span>${escapeHtml(recognition.quoteAttribution)}</span></p>
        <div class="feature-chips">${recognition.chips.map(ch => `<span>${escapeHtml(ch)}</span>`).join('')}</div>
        <p class="recognition-note">${escapeHtml(recognition.note)}</p>
      </div>
      <a class="recognition-letter" href="${escapeHtml(recognition.letterImage)}" target="_blank" rel="noopener">
        <img src="${escapeHtml(recognition.letterImage)}" alt="Official Letter of Appreciation for VARMS from Col Ankit Misra, Commanding Officer, 330 Field Regiment, dated January 2026" loading="lazy" />
        <span class="recognition-letter-hint">View full letter →</span>
      </a>
    </div>
  `;

  document.getElementById('projectsGrid').innerHTML = projects.map(p => `
    <a class="project-card reveal" href="${escapeHtml(p.url)}" target="_blank" rel="noopener">
      <div class="project-visual">
        <div class="browser-chrome">
          <span></span><span></span><span></span>
          <div class="browser-chrome-url">${escapeHtml(p.browserUrl)}</div>
        </div>
        <img class="project-shot" src="${escapeHtml(p.screenshot)}" alt="${escapeHtml(p.screenshotAlt)}" loading="lazy" />
      </div>
      <div class="project-body">
        <span class="project-tag">${escapeHtml(p.tag)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <div class="feature-chips">${p.chips.map(ch => `<span>${escapeHtml(ch)}</span>`).join('')}</div>
        <p class="project-proof">${escapeHtml(p.proof)}</p>
        <span class="project-link">View live project →</span>
      </div>
    </a>
  `).join('');
}

function renderSkills(sk) {
  document.getElementById('skillsKicker').textContent = sk.kicker;
  document.getElementById('skillsTitle').textContent = sk.title;
  document.getElementById('skillsGrid').innerHTML = sk.clusters.map(cl => `
    <div class="skill-cluster reveal">
      <h3>${escapeHtml(cl.name)}</h3>
      <div class="tags">${cl.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
    </div>
  `).join('');

  const edu = sk.education;
  document.getElementById('education').innerHTML = `
    <h3>${escapeHtml(edu.title)}</h3>
    <div class="edu-row">
      ${edu.items.map(i => `<div><strong>${escapeHtml(i.degree)}</strong><span>${escapeHtml(i.school)}</span></div>`).join('')}
    </div>
    <p class="edu-note">${escapeHtml(edu.note)}</p>
  `;
}

function renderTestimonials(sec, testimonials) {
  document.getElementById('testimonialsKicker').textContent = sec.kicker;
  document.getElementById('testimonialsTitle').textContent = sec.title;
  document.getElementById('testimonialsGrid').innerHTML = testimonials.map(t => `
    <figure class="testimonial-card reveal">
      <blockquote>"${escapeHtml(t.quote)}"</blockquote>
      <figcaption>
        <span class="avatar">${escapeHtml(t.initials)}</span>
        <div>
          <strong>${escapeHtml(t.name)}</strong>
          <span>${escapeHtml(t.role)}</span>
        </div>
      </figcaption>
    </figure>
  `).join('');
}

function renderContact(c) {
  document.getElementById('contactKicker').textContent = c.kicker;
  document.getElementById('contactTitle').textContent = c.title;
  document.getElementById('contactSub').textContent = c.sub;
  document.getElementById('contactLinks').innerHTML = `
    <a class="btn btn-primary" href="mailto:${escapeHtml(c.email)}">Email me</a>
    <a class="btn btn-ghost" href="${escapeHtml(c.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>
    <a class="btn btn-ghost" href="#" id="resumeBtn">Download Resume</a>
  `;
}

function renderFooter(f) {
  document.getElementById('footerName').textContent = f.name;
  document.getElementById('footerTagline').textContent = f.tagline;
}

// ---------- Interactions (run after render) ----------
function initInteractions() {
  // Theme toggle
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Sticky nav background + active link
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  // Reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  function sweepMissedReveals() {
    revealEls.forEach(el => {
      if (el.classList.contains('in-view')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('in-view');
        revealObserver.unobserve(el);
      }
    });
  }
  window.addEventListener('scroll', sweepMissedReveals, { passive: true });

  // Animated stat counters
  const statEls = document.querySelectorAll('.stat-num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => statObserver.observe(el));

  // Resume button placeholder
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Attach your resume PDF here: replace the #resumeBtn link in index.html with a path to your file.');
    });
  }
}

// ---------- Boot ----------
fetch('content.json')
  .then(res => res.json())
  .then(content => {
    document.title = content.site.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', content.site.description);
    document.getElementById('navCta').textContent = content.nav.ctaLabel;

    renderHero(content.hero);
    renderAbout(content.about);
    renderExperience(content.experience, content.impact);
    renderProjects(content.projectsSection, content.recognition, content.projects);
    renderSkills(content.skills);
    renderTestimonials(content.testimonialsSection, content.testimonials);
    renderContact(content.contact);
    renderFooter(content.footer);

    initInteractions();
  })
  .catch(err => {
    console.error('Failed to load content.json', err);
  });
