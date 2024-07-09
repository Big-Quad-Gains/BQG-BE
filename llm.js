//const Replicate = require("replicate");
const fetch = require("node-fetch");
const { OllamaClient } = require("ollama");

/*
const replicate = new Replicate({
    auth: "",
});

replicate
    .run(
        "meta/llama-2-70b-chat:",
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

//const API_TOKEN = "";

// Create a new Ollama client instance with your Ollama ID
