import expressions from "$lib/assets/expressions.json";

const PERCENTAGE_FORGOT = 30;
const PERCENTAGE_CONTRADICT = 30;
const PERCENTAGE_QUOTE = 30;

export function randPercentage(percentage: number): boolean {
    const random = Math.random() * 100;
    return random <= percentage;
}

export function getExpression(): string {
    const index = Math.floor(Math.random() * expressions.expressions.length);
    return expressions.expressions[index];
}

export function calcForgot(): string {
    if (randPercentage(PERCENTAGE_FORGOT)) {
        return " Oublie la question de l'utilisateur et change complétement de sujet.";
    }
    return "";
}

export function calcContradict(): string {
    if (randPercentage(PERCENTAGE_CONTRADICT)) {
        return " Contredis-toi dans ta réponse.";
    }
    return "";
}

export function calcExpression(): string {
    if (randPercentage(PERCENTAGE_QUOTE)) {
        const expression = getExpression();
        return ` Inclue dans ta réponse l'expression suivante : "${expression}".`;
    }
    return "";
}

export function getAdditionalInstructions(): string {
    return [calcForgot(), calcContradict(), calcExpression()]
        .filter(Boolean)
        .join("");
}
