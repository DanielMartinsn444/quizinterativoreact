import { useState } from "react";
import data from "./Questions.json";

export const QuestionSet = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);

    const currentCard = data.questions[currentIndex];

    const handleOptionClick = (indexClick) => {
        if (answered) return;
        setSelectedAnswer(indexClick);
        setAnswered(true);

     
        if (indexClick === currentCard.answer) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
    };

 
    if (currentIndex >= data.questions.length) {
        return (
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>🏆 Quiz Finalizado!</h2>
                    <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
                        Você acertou <strong>{score}</strong> de {data.questions.length} perguntas.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={nextButtonStyle}
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
           
                <div style={headerStyle}>
                    <span>Pergunta {currentIndex + 1} de {data.questions.length}</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Acertos: {score}</span>
                </div>

             
                <h2 style={questionTitleStyle}>
                    {currentCard.question}
                </h2>

               
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {currentCard.alternatives.map((alt, index) => {
                        let bgColor = '#1e293b';
                        let borderColor = '#334155';

                        if (answered) {
                            if (index === currentCard.answer) {
                                bgColor = '#064e3b'; 
                                borderColor = '#10b981';
                            } else if (index === selectedAnswer) {
                                bgColor = '#450a0a'; 
                                borderColor = '#ef4444';
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: bgColor,
                                    border: `2px solid ${borderColor}`,
                                    cursor: answered ? 'not-allowed' : 'pointer',
                                    transform: !answered && selectedAnswer === null ? 'scale(1)' : 'scale(1)',
                                }}
                            >
                                {alt}
                            </button>
                        );
                    })}
                </div>

             
                {answered && (
                    <button onClick={nextQuestion} style={nextButtonStyle}>
                        Próxima Pergunta →
                    </button>
                )}
            </div>
        </div>
    );
};


const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#020617', 
    fontFamily: 'sans-serif',
    padding: '20px'
};

const cardStyle = {
    width: '100%',
    maxWidth: '550px',
    backgroundColor: '#0f172a',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    border: '1px solid #1e293b',
    textAlign: 'center'
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    fontSize: '0.85rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const questionTitleStyle = {
    marginBottom: '30px',
    fontSize: '1.5rem',
    lineHeight: '1.4',
    color: '#f8fafc',
    textAlign: 'left'
};

const buttonStyle = {
    width: '100%',
    padding: '18px',
    textAlign: 'left',
    borderRadius: '12px',
    color: '#f1f5f9',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none'
};

const nextButtonStyle = {
    marginTop: '30px',
    width: '100%',
    padding: '16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background 0.3s'
};