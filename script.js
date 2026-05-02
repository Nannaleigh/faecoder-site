 const revealElements = document.querySelectorAll('.reveal');
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';

    window.addEventListener('scroll', () => {
      scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = window.scrollY;
    }, { passive: true });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target;

        if (entry.isIntersecting) {
          element.classList.remove('from-top', 'from-bottom');
          element.classList.add(scrollDirection === 'down' ? 'from-bottom' : 'from-top');
          element.classList.add('is-visible');
        } else {
          element.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -45px 0px'
    });

    const revealGroups = [
      ...document.querySelectorAll('.grid-3, .grid-4, .steps')
    ];

    revealGroups.forEach((group) => {
      const groupItems = group.querySelectorAll('.reveal');
      groupItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${index * 90}ms`);
      });
    });

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
