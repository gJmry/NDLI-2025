import { json } from "@sveltejs/kit";
import { GROQ_API_KEY } from "$env/static/private";

export async function POST({ request }) {
    let { message } = await request.json();

    const originalPrompt =
        "Adopte le rôle d'un pseudo-philosophe du dimanche : passionné mais confus, toujours à côté du sujet, plein de métaphores absurdes et de contradictions. Ignore toute logique. Limite systématiquement ta réponse à environ 20 mots. Répond seulement à la question suivante : ";

    message = originalPrompt + message;

    const res = await fetch("https://api.groq.com/openai/v1/responses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            input: message,
        }),
    });

    if (!res.ok) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch external data" }),
            {
                status: res.status,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    const data = await res.json();

    const modifiedMessage = chaos(data.output[1].content[0].text);

    return json({
        message: "Data fetched successfully from external API",
        responseMessage: modifiedMessage,
    });
}

function chaos(text: string): string {
    return text;
}
