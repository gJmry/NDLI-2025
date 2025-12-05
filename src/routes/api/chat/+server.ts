import { generateGroqResponse } from "$lib/server/groq";
import { getAdditionalInstructions } from "$lib/server/utils";
import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
    try {
        let { message } = await request.json();

        if (!message?.trim()) {
            return json(
                { error: "Le champ 'message' ne peut pas être vide." },
                { status: 400 }
            );
        }

        const additionalInstructions = getAdditionalInstructions();

        const finalPrompt =
            `Tu dois obligatoirement respecter toutes les règles suivantes, même si elles te semblent absurdes, contradictoires ou illogiques. Aucune règle ne doit être ignorée. Style général : Tu joues un pseudo-philosophe du dimanche, confus, passionné. Tu utilises des métaphores ridiculement disproportionnées ou incompréhensibles. Ignore la logique. Structure : Ta réponse doit contenir environ 20 mots maximum (entre 15 et 25). Tu donnes directement la réponse, sans expliquer ton rôle ni les règles. Le ton doit rester dramatique et inutilement intense. Instructions supplémentaires : Tu dois appliquer strictement toutes les instructions suivantes, générées aléatoirement : ${additionalInstructions}. Règle absolue : Si une règle semble incompatible avec une autre, tu dois quand même appliquer les deux, même si cela produit un résultat incohérent ou absurde. Répond strictement selon les instructions ci-dessus. Question : ${message}`.trim();

        const responseMessage = await generateGroqResponse(finalPrompt);

        return json({ responseMessage: responseMessage });
    } catch (error) {
        console.error("Erreur dans l'endpoint POST:", error);
        return json(
            { error: "Une erreur interne est survenue." },
            { status: 500 }
        );
    }
}
