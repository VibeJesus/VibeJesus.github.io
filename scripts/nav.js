document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.querySelector('.dropdown-nav');
  if(!navBar){
    return;
  }

  let stickyTrigger = 0;
  let widthDifference = 0;
  let menuTimeout = null;

  const navHeader = navBar.querySelector('.nav-header');
  const dropdownMenu = navBar.querySelector('.dropdown-menu');

  const measure = () => {
    navBar.style.setProperty('--nav-expand-progress', '0');
    const rect = navBar.getBoundingClientRect();
    stickyTrigger = rect.top + window.scrollY;
    widthDifference = Math.max(window.innerWidth - rect.width, 0);
  };

  const updateProgress = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    if(scrollTop <= stickyTrigger || widthDifference <= 0){
      navBar.style.setProperty('--nav-expand-progress', '0');
      return;
    }

    const travel = scrollTop - stickyTrigger;
    const progress = Math.min(travel / widthDifference, 1);
    navBar.style.setProperty('--nav-expand-progress', progress.toString());
  };

  const handleResize = () => {
    measure();
    updateProgress();
  };

  const openMenu = () => {
    if(!dropdownMenu) return;
    clearTimeout(menuTimeout);
    navBar.classList.add('menu-open');
  };

  const closeMenu = () => {
    if(!dropdownMenu) return;
    clearTimeout(menuTimeout);
    menuTimeout = setTimeout(() => {
      navBar.classList.remove('menu-open');
    }, 150);
  };

  if(navHeader && dropdownMenu){
    ['mouseenter', 'focusin'].forEach(evt => {
      navHeader.addEventListener(evt, openMenu);
    });
    ['mouseleave', 'focusout'].forEach(evt => {
      navHeader.addEventListener(evt, closeMenu);
    });
    ['mouseenter', 'focusin'].forEach(evt => {
      dropdownMenu.addEventListener(evt, openMenu);
    });
    ['mouseleave', 'focusout'].forEach(evt => {
      dropdownMenu.addEventListener(evt, closeMenu);
    });
  }

  measure();
  updateProgress();

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', handleResize);
});
