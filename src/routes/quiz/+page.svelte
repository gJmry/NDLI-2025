<script lang="ts">
    import {onMount} from "svelte";

    // Contenu scrolable sur le NIDR
    const nidrTexts = [
        "Bienvenue dans le village numérique gaulois !",
        "Le NIDR, c'est le 'Numérique Inclusif, Responsable et Durable'.",
        "Chaque hutte symbolise un aspect : Linux, sobriété numérique, réemploi, sécurité...",
        "Le but : comprendre comment résister à l'empire romain des Big Tech.",
        "Tu apprendras à protéger tes données, réduire ton empreinte numérique et utiliser des logiciels libres.",
        "Après cette lecture, un petit quiz t'attendra pour tester tes connaissances !"
    ];

    // Quiz
    type Question = {
        question: string;
        options: string[];
        answer: number;
        feedback: string[];
    };

    const quiz: Question[] = [
        {
            question: "Que signifient les lettres NIDR ?",
            options: ["Numérique Indépendant et Durable pour les Résistants", "Nouvelle Initiative des Développeurs Romains", "Networked Interactive Digital Realm"],
            answer: 0,
            feedback: [
                "Bravo ! C'est bien la démarche de résistance numérique.",
                "Oups ! Ce n'est pas ça, pas de César ici.",
                "Non, ce n'est pas un terme anglo-saxon !"
            ]
        },
        {
            question: "Quel logiciel est emblématique du NIDR ?",
            options: ["Windows", "Linux", "MacOS"],
            answer: 1,
            feedback: [
                "Non, Windows c'est le Romain infiltré !",
                "Exact ! Linux permet d'éviter l'obsolescence programmée.",
                "Non, MacOS n'est pas utilisé dans le village."
            ]
        },
        {
            question: "Quel aspect n'est pas du NIDR ?",
            options: ["Sobriété numérique", "Réemploi", "Domination des Big Tech"],
            answer: 2,
            feedback: [
                "Non, la sobriété est essentielle !",
                "Non, réemploi et reconditionnement font partie de NIDR.",
                "Bravo ! Résister aux Big Tech est le but du village."
            ]
        },
        {
            question: "Quels sont les trois piliers du NIDR ?",
            options: ["Inclusion, Responsabilité, Durabilité", "Performance, Cloud, Licences", "Obsolescence, Abonnements, Objets connectés"],
            answer: 0,
            feedback: [
                "Exact ! Ce sont les fondations de notre village.",
                "Non, ce sont des pratiques romaines...",
                "Non, ce ne sont pas les piliers du NIDR !"
            ]
        },
        {
            question: "Une action recommandée pour la sobriété numérique ?",
            options: ["Éteindre les appareils quand ils ne servent pas", "Laisser les ordinateurs tourner 24/7", "Installer tous les logiciels possibles"],
            answer: 0,
            feedback: [
                "Bravo ! On économise énergie et ressources.",
                "Non, les Romains n’apprécieraient pas ça...",
                "Non, ça gaspille énergie inutilement !"
            ]
        },
        {
            question: "Le village NIDR lutte contre qui ?",
            options: ["Les Romains de l'Empire Numérique", "Les autres villages gaulois", "Les lutins numériques"],
            answer: 0,
            feedback: [
                "Exact ! Résister aux Big Tech, c’est notre combat.",
                "Non, nous sommes tous alliés ici.",
                "Non, pas de lutins ici, juste des Romains numériques."
            ]
        }
    ];

    let step = 0; // étape actuelle (texte / quiz)
    let currentQuiz = 0;
    let score = 0;
    let quizCompleted = false;
    let feedback = "";

    function nextText() {
        if (step < nidrTexts.length - 1) step++;
        else step = nidrTexts.length; // passer au quiz
    }

    function answerQuestion(index: number) {
        feedback = quiz[currentQuiz].feedback[index];
        if (index === quiz[currentQuiz].answer) score++;
        if (currentQuiz < quiz.length - 1) currentQuiz++;
        else quizCompleted = true;
    }

    function restartQuiz() {
        currentQuiz = 0
        score = 0;
        quizCompleted = false;
    }
</script>

