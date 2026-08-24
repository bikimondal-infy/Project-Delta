/* Case-study PDF page gallery: lightbox with zoom, prev/next, download */
(function(){
  const lightbox=document.getElementById('lightbox');
  if(!lightbox) return;

  const stageImg=lightbox.querySelector('.lightbox-stage img');
  const counter=lightbox.querySelector('[data-lb-counter]');
  const closeBtn=lightbox.querySelector('.lightbox-close');
  const prevBtn=lightbox.querySelector('[data-lb-prev]');
  const nextBtn=lightbox.querySelector('[data-lb-next]');
  const downloadBtn=lightbox.querySelector('[data-lb-download]');

  const items=Array.prototype.slice.call(document.querySelectorAll('.gallery-item[data-full]'));
  let current=0;

  function show(index){
    if(!items.length) return;
    current=(index+items.length)%items.length;
    const el=items[current];
    stageImg.src=el.getAttribute('data-full');
    stageImg.alt=el.getAttribute('data-alt')||'';
    stageImg.classList.remove('zoomed');
    stageImg.style.transform='scale(1)';
    if(counter) counter.textContent='Page '+(current+1)+' of '+items.length;
    if(downloadBtn) downloadBtn.setAttribute('href', el.getAttribute('data-full'));
  }

  items.forEach((el,i)=>{
    el.addEventListener('click',()=>{
      show(i);
      lightbox.classList.add('open');
      document.body.style.overflow='hidden';
    });
  });

  function closeLB(){
    lightbox.classList.remove('open');
    document.body.style.overflow='';
  }
  if(closeBtn) closeBtn.addEventListener('click',closeLB);
  lightbox.addEventListener('click',(e)=>{ if(e.target===lightbox) closeLB(); });
  if(prevBtn) prevBtn.addEventListener('click',()=>show(current-1));
  if(nextBtn) nextBtn.addEventListener('click',()=>show(current+1));

  stageImg.addEventListener('click',()=>{
    const zoomed=stageImg.classList.toggle('zoomed');
    stageImg.style.transform=zoomed?'scale(1.85)':'scale(1)';
  });

  document.addEventListener('keydown',(e)=>{
    if(!lightbox.classList.contains('open')) return;
    if(e.key==='Escape') closeLB();
    if(e.key==='ArrowRight') show(current+1);
    if(e.key==='ArrowLeft') show(current-1);
  });
})();
