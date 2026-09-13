"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Menu,
  MessageCircle,
  Moon,
  Sun,
  X,
  ChevronRight,
} from "lucide-react";

const whatsappUrl =
  "https://wa.me/923150485239?text=Hi%20Ali%2C%20I%20would%20like%20to%20discuss%20a%20design%20project.";

const services = [
  {
    number: "01",
    title: "Brand Identity",
    text: "Logos, visual systems, typography, color palettes, and brand guidelines.",
  },
  {
    number: "02",
    title: "Social Media",
    text: "Campaign visuals, social templates, ad creatives, and content direction.",
  },
  {
    number: "03",
    title: "UI Design",
    text: "Websites, landing pages, mobile interfaces, wireframes, and prototypes.",
  },
];

const process = [
  "Understand the brief",
  "Explore the visual direction",
  "Design and refine",
  "Deliver a polished final system",
];

interface Category {
  name: string;
  folder: string;
  images: string[];
}

function Artwork({
  src,
  alt,
  label = "",
  className = "",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`artwork ${className} ${failed ? "is-fallback" : ""}`}>
      {!failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <div className="art-fallback">
          <span>{alt}</span>
          <strong>AH</strong>
        </div>
      )}
    </div>
  );
}

function CategoryCard({
  category,
  onClick,
}: {
  category: Category;
  onClick: () => void;
}) {
  return (
    <button
      className="category-card"
      onClick={onClick}
      aria-label={`Open ${category.name} gallery`}
    >
      <div className="category-card-glow" />
      <div className="category-card-border">
        <div className="category-card-inner">
          <div className="category-card-preview">
            {category.images.slice(0, 2).map((img, i) => (
              <div
                key={i}
                className="category-preview-img"
                style={{
                  backgroundImage: `url(${img})`,
                  animationDelay: `${i * -2}s`,
                }}
              />
            ))}
          </div>
          <div className="category-card-info">
            <h3>{category.name}</h3>
            <span>{category.images.length} projects</span>
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </button>
  );
}

function CategoryShowcase({
  categories,
  onOpenCategory,
}: {
  categories: Category[];
  onOpenCategory: (index: number) => void;
}) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="category-showcase section-shell" id="work">
      <div className="category-heading">
        <div>
          <p className="section-kicker">Selected work / 01</p>
          <h2>
            Explore my
            <br />
            portfolio.
          </h2>
        </div>

        <p>
          Each category represents a distinct style and skill set. Click any
          category to view all projects.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.folder}
            category={category}
            onClick={() => onOpenCategory(index)}
          />
        ))}
      </div>
    </section>
  );
}

