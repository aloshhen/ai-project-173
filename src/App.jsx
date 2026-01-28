import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Mail, MapPin, Instagram, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react'
import Lottie from 'lottie-react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(0)
  const [animData, setAnimData] = useState(null)
  
  const heroRef = useRef(null)
  const philosophyRef = useRef(null)
  const projectRef = useRef(null)
  const galleryRef = useRef(null)
  const technicalRef = useRef(null)
  
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" })
  const projectInView = useInView(projectRef, { once: true, margin: "-100px" })
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" })
  const technicalInView = useInView(technicalRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  useEffect(() => {
    fetch('https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-lottie-1769638457.lottie?')
      .then(r => r.json())
      .then(setAnimData)
      .catch(err => console.error('Failed to load Lottie animation:', err))
  }, [])

  const featuredProjects = [
    {
      name: "Nurai Island Villa",
      location: "Abu Dhabi, UAE",
      area: "1,240 m²",
      year: "2023",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
    },
    {
      name: "Urban Residence",
      location: "Dubai, UAE",
      area: "850 m²",
      year: "2023",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
    },
    {
      name: "Coastal Pavilion",
      location: "Miami, USA",
      area: "2,100 m²",
      year: "2022",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
    }
  ]

  const galleryProjects = [
    { image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", span: "col-span-2 row-span-2" },
    { image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80", span: "col-span-1 row-span-1" },
    { image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", span: "col-span-1 row-span-1" },
    { image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", span: "col-span-1 row-span-2" },
    { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", span: "col-span-2 row-span-1" },
    { image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80", span: "col-span-1 row-span-1" },
  ]

  const technicalImages = [
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* HEADER - Minimal Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <nav className="px-8 md:px-16 py-8 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-light tracking-[0.3em] text-white"
          >
            STUDIO
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:opacity-60 transition-opacity"
          >
            {menuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </motion.button>
        </nav>
      </header>

      {/* FULLSCREEN MENU */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-black z-40 flex items-center justify-center ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <nav className="text-center space-y-8">
          <button onClick={() => scrollToSection('philosophy')} className="block text-4xl md:text-6xl font-thin tracking-tight hover:opacity-60 transition-opacity">Philosophy</button>
          <button onClick={() => scrollToSection('project')} className="block text-4xl md:text-6xl font-thin tracking-tight hover:opacity-60 transition-opacity">Project</button>
          <button onClick={() => scrollToSection('gallery')} className="block text-4xl md:text-6xl font-thin tracking-tight hover:opacity-60 transition-opacity">Archive</button>
          <button onClick={() => scrollToSection('technical')} className="block text-4xl md:text-6xl font-thin tracking-tight hover:opacity-60 transition-opacity">Excellence</button>
          <button onClick={() => scrollToSection('contact')} className="block text-4xl md:text-6xl font-thin tracking-tight hover:opacity-60 transition-opacity">Contact</button>
        </nav>
      </motion.div>

      {/* HERO SECTION - Video Background */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-video-1769636840.mp4?"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </motion.div>
        
        <div className="relative h-full flex items-end px-8 md:px-16 pb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-6xl md:text-9xl font-thin tracking-tighter leading-none"
          >
            ARCHITECTURAL<br />BUREAU
          </motion.h1>
        </div>
      </section>

      {/* PHILOSOPHY/MANIFESTO with Lottie Animation */}
      <section id="philosophy" ref={philosophyRef} className="min-h-screen flex items-center px-8 md:px-16 py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: philosophyInView ? 1 : 0, y: philosophyInView ? 0 : 60 }}
            transition={{ duration: 1 }}
            className="col-span-12 md:col-span-5 flex items-center justify-center"
          >
            {animData ? (
              <Lottie 
                animationData={animData} 
                loop 
                className="w-full max-w-md h-auto"
              />
            ) : (
              <div className="w-full max-w-md h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: philosophyInView ? 1 : 0, y: philosophyInView ? 0 : 60 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="col-span-12 md:col-span-7 flex items-center"
          >
            <div className="space-y-12">
              <p className="text-xl md:text-3xl font-thin leading-relaxed tracking-tight text-gray-400">
                We create spaces where light defines form and silence speaks volumes.
              </p>
              <p className="text-xl md:text-3xl font-thin leading-relaxed tracking-tight text-gray-400">
                Architecture is not about decoration—it's about the essence of materiality, proportion, and time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PROJECT - Featured Work with Horizontal Navigation */}
      <section id="project" ref={projectRef} className="min-h-screen py-32">
        <div className="px-8 md:px-16 mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: projectInView ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="text-sm font-light tracking-[0.3em] text-gray-500 mb-4"
          >
            FEATURED
          </motion.h2>
        </div>

        <div className="relative">
          <motion.div
            key={currentProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-screen"
          >
            <img 
              src={featuredProjects[currentProject].image}
              alt={featuredProjects[currentProject].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-24">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-6">
                  <h3 className="text-4xl md:text-7xl font-thin tracking-tight mb-12">
                    {featuredProjects[currentProject].name}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-9">
                  <div className="space-y-6 text-sm font-light tracking-wider">
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-500">LOCATION</span>
                      <span>{featuredProjects[currentProject].location}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-500">AREA</span>
                      <span>{featuredProjects[currentProject].area}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-500">YEAR</span>
                      <span>{featuredProjects[currentProject].year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-8 md:px-16 flex justify-between pointer-events-none">
            <button 
              onClick={prevProject}
              className="pointer-events-auto hover:opacity-60 transition-opacity"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button 
              onClick={nextProject}
              className="pointer-events-auto hover:opacity-60 transition-opacity"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
          </div>

          {/* Project Counter */}
          <div className="absolute bottom-24 right-8 md:right-16 text-sm font-light tracking-wider">
            <span className="text-white">{String(currentProject + 1).padStart(2, '0')}</span>
            <span className="text-gray-600"> / {String(featuredProjects.length).padStart(2, '0')}</span>
          </div>
        </div>
      </section>

      {/* GALLERY/ARCHIVE - Masonry Grid */}
      <section id="gallery" ref={galleryRef} className="py-32 px-8 md:px-16">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: galleryInView ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="text-sm font-light tracking-[0.3em] text-gray-500 mb-16"
        >
          ARCHIVE
        </motion.h2>

        <div className="grid grid-cols-3 auto-rows-[300px] gap-4">
          {galleryProjects.map((project, index) => (
            <motion.a
              key={index}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: galleryInView ? 1 : 0, y: galleryInView ? 0 : 40 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative overflow-hidden group ${project.span}`}
            >
              <img 
                src={project.image}
                alt={`Project ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* TECHNICAL EXCELLENCE */}
      <section id="technical" ref={technicalRef} className="py-32 px-8 md:px-16 bg-graphite-900">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: technicalInView ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="text-sm font-light tracking-[0.3em] text-gray-500 mb-16"
        >
          TECHNICAL EXCELLENCE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {technicalImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: technicalInView ? 1 : 0, y: technicalInView ? 0 : 40 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <img 
                src={image}
                alt={`Technical detail ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: technicalInView ? 1 : 0, y: technicalInView ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 max-w-3xl"
        >
          <p className="text-xl md:text-2xl font-thin leading-relaxed tracking-tight text-gray-400">
            Every detail matters. From material selection to structural precision, we pursue perfection in execution.
          </p>
        </motion.div>
      </section>

      {/* CONTACT - Minimal and Strict */}
      <section id="contact" className="min-h-screen flex items-center px-8 md:px-16 py-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-12 gap-16">
            <div className="col-span-12 md:col-span-6">
              <h2 className="text-sm font-light tracking-[0.3em] text-gray-500 mb-16">CONTACT</h2>
              
              <div className="space-y-12">
                <div>
                  <p className="text-sm font-light tracking-wider text-gray-600 mb-2">EMAIL</p>
                  <a href="mailto:studio@bureau.com" className="text-2xl md:text-3xl font-thin hover:opacity-60 transition-opacity flex items-center gap-3">
                    <Mail size={28} strokeWidth={1} />
                    studio@bureau.com
                  </a>
                </div>

                <div>
                  <p className="text-sm font-light tracking-wider text-gray-600 mb-2">ADDRESS</p>
                  <p className="text-2xl md:text-3xl font-thin flex items-start gap-3">
                    <MapPin size={28} strokeWidth={1} className="mt-1" />
                    <span>Dubai Design District<br />Building 6, Floor 3<br />Dubai, UAE</span>
                  </p>
                </div>

                <div>
                  <p className="text-sm font-light tracking-wider text-gray-600 mb-4">SOCIAL</p>
                  <div className="flex gap-6">
                    <a href="#" className="hover:opacity-60 transition-opacity">
                      <Instagram size={24} strokeWidth={1} />
                    </a>
                    <a href="#" className="hover:opacity-60 transition-opacity">
                      <Linkedin size={24} strokeWidth={1} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 pt-8 border-t border-gray-900">
            <p className="text-xs font-light tracking-wider text-gray-600">
              © 2024 ARCHITECTURAL BUREAU. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App