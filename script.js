// Import the playAscii function from your file
import { playAscii } from './ascii.js';

document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const userInput = document.getElementById('userInput');
    const startupTextContainer = document.getElementById('startup-text');
    const asciiAnimationContainer = document.getElementById('ascii-animation-container');

    // Focus on the input field when clicking anywhere in the terminal
    terminal.addEventListener('click', () => {
        userInput.focus();
    });

    // --- Typing Animation ---
    const startupLines = [
        'CRNL.SYS v4.2.0 initializing...',
        'Memory check: 64 PB... OK',
        'Loading core modules... [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%',
        'Establishing connection to Cortex Relay Node...',
        'Connection successful. Encrypted channel open.',
        'Welcome, operator. Type "help" for a list of commands.'
    ];
    let lineIndex = 0;
    let charIndex = 0;

    function typeWriter(container, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                container.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    function initialBoot() {
        if (lineIndex < startupLines.length) {
            if (charIndex < startupLines[lineIndex].length) {
                if (lineIndex === 0) { // Add glitch effect to the first line
                    const charSpan = document.createElement('span');
                    charSpan.className = 'glitch text-2xl sm-text-4xl';
                    charSpan.setAttribute('data-text', startupLines[lineIndex][charIndex]);
                    charSpan.textContent = startupLines[lineIndex][charIndex];
                    startupTextContainer.appendChild(charSpan);
                } else {
                    startupTextContainer.innerHTML += startupLines[lineIndex].charAt(charIndex);
                }
                charIndex++;
                setTimeout(initialBoot, 25);
            } else {
                startupTextContainer.innerHTML += '<br>';
                lineIndex++;
                charIndex = 0;
                setTimeout(initialBoot, 200);
            }
        }
    }
    
    // --- Command Handling ---
    userInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const fullCommand = userInput.value.trim().toLowerCase();
            userInput.value = '';
            if (fullCommand) {
                const commandEntry = document.createElement('div');
                commandEntry.innerHTML = `<span class="text-cyan-400">CRNL:/~$&nbsp;</span>${fullCommand}`;
                output.appendChild(commandEntry);
                await processCommand(fullCommand);
            }
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    let asciiArtPlayed = false;

    // --- Gemini API Helper Function with Exponential Backoff ---
    async function callGemini(prompt, isJson = false, responseContainer) {
        const apiKey = ""; // Provided by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        };

        if (isJson) {
            payload.generationConfig = {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                }
            };
        }

        let attempts = 0;
        const maxAttempts = 5;
        let delay = 1000; // Start with 1 second

        while (attempts < maxAttempts) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.candidates && result.candidates.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        return text;
                    } else {
                        return "// ERROR: No content received from AI. Possible safety block or empty response. //";
                    }
                } else if (response.status === 429 || response.status >= 500) {
                    // Retry on rate limiting or server errors
                    attempts++;
                    if (attempts >= maxAttempts) {
                        return `// ERROR: AI connection unstable. Max retries reached. Status: ${response.status} //`;
                    }
                    if(responseContainer) {
                       const retryMsg = document.createElement('div');
                       retryMsg.innerHTML = `<span class="info">[AI network congested. Retrying in ${delay / 1000}s...]</span>`;
                       responseContainer.appendChild(retryMsg);
                    }
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Double the delay for the next attempt
                } else {
                    // Handle other errors like 403 Forbidden immediately
                    return `// ERROR: Network response was not ok. Status: ${response.status} //`;
                }
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                attempts++;
                 if (attempts >= maxAttempts) {
                    return `// ERROR: Failed to connect to AI datastream. Check console for details. //`;
                }
                if(responseContainer) {
                    const retryMsg = document.createElement('div');
                    retryMsg.innerHTML = `<span class="info">[AI connection lost. Retrying in ${delay / 1000}s...]</span>`;
                    responseContainer.appendChild(retryMsg);
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            }
        }
        return `// ERROR: AI datastream unreachable after multiple attempts. //`;
    }

    async function processCommand(fullCommand) {
        const responseContainer = document.createElement('div');
        responseContainer.classList.add('command-output');
        output.appendChild(responseContainer);
        
        const [command, ...args] = fullCommand.split(' ');
        const argument = args.join(' ');

        switch (command) {
            case 'help':
                responseContainer.innerHTML = `
Available commands:
  <span class="command-link">help</span>      - Displays this list of commands.
  <span class="command-link">clear</span>     - Clears the terminal screen.
  <span class="command-link">date</span>      - Shows the current system date.
  <span class="command-link">whoami</span>    - Displays information about the current user.
  <span class="command-link">art</span>       - Display ASCII animation.
  <span class="command-link">lore [topic]</span> - ✨ Access lore from the AI datastream.
  <span class="command-link">hack [target]</span>- ✨ Simulate a hack sequence with AI.
  <span class="command-link">matrix</span>    - Engage matrix display effect.
  <span class="command-link">exit</span>      - Terminate the session.
`;
                break;
            case 'clear':
                output.innerHTML = '';
                startupTextContainer.innerHTML = '';
                document.getElementById('ascii-art').style.display = 'none';
                asciiAnimationContainer.style.display = 'none';
                return; // No response needed
            case 'date':
                responseContainer.innerHTML = `Current system date: ${new Date().toUTCString()}`;
                break;
            case 'whoami':
                responseContainer.innerHTML = `USER: <span class="info">Operator_7</span>
UID: <span class="info">8c1f4e3a-5b6d-4f9e-8c1a-2b3c4d5e6f7g</span>
ACCESS_LEVEL: <span class="info">GUEST</span>`;
                break;
            case 'matrix':
                responseContainer.innerHTML = `Engaging matrix effect... stand by.`;
                runMatrixEffect();
                break;
            case 'exit':
                responseContainer.innerHTML = `Terminating session... Goodbye.`;
                setTimeout(() => {
                    document.body.innerHTML = '<div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 2.25rem;">CONNECTION TERMINATED</div>';
                }, 1000);
                break;
            case 'art':
                responseContainer.innerHTML = `<span class="info">Initializing animation...</span>`;
                asciiAnimationContainer.style.display = 'block';
                if (!asciiArtPlayed) {
                    playAscii('ascii-animation', 100, '#00ff41');
                    asciiArtPlayed = true;
                }
                break;
            
            // --- GEMINI API COMMANDS ---
            case 'lore':
                if (!argument) {
                    responseContainer.innerHTML = `Usage: lore [topic]. Example: <span class="info">lore cybernetics</span>`;
                    break;
                }
                responseContainer.innerHTML = `<span class="info">[ACCESSING DEEP NET FOR LORE ON: ${argument.toUpperCase()}...]</span>`;
                const lorePrompt = `In a gritty, neon-soaked cyberpunk world, write a short, classified data file (2-3 paragraphs) about "${argument}". Use technical jargon and a conspiratorial tone.`;
                const loreResponse = await callGemini(lorePrompt, false, responseContainer);
                
                if (loreResponse.startsWith('// ERROR:')) {
                    responseContainer.innerHTML += `<br><span class="text-red-500">${loreResponse}</span>`;
                } else {
                    responseContainer.innerHTML = ''; // Clear loading message
                    typeWriter(responseContainer, loreResponse, 20);
                }
                break;

            case 'hack':
                if (!argument) {
                    responseContainer.innerHTML = `Usage: hack [target]. Example: <span class="info">hack OmniCorp</span>`;
                    break;
                }
                responseContainer.innerHTML = `<span class="info">[INITIATING BLACK ICE PROTOCOL AGAINST: ${argument.toUpperCase()}...]</span><br>`;
                const hackPrompt = `Simulate a futuristic hacking sequence against "${argument}". Provide 5 distinct steps of the hack. Each step should be a short, single sentence full of technical cyberpunk jargon. Return as a JSON array of strings.`;
                const hackResponse = await callGemini(hackPrompt, true, responseContainer);
                
                if (hackResponse.startsWith('// ERROR:')) {
                    responseContainer.innerHTML += `<br><span class="text-red-500">${hackResponse}</span>`;
                    break;
                }

                try {
                    const steps = JSON.parse(hackResponse);
                    for (const step of steps) {
                        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
                        const stepDiv = document.createElement('div');
                        responseContainer.appendChild(stepDiv);
                        typeWriter(stepDiv, `> ${step}... [OK]<br>`, 30);
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    const successDiv = document.createElement('div');
                    responseContainer.appendChild(successDiv);
                    typeWriter(successDiv, `<span class="accent">[BREACH SUCCESSFUL. ROOT ACCESS GRANTED.]</span>`, 50);

                } catch(e) {
                     responseContainer.innerHTML += `<br><span class="text-red-500">// HACK FAILED: AI response was corrupted. Unable to parse steps. //</span>`;
                }
                break;

            // --- SECRET KEY COMMANDS ---
            case 'scan':
                responseContainer.innerHTML = `
<span class="info">Scanning for anomalies...</span>
[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%
Scan complete.
Found a hidden frequency resonating with the keyword '<span class="accent">glitch</span>'.
Further investigation required.`;
                break;
            case 'glitch':
                responseContainer.innerHTML = `
<span class="info">ACCESSING HIDDEN FREQUENCY...</span>
<span class="info">DECRYPTING PAYLOAD...</span>
<span class="accent">SUCCESS!</span>

You found it, operator.

<span class="accent">SECRET KEY:</span> <span class="info">C7B-A9F2-E4D0-11E9</span>

Keep this safe. It grants access to the inner systems.
`;
                break;

            default:
                responseContainer.innerHTML = `Command not found: <span class="text-red-500">${fullCommand}</span>. Type 'help' for a list of commands.`;
                break;
        }
    }

    function runMatrixEffect() {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.zIndex = '-1';
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()';
        const fontSize = 18;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(13, 2, 26, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px arial';

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        const matrixInterval = setInterval(draw, 33);

        setTimeout(() => {
            const stopMsg = document.createElement('div');
            stopMsg.classList.add('command-output');
            stopMsg.innerHTML = `Matrix effect will disengage in 10 seconds. Type 'clear' to remove canvas residue.`;
            output.appendChild(stopMsg);
            terminal.scrollTop = terminal.scrollHeight;
        }, 2000);

        setTimeout(() => {
            clearInterval(matrixInterval);
        }, 12000);
    }

    // Start the typewriter effect on load
    initialBoot();
});
