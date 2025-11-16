import React, { useEffect, useMemo, useState, createContext, useContext } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon, Download, Mail, ArrowUp, Github, Linkedin, Instagram, Globe } from 'lucide-react'
import Spline from '@splinetool/react-spline'

// ---------------- Theme (light/dark) ----------------
const ThemeContext = createContext()
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
const useTheme = () => useContext(ThemeContext)

// ---------------- I18n (EN/ID) ----------------
const I18nContext = createContext()
const translations = {
  en: {
    nav: ['Home','About','Education','Certificates','Experience','Organizations','Projects','Portfolio','Skills','Contact'],
    title: 'Web Developer',
    tagline: 'I craft modern, fast and accessible web experiences.',
    ctaDownload: 'Download CV',
    ctaContact: 'Contact Me',
    aboutTitle: 'About',
    aboutBody: 'I am a passionate developer focused on building performant, delightful user interfaces and robust frontends.',
    highlights: ['Modern UI/UX','Performance-first','Accessible by design'],
    educationTitle: 'Education',
    certificatesTitle: 'Certificates',
    experienceTitle: 'Experience',
    organizationsTitle: 'Organizations',
    projectsTitle: 'Projects',
    portfolioTitle: 'Portfolio',
    skillsTitle: 'Skills',
    socialTitle: 'Social',
    contactTitle: 'Contact',
    contactSubtitle: 'Have a project or just want to say hi? Let’s talk!',
    formName: 'Your name',
    formEmail: 'Your email',
    formMessage: 'Your message',
    send: 'Send',
    sent: 'Opening your email app…',
    theme: 'Theme',
    language: 'Language',
    backToTop: 'Back to top',
    notFound: 'Page not found',
  },
  id: {
    nav: ['Beranda','Tentang','Pendidikan','Sertifikat','Pengalaman','Organisasi','Proyek','Portofolio','Keahlian','Kontak'],
    title: 'Pengembang Web',
    tagline: 'Saya membuat pengalaman web yang modern, cepat, dan aksesibel.',
    ctaDownload: 'Unduh CV',
    ctaContact: 'Hubungi Saya',
    aboutTitle: 'Tentang',
    aboutBody: 'Saya adalah pengembang yang berfokus pada antarmuka pengguna yang cepat dan menyenangkan serta frontend yang tangguh.',
    highlights: ['UI/UX Modern','Prioritas kinerja','Aksesibilitas sejak awal'],
    educationTitle: 'Pendidikan',
    certificatesTitle: 'Sertifikat',
    experienceTitle: 'Pengalaman',
    organizationsTitle: 'Organisasi',
    projectsTitle: 'Proyek',
    portfolioTitle: 'Portofolio',
    skillsTitle: 'Keahlian',
    socialTitle: 'Sosial',
    contactTitle: 'Kontak',
    contactSubtitle: 'Punya proyek atau sekadar menyapa? Ayo ngobrol!',
    formName: 'Nama Anda',
    formEmail: 'Email Anda',
    formMessage: 'Pesan Anda',
    send: 'Kirim',
    sent: 'Membuka aplikasi email…',
    theme: 'Tema',
    language: 'Bahasa',
    backToTop: 'Kembali ke atas',
    notFound: 'Halaman tidak ditemukan',
  },
}
function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  useEffect(() => localStorage.setItem('lang', lang), [lang])
  const t = useMemo(() => translations[lang], [lang])
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}
const useI18n = () => useContext(I18nContext)

// ---------------- UI helpers ----------------
const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24">
    <div className="mx-auto max-w-6xl px-4">
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-8">
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
)

