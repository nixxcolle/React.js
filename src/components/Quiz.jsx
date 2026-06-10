import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Award, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';

const quizQuestions = [
  {
    question: "What is React.js?",
    options: [
      "A preconfigured server-side rendering framework.",
      "A CSS library for responsive layouts.",
      "A JavaScript library for building user interfaces.",
      "A relational database query engine."
    ],
    answerIndex: 2,
    explanation: "Correct! React is an open-source, component-based JavaScript library designed explicitly for building frontend user interfaces."
  },
  {
    question: "What is the primary benefit of the Virtual DOM?",
    options: [
      "It compiles JSX templates directly into native binary applications.",
      "It acts as a local browser database storing persistent session logs.",
      "It compares changes in memory and updates only the modified items in the Real DOM, boosting performance.",
      "It secures connections to databases by screening injection requests."
    ],
    answerIndex: 2,
    explanation: "Correct! The Virtual DOM is a lightweight copy of the browser DOM. React runs a diffing algorithm on it to apply only the absolute necessary updates to the real page, reducing expensive DOM repaints."
  },
  {
    question: "What is the main difference between Props and State in React?",
    options: [
      "Props are external immutable inputs passed into a component; State is local dynamic data managed inside the component.",
      "Props handle DOM event listeners; State manages component-wide styling classes.",
      "Props are strings only; State variables support numbers, lists, and functions.",
      "State travels upwards from child components; Props are restricted to parent-to-child transfers."
    ],
    answerIndex: 0,
    explanation: "Correct! Props (properties) are passed into a component and cannot be changed by it (immutable). State is internal data created inside the component that triggers updates when changed via its setter function."
  },
  {
    question: "In React, what is JSX?",
    options: [
      "A specialized query parser for backend databases.",
      "A syntax extension for JavaScript that mimics HTML templates, defining visual layouts easily.",
      "A verification protocol ensuring user credentials match server requirements.",
      "A command line bundler that manages library assets."
    ],
    answerIndex: 1,
    explanation: "Correct! JSX stands for JavaScript XML. It allows developers to write visual layout structures inside JS/TS files that transpilers compile to traditional React JS calls."
  }
];

export default function Quiz() {
  const [curr_index, setCurr_index] = useState(0);
  const [points, setPoints] = useState(0);
  const [chosen_option_index, setChosen_option_index] = useState(null);
  const [is_done, setIs_done] = useState(false);

  const choose_option = (idx) => {
    // only select if not answered yet
    if (chosen_option_index === null) {
      setChosen_option_index(idx);
      let correctAns = quizQuestions[curr_index].answerIndex;
      if (idx === correctAns) {
        setPoints(points + 1);
      }
    }
  };

  const go_to_next_question = () => {
    setChosen_option_index(null);
    let nextNum = curr_index + 1;
    if (nextNum < quizQuestions.length) {
      setCurr_index(nextNum);
    } else {
      setIs_done(true);
    }
  };

  const restart_quiz = () => {
    setCurr_index(0);
    setPoints(0);
    setChosen_option_index(null);
    setIs_done(false);
  };

  const currentQuestion = quizQuestions[curr_index];
  const answered = chosen_option_index !== null;
  const isCorrect = answered && chosen_option_index === currentQuestion.answerIndex;
  
  // calculate progress percentage
  const scorePct = Math.round((points / quizQuestions.length) * 100);
  const strokeOffset = 377 - (377 * (scorePct / 100));

  return (
    <div className="quiz-widget">
      {!is_done ? (
        <div style={{ position: 'relative' }}>
          <div className="quiz-progress">
            <span className="quiz-progress-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HelpCircle className="w-4.5 h-4.5 text-[var(--color-react)]" />
              <span>Question {curr_index + 1} of {quizQuestions.length}</span>
            </span>
            <div className="quiz-progress-dots">
              {quizQuestions.map(function(_, i) {
                let dot_class = 'quiz-dot';
                if (i < curr_index) {
                  dot_class += ' completed';
                } else if (i === curr_index) {
                  dot_class += ' active';
                }
                return (
                  <div 
                    key={i} 
                    className={dot_class}
                  />
                );
              })}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={curr_index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              id="quiz-active-screen"
            >
              <h3 className="quiz-question">{currentQuestion.question}</h3>
              
              <div className="quiz-options">
                {currentQuestion.options.map(function(option, idx) {
                  let optionClass = '';
                  let iconContent = null;
                  
                  if (answered) {
                    if (idx === currentQuestion.answerIndex) {
                      optionClass = 'correct';
                      iconContent = <Check className="w-4 h-4" />;
                    } else if (idx === chosen_option_index) {
                      optionClass = 'incorrect';
                      iconContent = <X className="w-4 h-4" />;
                    } else {
                      optionClass = 'disabled';
                    }
                  }
                  
                  return (
                    <motion.button 
                      whileHover={!answered ? { scale: 1.01, x: 4 } : {}}
                      whileTap={!answered ? { scale: 0.99 } : {}}
                      key={idx} 
                      className={`quiz-option ${optionClass}`}
                      onClick={() => choose_option(idx)}
                      disabled={answered}
                      style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', gap: '12px' }}
                    >
                      <span>{option}</span>
                      <div className="quiz-option-icon">{iconContent}</div>
                    </motion.button>
                  );
                })}
              </div>
              
              <AnimatePresence>
                {answered && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`quiz-feedback show ${isCorrect ? 'correct' : 'incorrect'}`}
                    style={{ overflow: 'hidden' }}
                  >
                    {isCorrect 
                      ? currentQuestion.explanation 
                      : `Incorrect. The correct answer was: "${currentQuestion.options[currentQuestion.answerIndex]}".\n\n${currentQuestion.explanation}`
                    }
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="quiz-actions">
                <motion.button 
                  whileHover={answered ? { scale: 1.03 } : {}}
                  whileTap={answered ? { scale: 0.97 } : {}}
                  className="btn-quiz-next" 
                  onClick={go_to_next_question}
                  disabled={!answered}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>{curr_index + 1 === quizQuestions.length ? 'Show Results' : 'Next Question'}</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Results Screen */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="quiz-results show"
        >
          <div className="results-ring-container">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle className="results-ring-bg" cx="70" cy="70" r="60" />
              <motion.circle 
                className="results-ring-fill" 
                cx="70" 
                cy="70" 
                r="60" 
                strokeDasharray="377" 
                initial={{ strokeDashoffset: 377 }}
                animate={{ strokeDashoffset: strokeOffset }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="results-score-text">{scorePct}%</div>
          </div>
          
          <div className="flex justify-center mb-2 text-[var(--color-react)]">
            <Award className="w-10 h-10 animate-bounce" />
          </div>
          
          <h3 className="results-title">
            {scorePct === 100 ? "React Master!" : scorePct >= 75 ? "Frontend Developer!" : "Keep Learning!"}
          </h3>
          <p className="results-desc">
            {scorePct === 100 
              ? `Incredible! You scored ${points} out of ${quizQuestions.length} correct. You are ready to start building your first React application!`
              : scorePct >= 75 
              ? `Great Job! You scored ${points} out of ${quizQuestions.length} correct. You have a solid grasp of the React core fundamentals.`
              : `You scored ${points} out of ${quizQuestions.length}. Review the explanations in the article and try again to solidify your understanding!`
            }
          </p>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-quiz-restart" 
            onClick={restart_quiz}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Knowledge Check</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
