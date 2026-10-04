"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Menu,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { portfolioData, testimonials, Category } from "./data";

const whatsappUrl =
  "https://wa.me/923150485239?text=Hi%20Ali%2C%20I%20would%20like%20to%20discuss%20a%20design%20project.";

function getImagePath(folder: string, filename: string) {
  return encodeURI(folder + filename);
}

function FolderCard({
  category,
  onClick,
}: {
  category: Category;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="folder-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="folder-preview">
        {category.images.slice(0, 3).map((img, i) => (
          <img
            key={i}
            src={getImagePath(category.folder, img)}
            alt={`${category.title} preview ${i + 1}`}
            className={`folder-img folder-img-${i + 1}`}
            loading="lazy"
          />
        ))}
        <div className="folder-flap" />
      </div>
      <div className="folder-info">
        <h3>{category.title}</h3>
        <div className="folder-meta">
          <span>{category.count} PROJECTS</span>
          <ArrowUpRight size={18} className="folder-arrow" />
        </div>
        <p>{category.description}</p>
      </div>
      <div className="folder-open">OPEN</div>
    </motion.div>
  );
}

function Lightbox({
  category,
  initialIndex,
  onClose,
}: {
  category: Category;
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentImage = category.images[currentIndex];
  const total = category.images.length;

  const goPrev = useCallback(() => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const resetZoom = () => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - translateX, y: e.clientY - translateY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setTranslateX(e.clientX - dragStart.x);
    setTranslateY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="lightbox-header">
        <div className="lightbox-info">
          <span>{category.title}</span>
          <span>
            {currentIndex + 1} / {total}
          </span>
        </div>
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      <div
        className="lightbox-content"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <button
          className="lightbox-nav lightbox-nav-prev"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={28} />
        </button>

        <motion.img
          src={getImagePath(category.folder, currentImage)}
          alt={`${category.title} ${currentIndex + 1}`}
          className="lightbox-image"
          style={{
            transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            scale === 1 ? zoomIn() : resetZoom();
          }}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        />

        <button
          className="lightbox-nav lightbox-nav-next"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="lightbox-controls">
        <button onClick={zoomIn} aria-label="Zoom in">
          <ZoomIn size={20} />
        </button>
        <button onClick={zoomOut} aria-label="Zoom out">
          <ZoomOut size={20} />
        </button>
        <button onClick={resetZoom} aria-label="Reset zoom">
          <RotateCcw size={20} />
        </button>
      </div>
    </motion.div>
  );
}

function CategoryGallery({
  category,
  onBack,
  onImageClick,
}: {
  category: Category;
  onBack: () => void;
  onImageClick: (index: number) => void;
}) {
  return (
    <motion.section
      className="category-gallery"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="gallery-header">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
          Back to Portfolio
        </button>
        <div className="gallery-title">
          <h2>{category.title}</h2>
          <p>{category.description}</p>
          <span className="gallery-count">{category.count} PROJECTS</span>
        </div>
      </div>

      <div className="masonry-grid">
        {category.images.map((img, index) => (
          <motion.div
            key={index}
            className="gallery-item"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => onImageClick(index)}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={getImagePath(category.folder, img)}
              alt={`${category.title} ${index + 1}`}
              loading="lazy"
            />
            <div className="gallery-item-overlay">
              <span>VIEW</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [lightboxData, setLightboxData] = useState<{
    category: Category;
    index: number;
  } | null>(null);

  const closeMenu = () => setMenuOpen(false);

  const handleImageClick = (category: Category, index: number) => {
    setLightboxData({ category, index });
  };

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
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#process" onClick={closeMenu}>
            Process
          </a>
          <a href="#testimonials" onClick={closeMenu}>
            Testimonials
          </a>
          <a href="#contact" onClick={closeMenu} className="nav-contact">
            Let&apos;s talk <ArrowUpRight size={16} />
          </a>
        </nav>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow-dot" />
            GRAPHIC DESIGNER / VISUAL CREATIVE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Designs that
            <br />
            make brands <span className="accent-text">impossible to ignore.</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I create bold visual identities, digital experiences, campaigns and graphic systems designed to communicate with clarity and character.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <a href="#work" className="button button-primary">
              Explore My Work <ArrowDown size={17} />
            </a>

            <a href="#contact" className="button button-secondary">
              Let&apos;s Work Together <ArrowUpRight size={17} />
            </a>
          </motion.div>

          <motion.div
            className="availability"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <span className="pulse" />
            Available for freelance projects
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="hero-gridlines" />
          <div className="hero-deco hero-deco-1" />
          <div className="hero-deco hero-deco-2" />
          
          <img
            src="/images/ui/main frame landing page design - Copy.webp"
            alt="Hero composition"
            className="hero-image hero-image-1"
          />
          <img
            src="/images/vertical posters/Nike post.webp"
            alt="Hero composition"
            className="hero-image hero-image-2"
          />
          <img
            src="/images/logo/logo you.webp"
            alt="Hero composition"
            className="hero-image hero-image-3"
          />
        </motion.div>
      </section>

      {selectedCategory ? (
        <CategoryGallery
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
          onImageClick={(index) =>
            handleImageClick(selectedCategory, index)
          }
        />
      ) : (
        <section className="portfolio-section section-shell" id="work">
          <div className="section-heading">
            <div>
              <p className="section-kicker">01 / SELECTED WORK</p>
              <h2>Selected Work</h2>
            </div>
            <p className="section-intro">
              A collection of visual identities, campaigns, digital experiences and creative experiments.
            </p>
          </div>

          <div className="portfolio-grid">
            {portfolioData.map((category) => (
              <FolderCard
                key={category.id}
                category={category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="about-section section-shell" id="about">
        <div className="about-visual">
          <div className="about-frame">
            <div className="about-grid" />
          </div>
        </div>
        <div className="about-copy">
          <p className="section-kicker">02 / ABOUT</p>
          <h2>Behind the work.</h2>
          <p>
            I&apos;m Ali Hassan, a graphic designer focused on creating visual identities, digital experiences and graphic systems that feel distinctive, intentional and memorable.
          </p>
          <div className="stats">
            <div className="stat">
              <span className="stat-number">8+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">60+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">35+</span>
              <span className="stat-label">Clients</span>
            </div>
            <div className="stat">
              <span className="stat-number">12</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-shell" id="services">
        <div className="section-heading">
          <p className="section-kicker">03 / SERVICES</p>
          <h2>Services</h2>
        </div>
        <div className="services-list">
          {[
            { num: "01", title: "Brand Identity", desc: "Visual systems and brand guidelines" },
            { num: "02", title: "Logo Design", desc: "Distinctive brand marks" },
            { num: "03", title: "Poster Design", desc: "Creative promotional posters" },
            { num: "04", title: "Social Media Design", desc: "Engaging social content" },
            { num: "05", title: "Thumbnail Design", desc: "Eye-catching thumbnails" },
            { num: "06", title: "UI Visual Design", desc: "Modern interface designs" },
            { num: "07", title: "Packaging Design", desc: "Product packaging solutions" },
            { num: "08", title: "Art Direction", desc: "Creative visual direction" },
          ].map((service) => (
            <div className="service-item" key={service.num}>
              <span className="service-num">{service.num}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
              <ArrowUpRight size={24} className="service-arrow" />
            </div>
          ))}
        </div>
      </section>

      <section className="process-section section-shell" id="process">
        <div className="section-heading">
          <p className="section-kicker">04 / PROCESS</p>
          <h2>How I turn ideas into visuals.</h2>
        </div>
        <div className="process-timeline">
          {[
            {
              num: "01",
              title: "Discover",
              desc: "Understand the brand, audience and objective.",
            },
            {
              num: "02",
              title: "Define",
              desc: "Build the creative direction and visual strategy.",
            },
            {
              num: "03",
              title: "Design",
              desc: "Develop and refine the visual system.",
            },
            {
              num: "04",
              title: "Deliver",
              desc: "Prepare polished final assets.",
            },
          ].map((step) => (
            <div className="timeline-item" key={step.num}>
              <span className="timeline-num">{step.num}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section section-shell" id="testimonials">
        <div className="section-heading">
          <p className="section-kicker">TESTIMONIALS</p>
          <h2>Client Words</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p className="testimonial-quote">&quot;{t.quote}&quot;</p>
              <div className="testimonial-author">
                <span className="author-name">{t.name}</span>
                <span className="author-role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-card">
          <div className="contact-content">
            <p className="section-kicker">05 / CONTACT</p>
            <h2>Have a project in mind?</h2>
            <p className="contact-desc">
              Let&apos;s turn your idea into something people remember.
            </p>
            <a href={whatsappUrl} target="_blank" className="button button-primary large">
              Start a Conversation <ArrowUpRight size={18} />
            </a>
            <div className="contact-details">
              <a href="mailto:hello@arstudio.design">hello@arstudio.design</a>
              <span>Islamabad, Pakistan</span>
              <span>Available for selected freelance projects</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <div className="footer-left">
          <span className="footer-brand">ALI HASSAN</span>
          <span>Graphic Designer & Visual Creative</span>
        </div>
        <div className="footer-right">
          <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
          <a href="https://behance.net" target="_blank" rel="noopener">Behance</a>
          <a href="https://dribbble.com" target="_blank" rel="noopener">Dribbble</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
          <span>© 2026 Ali Hassan. All rights reserved.</span>
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

      {lightboxData && (
        <Lightbox
          category={lightboxData.category}
          initialIndex={lightboxData.index}
          onClose={() => setLightboxData(null)}
        />
      )}
    </main>
  );
}