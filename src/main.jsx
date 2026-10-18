import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import './styles.css'

const contact = {
  name: 'Architekt Marcin Kuryłowicz',
  phone: '+48 790 025 301',
  phoneHref: 'tel:+48790025301',
  email: 'architektmarcinkurylowicz@gmail.com',
  publicEmail: 'pracownia@unicadesign.pl',
  address: 'Warszawska 91a lok. 4',
  city: '05-120 Legionowo, Polska',
  website: 'https://www.unicadesign.pl'
}

const pages = {
  '/': {
    eyebrow: 'Pracownia architektoniczna / Legionowo',
    title: 'Architekt w Legionowie, który porządkuje przestrzeń',
    description: 'Architekt Marcin Kuryłowicz z Legionowa. Porozmawiajmy o Twojej przestrzeni i ustalmy zakres prac dopasowany do potrzeb.',
    intro: 'Dobra przestrzeń zaczyna się od uważnej rozmowy.',
  },
  '/oferta': {
    eyebrow: 'Oferta / Legionowo i okolice',
    title: 'Oferta architekta w Legionowie dopasowana do Twojego projektu',
    description: 'Poznaj sposób współpracy z Architektem Marcinem Kuryłowiczem. Zakres prac ustalany jest indywidualnie podczas bezpośredniej rozmowy.',
    intro: 'Zakres prac ustalamy razem, na podstawie Twojej sytuacji i celu.',
  },
  '/realizacje': {
    eyebrow: 'Realizacje / portfolio',
    title: 'Realizacje architektoniczne w Legionowie i okolicach',
    description: 'Portfolio Architekta Marcina Kuryłowicza. Strona przygotowana do prezentacji kolejnych realizacji i projektów.',
    intro: 'To miejsce będzie rosnąć razem z kolejnymi projektami.',
  },
  '/kontakt': {
    eyebrow: 'Kontakt / Legionowo',
    title: 'Kontakt z architektem w Legionowie',
    description: 'Skontaktuj się z Architektem Marcinem Kuryłowiczem. Telefon, e-mail i adres pracowni w Legionowie.',
    intro: 'Opowiedz krótko, czego potrzebujesz. Wrócimy do Ciebie z kolejnym krokiem.',
  }
}

function usePath() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/')
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname.replace(/\/$/, '') || '/')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

