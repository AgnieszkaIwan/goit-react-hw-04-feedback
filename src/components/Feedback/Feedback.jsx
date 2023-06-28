import React, { useState } from 'react';
import styles from 'components/Feedback/Feedback.module.css';

const Section = ({ title, children }) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
);

const Statistics = ({ good, neutral, bad, total, positivePercentage }) => (
  <div className={styles.statistics}>
    <p>Dobry: {good}</p>
    <p>Neutralny: {neutral}</p>
    <p>Zły: {bad}</p>

    <p>Wszystkie odpowiedzi: {total}</p>
    <p>Procent pozytywnych odpowiedzi: {positivePercentage}%</p>
  </div>
);

const FeedbackOptions = ({ options, onLeaveFeedback }) => (
  <div>
    {options.map(option => (
      <button key={option} onClick={() => onLeaveFeedback(option)}>
        {option}
      </button>
    ))}
  </div>
);

const Notification = ({ message }) => (
  <p className={styles.notification}>{message}</p>
);

export const Feedback = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleButtonClick = response => {
    setState(prevState => ({
      ...prevState,
      [response]: prevState[response] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = state;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = state;
    const totalFeedback = countTotalFeedback();
    return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
  };

  const feedbackOptions = Object.keys(state);
  const totalFeedback = countTotalFeedback();

  return (
    <div className={styles.container}>
      <h1>Kawiarnia Expresso - Feedback</h1>
      <Section title="Zostaw feedback">
        <FeedbackOptions
          options={feedbackOptions}
          onLeaveFeedback={handleButtonClick}
        />
      </Section>
      <Section title="Statystyki">
        {totalFeedback > 0 ? (
          <Statistics
            title="Statystyki"
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default Feedback;
