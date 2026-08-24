/* Shared behaviour for Portfolio sub-pages — mirrors the logic already
   used on the Gilapi homepage, so theme toggle / mobile nav feel identical. */

function toggleTheme(){
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  const emoji=document.getElementById('toggle-emoji');
  if(emoji) emoji.textContent=isDark?'☀️':'🌙';
  const white=document.getElementById('white-logo');
  const blue=document.getElementById('blue-logo');
  if(white) white.style.display = isDark ? 'none' : 'inline';
  if(blue) blue.style.display = isDark ? 'inline' : 'none';
}

function toggleMobileNav(){
  const overlay=document.getElementById('mob-overlay');
  const btn=document.getElementById('hamburger');
  overlay.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMobileNav(){
  document.getElementById('mob-overlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}
function handleOverlayClick(e){
  if(e.target===document.getElementById('mob-overlay')) closeMobileNav();
}
document.addEventListener('click',function(e){
  const nav=document.getElementById('mob-overlay');
  const btn=document.getElementById('hamburger');
  if(!nav||!btn) return;
  if(nav.classList.contains('open')&&!nav.contains(e.target)&&!btn.contains(e.target)){
    closeMobileNav();
  }
});

const __io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.1});
document.querySelectorAll('.fade-up').forEach(el=>__io.observe(el));
