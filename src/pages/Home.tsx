import { Button } from '@/components/Button';

export const Home = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Головна сторінка Quiz App</h1>
      <p>Перевірка імпорту компонента через аліас @/:</p>
      
      <Button label="Тестова кнопка" onClick={() => alert('Кнопка працює!')} />
    </div>
  );
};