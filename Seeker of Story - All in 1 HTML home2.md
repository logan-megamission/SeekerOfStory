[www.SeekerofStory.com](http://www.SeekerofStory.com) 

All in one code

\<\!DOCTYPE html\>  
\<html lang="en"\>  
\<head\>  
\<meta charset="UTF-8"\>  
\<meta name="viewport" content="width=device-width, initial-scale=1.0"\>  
\<title\>Seeker of Story\</title\>  
\<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600\&family=Montserrat:wght@300;400;500;600;700\&display=swap" rel="stylesheet"\>  
\<style\>  
  :root {  
    \--cream: \#FAF7F2;  
    \--warm-white: \#FDFBF8;  
    \--gold: \#C9A84C;  
    \--gold-light: \#E8D5A3;  
    \--gold-dark: \#8B6914;  
    \--charcoal: \#2C2C2C;  
    \--mid-gray: \#6B6B6B;  
    \--light-gray: \#E8E4DE;  
    \--border: \#DDD8CF;  
    \--accent-teal: \#2A7B7B;  
  }  
  \* { margin: 0; padding: 0; box-sizing: border-box; }  
  html { scroll-behavior: smooth; }  
  body { font-family: 'Montserrat', sans-serif; background: var(--cream); color: var(--charcoal); overflow-x: hidden; }

  /\* NAV \*/  
  nav {  
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;  
    background: rgba(250,247,242,0.97); backdrop-filter: blur(8px);  
    border-bottom: 1px solid var(--border); padding: 0 3rem;  
    height: 70px; display: flex; align-items: center; justify-content: space-between;  
  }  
  .nav-brand { display: flex; flex-direction: column; text-decoration: none; line-height: 1.1; cursor: pointer; }  
  .nav-brand-main { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--charcoal); }  
  .nav-brand-main em { font-style: italic; color: var(--gold); }  
  .nav-brand-sub { font-size: 0.5rem; font-family: 'Montserrat', sans-serif; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--mid-gray); }  
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }  
  .nav-links a {  
    font-size: 0.68rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase;  
    color: var(--mid-gray); text-decoration: none; transition: color 0.2s;  
    position: relative; cursor: pointer; background: none; border: none; font-family: 'Montserrat', sans-serif;  
  }  
  .nav-links a::after { content: ''; position: absolute; bottom: \-4px; left: 0; right: 0; height: 1px; background: var(--gold); transform: scaleX(0); transition: transform 0.3s; }  
  .nav-links a:hover { color: var(--charcoal); }  
  .nav-links a:hover::after { transform: scaleX(1); }  
  .nav-links a.active { color: var(--gold-dark); }  
  .nav-links a.active::after { transform: scaleX(1); }

  /\* SECTIONS \*/  
  section { display: none; min-height: 100vh; padding-top: 70px; }  
  section.visible { display: block; }

  /\* SHARED \*/  
  .section-label { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; display: block; }  
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 300; line-height: 1.15; color: var(--charcoal); margin-bottom: 1.5rem; }  
  .section-title em { font-style: italic; color: var(--gold); }  
  .divider { width: 60px; height: 1px; background: var(--gold); margin: 0 auto 3rem; }  
  .btn-primary { background: var(--gold); color: white; padding: 0.9rem 2.4rem; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; border: none; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.2s; display: inline-block; font-family: 'Montserrat', sans-serif; }  
  .btn-primary:hover { background: var(--gold-dark); transform: translateY(-2px); }

  /\* HOME HERO \*/  
  .home-hero { background: var(--charcoal); padding: 6rem 2rem 5rem; text-align: center; position: relative; overflow: hidden; }  
  .home-hero::before { content: ''; position: absolute; top: \-120px; left: \-120px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%); pointer-events: none; }  
  .home-hero::after { content: ''; position: absolute; bottom: \-80px; right: \-80px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(42,123,123,0.08) 0%, transparent 70%); pointer-events: none; }  
  .hero-eyebrow { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; display: block; opacity: 0; animation: fadeUp 0.8s ease 0.2s forwards; }  
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 8vw, 6rem); font-weight: 300; line-height: 1.05; color: white; margin-bottom: 0.5rem; opacity: 0; animation: fadeUp 0.8s ease 0.4s forwards; }  
  .hero-title em { font-style: italic; color: var(--gold); }  
  .hero-subtitle { font-family: 'Cormorant Garamond', serif; font-size: clamp(1rem, 2.5vw, 1.5rem); font-weight: 300; font-style: italic; color: rgba(255,255,255,0.55); margin-bottom: 1.5rem; opacity: 0; animation: fadeUp 0.8s ease 0.6s forwards; }  
  .hero-scripture { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold-dark); border: 1px solid rgba(201,168,76,0.3); padding: 0.6rem 1.5rem; display: inline-block; margin-bottom: 3.5rem; opacity: 0; animation: fadeUp 0.8s ease 0.8s forwards; }

  /\* SEARCH ENGINE \*/  
  .search-engine { max-width: 720px; margin: 0 auto; background: var(--warm-white); padding: 2.5rem; border-top: 3px solid var(--gold); opacity: 0; animation: fadeUp 0.8s ease 1s forwards; position: relative; z-index: 1; }  
  .search-heading { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400; color: var(--charcoal); margin-bottom: 0.3rem; }  
  .search-subheading { font-size: 0.72rem; font-weight: 300; color: var(--mid-gray); margin-bottom: 1.75rem; }  
  .search-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: end; }  
  .search-field { display: flex; flex-direction: column; gap: 0.5rem; text-align: left; }  
  .search-field label { font-size: 0.58rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); }  
  .search-field .opt { font-size: 0.52rem; font-weight: 400; letter-spacing: 0.05em; color: var(--mid-gray); text-transform: none; margin-left: 0.35rem; }  
  .search-field input { background: var(--cream); border: 1px solid var(--border); padding: 0.9rem 1rem; font-family: 'Montserrat', sans-serif; font-size: 0.82rem; color: var(--charcoal); outline: none; transition: border-color 0.2s; width: 100%; }  
  .search-field input:focus { border-color: var(--gold); }  
  .search-field input::placeholder { color: \#C8C4BC; }  
  .search-connector { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-style: italic; color: var(--mid-gray); text-align: center; white-space: nowrap; padding-bottom: 0.9rem; }  
  .search-btn { margin-top: 1.5rem; width: 100%; background: var(--gold); color: white; border: none; padding: 1.1rem; font-family: 'Montserrat', sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }  
  .search-btn:hover { background: var(--gold-dark); }  
  .search-btn:disabled { background: var(--light-gray); color: var(--mid-gray); cursor: not-allowed; }

  /\* SEARCH RESULTS \*/  
  .results-band { background: var(--charcoal); padding: 3rem 2rem 4rem; display: none; }  
  .results-band.visible { display: block; }  
  .results-inner { max-width: 1100px; margin: 0 auto; }  
  .results-label { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; }  
  .results-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 300; color: white; margin-bottom: 2rem; }  
  .results-title em { font-style: italic; color: var(--gold); }  
  .results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }  
  .result-card { background: var(--warm-white); border-top: 3px solid var(--gold); padding: 1.75rem; cursor: pointer; transition: transform 0.25s, box-shadow 0.25s; }  
  .result-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.2); }  
  .result-tag { font-size: 0.56rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; display: block; }  
  .result-name { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 400; color: var(--charcoal); margin-bottom: 0.2rem; }  
  .result-biz { font-size: 0.75rem; font-weight: 500; color: var(--accent-teal); margin-bottom: 1rem; }  
  .journey-row { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1rem; flex-wrap: wrap; }  
  .journey-from { background: var(--light-gray); padding: 0.28rem 0.7rem; font-weight: 500; color: var(--charcoal); font-size: 0.7rem; }  
  .journey-to { background: var(--gold-light); color: var(--gold-dark); padding: 0.28rem 0.7rem; font-weight: 500; font-size: 0.7rem; }  
  .journey-arrow { color: var(--gold); font-size: 1rem; }  
  .match-why { font-size: 0.72rem; font-weight: 300; line-height: 1.7; color: var(--mid-gray); margin-bottom: 1rem; font-style: italic; border-left: 2px solid var(--gold-light); padding-left: 0.75rem; }  
  .result-excerpt { font-size: 0.8rem; line-height: 1.8; color: var(--mid-gray); font-weight: 300; margin-bottom: 1.25rem; }  
  .view-btn { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold-dark); text-decoration: none; border-bottom: 1px solid var(--gold-light); padding-bottom: 2px; transition: border-color 0.2s, color 0.2s; cursor: pointer; background: none; border-top: none; border-left: none; border-right: none; font-family: 'Montserrat', sans-serif; }  
  .view-btn:hover { color: var(--gold); border-color: var(--gold); }

  /\* LOADING \*/  
  .search-loading { background: var(--charcoal); text-align: center; padding: 3rem; display: none; }  
  .search-loading.visible { display: block; }  
  .loading-dots span { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--gold); margin: 0 3px; animation: bounce 1.2s infinite; }  
  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }  
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }  
  @keyframes bounce { 0%,80%,100% { transform: scale(0.7); opacity:0.4; } 40% { transform: scale(1.1); opacity:1; } }

  /\* FOUNDER CTA \*/  
  .founder-cta { background: var(--cream); border-top: 1px solid var(--border); padding: 5rem 2rem; text-align: center; }  
  .founder-cta-inner { max-width: 680px; margin: 0 auto; }  
  .founder-cta-eyebrow { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem; display: block; }  
  .founder-cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 300; line-height: 1.2; color: var(--charcoal); margin-bottom: 1.25rem; }  
  .founder-cta-title em { font-style: italic; color: var(--gold); }  
  .founder-cta-body { font-size: 0.85rem; font-weight: 300; line-height: 1.9; color: var(--mid-gray); margin-bottom: 2rem; }  
  .verse-tag { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-dark); border: 1px solid var(--gold-light); padding: 0.5rem 1.25rem; display: inline-block; margin-bottom: 2.25rem; }

  /\* ABOUT \*/  
  .dark-hero { background: var(--charcoal); padding: 5.5rem 2rem; text-align: center; }  
  .dark-hero .section-label { color: var(--gold-light); }  
  .dark-hero .section-title { color: white; max-width: 700px; margin: 0 auto 1.5rem; }  
  .dark-hero p { color: rgba(255,255,255,0.55); font-size: 0.9rem; font-weight: 300; line-height: 1.9; max-width: 560px; margin: 0 auto; }  
  .pillars-section { background: var(--warm-white); padding: 5rem 2rem; }  
  .pillars-inner { max-width: 1100px; margin: 0 auto; }  
  .pillars-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); margin-top: 3rem; }  
  .pillar { background: var(--cream); padding: 2.5rem 2rem; }  
  .pillar-num { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 300; color: var(--gold-light); line-height: 1; margin-bottom: 1rem; }  
  .pillar-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 400; color: var(--charcoal); margin-bottom: 0.75rem; }  
  .pillar-body { font-size: 0.8rem; line-height: 1.85; color: var(--mid-gray); font-weight: 300; }  
  .quote-section { padding: 5rem 2rem; max-width: 900px; margin: 0 auto; text-align: center; }  
  .quote-section blockquote { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.3rem, 2.5vw, 2rem); font-weight: 300; font-style: italic; color: var(--charcoal); line-height: 1.6; border-left: 3px solid var(--gold); padding: 1.5rem 2rem; text-align: left; margin: 2rem 0; }  
  .quote-section blockquote em { color: var(--gold); }  
  .susy-section { background: var(--charcoal); padding: 5rem 2rem; }  
  .susy-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }  
  .susy-photo-wrap { position: relative; }  
  .susy-photo { width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top; display: block; }  
  .susy-photo-accent { position: absolute; top: \-12px; left: \-12px; width: 100%; height: 100%; border: 1px solid rgba(201,168,76,0.3); z-index: \-1; }  
  .susy-content .section-label { color: var(--gold); }  
  .susy-content .section-title { color: white; }  
  .susy-content p { font-size: 0.88rem; line-height: 1.9; color: rgba(255,255,255,0.6); font-weight: 300; margin-bottom: 1.25rem; }

  /\* FOUNDING STORIES \*/  
  .stories-grid-wrap { background: var(--warm-white); padding: 5rem 2rem; }  
  .stories-inner { max-width: 1100px; margin: 0 auto; }  
  .stories-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: var(--border); }  
  .story-card { background: var(--cream); overflow: hidden; cursor: pointer; transition: transform 0.3s; }  
  .story-card:hover { transform: translateY(-4px); }  
  .story-card-photo { width: 100%; height: 300px; object-fit: cover; object-position: top; display: block; filter: grayscale(20%); transition: filter 0.3s; }  
  .story-card:hover .story-card-photo { filter: grayscale(0%); }  
  .story-card-body { padding: 2rem; border-top: 3px solid var(--gold); }  
  .story-card-tag { font-size: 0.56rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; display: block; }  
  .story-card-name { font-family: 'Cormorant Garamond', serif; font-size: 1.75rem; font-weight: 400; color: var(--charcoal); margin-bottom: 0.2rem; }  
  .story-card-biz { font-size: 0.75rem; font-weight: 500; color: var(--accent-teal); margin-bottom: 1rem; }  
  .story-card-excerpt { font-size: 0.8rem; line-height: 1.8; color: var(--mid-gray); font-weight: 300; margin-bottom: 1.25rem; }  
  .asset-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }  
  .asset-tag { font-size: 0.56rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.28rem 0.65rem; border: 1px solid var(--border); color: var(--mid-gray); }  
  .asset-tag.on { border-color: var(--gold); color: var(--gold-dark); background: rgba(201,168,76,0.05); }  
  .placeholder-card { background: var(--cream); opacity: 0.45; cursor: default; }  
  .placeholder-photo { width: 100%; height: 300px; background: var(--light-gray); display: flex; align-items: center; justify-content: center; }  
  .founding10-cta { text-align: center; margin-top: 4rem; padding: 3rem; background: var(--cream); border: 1px solid var(--border); }

  /\* MODAL \*/  
  .modal-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.65); z-index: 200; overflow-y: auto; padding: 2rem; }  
  .modal-overlay.open { display: flex; align-items: flex-start; justify-content: center; }  
  .modal { background: var(--warm-white); max-width: 820px; width: 100%; margin: 2rem 0; position: relative; }  
  .modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--mid-gray); line-height: 1; z-index: 10; }  
  .modal-header { display: grid; grid-template-columns: 200px 1fr; }  
  .modal-photo { width: 200px; height: 270px; object-fit: cover; object-position: top; display: block; }  
  .modal-head-info { padding: 2.5rem; background: var(--charcoal); color: white; display: flex; flex-direction: column; justify-content: center; }  
  .modal-tag { font-size: 0.56rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; display: block; }  
  .modal-name { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300; color: white; margin-bottom: 0.25rem; }  
  .modal-biz { font-size: 0.8rem; color: var(--gold-light); font-weight: 500; margin-bottom: 1.25rem; }  
  .modal-journey { display: flex; align-items: center; gap: 0.75rem; font-size: 0.72rem; }  
  .modal-from { padding: 0.28rem 0.75rem; font-weight: 500; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }  
  .modal-to { padding: 0.28rem 0.75rem; font-weight: 500; background: var(--gold); color: white; }  
  .modal-body { padding: 2.5rem; }  
  .modal-sec { margin-bottom: 2rem; }  
  .modal-sec-title { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.75rem; }  
  .modal-sec-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }  
  .modal-sec p { font-size: 0.84rem; line-height: 1.9; color: var(--charcoal); font-weight: 300; }  
  .blueprint-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }  
  .blueprint-item { background: var(--cream); padding: 1rem 1.25rem; border-left: 2px solid var(--gold-light); }  
  .blueprint-cat { font-size: 0.56rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--mid-gray); margin-bottom: 0.25rem; display: block; }  
  .blueprint-val { font-size: 0.8rem; color: var(--charcoal); font-weight: 400; }  
  .video-placeholder { background: var(--charcoal); aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }  
  .video-placeholder-text { text-align: center; color: rgba(255,255,255,0.3); font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-style: italic; }

  /\* ANIMATIONS \*/  
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  /\* FOOTER \*/  
  footer { background: var(--charcoal); color: rgba(255,255,255,0.35); text-align: center; padding: 2.5rem; font-size: 0.68rem; letter-spacing: 0.1em; }  
  footer strong { color: var(--gold); }  
  footer a { color: var(--gold); text-decoration: none; }

  /\* RESPONSIVE \*/  
  @media (max-width: 768px) {  
    nav { padding: 0 1rem; }  
    .nav-links { gap: 1.25rem; }  
    .search-row { grid-template-columns: 1fr; }  
    .search-connector { display: none; }  
    .results-grid { grid-template-columns: 1fr; }  
    .pillars-grid { grid-template-columns: 1fr; }  
    .susy-inner { grid-template-columns: 1fr; gap: 3rem; }  
    .stories-grid { grid-template-columns: 1fr; }  
    .modal-header { grid-template-columns: 1fr; }  
    .modal-photo { width: 100%; height: 220px; }  
    .blueprint-grid { grid-template-columns: 1fr; }  
  }  
