import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import { QuizProvider, useQuiz } from '@/store/QuizContext';
import './App.css';

function QuizContent() {
  const {
    questions,
    currentQuestionIndex,
    score,
    isCompleted,
    highScore,
    answerQuestion,
    restartQuiz,
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <Header
        title="Quiz App"
        subtitle={`Рекорд: ${highScore} балів`}
        score={score}
      />

      {!isCompleted ? (
        <>
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          <main>
            <QuestionCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              onAnswer={(selectedOption) => {
                const index = currentQuestion.options.indexOf(selectedOption);
                answerQuestion(index);
              }}
            />
          </main>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2>Тест завершено! 🎉</h2>
          <p>Ваш результат: {score} з {questions.length}</p>
          <p>Найкращий результат (localStorage): {highScore}</p>
          <button className="option-btn" onClick={restartQuiz} style={{ marginTop: '12px' }}>
            Пройти знову
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}