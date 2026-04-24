document.addEventListener('DOMContentLoaded', function () {
  const greetingEl = document.getElementById('greeting');
  const hour = new Date().getHours();

  if (hour < 12) {
    greetingEl.textContent = '🌤 Good Morning';
  } else if (hour < 18) {
    greetingEl.textContent = '☀️ Good Afternoon';
  } else {
    greetingEl.textContent = '🌙 Good Evening';
  }

  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = themeBtn.querySelector('.theme-icon');

  function applyTheme(isDark) {
    document.body.classList.toggle('light', !isDark);
    themeIcon.textContent = isDark ? '☀' : '🌙';
  }

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = savedTheme ? savedTheme === 'dark' : !window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersDark);

  themeBtn.addEventListener('click', function () {
    const isCurrentlyDark = !document.body.classList.contains('light');
    applyTheme(!isCurrentlyDark);
    localStorage.setItem('theme', !isCurrentlyDark ? 'dark' : 'light');
  });

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
    });
  });

  const visitorInput = document.getElementById('visitorName');
  const saveNameBtn = document.getElementById('saveNameBtn');
  const clearNameBtn = document.getElementById('clearNameBtn');
  const welcomeMessage = document.getElementById('welcomeMessage');

  function refreshWelcome() {
    const name = localStorage.getItem('visitorName');
    welcomeMessage.textContent = name ? 'Welcome back, ' + name + '! 👋' : '';
  }

  saveNameBtn.addEventListener('click', function () {
    const name = visitorInput.value.trim();
    if (name) {
      localStorage.setItem('visitorName', name);
      refreshWelcome();
      visitorInput.value = '';
    }
  });

  visitorInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      saveNameBtn.click();
    }
  });

  clearNameBtn.addEventListener('click', function () {
    localStorage.removeItem('visitorName');
    refreshWelcome();
  });

  refreshWelcome();

  const timeBadge = document.getElementById('timeOnSite');
  let seconds = 0;

  setInterval(function () {
    seconds++;
    if (seconds < 60) {
      timeBadge.textContent = '⏱ ' + seconds + 's on site';
    } else {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      timeBadge.textContent = '⏱ ' + m + 'm ' + s + 's on site';
    }
  }, 1000);

  const searchInput = document.getElementById('projectSearch');
  const sortSelect = document.getElementById('sortProjects');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.getElementById('projectsGrid');
  const projectCount = document.getElementById('projectCount');
  const noResultsMsg = document.getElementById('noResultsMessage');
  const allCards = Array.from(document.querySelectorAll('.project-card'));
  const favoriteBtns = document.querySelectorAll('.favorite-btn');

  let activeCategory = localStorage.getItem('projectCategory') || 'all';
  const savedSort = localStorage.getItem('projectSort') || 'default';
  const savedSearch = localStorage.getItem('projectSearch') || '';
  let favorites = JSON.parse(localStorage.getItem('favoriteProjects')) || [];

  searchInput.value = savedSearch;
  sortSelect.value = savedSort;

  filterBtns.forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.category === activeCategory);
  });

  function updateFavoriteButtons() {
    favoriteBtns.forEach(function (btn) {
      const card = btn.closest('.project-card');
      const projectId = card.dataset.projectId;

      if (favorites.includes(projectId)) {
        btn.textContent = '★';
        btn.classList.add('active');
      } else {
        btn.textContent = '☆';
        btn.classList.remove('active');
      }
    });
  }

  function renderProjects() {
    const query = searchInput.value.toLowerCase().trim();
    const sortBy = sortSelect.value;
    let cards = [...allCards];

    cards = cards.filter(function (card) {
      const category = card.dataset.category;
      const projectId = card.dataset.projectId;

      if (activeCategory === 'favorites') {
        return favorites.includes(projectId);
      }

      return activeCategory === 'all' || category === activeCategory;
    });

    if (query) {
      cards = cards.filter(function (card) {
        return card.textContent.toLowerCase().includes(query);
      });
    }

    if (sortBy === 'az') {
      cards.sort(function (a, b) {
        return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
      });
    } else if (sortBy === 'za') {
      cards.sort(function (a, b) {
        return b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent);
      });
    }

    projectsGrid.innerHTML = '';
    cards.forEach(function (card) {
      projectsGrid.appendChild(card);
    });

    projectCount.textContent = 'Showing ' + cards.length + ' project' + (cards.length !== 1 ? 's' : '');
    noResultsMsg.textContent = cards.length === 0 ? 'No projects match your search.' : '';

    localStorage.setItem('projectCategory', activeCategory);
    localStorage.setItem('projectSort', sortBy);
    localStorage.setItem('projectSearch', searchInput.value);
  }

  favoriteBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = btn.closest('.project-card');
      const projectId = card.dataset.projectId;

      if (favorites.includes(projectId)) {
        favorites = favorites.filter(function (id) {
          return id !== projectId;
        });
      } else {
        favorites.push(projectId);
      }

      localStorage.setItem('favoriteProjects', JSON.stringify(favorites));
      updateFavoriteButtons();
      renderProjects();
    });
  });

  searchInput.addEventListener('input', renderProjects);
  sortSelect.addEventListener('change', renderProjects);

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });

      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderProjects();
    });
  });

  projectsGrid.addEventListener('click', function (e) {
    const btn = e.target.closest('.details-btn');
    if (!btn) return;

    const card = btn.closest('.project-card');
    const details = card.querySelector('.project-details');

    details.classList.toggle('hidden');
    btn.textContent = details.classList.contains('hidden') ? 'View Details' : 'Hide Details';
  });

  updateFavoriteButtons();
  renderProjects();

  const loadReposBtn = document.getElementById('loadReposBtn');
  const repoList = document.getElementById('repoList');
  const apiMessage = document.getElementById('apiMessage');

  function setRepoButtonState(state) {
    loadReposBtn.classList.remove('loading', 'loaded');
    loadReposBtn.disabled = false;

    if (state === 'loading') {
      loadReposBtn.classList.add('loading');
      loadReposBtn.textContent = 'Loading...';
      loadReposBtn.disabled = true;
    } else if (state === 'loaded') {
      loadReposBtn.classList.add('loaded');
      loadReposBtn.textContent = 'Loaded ✓';
      loadReposBtn.disabled = true;
    } else {
      loadReposBtn.textContent = 'Load Repositories';
    }
  }

  function loadGitHubRepos() {
    if (loadReposBtn.disabled) return;

    setRepoButtonState('loading');
    apiMessage.textContent = '';
    repoList.innerHTML = '';

    fetch('https://api.github.com/users/alharbimesh47/repos?sort=updated&per_page=6')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (repos) {
        setRepoButtonState('loaded');

        if (repos.length === 0) {
          apiMessage.textContent = 'No public repositories found.';
          return;
        }

        repos.forEach(function (repo) {
          const card = document.createElement('div');
          card.className = 'repo-card';

          const langHtml = repo.language
            ? '<span class="repo-lang">' + escapeHtml(repo.language) + '</span>'
            : '';

          const starsHtml = repo.stargazers_count > 0
            ? '<p>⭐ ' + repo.stargazers_count + ' stars</p>'
            : '';

          card.innerHTML =
            '<h3>' + escapeHtml(repo.name) + '</h3>' +
            '<p>' + escapeHtml(repo.description || 'No description available.') + '</p>' +
            starsHtml +
            langHtml +
            '<a href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer">View Repository →</a>';

          repoList.appendChild(card);
        });
      })
      .catch(function () {
        setRepoButtonState('default');
        apiMessage.textContent = '⚠ Unable to load repositories right now. Please try again later.';
      });
  }

  loadReposBtn.addEventListener('click', loadGitHubRepos);

  setTimeout(function () {
    loadGitHubRepos();
  }, 800);

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const messageInput = document.getElementById('messageInput');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formMessage');

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  }

  nameInput.addEventListener('blur', function () {
    nameError.textContent = nameInput.value.trim() === '' ? 'Name is required.' : '';
  });

  emailInput.addEventListener('blur', function () {
    const val = emailInput.value.trim();
    if (val === '') {
      emailError.textContent = 'Email is required.';
    } else if (!isValidEmail(val)) {
      emailError.textContent = 'Enter a valid email like example@email.com';
    } else {
      emailError.textContent = '';
    }
  });

  messageInput.addEventListener('blur', function () {
    const val = messageInput.value.trim();
    if (val === '') {
      messageError.textContent = 'Message is required.';
    } else if (val.length < 10) {
      messageError.textContent = 'Message must be at least 10 characters.';
    } else {
      messageError.textContent = '';
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formSuccess.textContent = '';

    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Name is required.';
      valid = false;
    }

    const email = emailInput.value.trim();

    if (email === '') {
      emailError.textContent = 'Email is required.';
      valid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = 'Enter a valid email like example@email.com';
      valid = false;
    }

    const message = messageInput.value.trim();

    if (message === '') {
      messageError.textContent = 'Message is required.';
      valid = false;
    } else if (message.length < 10) {
      messageError.textContent = 'Message must be at least 10 characters.';
      valid = false;
    }

    if (!valid) return;

    formSuccess.textContent = 'Message sent successfully!';
    form.reset();
  });

  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});