import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// list of headings to show in sidebar
const list_of_items = [
  { id: 'introduction', label: '1. Introduction to React' },
  { id: 'purpose', label: '2. What is React Used For' },
  { id: 'popularity', label: '3. How React Works' },
  { id: 'core-concepts', label: '4. The Core Concepts' },
  { id: 'code-walkthrough', label: '5. Advantages of React' },
  { id: 'prerequisites', label: '6. Who Uses React?' },
  { id: 'conclusion', label: '7. Why React is Popular' }
];

export default function TableOfContents() {
  const [active_item_id, setActive_item_id] = useState('introduction')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      let active = 'introduction';

      // standard loop to find the right section
      for (let i = 0; i < list_of_items.length; i = i + 1) {
        let current_item = list_of_items[i];
        const el = document.getElementById(current_item.id);
        if (el) {
          const top = el.offsetTop - 125;
          if (scrollPos >= top) {
            active = current_item.id;
          }
        }
      }
      setActive_item_id(active);
    };

    window.addEventListener('scroll', handleScroll);
    // trigger on load so it highlights the first one
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="sidebar">
      <div className="toc-title">Table of Contents</div>
      <ul className="toc-list relative">
        {list_of_items.map(function(item) {
          return (
            <li 
              key={item.id} 
              className={`toc-item relative ${active_item_id === item.id ? 'active' : ''}`}
            >
              {active_item_id === item.id && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[var(--color-react)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  style={{ zIndex: 10 }}
                />
              )}
              <button 
                onClick={() => goToSection(item.id)}
                style={{ borderLeft: active_item_id === item.id ? 'none' : '2px solid var(--border-color)' }}
              >
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  );
}