function navigate(event, href) {
  if (href.startsWith('/')) {
    event.preventDefault()
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function Seo({ path }) {
  const meta = pages[path] || pages['/']
  useEffect(() => {
    document.title = `${meta.title} | AMK`
    document.documentElement.lang = 'pl'
    const setMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let el = document.head.querySelector(selector)
      if (!el) { el = document.createElement('meta'); property ? el.setAttribute('property', name) : el.setAttribute('name', name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    setMeta('description', meta.description)
    setMeta('keywords', 'architekt Legionowo, projektant Legionowo, pracownia architektoniczna Legionowo, architekt Warszawska 91a')
    setMeta('og:type', 'website', true)
    setMeta('og:title', `${meta.title} | AMK`, true)
    setMeta('og:description', meta.description, true)
    setMeta('og:site_name', 'AMK - Architekt Marcin Kuryłowicz', true)
    setMeta('twitter:card', 'summary', false)
    setMeta('twitter:title', `${meta.title} | AMK`, false)
    setMeta('twitter:description', meta.description, false)
    const siteUrl = import.meta.env.VITE_SITE_URL
    if (siteUrl) {
      let canonical = document.head.querySelector('link[rel="canonical"]')
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
      canonical.href = `${siteUrl}${path === '/' ? '/' : path}`
    }
  }, [path, meta])
  return null
}

function Brand() {
  return <a className="brand" href="/" onClick={(e) => navigate(e, '/')} aria-label="AMK - strona główna">
    <span className="brand-mark">AMK</span><span className="brand-name">Architekt<br /><b>Marcin Kuryłowicz</b></span>
  </a>
}

function Header({ path }) {
  const [open, setOpen] = useState(false)
  const links = [['/', 'Start'], ['/oferta', 'Oferta'], ['/realizacje', 'Realizacje'], ['/kontakt', 'Kontakt']]
  return <header className="site-header">
    <div className="container header-inner"><Brand />
      <nav className={`desktop-nav ${open ? 'is-open' : ''}`} aria-label="Główna nawigacja">
        {links.map(([href, label]) => <a key={href} href={href} className={path === href ? 'active' : ''} onClick={(e) => { navigate(e, href); setOpen(false) }}>{label}</a>)}
      </nav>
      <a className="header-phone" href={contact.phoneHref}><Phone size={15} /> <span>{contact.phone}</span></a>
      <button className="menu-toggle" aria-label={open ? 'Zamknij menu' : 'Otwórz menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div><Brand /><p className="footer-note">Przestrzeń zaczyna się od rozmowy.</p></div>
    <div><p className="footer-label">Kontakt</p><a href={contact.phoneHref}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={`mailto:${contact.publicEmail}`}>{contact.publicEmail}</a></div>
    <div><p className="footer-label">Pracownia</p><p>{contact.address}<br />{contact.city}</p><a href={contact.website} target="_blank" rel="noreferrer">unicadesign.pl <ArrowUpRight size={14} /></a></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AMK</span><span>Architekt Marcin Kuryłowicz</span></div></footer>
}

function ContactStrip() { return <div className="contact-strip"><div className="container contact-strip-inner"><span>Porozmawiajmy o Twoim projekcie.</span><a href={contact.phoneHref}>Zadzwoń: {contact.phone} <ArrowUpRight size={17} /></a></div></div> }

function Home() { return <>
  <main><section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">{pages['/'].eyebrow}</p><h1>{pages['/'].title}</h1><p className="hero-lead">{pages['/'].intro} Bez gotowych schematów. Najpierw poznajemy potrzeby, potem szukamy najlepszego kierunku.</p><div className="hero-actions"><a className="button button-dark" href="/kontakt" onClick={(e) => navigate(e, '/kontakt')}>Porozmawiajmy <ArrowUpRight size={18} /></a><a className="text-link" href={contact.phoneHref}><Phone size={16} /> {contact.phone}</a></div></div><div className="hero-art" aria-label="Monogram AMK"><div className="art-ring"></div><div className="art-monogram">AMK<span>ARCHITEKT<br />MARCIN KURYŁOWICZ</span></div><div className="art-caption">Legionowo / Polska<br />Pracownia projektowa</div></div></div></section>
  <section className="statement section"><div className="container split"><p className="section-kicker">01 / podejście</p><div><h2>Przestrzeń, która ma sens dla Ciebie.</h2><p className="large-copy">Każdy projekt zaczyna się inaczej. Dlatego współpracę zaczynamy od rozmowy o miejscu, potrzebach i kierunku, który chcesz obrać.</p><a className="text-link" href="/oferta" onClick={(e) => navigate(e, '/oferta')}>Zobacz, jak możemy zacząć <ArrowUpRight size={17} /></a></div></div></section>
  <section className="dark-section section"><div className="container split"><div><p className="section-kicker light">02 / współpraca</p><h2>Od pierwszej myśli do konkretnego następnego kroku.</h2></div><div className="process-list"><div><b>01</b><span>Kontaktujesz się i opowiadasz o swoim projekcie.</span></div><div><b>02</b><span>Rozmawiamy o potrzebach, miejscu i możliwym zakresie prac.</span></div><div><b>03</b><span>Ustalamy kierunek dalszej współpracy.</span></div></div></div></section>
  <section className="faq section"><div className="container split"><div><p className="section-kicker">03 / pytania</p><h2>Zanim napiszesz</h2></div><div className="faq-list"><details><summary>Gdzie działa pracownia? <ChevronDown size={18} /></summary><p>Pracownia mieści się przy ul. Warszawskiej 91a lok. 4 w Legionowie. Zakres i obszar współpracy najlepiej ustalić bezpośrednio.</p></details><details><summary>Jak najlepiej się skontaktować? <ChevronDown size={18} /></summary><p>Możesz zadzwonić pod numer +48 790 025 301 lub napisać na architektmarcinkurylowicz@gmail.com.</p></details><details><summary>Czy przed rozmową muszę mieć gotowy brief? <ChevronDown size={18} /></summary><p>Nie. Wystarczy krótko opisać, czego potrzebujesz. Pierwsza rozmowa pomaga uporządkować temat.</p></details></div></div></section>
  </main><ContactStrip />
</> }

function PageIntro({ path, index }) { const meta = pages[path]; return <section className="page-intro"><div className="container"><p className="eyebrow">{meta.eyebrow}</p><div className="page-heading"><span className="page-index">0{index}</span><h1>{meta.title}</h1></div><p className="hero-lead">{meta.intro}</p></div></section> }
function Offer() { return <><main><PageIntro path="/oferta" index="2" /><section className="section offer-content"><div className="container split"><div><p className="section-kicker">Zakres współpracy</p><h2>Najpierw kontekst. Później rozwiązania.</h2></div><div><p className="large-copy">Na podstawie dostępnych materiałów nie opisujemy gotowego katalogu usług. Zakres prac jest ustalany indywidualnie podczas bezpośredniego kontaktu, z uwzględnieniem potrzeb i celu projektu.</p><a className="button button-dark" href="/kontakt" onClick={(e) => navigate(e, '/kontakt')}>Ustalmy zakres <ArrowUpRight size={18} /></a></div></div></section><section className="dark-section section"><div className="container split"><div><p className="section-kicker light">Obszar działania</p><h2>Legionowo i okolice</h2></div><div><p className="large-copy light-copy">Punktem kontaktu jest pracownia przy ul. Warszawskiej 91a w Legionowie. O możliwość współpracy poza najbliższym obszarem zapytaj bezpośrednio.</p></div></div></section></main><ContactStrip /></> }
function Realisations() { return <><main><PageIntro path="/realizacje" index="3" /><section className="section portfolio-empty"><div className="container portfolio-frame"><div className="portfolio-stamp">AMK<br /><span>PORTFOLIO</span></div><div><p className="section-kicker">Przestrzeń na projekty</p><h2>Realizacje pojawią się tutaj wkrótce.</h2><p className="large-copy">Ta podstrona jest gotowa na prezentację kolejnych projektów i realizacji. Nie publikujemy fikcyjnych zdjęć ani opisów. Wróć tu, aby zobaczyć aktualne materiały pracowni.</p></div></div></section></main><ContactStrip /></> }
function Contact() { return <><main><PageIntro path="/kontakt" index="4" /><section className="section contact-content"><div className="container contact-grid"><div><p className="section-kicker">Napisz lub zadzwoń</p><h2>Opowiedz o swoim projekcie.</h2><p className="large-copy">Krótka wiadomość wystarczy, aby rozpocząć rozmowę.</p></div><div className="contact-cards"><a className="contact-card" href={contact.phoneHref}><span><Phone /></span><div><small>Telefon</small><strong>{contact.phone}</strong></div><ArrowUpRight /></a><a className="contact-card" href={`mailto:${contact.email}`}><span><Mail /></span><div><small>E-mail</small><strong>{contact.email}</strong></div><ArrowUpRight /></a><div className="contact-card"><span><MapPin /></span><div><small>Adres pracowni</small><strong>{contact.address}<br />{contact.city}</strong></div></div></div></div></section><section className="map-section"><div className="container map-card"><div><p className="section-kicker">Legionowo / Polska</p><h2>Warszawska 91a lok. 4</h2><p>Wizytę najlepiej ustalić wcześniej telefonicznie lub mailowo.</p></div><a className="button button-light" href="https://www.google.com/maps/search/?api=1&query=Warszawska+91a+Legionowo" target="_blank" rel="noreferrer">Otwórz mapę <ArrowUpRight size={18} /></a></div></section></main><ContactStrip /></> }

function App() { const path = usePath(); const valid = pages[path] ? path : '/'; useEffect(() => { const schema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: contact.name, telephone: contact.phone, email: contact.email, address: { '@type': 'PostalAddress', streetAddress: contact.address, addressLocality: 'Legionowo', postalCode: '05-120', addressCountry: 'PL' }, areaServed: 'Legionowo', url: window.location.origin }; let script = document.getElementById('amk-schema'); if (!script) { script = document.createElement('script'); script.id = 'amk-schema'; script.type = 'application/ld+json'; document.head.appendChild(script) } script.textContent = JSON.stringify(schema) }, [])
  return <><Seo path={valid} /><Header path={valid} />{valid === '/' ? <Home /> : valid === '/oferta' ? <Offer /> : valid === '/realizacje' ? <Realisations /> : <Contact />}<Footer /></> }

createRoot(document.getElementById('root')).render(<App />)
