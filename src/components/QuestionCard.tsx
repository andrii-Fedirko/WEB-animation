// src/components/QuestionCard.tsx

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (option: string) => void;
}

const LETTERS = ['А', 'Б', 'В', 'Г', 'Д'];

export function QuestionCard({ question, options, onAnswer }: QuestionCardProps) {
  return (
    <div className="question-card">
      <h2 className="question-title">{question}</h2>
      <div className="options-stack">
        {options.map((option, index) => (
          <button
            key={index}
            className="option-btn"
            onClick={() => onAnswer(option)}
          >
            <span className="option-letter">{LETTERS[index] || index + 1}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}