\</style\>  
\</head\>  
\<body\>

\<\!-- NAV \--\>  
\<nav\>  
  \<div class="nav-brand" onclick="showSection('home')"\>  
    \<span class="nav-brand-main"\>Seeker \<em\>of\</em\> Story\</span\>  
    \<span class="nav-brand-sub"\>Powered by Mega Mission Media\</span\>  
  \</div\>  
  \<ul class="nav-links"\>  
    \<li\>\<a onclick="showSection('home')" id="nav-home" class="active"\>Home\</a\>\</li\>  
    \<li\>\<a onclick="showSection('about')" id="nav-about"\>About SOS\</a\>\</li\>  
    \<li\>\<a onclick="showSection('stories')" id="nav-stories"\>Founding Stories\</a\>\</li\>  
  \</ul\>  
\</nav\>

\<\!-- ══ HOME ══ \--\>  
\<section id="home" class="visible"\>

  \<div class="home-hero"\>  
    \<span class="hero-eyebrow"\>SeekOfStory.com — Fort Worth, TX\</span\>  
    \<h1 class="hero-title"\>Find the mentor who\<br\>\<em\>walked your path\</em\>\</h1\>  
    \<p class="hero-subtitle"\>Real founders. Real blueprints. Zero paywalls.\</p\>  
    \<span class="hero-scripture"\>Matthew 7:7 — Seek and you shall find\</span\>

    \<div class="search-engine"\>  
      \<div class="search-heading"\>Find My Mentor\</div\>  
      \<div class="search-subheading"\>Tell us where you're going — we'll find who's already been there.\</div\>  
      \<div class="search-row"\>  
        \<div class="search-field"\>  
          \<label\>I used to be… \<span class="opt"\>(optional)\</span\>\</label\>  
          \<input type="text" id="search-from" placeholder="e.g. Teacher, Nurse, IT Consultant"\>  
        \</div\>  
        \<div class="search-connector"\>→\</div\>  
        \<div class="search-field"\>  
          \<label\>I want to become…\</label\>  
          \<input type="text" id="search-to" placeholder="e.g. Attorney, Tour Guide, Podcaster"\>  
        \</div\>  
      \</div\>  
      \<button class="search-btn" id="search-btn" onclick="runSearch()"\>Search the Founder Database →\</button\>  
    \</div\>  
  \</div\>

  \<div class="search-loading" id="search-loading"\>  
    \<div class="loading-dots"\>\<span\>\</span\>\<span\>\</span\>\<span\>\</span\>\</div\>  
    \<p style="margin-top:1rem;font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);"\>Finding your mentors…\</p\>  
  \</div\>

  \<div class="results-band" id="results-band"\>  
    \<div class="results-inner"\>  
      \<div class="results-label" id="results-label"\>\</div\>  
      \<div class="results-title" id="results-title"\>\</div\>  
      \<div class="results-grid" id="results-grid"\>\</div\>  
    \</div\>  
  \</div\>

  \<\!-- Founder CTA \--\>  
  \<div class="founder-cta"\>  
    \<div class="founder-cta-inner"\>  
      \<span class="founder-cta-eyebrow"\>Are You a Founder?\</span\>  
      \<h2 class="founder-cta-title"\>Are you in a position to\<br\>\<em\>speak life into a seeker?\</em\>\</h2\>  
      \<p class="founder-cta-body"\>  
        You have a blueprint someone else desperately needs. The path you walked — the pivots, the vendors, the lessons, the leap — could be the exact story that changes everything for someone who just lost their job, burned out on their 9-to-5, or is standing at the edge of their own beginning.\<br\>\<br\>  
        If you've made it and you're willing to give back — not with money, but with your story — we want to hear from you. Show up and share. We handle everything else.  
      \</p\>  
      \<span class="verse-tag"\>Proverbs 18:21 — Life and death are in the power of the tongue\</span\>  
      \<br\>\<br\>  
      \<a href="https://calendly.com/susy-megamissionmedia/30min" target="\_blank" class="btn-primary"\>Schedule Your Initial Call →\</a\>  
    \</div\>  
  \</div\>