<div class="pixel-wrap">
    <div class="crt">
        <div class="hud">
            <div class="hud-left">Village Gaulois</div>
            <div class="hud-center">Initiative NIDR</div>
            <div class="hud-right">Score: {score}</div>
        </div>

        <div class="stage">
            {#if step < nidrTexts.length}
                <div class="scroll-text" on:click={nextText}>
                    {nidrTexts[step]}
                    <div class="scroll-hint">Clique pour continuer →</div>
                </div>
            {:else if !quizCompleted}
                <div class="quiz">
                    <div class="question">{quiz[currentQuiz].question}</div>
                    <div class="options">
                        {#each quiz[currentQuiz].options as option, i}
                            <button class="btn pixel-btn" on:click={() => answerQuestion(i)}>
                                {option}
                            </button>
                        {/each}
                    </div>
                    {#if feedback}
                        <div class="feedback">{feedback}</div>
                    {/if}
                </div>
            {:else}
                {#if quizCompleted}
                    <div class="quiz-completed items-center justify-center gap-4 p-6 bg-linear-to-br from-green-900 to-green-800 border-4 border-green-700 rounded-xl shadow-lg text-center max-w-md mx-auto">
                        <div class="text-3xl text-yellow-400 font-extrabold drop-shadow-lg">🎉 Bravo !</div>
                        <div class="text-lg text-cyan-400 font-bold">
                            Tu as terminé le quiz avec un score de <span class="text-white">{score}
                            / {quiz.length}</span> !
                            Le village numérique est fier de toi ! 🏰
                        </div>
                        <button
                                on:click={() => restartQuiz()}
                           class="cursor-pointer mt-4 px-6 py-2 bg-linear-to-b from-green-700 to-green-900 border-2 border-black rounded-lg shadow hover:scale-105 transition-transform font-extrabold text-white">
                            RECOMMENCER
                        </button>
                        <a href="/village"
                           class="mt-4 px-6 py-2 bg-linear-to-b from-green-700 to-green-900 border-2 border-black rounded-lg shadow hover:scale-105 transition-transform font-extrabold text-white">
                            CONTINUER
                        </a>
                    </div>
                {/if}
            {/if}
        </div>

        <div class="scanlines"></div>
    </div>
</div>

<style>
    .pixel-wrap {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        background: #0b0b0b;
        font-family: monospace;
    }

    .crt {
        width: min(900px, 96%);
        background: linear-gradient(180deg, #001207 0%, #02140b 100%);
        border: 8px solid #0b5b2b;
        padding: 12px;
        position: relative;
        image-rendering: pixelated;
    }

    .hud {
        display: flex;
        justify-content: space-between;
        padding: 6px 12px;
        background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.15) 0 2px, rgba(255, 255, 255, 0.02) 2px 4px);
        color: #bfe8a6;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: 1px;
    }

    .stage {
        position: relative;
        width: 800px;
        height: 400px;
        margin-top: 12px;
        background: #01210b;
        border: 3px solid #0b5b2b;
        overflow: hidden;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #bfe8a6;
        font-weight: 700;
        font-size: 18px;
        text-align: center;
        padding: 16px;
    }

    .scroll-text {
        cursor: pointer;
    }

    .scroll-hint {
        font-size: 14px;
        color: #00adef;
        margin-top: 10px;
        opacity: 0.8;
    }

    .quiz {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .question {
        font-size: 20px;
        margin-bottom: 12px;
        color: #ffd86b;
        text-shadow: 1px 1px 0 #000;
    }

    .options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .feedback {
        margin-top: 10px;
        font-size: 16px;
        color: #00adef;
        font-weight: 700;
        text-shadow: 1px 1px 0 #000;
    }

    .btn {
        padding: 8px 12px;
        border-radius: 6px;
        border: 3px solid rgba(0, 0, 0, 0.5);
        font-weight: 800;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(180deg, #163b1b, #0d2a13);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        transition: transform 0.1s;
    }

    .btn:hover {
        transform: scale(1.05);
    }

    .quiz-completed {
        font-size: 22px;
        color: #00adef;
        font-weight: 900;
        text-shadow: 1px 1px 0 #000, 0 0 10px #00adef;
    }

    .scanlines {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgba(0, 0, 0, 0.02) 50%, rgba(255, 255, 255, 0.01) 50%);
        background-size: 100% 4px;
        pointer-events: none;
        mix-blend-mode: overlay;
        opacity: 0.18;
    }
</style>
