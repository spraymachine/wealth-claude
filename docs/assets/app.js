// Wealth Media Agency — interactions

document.documentElement.classList.add('js-ready');

// Intersection-driven reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
},{threshold:0.05, rootMargin:'0px 0px -4% 0px'});
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el=>{
  // elements already in viewport on load — reveal immediately
  const r = el.getBoundingClientRect();
  if(r.top < window.innerHeight){ el.classList.add('in'); }
  else{ io.observe(el); }
});

// Safety net: after 2s, make sure everything is visible
window.addEventListener('load', ()=>{
  setTimeout(()=>{
    document.querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)').forEach(el=>el.classList.add('in'));
  }, 1800);
});

// Nav scroll state
const nav = document.querySelector('.nav');
if(nav){
  const onScroll = ()=>{ nav.classList.toggle('scrolled', window.scrollY > 24); };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}

// Mobile nav
const burger = document.querySelector('.nav__burger');
if(burger){
  burger.addEventListener('click', ()=>{
    document.body.classList.toggle('nav-open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('nav-open')));
}

// Count-up for stats
const runCounter = (el)=>{
  if(el.dataset.ran) return;
  el.dataset.ran = '1';
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const duration = 1800;
  const start = performance.now();
  const tick = (now)=>{
    const p = Math.min(1, (now-start)/duration);
    const eased = 1 - Math.pow(1-p, 3);
    const val = target*eased;
    el.textContent = decimals ? val.toFixed(decimals) : Math.round(val).toString();
    if(p<1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counters = document.querySelectorAll('[data-count]');
const countIo = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ runCounter(e.target); countIo.unobserve(e.target); }
  });
},{threshold:0.2});
counters.forEach(c=>{
  const r = c.getBoundingClientRect();
  if(r.top < window.innerHeight) runCounter(c);
  else countIo.observe(c);
});
// safety net
window.addEventListener('load', ()=>setTimeout(()=>counters.forEach(runCounter), 1800));

// Hero influencer carousel
const creatorTrack = document.querySelector('[data-creator-track]');
if(creatorTrack){
  const languageLabel = document.querySelector('[data-language-label]');
  const filterButtons = Array.from(document.querySelectorAll('.hero-filter'));
  const localInfluencerImages = new Set([
    '__bhumi770',
    '_chandana_manoj',
    'angel_queen_official56',
    'arohikhurana_',
    'attitude_maxx01',
    'itskhushi_pandit',
    'jyotinaayak007',
    'keerthi._yuvaraj',
    'mr.zodge',
    'niharikatiwari001',
    'pandit_girl_242',
    'ponnu.ash',
    'shivaniipaliwal',
    'siriravula.chary',
    'srikanth_nayak_.14',
    'suresh__guru',
    'this_is_madhuma',
    'venu_virat_venu1'
  ]);
  const imageForHandle = (handle)=>(
    localInfluencerImages.has(handle) ? `/assets/influencers/${handle}.jpg` : ''
  );
  const creatorData = {
    Telugu: [
      { name:'Kammari Venu Gopal', handle:'venu_virat_venu1', followers:'1.2M' },
      { name:'Sai Goud', handle:'attitude_maxx01', followers:'1.3M' },
      { name:'Mr. Suresh Guru', handle:'suresh__guru', followers:'1.4M' },
      { name:'Siri Ravula Chary', handle:'siriravula.chary', followers:'719K' },
      { name:'Kandimalla Sakethraju', handle:'raju_dhee10', followers:'885K' },
      { name:'G RatnaKumar', handle:'nani_josh_', followers:'591K' },
      { name:'Dharani Gudla', handle:'dharanigudla', followers:'433K' },
      { name:'Bad Boys', handle:'bad_boys_an', followers:'620K' },
      { name:'Mummy', handle:'_sridhar_chapa_', followers:'497K' },
      { name:'Happy Queen', handle:'happy_d_queen_', followers:'452K' }
    ],
    Hindi: [
      { name:'Shivani Paliwal', handle:'shivaniipaliwal', followers:'3.7M' },
      { name:'Priyanshi Pandey', handle:'pandit_girl_242', followers:'2M' },
      { name:'Arohi Khurana', handle:'arohikhurana_', followers:'1.4M' },
      { name:'Niharika Tiwari', handle:'niharikatiwari001', followers:'1.4M' },
      { name:'Lakshay Sharma', handle:'selfakshay', followers:'1.2M' },
      { name:'Sakshi Shrivas', handle:'sakshishrivas', followers:'758K' },
      { name:'Rahul', handle:'c_k._', followers:'662K' },
      { name:'Passang Deeki Sherpa', handle:'deekila_sherpaa', followers:'515K' },
      { name:'Sachin Sharma', handle:'sachinsharmadance', followers:'421K' },
      { name:'Unnati Tomar', handle:'unnatitomarrr', followers:'522K' }
    ],
    Tamil: [
      { name:'Aswathi S', handle:'ponnu.ash', followers:'1.8M' },
      { name:'Keerthika Y', handle:'keerthi._yuvaraj', followers:'1.1M' },
      { name:'Madhu', handle:'this_is_madhuma', followers:'912K' },
      { name:'AngelQueen', handle:'angel_queen_official56', followers:'526K' },
      { name:'Arunachaleswaran.Pa', handle:'arunachaleswaran.pa', followers:'793K' },
      { name:'Sharmi Mariappan', handle:'sharmi._.popzz', followers:'623K' },
      { name:'Madhar Maideen S P', handle:'thozhilmunaivordotcom', followers:'1M' },
      { name:'Manju Bharkavi', handle:'manjurameshbabuoffl', followers:'511K' },
      { name:'G Vishwa', handle:'vishwa_m_a_d_d_y', followers:'331K' },
      { name:'Mhamaldas', handle:'mhamaldas', followers:'414K' }
    ],
    Marati: [
      { name:'Bhumi Sachin Kashid', handle:'__bhumi770', followers:'1.9M' },
      { name:'Khushi Dwivedi', handle:'itskhushi_pandit', followers:'1.1M' },
      { name:'Nitasha Gaikwad', handle:'_nitasha_gaikwad_', followers:'836K' },
      { name:'Rutika Shelar', handle:'rutika_shelar_official', followers:'597K' },
      { name:'Mansi', handle:'iam_mansikamble', followers:'510K' },
      { name:'Lucky Mane', handle:'laxmi_mane_11', followers:'453K' },
      { name:'Ponkhi Bordoloi', handle:'jhimi_ponkhi_bordoloi', followers:'484K' },
      { name:'Sona', handle:'sona_shirsat_official', followers:'404K' },
      { name:'Ms. Saloni Nagmode', handle:'saloninagmode_007', followers:'223K' },
      { name:'Mansi Adgale', handle:'mansii__2503', followers:'118K' }
    ],
    Kannada: [
      { name:'Jyoti Nayak', handle:'jyotinaayak007', followers:'1M' },
      { name:'Srikanth Nayaka', handle:'srikanth_nayak_.14', followers:'1.6M' },
      { name:'Jeevan Keremoole', handle:'jeevan_keremoole', followers:'443K' },
      { name:'Unique Vaishnavi', handle:'unique_queen_vaishu20', followers:'447K' },
      { name:'Only For U', handle:'reshmanayak007', followers:'383K' },
      { name:'Dacchu Girl', handle:'priya_chinnu_8558', followers:'585K' },
      { name:'Jyosavu', handle:'jyosavu007', followers:'348K' },
      { name:'Always Arya', handle:'always__arya', followers:'601K' },
      { name:'Akshitha Akshi', handle:'akshitha_queen_', followers:'516K' },
      { name:'Styleking Kumar', handle:'stylekingkumar_official', followers:'399K' }
    ],
    Malayalam: [
      { name:'Sijo Sajan', handle:'mr.zodge', followers:'622K' },
      { name:'Chandu', handle:'_chandana_manoj', followers:'444K' },
      { name:'Jenish R', handle:'jeni_vije_loves', followers:'414K' },
      { name:'M A Group Of Real Estate Kerala', handle:'real_estate_kerala_', followers:'234K' },
      { name:'Sanu', handle:'nusa_san', followers:'170K' },
      { name:'Babitha Babi', handle:'babitha_babi1', followers:'259K' },
      { name:'Kavya Satheesan', handle:'kavya_satheesan', followers:'181K' },
      { name:'Ancy S', handle:'ancy_sindhu', followers:'178K' },
      { name:'Keerthi D', handle:'keerthhhhiiii_', followers:'128K' },
      { name:'Shan Tirur', handle:'_shan_tirur_', followers:'172K' }
    ]
  };

  const renderCreators = (language)=>{
    const cards = creatorData[language] || creatorData.Telugu;
    const markup = [...cards, ...cards].map((creator)=>`
      <article class="creator-card" aria-label="${creator.name} @${creator.handle} with ${creator.followers} followers">
        <div class="creator-card__media" style="background-image:url('${imageForHandle(creator.handle)}')"></div>
        <div class="creator-card__body">
          <span class="creator-card__language">${language}</span>
          <div class="creator-card__handle">@${creator.handle}</div>
          <div class="creator-card__stats">
            <span>${creator.name}</span>
            <span class="creator-card__followers">${creator.followers}</span>
          </div>
        </div>
      </article>
    `).join('');

    creatorTrack.innerHTML = markup;
    if(languageLabel) languageLabel.textContent = `${language} creators`;
  };

  filterButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
      const language = button.dataset.language;
      filterButtons.forEach((item)=>{
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      creatorTrack.style.animation = 'none';
      creatorTrack.offsetHeight;
      renderCreators(language);
      creatorTrack.style.animation = '';
    });
  });

  renderCreators('Telugu');
}

// Magnetic buttons (subtle)
document.querySelectorAll('.btn, .nav__cta').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.08}px, ${y*0.1}px)`;
  });
  btn.addEventListener('mouseleave', ()=>{ btn.style.transform = ''; });
});