\</section\>

\<\!-- ══ ABOUT SOS ══ \--\>  
\<section id="about"\>

  \<div class="dark-hero"\>  
    \<span class="section-label"\>Our Mission\</span\>  
    \<h2 class="section-title"\>Why \<em\>Seeker of Story\</em\> Exists\</h2\>  
    \<p\>Because when you're in transition — unemployed, burned out, or standing at the edge of a leap — you can't afford paywalls. But somewhere out there is a founder who walked your exact path and is ready to be your bridge.\</p\>  
  \</div\>

  \<div class="pillars-section"\>  
    \<div class="pillars-inner"\>  
      \<div style="text-align:center;"\>  
        \<span class="section-label"\>The Model\</span\>  
        \<h2 class="section-title"\>Built on \<em\>The Goodwill Principle\</em\>\</h2\>  
        \<div class="divider"\>\</div\>  
      \</div\>  
      \<div class="pillars-grid"\>  
        \<div class="pillar"\>  
          \<div class="pillar-num"\>01\</div\>  
          \<h3 class="pillar-title"\>The Founder Gives\</h3\>  
          \<p class="pillar-body"\>Founders who've made the leap donate their blueprint — not money, but story. Who they were. What they built. Why they built it. How they did it. And the real vendors, costs, and contacts that made it possible.\</p\>  
        \</div\>  
        \<div class="pillar"\>  
          \<div class="pillar-num"\>02\</div\>  
          \<h3 class="pillar-title"\>The Platform Holds\</h3\>  
          \<p class="pillar-body"\>Seeker of Story collects, curates, and organizes these blueprints into a searchable database. Every profile is built through a personal process — an intro call, a discovery session, and a Ride & Share interview. Founders just show up and share.\</p\>  
        \</div\>  
        \<div class="pillar"\>  
          \<div class="pillar-num"\>03\</div\>  
          \<h3 class="pillar-title"\>The Seeker Finds\</h3\>  
          \<p class="pillar-body"\>Anyone in transition can search the database freely. No subscription. No paywall. No gatekeeping. Type where you're going — we'll surface who's already been there. The mentor finds you.\</p\>  
        \</div\>  
      \</div\>  
    \</div\>  
  \</div\>

  \<div class="quote-section"\>  
    \<span class="section-label"\>The Goodwill Model\</span\>  
    \<h2 class="section-title"\>People give. \<em\>Others receive.\</em\>\<br\>The platform is the bridge.\</h2\>  
    \<blockquote\>  
      "Think of Goodwill. People bring what they've outgrown — their goods, their experience, their surplus — and the store makes it available to anyone who needs it. Seeker of Story works the same way. Founders bring what they've lived. Seekers receive what they need. \<em\>Free. Always.\</em\>"  
    \</blockquote\>  
    \<p style="font-size:0.82rem;font-weight:300;color:var(--mid-gray);line-height:1.9;max-width:600px;margin:0 auto;"\>  
      This is not about accolades. It's not about revenue sharing. It's about a founder becoming a motivational speaker to someone who just lost everything — and not even knowing it. The verse says it plainly: there is life and death in the power of the tongue. The founder who shares their story has instantly spoken life.  
    \</p\>  
  \</div\>

  \<div class="susy-section"\>  
    \<div class="susy-inner"\>  
      \<div class="susy-photo-wrap"\>  
        \<img src="https://images.squarespace-cdn.com/content/6717e9edf71cd7695982c081/8a2092e9-222d-46e6-9f7a-e7634cb350a5/ChatGPT+Image+Feb+4%2C+2026%2C+07\_36\_13+PM.png?content-type=image%2Fpng" alt="Susy Gordon" class="susy-photo"\>  
        \<div class="susy-photo-accent"\>\</div\>  
      \</div\>  
      \<div class="susy-content"\>  
        \<span class="section-label"\>The Founder\</span\>  
        \<h2 class="section-title"\>Meet \<em\>Susy Gordon\</em\>\</h2\>  
        \<p\>Susy Gordon is a story collector. She exists to find people's stories and share them so others can find their path. The car is her studio. The road is her stage. Every passenger carries a blueprint someone else needs.\</p\>  
        \<p\>What started in ministry — interviewing passengers, collecting stories, giving them freely — has evolved into a full media and production company. The mission hasn't changed. The model has.\</p\>  
        \<p\>Seeker of Story is the non-profit expression of that mission. Powered by Mega Mission Media. Fueled by Matthew 7:7.\</p\>  
        \<a href="https://calendly.com/susy-megamissionmedia/30min" target="\_blank" class="btn-primary" style="margin-top:1rem;"\>Schedule a Call with Susy →\</a\>  
      \</div\>  
    \</div\>  
  \</div\>

