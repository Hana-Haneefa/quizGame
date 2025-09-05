function revealOnScroll() {
  const appear = document.querySelectorAll('.appear');
  for (let i = 0; i < appear.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = appear[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      appear[i].classList.add('active');
    } else {
      appear[i].classList.remove('active');
    }
  }
}



window.addEventListener('scroll', revealOnScroll);

// mini game play
