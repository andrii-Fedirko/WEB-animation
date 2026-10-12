import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Question, QuizContextType } from './types';

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Яка основна перевага використання TypeScript в React?',
    options: [
      'Строга типізація та виявлення помилок під час розробки',
      'Прискорення завантаження сторінки',
      'Автоматична стилізація компонентів',
      'Відсутність потреби в Babel',
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: 'Який хук використовується для збереження стану в React?',
    options: ['useEffect', 'useState', 'useContext', 'useRef'],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'Що таке React Context API?',
    options: [
      'Бібліотека для стилів',
      'Механізм для передачі даних без Prop Drilling',
      'База даних',
      'Маршрутизатор',
    ],
    correctAnswer: 1,
  },
];

const QuizContext = createContext<QuizContextType | undefined>(undefined);
const HIGH_SCORE_KEY = 'quiz_high_score';

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Зчитуємо найкращий результат з localStorage при завантаженні
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? JSON.parse(saved) : 0;
  });

  // Записуємо новий рекорд у localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(score));
    }
  }, [score, highScore]);

  const answerQuestion = (selectedOptionIndex: number) => {
    const currentQ = MOCK_QUESTIONS[currentQuestionIndex];

    if (selectedOptionIndex === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 < MOCK_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <QuizContext.Provider
      value={{
        questions: MOCK_QUESTIONS,
        currentQuestionIndex,
        score,
        isCompleted,
        highScore,
        answerQuestion,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};