\</section\>

\<\!-- ══ FOUNDING STORIES ══ \--\>  
\<section id="stories"\>

  \<div class="dark-hero"\>  
    \<span class="section-label"\>Proof of Concept — Already in Flight\</span\>  
    \<h2 class="section-title"\>Meet the \<em\>Founding Stories\</em\>\</h2\>  
    \<p\>These founders have already documented their roadmap. Their Becoming Stories are live on YouTube and available on all major podcast platforms. They were the first to give back.\</p\>  
  \</div\>

  \<div class="stories-grid-wrap"\>  
    \<div class="stories-inner"\>  
      \<div class="stories-grid"\>

        \<\!-- Carrie \--\>  
        \<div class="story-card" onclick="openModal('carrie')"\>  
          \<img src="https://images.squarespace-cdn.com/content/6717e9edf71cd7695982c081/040c02b8-a972-4739-a991-e9f4c65a7aa2/IMG\_5691.JPEG?content-type=image%2Fjpeg" alt="Carrie Carter" class="story-card-photo"\>  
          \<div class="story-card-body"\>  
            \<span class="story-card-tag"\>Founding Story \#001\</span\>  
            \<h3 class="story-card-name"\>Carrie Carter\</h3\>  
            \<p class="story-card-biz"\>Cowtown Tour Company · ACN Entrepreneur\</p\>  
            \<div class="journey-row"\>  
              \<span class="journey-from"\>25 Yrs in Tech\</span\>  
              \<span class="journey-arrow"\>→\</span\>  
              \<span class="journey-to"\>Tour Company Founder\</span\>  
            \</div\>  
            \<p class="story-card-excerpt"\>From a 25-year career in technology to launching Fort Worth's most vibrant tour experience — Carrie's story is about bold pivots, rhinestones, and trusting the leap.\</p\>  
            \<div class="asset-tags"\>  
              \<span class="asset-tag on"\>Becoming Page\</span\>  
              \<span class="asset-tag on"\>Ride \&amp; Share\</span\>  
            \</div\>  
            \<button class="view-btn"\>View Becoming Story →\</button\>  
          \</div\>  
        \</div\>

        \<\!-- Yoel \--\>  
        \<div class="story-card" onclick="openModal('yoel')"\>  
          \<img src="https://images.squarespace-cdn.com/content/6717e9edf71cd7695982c081/4955b7da-bd9c-4813-aa12-88785a3c8158/ChatGPT+Image+Mar+23%2C+2026%2C+07\_05\_52+PM.png?content-type=image%2Fpng" alt="Yoel Zehaie" class="story-card-photo"\>  
          \<div class="story-card-body"\>  
            \<span class="story-card-tag"\>Founding Story \#002\</span\>  
            \<h3 class="story-card-name"\>Yoel Zehaie\</h3\>  
            \<p class="story-card-biz"\>Zehaie Law\</p\>  
            \<div class="journey-row"\>  
              \<span class="journey-from"\>Law School Graduate\</span\>  
              \<span class="journey-arrow"\>→\</span\>  
              \<span class="journey-to"\>Law Firm Founder\</span\>  
            \</div\>  
            \<p class="story-card-excerpt"\>Yoel built his law practice from the ground up — website, brand, jingle, and full blueprint. His story shows exactly what it takes to launch a practice with purpose.\</p\>  
            \<div class="asset-tags"\>  
              \<span class="asset-tag on"\>Becoming Page\</span\>  
              \<span class="asset-tag on"\>Ride \&amp; Share\</span\>  
              \<span class="asset-tag on"\>Digital Home\</span\>  
              \<span class="asset-tag on"\>Sonic Brand\</span\>  
            \</div\>  
            \<button class="view-btn"\>View Becoming Story →\</button\>  
          \</div\>  
        \</div\>

        \<\!-- Placeholders \#3–\#4 \--\>  
        \<div class="story-card placeholder-card" style="cursor:default;"\>  
          \<div class="placeholder-photo"\>\<span style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-style:italic;color:var(--mid-gray);"\>Story Coming Soon\</span\>\</div\>  
          \<div class="story-card-body"\>  
            \<span class="story-card-tag"\>Founding Story \#003\</span\>  
            \<h3 class="story-card-name" style="color:var(--mid-gray);"\>Your Name Here\</h3\>  
            \<p class="story-card-biz"\>Your Business · Fort Worth, TX\</p\>  
            \<p class="story-card-excerpt" style="font-style:italic;"\>Are you one of the Founding 10? Your story belongs here.\</p\>  
            \<a href="https://calendly.com/susy-megamissionmedia/30min" target="\_blank" class="view-btn"\>Claim This Spot →\</a\>  
          \</div\>  
        \</div\>

        \<div class="story-card placeholder-card" style="cursor:default;"\>  
          \<div class="placeholder-photo"\>\<span style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-style:italic;color:var(--mid-gray);"\>Story Coming Soon\</span\>\</div\>  
          \<div class="story-card-body"\>  
            \<span class="story-card-tag"\>Founding Story \#004\</span\>  
            \<h3 class="story-card-name" style="color:var(--mid-gray);"\>Your Name Here\</h3\>  
            \<p class="story-card-biz"\>Your Business · Fort Worth, TX\</p\>  
            \<p class="story-card-excerpt" style="font-style:italic;"\>Are you one of the Founding 10? Your story belongs here.\</p\>  
            \<a href="https://calendly.com/susy-megamissionmedia/30min" target="\_blank" class="view-btn"\>Claim This Spot →\</a\>  
          \</div\>  
        \</div\>

      \</div\>

      \<div class="founding10-cta"\>  
        \<span class="section-label" style="display:block;margin-bottom:1rem;"\>The Ask\</span\>  
        \<h3 style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;margin-bottom:1rem;"\>We are looking for the \<em style="font-style:italic;color:var(--gold);"\>Founding 10\</em\>\</h3\>  
        \<p style="font-size:0.85rem;color:var(--mid-gray);font-weight:300;line-height:1.9;max-width:520px;margin:0 auto 2rem;"\>Ten founders ready to document their roadmap and become the bridge for the next generation of seekers. Your story — told once — lives here forever. Are you one of them?\</p\>  
        \<a href="https://calendly.com/susy-megamissionmedia/30min" target="\_blank" class="btn-primary"\>Claim Your Spot →\</a\>  
      \</div\>  
    \</div\>  
  \</div\>

