import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Terminal, 
  Check, 
  Copy, 
  Layers, 
  Zap, 
  BookOpen, 
  ChevronRight, 
  Code, 
  Sliders, 
  Anchor, 
  ArrowUpRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import './index.css';

// Component Imports
import ThemeToggle from './components/ThemeToggle';
import TableOfContents from './components/TableOfContents';
import ComponentTreeExplorer from './components/ComponentTreeExplorer';
import VirtualDOMVisualizer from './components/VirtualDOMVisualizer';
import CounterSandbox from './components/CounterSandbox';
import Quiz from './components/Quiz';

// Reusable CodeBlock Component
function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="code-wrapper relative rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--code-bg)] shadow-md my-10">
      <div className="code-header flex justify-between items-center bg-[var(--bg-secondary)] px-4 py-2 border-b border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)]">
        <span className="flex items-center gap-1.5 uppercase font-semibold">
          <Terminal className="w-3.5 h-3.5 text-[var(--color-react)]" />
          {lang}
        </span>
        <button 
          className="btn-copy px-2.5 py-1 rounded border border-[var(--border-color)] hover:border-[var(--text-muted)] flex items-center gap-1 text-[11px] cursor-pointer transition-all duration-200"
          onClick={handleCopy}
          style={{
            borderColor: copied ? 'var(--color-success)' : '',
            color: copied ? 'var(--color-success)' : ''
          }}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto m-0 leading-relaxed text-sm text-[var(--code-variable)] font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export default function App() {
  // tracks scroll percentage
  const [percentScrolled, setPercentScrolled] = useState(0);

  useEffect(() => {
    const scroll_fn = () => {
      const pixelsScrolled = window.scrollY || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let final_percent = 0;
      if (totalHeight > 0) {
        final_percent = (pixelsScrolled / totalHeight) * 100;
      }
      setPercentScrolled(final_percent);
    };

    window.addEventListener('scroll', scroll_fn);
    return () => window.removeEventListener('scroll', scroll_fn);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* nav bar */}
      <nav className="navbar sticky top-0 z-50 w-full" id="navbar">
        <div className="container navbar-inner px-6 max-w-7xl mx-auto flex justify-between items-center h-[70px]">
          <a href="#" className="logo flex items-center gap-2.5 font-heading font-extrabold text-xl text-[var(--text-primary)] tracking-tight">
            {/* React Spinning Logo SVG */}
            <svg className="w-7 h-7 text-[var(--color-react)] animate-[spin_20s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
              <circle cx="0" cy="0" r="2.05"/>
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
            <span>React.js Academy</span>
          </a>
          
          <div className="nav-actions flex items-center gap-4">
            <ThemeToggle />
          </div>
          
          {/* scroll line tracker */}
          <div className="progress-container absolute bottom-0 left-0 w-full h-[3px] bg-transparent">
            <div 
              className="progress-bar h-full bg-gradient-to-r from-[var(--color-react)] to-blue-500 transition-all duration-100 ease-out" 
              id="progress-bar"
              style={{ width: percentScrolled + '%' }}
            ></div>
          </div>
        </div>
      </nav>

      {/* hero banner */}
      <header className="hero relative overflow-hidden py-16 md:py-24 border-b border-[var(--border-color)]">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-react-glow)] rounded-full blur-[120px] -z-10" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
        
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hero-badge inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-react-glow)] border border-[var(--color-react)]/30 text-[var(--color-react)] shadow-md mb-6 cursor-default"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Blog Guide</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title text-4xl md:text-6xl font-extrabold font-heading tracking-tight leading-[1.1] text-[var(--text-primary)]"
          >
            Demystifying <span className="gradient-text bg-gradient-to-r from-[var(--color-react)] to-indigo-500 bg-clip-text text-transparent">React.js</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-desc text-lg md:text-xl text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            A beginner-friendly, visual, and interactive guide to mastering modern frontend web development from scratch.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hero-meta mt-10 flex flex-wrap justify-center items-center gap-6 text-xs md:text-sm text-[var(--text-muted)] border border-[var(--border-color)]/50 bg-[var(--bg-card)]/50 backdrop-blur-md px-6 py-3.5 rounded-2xl max-w-xl mx-auto shadow-sm"
          >
            <div className="meta-item flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[var(--color-react)]" />
              <span>June 9, 2026</span>
            </div>
            <div className="meta-item flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[var(--color-react)]" />
              <span>10 Min Read</span>
            </div>
            <div className="meta-item flex items-center gap-1.5">
              <User className="w-4 h-4 text-[var(--color-react)]" />
              <span>By Risajune B. Tenoria</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* main content of page */}
      <div className="container max-w-7xl mx-auto px-6">
        <div className="article-layout grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 py-12 items-start">
          
          {/* STICKY TABLE OF CONTENTS */}
          <TableOfContents />

          {/* CENTRAL ARTICLE PANELS */}
          <main className="content-pane min-w-0 flex flex-col gap-16 md:gap-24">
            
            {/* SECTION 1: INTRODUCTION */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              id="introduction" 
              className="article-section scroll-mt-24"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
                <span className="section-number text-[var(--color-react)] font-mono">01.</span> Introduction to React.js
              </h2>
              
              <div className="mt-6 space-y-5 text-[var(--text-secondary)] leading-relaxed text-sm md:text-[15px]">
                <p>
                  You have witnessed the power of <strong>React.js</strong> if you have ever liked a post, clicked a button, or checked a notification on a website and seen the page quickly update without reloading.
                </p>
                <p>
                  React has fundamentally changed the process of creating contemporary websites. We will explain what React.js is, how it functions, its main benefits, and why it is the most popular tool in frontend web development in this approachable introduction.
                </p>
                
                {/* Visual Image Banner */}
                <div className="rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-lg my-8 relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent z-10 pointer-events-none" />
                  <img 
                    src="/react.png" 
                    alt="React conceptual banner illustrating components and developer workspace" 
                    className="w-full h-auto object-cover max-h-[350px] group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-6 z-20">
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-[var(--color-react)] text-[var(--bg-primary)] px-2.5 py-1 rounded">Interactive Guide</span>
                  </div>
                </div>

                <p>
An open-source <strong>JavaScript library for creating user interfaces (UIs)</strong> is called <strong>React.js</strong>, or simply <strong>React</strong>. React is totally focused on the visible layers of a website—the buttons, forms, navigation bars, and data cards that users interact with directly—rather than being a complex backend framework.                </p>
              </div>

              {/* History Section Box */}
              <div className="mt-16 mb-8 p-8 md:p-10 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-react-glow)] rounded-full blur-2xl" />
                
                <h3 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-[var(--color-react)]" />
                  A Brief History
                </h3>
                
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-3 border-[var(--color-react)] shadow-md shrink-0">
                    <img 
                      src="/jordan-walke.png" 
                      alt="Jordan Walke avatar portrait" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
React was created by one software engineer at Facebook, <strong>Jordan Walke</strong>. It allows quick updates to the Facebook News Feed without lagging the browser. It was originally implemented within the Facebook News Feed in 2011, then expanded to Instagram in 2012 before being open-sourced in 2013. Since its launch, it has evolved into the industry's leading front-end technology for web development.                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-[10px] font-semibold font-mono bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2 py-1 rounded">2011: Facebook News Feed</span>
                      <span className="text-[10px] font-semibold font-mono bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2 py-1 rounded">2012: Instagram Adoption</span>
                      <span className="text-[10px] font-semibold font-mono bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2 py-1 rounded">2013: Open Sourced</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* SECTION 2: PURPOSE */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              id="purpose" 
              className="article-section scroll-mt-24"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
                <span className="section-number text-[var(--color-react)] font-mono">02.</span> What React is Used For
              </h2>
              
              <div className="mt-6 space-y-5 text-[var(--text-secondary)] leading-relaxed text-sm md:text-[15px]">
                <p>
The old way of creating websites was that clicking on a link or submitting a form meant that the entire page had to reload. This resulted in a slow page reload, a white flash for a moment, and a rough, awkward experience for users.                </p>
                <p>
We use React to build single page applications. (SPAs) An SPA does not load new pages. It loads a single HTML page and dynamically changes the content as you click everywhere. This makes websites feel just as fast and smooth as an app on your phone. React automatically fixes what you see the moment the data changes.                </p>
              </div>

              {/* Callout box */}
              <div className="alert-box note my-14 border-l-4 border-[var(--color-react)] bg-[var(--color-react-glow)] p-6 md:p-8 rounded-r-xl">
                <div className="alert-title font-heading font-bold text-sm text-[var(--color-react)] flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4.5 h-4.5" />
                  Did You Know?
                </div>
                <div className="alert-content text-sm text-[var(--text-secondary)] leading-relaxed">
                  Single Page Applications (SPAs) only request data from the server, not the entire page code. React handles compiling that data and inserting it directly into the markup, minimizing network load.
                </div>
              </div>
            </motion.section>

            {/* SECTION 3: HOW REACT WORKS */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              id="popularity" 
              className="article-section scroll-mt-24"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
                <span className="section-number text-[var(--color-react)] font-mono">03.</span> How React Works
              </h2>
              
              <div className="mt-6 space-y-5 text-[var(--text-secondary)] leading-relaxed text-sm md:text-[15px]">
                <p>
                  To make updates incredibly fast, React uses a core architecture called the <strong>Virtual DOM (Document Object Model)</strong>.
                </p>
                <p>
                  Think of the real browser page as a giant house. In traditional JavaScript, if you want to change a lightbulb, you have to tear down the entire house and rebuild it from scratch. This is very slow and uses a lot of computer resources.
                </p>
                <p>
                  React solves this by keeping a lightweight copy of the house in its memory—the Virtual DOM:
                </p>
                
                <div className="my-14 grid grid-cols-1 md:grid-cols-4 gap-6">
                  {(() => {
                    let steps = [
                      { step: "1", title: "Render Tree", desc: "When state changes, React updates the Virtual DOM first." },
                      { step: "2", title: "Diffing", desc: "React compares this new Virtual DOM with the old one." },
                      { step: "3", title: "Target", desc: "It finds exactly which parts changed (the lightbulb)." },
                      { step: "4", title: "Patch", desc: "React updates only that specific node in the real browser DOM." }
                    ];
                    let stepBoxes = [];
                    for (let i = 0; i < steps.length; i = i + 1) {
                      let item = steps[i];
                      stepBoxes.push(
                        <div key={i} className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-center relative">
                          <span className="absolute top-2 left-3 font-mono font-bold text-xs text-[var(--color-react)]/40 bg-[var(--color-react-glow)] px-1.5 py-0.5 rounded">
                            Step {item.step}
                          </span>
                          <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] mt-5 mb-1">{item.title}</h4>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    }
                    return stepBoxes;
                  })()}
                </div>

                <p>
                  This selective update process is called <strong>Reconciliation</strong>. It ensures the DOM stays synchronized with the app's state without running expensive browser layout repaints.
                </p>

                {/* Virtual DOM Visualizer Widget */}
                <VirtualDOMVisualizer />
              </div>
            </motion.section>

            {/* SECTION 4: CORE CONCEPTS */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              id="core-concepts" 
              className="article-section scroll-mt-24"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
                <span className="section-number text-[var(--color-react)] font-mono">04.</span> The Core Concepts
              </h2>
              
              <div className="mt-6 space-y-5 text-[var(--text-secondary)] leading-relaxed text-sm md:text-[15px]">
                <p>
                  To start writing React apps, you only need to master four fundamental concepts:
                </p>
                
                {/* Concept Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-14">
                  <div className="p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--color-react)] transition-all group flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-react-glow)] text-[var(--color-react)] flex items-center justify-center mb-4">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                      <span>A. Components</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                      The visual building blocks of your UI. Think of them like Lego bricks — you build a component once, and you can reuse it anywhere.
                    </p>
                  </div>
                  
                  <div className="p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--color-react)] transition-all group flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-react-glow)] text-[var(--color-react)] flex items-center justify-center mb-4">
                      <Code className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                      <span>B. JSX (JavaScript XML)</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                      A syntax extension that allows you to write HTML structure directly inside your JavaScript code, simplifying page layouts.
                    </p>
                  </div>

                  <div className="p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--color-react)] transition-all group flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-react-glow)] text-[var(--color-react)] flex items-center justify-center mb-4">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                      <span>C. Props (Properties)</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                      Read-only parameters passed down from parent components to children. They allow configuration and data transfer down the tree.
                    </p>
                  </div>

                  <div className="p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--color-react)] transition-all group flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-react-glow)] text-[var(--color-react)] flex items-center justify-center mb-4">
                      <Anchor className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                      <span>D. State & Hooks</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                      State is the local dynamic memory of a component. Hooks (like <code>useState</code>) let you hook into state management within functional components.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-heading text-[var(--text-primary)] mt-12 mb-4">
                  JSX Code Example
                </h3>
                <CodeBlock 
                  code={`const element = (\n  <h1 className="title">\n    Welcome to React!\n  </h1>\n);`} 
                  lang="JSX Layout" 
                />

                {/* Component Explorer Widget */}
                <ComponentTreeExplorer />

                {/* Counter Sandbox Widget */}
                <CounterSandbox />
              </div>
            </motion.section>

            {/* SECTION 5: ADVANTAGES */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              id="code-walkthrough" 
              className="article-section scroll-mt-24"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
                <span className="section-number text-[var(--color-react)] font-mono">05.</span> Advantages of React
              </h2>
              
              <div className="mt-6 space-y-5 text-[var(--text-secondary)] leading-relaxed text-sm md:text-[15px]">
                <p>
                  React became popular because it offers clear benefits for both developers and companies:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-14">
                  {(() => {
                    let items_list = [
                      { icon: <Layers className="w-5 h-5" />, title: "Component Reusability", desc: "Writing components once and reusing them everywhere speeds up development and maintains styling consistency." },
                      { icon: <Zap className="w-5 h-5" />, title: "Blazing Performance", desc: "Thanks to the Virtual DOM, layout calculations are kept to a minimum, ensuring page updates are smooth as butter." },
                      { icon: <ShieldCheck className="w-5 h-5" />, title: "Predictable Flow", desc: "One-way data flow (parent to child) makes it incredibly easy to trace state updates and troubleshoot bugs quickly." },
                      { icon: <BookOpen className="w-5 h-5" />, title: "Rich Developer Tooling", desc: "Powerful browser extensions (React DevTools) let you inspect component trees, props, and active state values in real-time." }
                    ];
                    let out = [];
                    for (let x = 0; x < items_list.length; x = x + 1) {
                      let adv = items_list[x];
                      out.push(
                        <div key={x} className="flex gap-6 p-7 md:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-react-glow)] text-[var(--color-react)] flex items-center justify-center shrink-0">
                            {adv.icon}
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">{adv.title}</h4>
                            <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">{adv.desc}</p>
                          </div>
                        </div>
                      );
                    }
                    return out;
                  })()}
                </div>
              </div>
            </motion.section>

            {/* SECTION 6: WHO USES REACT */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              id="prerequisites" 
              className="article-section scroll-mt-24"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
                <span className="section-number text-[var(--color-react)] font-mono">06.</span> Who Uses React? (Real-World)
              </h2>
              
              <div className="mt-6 space-y-5 text-[var(--text-secondary)] leading-relaxed text-sm md:text-[15px]">
                <p>
                  React powers some of the largest websites and services in the world. Modern giants leverage React to construct highly interactive application hubs:
                </p>
                
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="flex gap-2.5 mb-5">
                      <div className="feature-icon mb-0">
                        <img src="/facebook.png" alt="Facebook" className="w-full h-full object-cover" />
                      </div>
                      <div className="feature-icon mb-0">
                        <img src="/instagram.png" alt="Instagram" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <h3>Facebook & Instagram</h3>
                    <p>The birthplace of React, utilizing it for instant feed updates, notifications, and media galleries.</p>
                  </div>
                  <div className="feature-card purple-accent">
                    <div className="feature-icon">
                      <img src="/netflix.png" alt="Netflix" className="w-full h-full object-cover" />
                    </div>
                    <h3>Netflix</h3>
                    <p>Uses React to ensure high-performance stream navigation and animations across various smart devices.</p>
                  </div>
                  <div className="feature-card green-accent">
                    <div className="feature-icon">
                      <img src="/airbnb.png" alt="Airbnb" className="w-full h-full object-cover" />
                    </div>
                    <h3>Airbnb</h3>
                    <p>Leverages reusable React components to build a seamless search, filter, and booking user flow.</p>
                  </div>
                  <div className="feature-card yellow-accent">
                    <div className="feature-icon">
                      <img src="/uber.png" alt="Uber" className="w-full h-full object-cover" />
                    </div>
                    <h3>Uber</h3>
                    <p>Uses React to handle real-time mapping dashboards, ride tracking, and instant notifications.</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-[var(--text-muted)] leading-relaxed">
                  Other platforms like <strong>Twitter (X)</strong>, <strong>Reddit</strong>, and <strong>Discord</strong> also rely heavily on React/React Native to keep messages, posts, and dynamic layouts updated in real-time.
                </p>
              </div>
            </motion.section>

            {/* SECTION 7: WHY REACT IS POPULAR & CONCLUSION */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              id="conclusion" 
              className="article-section scroll-mt-24"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
                <span className="section-number text-[var(--color-react)] font-mono">07.</span> Why React is Popular
              </h2>
              
              <div className="mt-6 space-y-5 text-[var(--text-secondary)] leading-relaxed text-sm md:text-[15px]">
                <p>
                  React is incredibly popular among developers because of its <strong>massive, supportive community</strong>. If you ever run into a coding issue, someone has likely solved it already. Furthermore, learning React is highly rewarding—React developers are in high demand globally, making it a valuable skill for landing a career in frontend development.
                </p>

                {/* Quiz Widget */}
                <Quiz />
              </div>
            </motion.section>
          </main>
        </div>
      </div>

      {/* page footer */}
      <footer className="footer bg-[var(--bg-secondary)] border-t border-[var(--border-color)] py-12 text-center text-sm text-[var(--text-muted)]">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="footer-logo flex justify-center items-center gap-2 font-heading font-extrabold text-base text-[var(--text-primary)] mb-6">
            <svg className="w-5 h-5 text-[var(--color-react)]" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
              <circle cx="0" cy="0" r="2.05"/>
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
            <span>React.js Academy</span>
          </div>
          <ul className="footer-links flex flex-wrap justify-center gap-6 text-xs md:text-sm mb-6">
            <li><a href="#introduction" className="hover:text-[var(--color-react)] transition-colors">What is React?</a></li>
            <li><a href="#purpose" className="hover:text-[var(--color-react)] transition-colors">Purpose</a></li>
            <li><a href="#popularity" className="hover:text-[var(--color-react)] transition-colors">How React Works</a></li>
            <li><a href="#core-concepts" className="hover:text-[var(--color-react)] transition-colors">Core Concepts</a></li>
            <li><a href="#code-walkthrough" className="hover:text-[var(--color-react)] transition-colors">Advantages</a></li>
          </ul>
          <p className="text-xs">&copy; 2026 React.js Academy. Designed for beginner developers and frontend learners.</p>
        </div>
      </footer>
    </div>
  );
}