function ImageGalleryModal({
  category,
  index,
  onClose,
}: {
  category: Category;
  index: number;
  onClose: () => void;
}) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImg(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="image-fullscreen-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.button
              className="image-fullscreen-close"
              onClick={() => setSelectedImg(null)}
              aria-label="Close fullscreen"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
            <img src={selectedImg} alt="Full view" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          className="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="project-modal project-modal-wide"
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ duration: 0.35 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close gallery"
            >
              <X size={21} />
            </button>

            <div className="modal-image-wrapper">
              <div className="modal-category-label">
                <span>{category.name}</span>
                <strong>{category.images.length} projects</strong>
              </div>

              <div className="gallery-grid">
                {category.images.map((img, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    className="gallery-item"
                    onClick={() => setSelectedImg(img)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <img src={img} alt={`${category.name} ${imgIndex + 1}`} />
                    <div className="gallery-item-overlay">
                      <span>View</span>
                      <ChevronRight size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="modal-content">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="button button-dark"
              >
                Discuss this project
                <ArrowUpRight size={17} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function PortfolioClient({
  categories,
}: {
  categories: Category[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  useEffect(() => {
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("ali-theme") : null;

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("ali-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" onClick={closeMenu}>
          <span className="brand-symbol">AH</span>
          <span className="brand-name">ALI HASSAN</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#contact" onClick={closeMenu} className="nav-contact">
            Let&apos;s talk <ArrowUpRight size={16} />
          </a>
        </nav>

        <div className="header-controls">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode((value) => !value)}
            aria-label="Toggle color theme"
            aria-pressed={darkMode}
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            <span>{darkMode ? "Light" : "Dark"}</span>
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <CategoryShowcase
        categories={categories}
        onOpenCategory={(index) => setOpenCategory(index)}
      />

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow-dot" />
            Independent graphic designer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Visuals that make
            <span className="outline-text"> brands </span>
            impossible to ignore.
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I&apos;m Ali Hassan, a graphic designer with 3 years of experience
            creating strong identities, digital experiences, and visuals that
            connect.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <a href="#work" className="button button-dark">
              Explore my work <ArrowDown size={17} />
            </a>

            <a href={whatsappUrl} target="_blank" className="text-link">
              Start a conversation <ArrowUpRight size={17} />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="hero-sticker sticker-one">AVAILABLE<br />FOR WORK</div>
          <div className="hero-sticker sticker-two">PS / AI / FIGMA</div>

          <Artwork
            src="/images/hero-designer-identity.webp"
            alt="Abstract graphic design collage"
            className="hero-artwork"
          />

          <div className="hero-side-note">
            <span>Scroll to explore</span>
            <ArrowDown size={17} />
          </div>
        </motion.div>
      </section>

      <section className="marquee-section" aria-label="Specialties">
        <div className="marquee-track">
          <span>Branding</span>
          <i>✳</i>
          <span>Art Direction</span>
          <i>✳</i>
          <span>Digital Design</span>
          <i>✳</i>
          <span>Visual Systems</span>
          <i>✳</i>
          <span>Branding</span>
          <i>✳</i>
          <span>Art Direction</span>
          <i>✳</i>
          <span>Digital Design</span>
          <i>✳</i>
          <span>Visual Systems</span>
        </div>
      </section>

      <section className="services-section dark-section" id="services">
        <div className="section-shell">
          <div className="section-heading light-heading">
            <div>
              <p className="section-kicker">What I do / 02</p>
              <h2>
                Design with
                <br />
                a purpose.
              </h2>
            </div>

            <p className="section-intro">
              Every project gets a considered visual language, a clear point of
              view, and enough flexibility to grow.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                className="service-card"
                key={service.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.1 }}
              >
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ArrowUpRight className="service-arrow" size={22} />
              </motion.div>
            ))}
          </div>

          <div className="tools-row">
            <span>Tools I use</span>
            <div className="tool-list">
              <span>Adobe Photoshop</span>
              <span>Adobe Illustrator</span>
              <span>Figma</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section section-shell" id="about">
        <div className="about-visual">
          <Artwork
            src="/images/about-creative-desk.webp"
            alt="Graphic design workspace"
            label="Made with intention"
            className="about-artwork"
          />

          <div className="about-badge">
            <span>3+</span>
            <small>Years of<br />experience</small>
          </div>
        </div>

        <div className="about-copy">
          <p className="section-kicker">A little about me / 03</p>
          <h2>
            Good design is
            <span className="highlight-text"> clear, useful,</span> and
            memorable.
          </h2>

          <p>
            I&apos;m Ali Hassan, a graphic designer focused on making brands
            look confident and communicate clearly. Over the last three years,
            I&apos;ve worked across branding, social media, digital design, and
            UI design.
          </p>

          <p>
            My approach combines structure with experimentation. I care about
            the small details, but I never lose sight of the bigger picture:
            helping a brand be understood, remembered, and chosen.
          </p>

          <a href={whatsappUrl} target="_blank" className="button button-acid">
            <MessageCircle size={17} />
            Work with me
          </a>
        </div>
      </section>

      <section className="process-section section-shell">
        <div className="process-title">
          <p className="section-kicker">My process / 04</p>
          <h2>
            From first thought
            <br />
            to final form.
          </h2>
        </div>

        <div className="process-list">
          {process.map((item, index) => (
            <motion.div
              className="process-item"
              key={item}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span>0{index + 1}</span>
              <p>{item}</p>
              <Check size={18} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-card">
          <div className="contact-decoration decoration-one" />
          <div className="contact-decoration decoration-two" />

          <p className="section-kicker">Have a project in mind?</p>
          <h2>
            Let&apos;s make
            <br />
            something <em>distinctive.</em>
          </h2>

          <p className="contact-text">
            Tell me what you&apos;re working on, what you need, and where you
            want to go. I&apos;ll get back to you on WhatsApp.
          </p>

          <a href={whatsappUrl} target="_blank" className="button button-dark">
            <MessageCircle size={18} />
            Message Ali on WhatsApp
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <div className="footer-left">
          <span className="brand-symbol">AH</span>
          <span>Ali Hassan — Graphic Designer</span>
        </div>

        <div className="footer-right">
          <a href={whatsappUrl} target="_blank">
            WhatsApp
          </a>
          <span>© 2026 Ali Hassan</span>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        className="floating-whatsapp"
        aria-label="Contact Ali Hassan on WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Let&apos;s talk</span>
      </a>

      {openCategory !== null && categories[openCategory] && (
        <ImageGalleryModal
          category={categories[openCategory]}
          index={openCategory}
          onClose={() => setOpenCategory(null)}
        />
      )}
    </main>
  );
}
