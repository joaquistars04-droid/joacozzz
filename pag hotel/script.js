// Nav sólido al hacer scroll
  const siteNav = document.getElementById('siteNav');
  const heroBg = document.getElementById('heroBg');

  function onScroll(){
    const y = window.scrollY;
    siteNav.classList.toggle('scrolled', y > 40);

    // Parallax suave del hero
    heroBg.style.transform = 'translateY(' + Math.min(y * 0.28, 160) + 'px)';
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Reveal en ambas direcciones de scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => io.observe(el));

  // Menú móvil
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  burgerBtn.addEventListener('click', ()=> mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', ()=> mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> mobileMenu.classList.remove('open'));
  });

  // Formulario -> mensaje automático de WhatsApp
  const WHATSAPP_NUMBER = "5493424000000"; // reemplazar por el número real del hotel, formato 54 9 + código de área + número
  const form = document.getElementById('bookingForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const huespedes = document.getElementById('huespedes').value;
    const habitacion = document.getElementById('habitacion').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    let texto = `Hola, soy ${nombre}. Quiero consultar disponibilidad en Hotel Ribera.%0A`;
    texto += `📅 Check-in: ${checkin || 'a confirmar'}%0A`;
    texto += `📅 Check-out: ${checkout || 'a confirmar'}%0A`;
    texto += `👥 Huéspedes: ${huespedes}%0A`;
    texto += `🛏️ Habitación de interés: ${habitacion}%0A`;
    texto += `📱 Mi contacto: ${telefono}`;
    if(mensaje){ texto += `%0A📝 Mensaje: ${mensaje}`; }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
    window.open(url, '_blank');
  });