\</section\>

\<\!-- FOOTER \--\>  
\<footer\>  
  \<strong\>Seeker of Story\</strong\> \&nbsp;·\&nbsp; Fort Worth, TX \&nbsp;·\&nbsp; Matthew 7:7\<br\>\<br\>  
  Powered by \<strong\>Mega Mission Media\</strong\> \&nbsp;·\&nbsp;  
  \<a href="tel:8178608989"\>817-860-8989\</a\> \&nbsp;·\&nbsp; megamissionmedia.com\<br\>\<br\>  
  © 2026 Seeker of Story. All rights reserved. No paywalls. No subscriptions. Always free.  
\</footer\>

\<\!-- ══ MODALS ══ \--\>  
\<div class="modal-overlay" id="modal-carrie" onclick="closeModal(event,'carrie')"\>  
  \<div class="modal"\>  
    \<button class="modal-close" onclick="closeModalDirect('carrie')"\>✕\</button\>  
    \<div class="modal-header"\>  
      \<img src="https://images.squarespace-cdn.com/content/6717e9edf71cd7695982c081/040c02b8-a972-4739-a991-e9f4c65a7aa2/IMG\_5691.JPEG?content-type=image%2Fjpeg" alt="Carrie Carter" class="modal-photo"\>  
      \<div class="modal-head-info"\>  
        \<span class="modal-tag"\>Founding Story \#001\</span\>  
        \<h2 class="modal-name"\>Carrie Carter\</h2\>  
        \<p class="modal-biz"\>Cowtown Tour Company · ACN Entrepreneur\</p\>  
        \<div class="modal-journey"\>  
          \<span class="modal-from"\>25 Years in Tech\</span\>  
          \<span style="color:var(--gold)"\>→\</span\>  
          \<span class="modal-to"\>Tour Company Founder\</span\>  
        \</div\>  
      \</div\>  
    \</div\>  
    \<div class="modal-body"\>  
      \<div class="video-placeholder"\>\<div class="video-placeholder-text"\>▶ \&nbsp; Ride \&amp; Share Interview\<br\>\<span style="font-size:0.7rem;font-family:'Montserrat',sans-serif;font-style:normal;letter-spacing:0.1em;margin-top:0.5rem;display:block;"\>Video placeholder — drop YouTube link to activate\</span\>\</div\>\</div\>  
      \<div class="modal-sec"\>\<div class="modal-sec-title"\>Who She Was\</div\>\<p\>Carrie spent 25 years building a career in the technology industry. She was accomplished, established, and by every measure — successful. But something was calling her toward something more authentically her own.\</p\>\</div\>  
      \<div class="modal-sec"\>\<div class="modal-sec-title"\>What She Built\</div\>\<p\>Cowtown Tour Company — Fort Worth's most vibrant guided tour experience. Bold flavors, real Fort Worth culture, guided group and private tours. She also expanded into ACN entrepreneurship, building a business on her own terms.\</p\>\</div\>  
      \<div class="modal-sec"\>\<div class="modal-sec-title"\>Why She Built It\</div\>\<p\>Because Fort Worth's story deserves to be told — and she was the one to tell it. After decades of building someone else's vision, Carrie was ready to build her own. The rhinestones, the cowboy hat, the sparkle — that's not costume. That's identity.\</p\>\</div\>  
      \<div class="modal-sec"\>  
        \<div class="modal-sec-title"\>How She Did It — The Blueprint\</div\>  
        \<div class="blueprint-grid"\>  
          \<div class="blueprint-item"\>\<span class="blueprint-cat"\>Website\</span\>\<span class="blueprint-val"\>\<a href="https://www.cowtowntourco.com/" target="\_blank" style="color:var(--accent-teal);"\>cowtowntourco.com\</a\>\</span\>\</div\>  
          \<div class="blueprint-item"\>\<span class="blueprint-cat"\>Contact\</span\>\<span class="blueprint-val"\>682.233.3835\</span\>\</div\>  
          \<div class="blueprint-item"\>\<span class="blueprint-cat"\>Services\</span\>\<span class="blueprint-val"\>Guided, Group \&amp; Private Tours\</span\>\</div\>  
          \<div class="blueprint-item"\>\<span class="blueprint-cat"\>Platform\</span\>\<span class="blueprint-val"\>ACN Entrepreneurship\</span\>\</div\>  
        \</div\>  
      \</div\>  
    \</div\>  
  \</div\>  