// ---------------- Navbar ----------------
function Navbar() {
  const { t, lang, setLang } = useI18n()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const links = t.nav.map((label, i) => ({ label, href: ['#home','#about','#education','#certificates','#experience','#organizations','#projects','#portfolio','#skills','#contact'][i] }))

  useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200/60 dark:border-gray-800">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="#home" className="font-semibold text-lg tracking-tight text-gray-900 dark:text-gray-100">YourName</a>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button aria-label={t.theme} onClick={toggle} className="p-2 rounded-md border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden" role="group" aria-label={t.language}>
            <button onClick={() => setLang('en')} className={`px-2 py-1 text-sm ${lang==='en'?'bg-gray-900 text-white dark:bg-white dark:text-gray-900':''}`}>EN</button>
            <button onClick={() => setLang('id')} className={`px-2 py-1 text-sm ${lang==='id'?'bg-gray-900 text-white dark:bg-white dark:text-gray-900':''}`}>ID</button>
          </div>
          <button className="md:hidden p-2 ml-1" onClick={() => setOpen(o=>!o)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-2 gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-gray-700 dark:text-gray-300 py-1">{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

// ---------------- Hero with Spline cover ----------------
function Hero() {
  const { t } = useI18n()
  return (
    <section id="home" className="relative h-[72vh] md:h-[78vh] flex items-center">
      <div className="absolute inset-0"><Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} /></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white dark:from-gray-950/60 dark:to-gray-950 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-lg ring-4 ring-white/50 dark:ring-gray-900/60 mb-6" aria-hidden="true" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Your Name</h1>
          <p className="mt-2 text-lg md:text-xl text-gray-700 dark:text-gray-300">{t.title}</p>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl">{t.tagline}</p>
          <div className="mt-6 flex items-center gap-3">
            <a href="/your-cv.pdf" download className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition">
              <Download size={18} /> {t.ctaDownload}
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Mail size={18} /> {t.ctaContact}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------------- Content Sections ----------------
function About() {
  const { t } = useI18n()
  return (
    <Section id="about" title={t.aboutTitle}>
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t.aboutBody}</p>
          <ul className="mt-6 grid sm:grid-cols-3 gap-3">
            {t.highlights.map((h) => (
              <li key={h} className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm">{h}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center md:justify-end">
          <img src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=600&auto=format&fit=crop" alt="Profile" loading="lazy" className="w-40 h-40 rounded-xl object-cover shadow" />
        </div>
      </div>
    </Section>
  )
}

function Education() {
  const { t } = useI18n()
  const items = [
    { school: 'State University', degree: 'B.Sc. Computer Science', years: '2016 - 2020' },
    { school: 'Tech Bootcamp', degree: 'Fullstack Web Course', years: '2021' },
  ]
  return (
    <Section id="education" title={t.educationTitle}>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it) => (
          <div key={it.school} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40">
            <div className="font-semibold text-gray-900 dark:text-gray-100">{it.school}</div>
            <div className="text-gray-600 dark:text-gray-400">{it.degree}</div>
            <div className="text-sm text-gray-500 dark:text-gray-500">{it.years}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Certificates() {
  const { t } = useI18n()
  const certs = [
    { name: 'Google Data Analytics', issuer: 'Coursera', link: '#' },
    { name: 'AWS Cloud Practitioner', issuer: 'Amazon', link: '#' },
    { name: 'React Developer', issuer: 'Meta', link: '#' },
  ]
  return (
    <Section id="certificates" title={t.certificatesTitle}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map(c => (
          <a key={c.name} href={c.link} target="_blank" rel="noreferrer" className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 hover:shadow transition">
            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:underline">{c.name}</div>
            <div className="text-sm text-gray-500">{c.issuer}</div>
          </a>
        ))}
      </div>
    </Section>
  )
}

function Experience() {
  const { t } = useI18n()
  const roles = [
    { role: 'Frontend Engineer', company: 'Acme Corp', period: '2022 - Present', desc: 'Building modern interfaces with React and Tailwind.' },
    { role: 'Web Developer', company: 'Startup XYZ', period: '2020 - 2022', desc: 'Developed SPA and landing pages, improved performance.' },
  ]
  return (
    <Section id="experience" title={t.experienceTitle}>
      <div className="relative pl-6">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
        <div className="space-y-6">
          {roles.map(r => (
            <div key={r.role} className="relative">
              <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400" />
              <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40">
                <div className="font-semibold text-gray-900 dark:text-gray-100">{r.role} • {r.company}</div>
                <div className="text-sm text-gray-500 mb-2">{r.period}</div>
                <p className="text-gray-700 dark:text-gray-300">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Organizations() {
  const { t } = useI18n()
  const orgs = [
    { name: 'GDG Community', role: 'Core Team', ach: 'Organized tech meetups and workshops.' },
    { name: 'Open Source', role: 'Contributor', ach: 'Contributed to UI libraries and docs.' },
  ]
  return (
    <Section id="organizations" title={t.organizationsTitle}>
      <div className="grid md:grid-cols-2 gap-4">
        {orgs.map(o => (
          <div key={o.name} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40">
            <div className="font-semibold text-gray-900 dark:text-gray-100">{o.name}</div>
            <div className="text-gray-600 dark:text-gray-300">{o.role}</div>
            <div className="text-sm text-gray-500">{o.ach}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Projects() {
  const { t } = useI18n()
  const projects = [
    { title: 'Portfolio Site', desc: 'Personal website with dark mode and i18n.', tech: ['React','Tailwind'], link: '#' },
    { title: 'Dashboard', desc: 'Analytics dashboard with charts.', tech: ['React','D3'], link: '#' },
    { title: 'API Service', desc: 'FastAPI microservice with auth.', tech: ['Python','FastAPI'], link: '#' },
  ]
  return (
    <Section id="projects" title={t.projectsTitle}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <a key={p.title} href={p.link} className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 hover:-translate-y-0.5 hover:shadow transition">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900 dark:text-gray-100">{p.title}</div>
              <Globe size={18} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200" />
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map(tk => (
                <span key={tk} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{tk}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}

function Portfolio() {
  const { t } = useI18n()
  const items = [
    { img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop', cat: 'Web' },
    { img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop', cat: 'App' },
    { img: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=800&auto=format&fit=crop', cat: 'Design' },
    { img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop', cat: 'Web' },
  ]
  const [filter, setFilter] = useState('All')
  const categories = ['All','Web','App','Design']
  const filtered = items.filter(i => filter==='All' || i.cat===filter)
  return (
    <Section id="portfolio" title={t.portfolioTitle}>
      <div className="flex gap-2 mb-6">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-sm border ${filter===c? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent': 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}>{c}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((i, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40">
            <img src={i.img} alt="Portfolio item" loading="lazy" className="w-full h-48 object-cover" />
            <div className="p-3 text-sm text-gray-600 dark:text-gray-300">{i.cat}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )}

function Skills() {
  const { t } = useI18n()
  const skills = [
    { name: 'JavaScript', lvl: 90 },
    { name: 'React', lvl: 85 },
    { name: 'Tailwind', lvl: 80 },
    { name: 'Node.js', lvl: 70 },
  ]
  return (
    <Section id="skills" title={t.skillsTitle}>
      <div className="grid md:grid-cols-2 gap-5">
        {skills.map(s => (
          <div key={s.name} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40">
            <div className="flex justify-between text-sm mb-2 text-gray-700 dark:text-gray-300"><span>{s.name}</span><span>{s.lvl}%</span></div>
            <div className="h-2 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${s.lvl}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Social() {
  const { t } = useI18n()
  const links = [
    { icon: <Github />, href: 'https://github.com/' },
    { icon: <Linkedin />, href: 'https://linkedin.com/' },
    { icon: <Instagram />, href: 'https://instagram.com/' },
  ]
  return (
    <Section id="social" title={t.socialTitle}>
      <div className="flex gap-4">
        {links.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noreferrer" className="p-3 rounded-full border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            {l.icon}
          </a>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  const { t } = useI18n()
  const [toast, setToast] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = encodeURIComponent(data.get('name'))
    const email = encodeURIComponent(data.get('email'))
    const message = encodeURIComponent(data.get('message'))
    const subject = encodeURIComponent('Portfolio Contact')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    setToast(t.sent)
    window.location.href = `mailto:youremail@gmail.com?subject=${subject}&body=${body}`
    setTimeout(() => setToast(''), 2500)
  }
  return (
    <Section id="contact" title={t.contactTitle}>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{t.contactSubtitle}</p>
      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
        <input name="name" required placeholder={t.formName} aria-label={t.formName} className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
        <input type="email" name="email" required placeholder={t.formEmail} aria-label={t.formEmail} className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
        <textarea name="message" required placeholder={t.formMessage} aria-label={t.formMessage} rows="5" className="md:col-span-2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
        <div className="md:col-span-2 flex justify-end">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition">
            <Mail size={18} /> {t.send}
          </button>
        </div>
      </form>
      {toast && (
        <div className="fixed bottom-6 right-6 px-4 py-2 rounded-md bg-gray-900 text-white shadow-lg">{toast}</div>
      )}
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div>© {new Date().getFullYear()} YourName. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  )
}

function BackToTop() {
  const { t } = useI18n()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <button aria-label={t.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 left-6 p-3 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
      <ArrowUp />
    </button>
  )
}

// ---------------- Main App ----------------
export default function App() {
  useEffect(() => {
    // GA4 placeholder: replace with your measurement ID
    const GA_MEASUREMENT_ID = (window.__GA_MEASUREMENT_ID || '')
    if (GA_MEASUREMENT_ID && !window.__gaLoaded) {
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(s)
      const s2 = document.createElement('script')
      s2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}');`
      document.head.appendChild(s2)
      window.__gaLoaded = true
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="min-h-screen bg-white dark:bg-gray-950">
          <Navbar />
          <Hero />
          <About />
          <Education />
          <Certificates />
          <Experience />
          <Organizations />
          <Projects />
          <Portfolio />
          <Skills />
          <Social />
          <Contact />
          <Footer />
          <BackToTop />
        </div>
      </I18nProvider>
    </ThemeProvider>
  )
}
