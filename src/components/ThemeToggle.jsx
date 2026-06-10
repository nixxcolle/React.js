import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  // state for dark/light mode
  const [myTheme, setMyTheme] = useState(() => {
    let saved = localStorage.getItem('theme')
    if (saved) {
      return saved;
    } else {
      return 'dark';
    }
  });

  useEffect(() => {
    // change html element attribute for css
    document.documentElement.setAttribute('data-theme', myTheme)
    localStorage.setItem('theme', myTheme);
  }, [myTheme]);

  const change_theme_fn = () => {
    // toggling between dark and light
    if (myTheme === "dark") {
      setMyTheme("light");
    } else {
      setMyTheme("dark");
    }
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="theme-toggle" 
      onClick={change_theme_fn} 
      aria-label="Toggle Theme"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={myTheme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {myTheme === 'dark' ? (
            /* Moon Icon */
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.5-.1 1 .2 1.2.7.2.5 0 1.1-.4 1.4-2.8 2.1-4.4 5.5-4.4 9 0 4.4 3.6 8 8 8 3.5 0 6.9-1.6 9-4.4.3-.4.9-.6 1.4-.4.5.2.8.7.7 1.2-.9 4.7-5 8.2-9.8 8.3z"/>
            </svg>
          ) : (
            /* Sun Icon */
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0-3c-.6 0-1-.4-1-1V2c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1zm0 18c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1zm10-10c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1zM5 12c0-.6-.4-1-1-1H2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1zm14.071-7.071c-.4-.4-1-.4-1.414 0l-1.414 1.414c-.4.4-.4 1 0 1.414s1 .4 1.414 0l1.414-1.414c.4-.4.4-1 0-1.414zM6.343 17.657c-.4-.4-1-.4-1.414 0l-1.414 1.414c-.4.4-.4 1 0 1.414s1 .4 1.414 0l1.414-1.414c.4-.4.4-1 0-1.414zm11.314 0c.4-.4.4-1 0-1.414s-1-.4-1.414 0l-1.414 1.414c-.4.4-.4 1 0 1.414s1 .4 1.414 0l1.414-1.414zm-11.314-11.314c.4-.4.4-1 0-1.414S4.929 4.93 4.515 5.343L3.101 6.757c-.4.4-.4 1 0 1.414s1 .4 1.414 0l1.414-1.414z"/>
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