\</div\>

\<div class="modal-overlay" id="modal-yoel" onclick="closeModal(event,'yoel')"\>  
  \<div class="modal"\>  
    \<button class="modal-close" onclick="closeModalDirect('yoel')"\>✕\</button\>  
    \<div class="modal-header"\>  
      \<img src="https://images.squarespace-cdn.com/content/6717e9edf71cd7695982c081/4955b7da-bd9c-4813-aa12-88785a3c8158/ChatGPT+Image+Mar+23%2C+2026%2C+07\_05\_52+PM.png?content-type=image%2Fpng" alt="Yoel Zehaie" class="modal-photo"\>  
      \<div class="modal-head-info"\>  
        \<span class="modal-tag"\>Founding Story \#002\</span\>  
        \<h2 class="modal-name"\>Yoel Zehaie\</h2\>  
        \<p class="modal-biz"\>Zehaie Law\</p\>  
        \<div class="modal-journey"\>  
          \<span class="modal-from"\>Law School Graduate\</span\>  
          \<span style="color:var(--gold)"\>→\</span\>  
          \<span class="modal-to"\>Law Firm Founder\</span\>  
        \</div\>  
      \</div\>  
    \</div\>  
    \<div class="modal-body"\>  
      \<div class="video-placeholder"\>\<div class="video-placeholder-text"\>▶ \&nbsp; Ride \&amp; Share Interview\<br\>\<span style="font-size:0.7rem;font-family:'Montserrat',sans-serif;font-style:normal;letter-spacing:0.1em;margin-top:0.5rem;display:block;"\>Video placeholder — drop YouTube link to activate\</span\>\</div\>\</div\>  
      \<div class="modal-sec"\>\<div class="modal-sec-title"\>Who He Was\</div\>\<p\>Yoel Zehaie completed law school with the knowledge and the credential — but the path from graduate to firm founder is one that nobody fully prepares you for. He had the degree. He needed the blueprint.\</p\>\</div\>  
      \<div class="modal-sec"\>\<div class="modal-sec-title"\>What He Built\</div\>\<p\>Zehaie Law — a purpose-driven law practice built from the ground up. From the branding to the website to the jingle that anchors his identity, every asset was intentionally built to represent who he is and what he stands for.\</p\>\</div\>  
      \<div class="modal-sec"\>\<div class="modal-sec-title"\>Why He Built It\</div\>\<p\>Because the law should be accessible. Because representation matters. Because building something of your own — with your name on the door — is worth every obstacle it takes to get there.\</p\>\</div\>  
      \<div class="modal-sec"\>  
        \<div class="modal-sec-title"\>How He Did It — The Blueprint\</div\>  
        \<div class="blueprint-grid"\>  
          \<div class="blueprint-item"\>\<span class="blueprint-cat"\>Website\</span\>\<span class="blueprint-val"\>\<a href="https://www.CallYoelNow.com" target="\_blank" style="color:var(--accent-teal);"\>CallYoelNow.com\</a\>\</span\>\</div\>  
          \<div class="blueprint-item"\>\<span class="blueprint-cat"\>Sonic Brand\</span\>\<span class="blueprint-val"\>Custom jingle by Mega Mission Media\</span\>\</div\>  
          \<div class="blueprint-item"\>\<span class="blueprint-cat"\>Ride \&amp; Share\</span\>\<span class="blueprint-val"\>YouTube \+ Buzzsprout\</span\>\</div\>  
          \<div class="blueprint-item"\>\<span class="blueprint-cat"\>Practice Area\</span\>\<span class="blueprint-val"\>Full details at CallYoelNow.com\</span\>\</div\>  
        \</div\>  
      \</div\>  
    \</div\>  
  \</div\>  
