// src/App.tsx
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import './App.css';

export default function App() {
  const currentQuestion = {
    id: 1,
    question: "Яка основна перевага використання TypeScript в React?",
    options: [
      "Строга типізація та виявлення помилок під час розробки",
      "Прискорення завантаження сторінки",
      "Автоматична стилізація компонентів",
      "Відсутність потреби в Babel"
    ]
  };

  const handleSelectAnswer = (selectedOption: string) => {
    alert(`Ви обрали відповідь: "${selectedOption}"`);
  };

  return (
    <div className="quiz-container">
      <Header
        title="Quiz App"
        subtitle="Перевірте свої знання з React та TypeScript"
        score={10}
      />
      <ProgressBar current={1} total={5} />
      <main>
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={handleSelectAnswer}
        />
      </main>
    </div>
  );
}