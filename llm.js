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
