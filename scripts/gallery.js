document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.remove('visible');
    lightbox.setAttribute('aria-hidden', 'true');
    if(lightboxImg){
      lightboxImg.removeAttribute('src');
      lightboxImg.removeAttribute('alt');
      lightboxImg.classList.remove('zoomed');
    }
  }

  if(lightbox){
    lightbox.addEventListener('click', event => {
      if(event.target === lightbox){
        closeLightbox();
      }
    });
  }

  if(closeBtn){
    closeBtn.addEventListener('click', closeLightbox);
  }

  if(lightboxImg){
    lightboxImg.addEventListener('click', event => {
      event.stopPropagation();
      lightboxImg.classList.toggle('zoomed');
    });
  }

  document.addEventListener('keyup', event => {
    if(event.key === 'Escape'){
      closeLightbox();
    }
  });

  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      if(!lightbox || !lightboxImg) return;
      const img = trigger.querySelector('img');
      if(!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('visible');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  document.querySelectorAll('.portfolio').forEach(portfolio => {
    const cards = Array.from(portfolio.querySelectorAll('.project-card'));
    const cycleButton = portfolio.querySelector('.cycle-button');
    const visibleCount = Number(portfolio.dataset.visibleCount) || cards.length;
    let startIndex = 0;

    const updateProjects = () => {
      const total = cards.length;
      cards.forEach((card, idx) => {
        const relative = (idx - startIndex + total) % total;
        card.classList.toggle('hidden', relative >= visibleCount);
      });
    };

    if(cycleButton){
      if(cards.length <= visibleCount){
        cycleButton.style.display = 'none';
      }else{
        cycleButton.addEventListener('click', () => {
          startIndex = (startIndex + visibleCount) % cards.length;
          updateProjects();
        });
      }
    }

    updateProjects();
  });
});