\</div\>

\<script\>  
// NAV  
function showSection(id) {  
  document.querySelectorAll('section').forEach(s \=\> s.classList.remove('visible'));  
  document.getElementById(id).classList.add('visible');  
  document.querySelectorAll('.nav-links a').forEach(a \=\> a.classList.remove('active'));  
  const el \= document.getElementById('nav-' \+ id);  
  if (el) el.classList.add('active');  
  window.scrollTo(0, 0);  
  if (id \!== 'home') resetSearch();  
}

// MODALS  
function openModal(id) { document.getElementById('modal-' \+ id).classList.add('open'); document.body.style.overflow \= 'hidden'; }  
function closeModalDirect(id) { document.getElementById('modal-' \+ id).classList.remove('open'); document.body.style.overflow \= ''; }  
function closeModal(e, id) { if (e.target \=== document.getElementById('modal-' \+ id)) closeModalDirect(id); }

// FOUNDER DATABASE  
const FOUNDERS \= \[  
  {  
    id: 'carrie',  
    name: 'Carrie Carter',  
    business: 'Cowtown Tour Company · ACN Entrepreneur',  
    from: '25 Years in Tech',  
    to: 'Tour Company Founder',  
    fromKw: \['tech', 'technology', 'it', 'consultant', 'corporate', 'business', 'manager', 'executive', 'software', 'computer'\],  
    toKw: \['tour', 'tourism', 'entrepreneur', 'hospitality', 'experience', 'founder', 'guide', 'travel', 'business owner', 'operator'\],  
    excerpt: 'From a 25-year career in technology to launching Fort Worth\\'s most vibrant tour experience — Carrie\\'s story is about bold pivots, rhinestones, and trusting the leap.',  
    tag: 'Founding Story \#001',  
    defaultWhy: 'Made the leap from a long corporate career to founding her own experience business — knows exactly what it takes to start over.'  
  },  
  {  
    id: 'yoel',  
    name: 'Yoel Zehaie',  
    business: 'Zehaie Law',  
    from: 'Law School Graduate',  
    to: 'Law Firm Founder',  
    fromKw: \['law', 'lawyer', 'attorney', 'legal', 'graduate', 'student', 'school', 'paralegal', 'clerk', 'justice'\],  
    toKw: \['law', 'lawyer', 'attorney', 'legal', 'firm', 'practice', 'founder', 'business owner', 'counsel', 'litigator'\],  
    excerpt: 'Yoel built his law practice from the ground up — website, brand, jingle, and blueprint. His story shows exactly what it takes to launch a practice with purpose.',  
    tag: 'Founding Story \#002',  
    defaultWhy: 'Built a full law practice from scratch and documented every step — branding, website, marketing, and mindset.'  
  }  
\];

