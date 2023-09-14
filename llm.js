//const Replicate = require("replicate");
const fetch = require("node-fetch");
const { OllamaClient } = require("ollama");

/*
const replicate = new Replicate({
    auth: "r8_egf1tvtTyxlPf99zAibDupSVKdwuvVe4DqtlJ",
});

replicate
    .run(
        "meta/llama-2-70b-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
        {
            input: {
                prompt: " give me a 4 letter word that rhymes with lake",
            },
        }
    )
    .then((output) => {
        // Join the array of strings into a single string with line breaks
        const poem = output.join(" ");
        console.log(poem);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
*/

//const API_TOKEN = "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";

// Create a new Ollama client instance with your Ollama ID
const ollamaClient = new OllamaClient({
    ollamaId: "your-ollama-id",
});

const URL = "http://localhost:11434/api/generate";

const postRequest = async (data) => {
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            const text = await response.text();
            return text;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        throw error;
    }
};

const getResponse = async (response) => {
    try {
        const reader = response.body.getReader();
        let partialLine = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            const textChunk = new TextDecoder().decode(value);
            const lines = (partialLine + textChunk).split("\n");
            partialLine = lines.pop();

            for (const line of lines) {
                if (line.trim() === "") continue;
                const parsedResponse = JSON.parse(line);
                // Process each response word
            }
        }

        if (partialLine.trim() !== "") {
            const parsedResponse = JSON.parse(partialLine);
            // Process the remaining line
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    postRequest,
    getResponse,
};
