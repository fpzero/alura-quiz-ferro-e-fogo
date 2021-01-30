import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import ls from 'local-storage';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import congrats from '../animations/congrats.json';
import wrongAns from '../animations/wrong.json';

function ResultWidget({ results }) {
  const respostasCertas = results.filter((x) => x).length;
  const userName = ls.get('userName') || 'visitante';
  let resultMessage = '';
  let resultImg = '';

  if (respostasCertas === results.length) {
    resultMessage = `Parabéns ${userName}, você acertou as ${respostasCertas} perguntas e mostrou pro Dr. Willy quem é o verdadeiro Robot Master!!!`;
    resultImg = 'https://thumbs.gfycat.com/CheerfulDistantChupacabra-max-1mb.gif';
  } else if (respostasCertas > results.length / 2) {
    resultMessage = `Muito bom ${userName}, você acertou ${respostasCertas} perguntas e já está preparado pra enfrentar o Dr. Willy!!!`;
    resultImg = 'https://i.makeagif.com/media/3-06-2016/lLDS0n.gif';
  } else if (respostasCertas === 0) {
    resultMessage = `Oh não ${userName}, você errou todas as perguntas e permitiu que o Dr. Willy tivesse sucesso no seu plano de destruição. Game Over!!!`;
    resultImg = 'https://i.pinimg.com/originals/0d/c6/2b/0dc62be3824b7d150b6d0a259558d1a7.gif';
  } else {
    resultMessage = `É isso aí ${userName}, você acertou ${respostasCertas} perguntas. A fase é difícil, mas treine um pouco mais que você consegue... Continue!!!`;
    resultImg = 'https://www.fightersgeneration.com/nz9/char/megaman-and-rush-mm7.gif';
  }

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>Resultado</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '250px',
          objectFit: 'cover',
        }}
        src={resultImg}
      />
      <Widget.Content>
        <h3>
          {resultMessage}
        </h3>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index.toString()}__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {' '}
              <img alt="result" height="15px" src={result === true ? 'https://www.adiumxtras.com/images/pictures/8bit_mega_man_1_20276_6496_thumb_9812.png' : 'http://supermariobroscrossover.com/media/skin-preview-dr-wily-mega-man.548/full'} />
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Ready?
      </Widget.Header>
      <Widget.Content>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src="https://thumbs.gfycat.com/AnguishedNextClumber-max-1mb.gif"
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState();
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  const [animationState, setAnimationState] = React.useState({
    isStopped: false, isPaused: false,
  });
  const congratsLottie = {
    loop: false,
    autoplay: true,
    animationData: congrats,
    speed: 1.5,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const wrongLottie = {
    loop: false,
    autoplay: true,
    animationData: wrongAns,
    speed: 1.5,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativesForm
          onSubmit={(infosDoEvent) => {
            infosDoEvent.preventDefault();
            setIsQuestionSubmited(true);
            setAnimationState({
              ...animationState,
            });
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as={motion.label}
                whileHover={{ scale: 1.1 }}
                variants={{
                  checked: { scale: 1.05 },
                }}
                animate={isSelected ? 'checked' : ''}
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  checked={selectedAlternative === alternativeIndex}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button id="ConfirmarResposta" type="submit" disables={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && (
          <div style={{
            'margin-left': '15px', position: 'absolute', bottom: '50px', 'text-align': 'center',
          }}
          >
            <Lottie
              width={250}
              options={congratsLottie}
              isStopped={animationState.isStopped}
              isPaused={animationState.isPaused}
            />
          </div>
          )}
          {isQuestionSubmited && !isCorrect && (
          <div style={{
            'margin-left': '15px', position: 'absolute', bottom: '50px', 'text-align': 'center',
          }}
          >
            <Lottie
              width={250}
              options={wrongLottie}
              isStopped={animationState.isStopped}
              isPaused={animationState.isPaused}
            />
          </div>
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage({ quizQuestions, quizBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = quizQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = quizQuestions[questionIndex];
  const bg = quizBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1.6 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }
  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT
          && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
