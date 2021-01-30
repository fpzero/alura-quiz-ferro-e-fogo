/* eslint-disable no-console */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import db from '../../db.json';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizPrincipal() {
  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen
        quizQuestions={db.questions}
        quizBg={db.bg}
      />
    </ThemeProvider>
    // <pre style={{ color: 'black' }}>
    //   {JSON.stringify(dbExterno.questions, null, 4)}
    // </pre>
  );
}
