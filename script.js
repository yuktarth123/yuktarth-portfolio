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
function mdRich(str) {
  return escapeHtml(str)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
function nl2br(str) {
  return escapeHtml(str).replace(/\n/g, '<br>');
}

// ---------- Render ----------
function renderHero(c) {
  document.getElementById('heroEyebrow').textContent = c.eyebrow;
  document.getElementById('heroName').innerHTML =
    `<span class="name-first">${escapeHtml(c.nameFirst)}</span><span class="name-last">${escapeHtml(c.nameLast)}</span>`;
  document.getElementById('heroPositioning').innerHTML = mdRich(c.positioning);
  document.getElementById('heroTagline').innerHTML = mdRich(c.tagline);
  document.getElementById('heroStatus').innerHTML =
    `<span class="status-dot"></span>${escapeHtml(c.statusChip)}`;
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

const CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

function renderRoleScene(r) {
  if (r.company === 'ConveGenius' && r.role === 'Product Manager') {
    return `
      <div class="clms-panel">
        <div class="clms-header">Add Question</div>
        <div class="clms-body">
          <div class="clms-field clms-field-1">
            <span class="clms-label">Question Format</span>
            <span class="clms-value">Fill in the blanks</span>
          </div>
          <div class="clms-field clms-field-2">
            <span class="clms-label">Skill Code</span>
            <span class="clms-value">SCI-204</span>
          </div>
          <div class="clms-stem">
            <span class="clms-label">Question stem</span>
            <p class="clms-stem-text">The chemical symbol for water is ___.</p>
          </div>
          <button class="clms-preview-btn">Preview Question</button>
        </div>
      </div>
    `;
  }
  if (r.company === 'ConveGenius' && r.role === 'Product Associate, SwiftChat') {
    return `
      <div class="phone">
        <div class="phone-notch"></div>
        <div class="phone-screen">
          <div class="greet">
            <div class="avatar-dot"></div>
            <span class="greet-text">Hi Aanya! Ready for today's quiz?</span>
          </div>
          <div class="quiz-card">
            <span class="quiz-q">Which planet is closest to the Sun?</span>
            <div class="quiz-opt">Earth</div>
            <div class="quiz-opt correct">Mercury<span class="check-pop">${CHECK_ICON}</span></div>
          </div>
        </div>
      </div>
    `;
  }
  if (r.company === 'SBI Card') {
    return `
      <div class="ila-panel">
        <div class="ila-header"><span class="ila-badge">ASK ILA</span></div>
        <div class="ila-banner"><div class="ila-avatar"></div></div>
        <div class="ila-body">
          <div class="ila-greet">
            <p class="ila-greet-text">Hello! I am ILA, your SBI Card assistant.</p>
            <span class="ila-time">10:04 PM</span>
          </div>
          <div class="ila-actions">
            <span class="ila-pill ila-action-1">Login</span>
            <span class="ila-pill ila-action-2">Statement</span>
            <span class="ila-pill ila-pill-filled ila-action-3">Bill Pay &amp; Recharge<span class="check-pop">${CHECK_ICON}</span></span>
          </div>
        </div>
      </div>
    `;
  }
  return '';
}

function renderExperience(exp, impact) {
  document.getElementById('experienceKicker').textContent = exp.kicker;
  document.getElementById('experienceTitle').textContent = exp.title;
  document.getElementById('roles').innerHTML = exp.roles.map(r => {
    const scene = renderRoleScene(r);
    return `
    <div class="role-card reveal">
      <div class="role-content">
        <div class="role-head">
          <div>
            <h3>${escapeHtml(r.role)}</h3>
            <p class="role-company">${escapeHtml(r.company)}</p>
          </div>
          <span class="role-date">${escapeHtml(r.dates)}</span>
        </div>
        <p class="role-summary">${mdBold(r.summary)}</p>
        ${r.chips && r.chips.length ? `<div class="feature-chips">${r.chips.map(ch => `<span>${escapeHtml(ch)}</span>`).join('')}</div>` : ''}
        <details class="role-details">
          <summary>Show details</summary>
          <ul class="role-bullets">
            ${r.bullets.map(b => `<li>${mdBold(b)}</li>`).join('')}
          </ul>
        </details>
      </div>
      ${scene ? `<div class="role-scene">${scene}</div>` : ''}
    </div>
  `;
  }).join('');

  document.getElementById('impactTitle').textContent = impact.title;
  document.getElementById('impactSub').textContent = impact.sub;
  document.getElementById('impactStats').innerHTML = impact.stats.map(s => `
    <div class="impact-flat-stat">
      <span class="impact-flat-value">${escapeHtml(s.value)}</span>
      <span class="impact-flat-label">${escapeHtml(s.label)}</span>
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
    <a class="btn btn-ghost" href="${escapeHtml(c.resumeUrl)}" download id="resumeBtn">Download Resume</a>
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
    const current = root.getAttribute('data-theme') || 'light';
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

  // Role scene landing animations
  const sceneEls = document.querySelectorAll('.role-scene');
  const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('play');
      sceneObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  sceneEls.forEach(el => sceneObserver.observe(el));

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
