// This is a generic helper function to call the AI API.
// It includes exponential backoff for retrying requests.
export const callAIAPI = async (payload, retries = 3, delay = 1000) => {
    const apiKey = ""; // This will be handled by the execution environment.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            // If the response is not OK, but it's a rate-limiting error, we can retry.
            if (response.status === 429 && retries > 0) {
                console.warn(`AI API rate limited. Retrying in ${delay / 1000}s... (${retries} retries left)`);
                await new Promise(res => setTimeout(res, delay));
                return callAIAPI(payload, retries - 1, delay * 2);
            }
            // For other errors, we throw an exception to be caught below.
            const errorBody = await response.json();
            throw new Error(`AI API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorBody)}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            return candidate.content.parts[0].text;
        } else {
            // This handles cases where the response is successful but the content is empty or malformed.
             const finishReason = candidate?.finishReason;
             if (finishReason === 'SAFETY') {
                 return "The response could not be generated due to safety settings. Please modify your request.";
             }
            throw new Error('Invalid response structure from AI API.');
        }

    } catch (error) {
        console.error("Error calling AI API:", error);
        throw error; // Re-throw the error to be handled by the calling component
    }
};
