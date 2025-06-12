// Array de objetos de perguntas, cada um com texto, opções e a resposta correta.
        const questions = [
            {
                question: "Qual o nome da minha Mãe?",
                answers: ["Fernanda", "Fabiana", "Fátima", "Flávia"],
                correctAnswer: "Fernanda"
            },
            {
                question: "Qual minha cor fávorita?",
                answers: ["Azul", "Vermelho", "Vermelho Escuro", "Preto"],
                correctAnswer: "Preto"
            },
            {
                question: "Qual a tecnologia que eu estou estudando para ser FRONT-END?",
                answers: ["Three.js", "React", "Node", "Css"],
                correctAnswer: "Three.js"
            },
            {
                question: "Qual foi o dia em que a gente saiu para o café RonRonCat?",
                answers: ["25 de maio", "29 de abril", "17 de março", "nenhuma das anteriores"],
                correctAnswer: "25 de maio"
            },
            {
                question: "Quando foi a primeira vez que eu tive interesse por você?",
                answers: ["No Refeitório", "No corredor", "Na sua sala", "Fora da Etec"],
                correctAnswer: "No Refeitório"
            }
        ];

        // Referências aos elementos HTML
        const questionsContainer = document.getElementById('questionsContainer');
        const submitButton = document.getElementById('submitButton');
        const resultsSection = document.getElementById('resultsSection');
        const scoreText = document.getElementById('scoreText');
        const restartButton = document.getElementById('restartButton');

        let userAnswers = new Map(); // Armazena as respostas selecionadas pelo usuário (índice da pergunta -> resposta)
        let score = 0; // Pontuação do usuário

        // Função para iniciar ou reiniciar o questionário
        function startQuiz() {
            userAnswers.clear(); // Limpa as respostas anteriores
            score = 0; // Reseta a pontuação

            // Mostra o container das perguntas e oculta a seção de resultados
            questionsContainer.classList.remove('hidden2');
            submitButton.classList.remove('hidden2');
            resultsSection.classList.add('hidden2');

            submitButton.textContent = 'Enviar Respostas'; // Define o texto do botão de envio
            submitButton.disabled = true; // Desabilita o botão de envio inicialmente

            renderAllQuestions(); // Renderiza todas as perguntas na página
        }

        // Função para renderizar todas as perguntas na página
        function renderAllQuestions() {
            questionsContainer.innerHTML = ''; // Limpa o conteúdo anterior

            questions.forEach((question, qIndex) => {
                const questionBlock = document.createElement('div');
                questionBlock.classList.add('question-block');
                // Adiciona um atributo de dados para identificar o índice da pergunta
                questionBlock.setAttribute('data-question-index', qIndex);

                const qText = document.createElement('p');
                qText.classList.add('question-text');
                qText.textContent = `${qIndex + 1}. ${question.question}`; // Adiciona o número da pergunta
                questionBlock.appendChild(qText);

                const answersDiv = document.createElement('div');
                answersDiv.classList.add('answer-buttons');

                question.answers.forEach(answer => {
                    const button = document.createElement('button');
                    button.textContent = answer;
                    button.classList.add('answer-button');
                    // Adiciona um atributo de dados para armazenar a resposta
                    button.setAttribute('data-answer', answer);
                    // Adiciona o evento de clique para selecionar a resposta
                    button.addEventListener('click', () => selectAnswer(button, answer));
                    answersDiv.appendChild(button);
                });
                questionBlock.appendChild(answersDiv);
                questionsContainer.appendChild(questionBlock); // Adiciona o bloco da pergunta ao container
            });
        }

        // Função para lidar com a seleção de uma resposta
        function selectAnswer(button, answer) {
            const questionBlock = button.closest('.question-block');
            const questionIndex = parseInt(questionBlock.dataset.questionIndex);

            // Remove a classe 'selected' de todos os botões DENTRO DESTE bloco de pergunta
            Array.from(questionBlock.querySelectorAll('.answer-button')).forEach(btn => {
                btn.classList.remove('selected');
                // Garante que classes de feedback sejam removidas ao re-selecionar antes do envio
                btn.classList.remove('correct', 'incorrect');
            });

            // Adiciona a classe 'selected' ao botão clicado
            button.classList.add('selected');
            userAnswers.set(questionIndex, answer); // Armazena a resposta para a pergunta específica

            checkAllQuestionsAnswered(); // Verifica se todas as perguntas foram respondidas
        }

        // Função para verificar se todas as perguntas foram respondidas
        function checkAllQuestionsAnswered() {
            if (userAnswers.size === questions.length) {
                submitButton.disabled = false; // Habilita o botão de envio
            } else {
                submitButton.disabled = true; // Mantém o botão desabilitado
            }
        }

        // Função para lidar com o clique no botão "Enviar Respostas"
        function handleSubmitButton() {
            score = 0; // Reseta a pontuação antes de recalcular

            // Itera por todas as perguntas para verificar as respostas e aplicar feedback visual
            questions.forEach((question, index) => {
                const userAnswer = userAnswers.get(index);
                const questionBlock = document.querySelector(`.question-block[data-question-index="${index}"]`);
                const buttons = Array.from(questionBlock.querySelectorAll('.answer-button'));

                buttons.forEach(btn => {
                    btn.disabled = true; // Desabilita todos os botões após o envio
                    if (btn.textContent === question.correctAnswer) {
                        btn.classList.add('correct'); // Marca a resposta correta
                    } else if (btn.textContent === userAnswer && userAnswer !== question.correctAnswer) {
                        btn.classList.add('incorrect'); // Marca a resposta incorreta do usuário
                    }
                });

                // Incrementa a pontuação se a resposta do usuário estiver correta
                if (userAnswer === question.correctAnswer) {
                    score++;
                }
            });

            // Oculta as perguntas e mostra a seção de resultados após um breve atraso
            setTimeout(() => {
                questionsContainer.classList.add('hidden2');
                submitButton.classList.add('hidden2');
                resultsSection.classList.remove('hidden2');
                scoreText.textContent = `Você acertou ${score} de ${questions.length} perguntas.`; // Exibe a pontuação final
            }, 1000); // Atraso de 1 segundo para o usuário ver o feedback
        }

        // Event Listeners
        submitButton.addEventListener('click', handleSubmitButton);
        restartButton.addEventListener('click', startQuiz);

        // Inicia o questionário quando a página é carregada
        window.onload = startQuiz;