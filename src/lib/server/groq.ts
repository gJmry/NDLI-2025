import { GROQ_API_KEY } from "$env/static/private";

export async function generateGroqResponse(message: string): Promise<string> {
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
        const errorBody = await res.text();
        console.error("Erreur Groq API:", errorBody);
        throw new Error(`Échec de l'appel à Groq: ${res.status}`);
    }

    const data = await res.json();

    return data.output[1].content[0].text;
}
