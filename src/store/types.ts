export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  isCompleted: boolean;
  highScore: number;
}

export interface QuizContextType {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  isCompleted: boolean;
  highScore: number;
  answerQuestion: (selectedOptionIndex: number) => void;
  restartQuiz: () => void;
}