function scoreMatch(f, fromTxt, toTxt) {  
  let s \= 0;  
  const from \= fromTxt.toLowerCase();  
  const to \= toTxt.toLowerCase();  
  if (from) f.fromKw.forEach(k \=\> { if (from.includes(k) || k.includes(from.split(' ')\[0\])) s \+= 2; });  
  f.toKw.forEach(k \=\> { if (to.includes(k) || k.includes(to.split(' ')\[0\])) s \+= 3; });  
  return s;  
}

function resetSearch() {  
  document.getElementById('results-band').classList.remove('visible');  
  document.getElementById('search-loading').classList.remove('visible');  
}

async function runSearch() {  
  const fromVal \= document.getElementById('search-from').value.trim();  
  const toVal \= document.getElementById('search-to').value.trim();  
  if (\!toVal) { document.getElementById('search-to').focus(); document.getElementById('search-to').style.borderColor \= 'var(--gold)'; return; }

  document.getElementById('search-loading').classList.add('visible');  
  document.getElementById('results-band').classList.remove('visible');  
  document.getElementById('search-btn').disabled \= true;

  let matchMap \= {};

  try {  
    const res \= await fetch("https://api.anthropic.com/v1/messages", {  
      method: "POST",  
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify({  
        model: "claude-sonnet-4-20250514",  
        max\_tokens: 1000,  
        system: \`You are the Seeker of Story mentor-matching AI. Match seekers to the most relevant founders in our database. Return ONLY a valid JSON array. Format: \[{"id":"founder\_id","why":"1-2 warm, encouraging sentences explaining the connection"}\]. Always return at least one result. Find the most meaningful connection even if the match isn't perfect.\`,  
        messages: \[{  
          role: "user",  
          content: \`Seeker background: "${fromVal || 'not specified'}"\\nSeeker goal: "${toVal}"\\n\\nFounders:\\n${JSON.stringify(FOUNDERS.map(f \=\> ({id:f.id,name:f.name,from:f.from,to:f.to,business:f.business})),null,2)}\\n\\nReturn JSON array of matches with warm "why" explanations.\`  
        }\]  
      })  
    });  
    const data \= await res.json();  
    const txt \= data.content.map(c \=\> c.text || '').join('').replace(/\`\`\`json|\`\`\`/g,'').trim();  
    const parsed \= JSON.parse(txt);  
    parsed.forEach(m \=\> { matchMap\[m.id\] \= m.why; });  
  } catch (e) {  
    // fallback: local scoring  
    const scored \= FOUNDERS.map(f \=\> ({...f, score: scoreMatch(f, fromVal, toVal)})).sort((a,b) \=\> b.score \- a.score);  
    scored.forEach(f \=\> { matchMap\[f.id\] \= f.defaultWhy; });  
  }

  // Build ordered result list — LLM matched first, then fill  
  const matchedIds \= Object.keys(matchMap);  
  const allIds \= \[...matchedIds, ...FOUNDERS.filter(f \=\> \!matchedIds.includes(f.id)).map(f \=\> f.id)\];

  renderResults(allIds, matchMap, fromVal, toVal);  
  document.getElementById('search-btn').disabled \= false;  
}

function renderResults(ids, matchMap, fromVal, toVal) {  
  document.getElementById('search-loading').classList.remove('visible');

  const toDisplay \= toVal || 'your goal';  
  const fromDisplay \= fromVal ? \` from \<em\>${fromVal}\</em\>\` : '';  
  document.getElementById('results-label').textContent \= \`${ids.length} Mentor${ids.length \!== 1 ? 's' : ''} Found\`;  
  document.getElementById('results-title').innerHTML \= \`Mentors who made the leap${fromDisplay} → \<em\>${toDisplay}\</em\>\`;

  const grid \= document.getElementById('results-grid');  
  grid.innerHTML \= '';

  ids.forEach(id \=\> {  
    const f \= FOUNDERS.find(x \=\> x.id \=== id);  
    if (\!f) return;  
    const why \= matchMap\[id\] || f.defaultWhy;  
    const card \= document.createElement('div');  
    card.className \= 'result-card';  
    card.onclick \= () \=\> openModal(f.id);  
    card.innerHTML \= \`  
      \<span class="result-tag"\>${f.tag}\</span\>  
      \<div class="result-name"\>${f.name}\</div\>  
      \<div class="result-biz"\>${f.business}\</div\>  
      \<div class="journey-row"\>  
        \<span class="journey-from"\>${f.from}\</span\>  
        \<span class="journey-arrow"\>→\</span\>  
        \<span class="journey-to"\>${f.to}\</span\>  
      \</div\>  
      \<p class="match-why"\>✦ ${why}\</p\>  
      \<p class="result-excerpt"\>${f.excerpt}\</p\>  
      \<button class="view-btn"\>View Their Blueprint →\</button\>  
    \`;  
    grid.appendChild(card);  
  });

  document.getElementById('results-band').classList.add('visible');  
  document.getElementById('results-band').scrollIntoView({ behavior: 'smooth', block: 'start' });  
}

document.addEventListener('keydown', e \=\> { if (e.key \=== 'Enter') runSearch(); });  
\</script\>  
\</body\>  
\</html\>  
