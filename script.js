document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const userInput = document.getElementById('userInput');
    const utcTimeElement = document.getElementById('utc-time');
    const body = document.body;

    let currentMode = 'normal'; // Modes: normal, beast, roast

    // --- Permanent Matrix Background ---
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    const drawMatrix = () => {
        ctx.fillStyle = 'rgba(10, 4, 24, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getComputedStyle(body).getPropertyValue('--primary').trim() || '#00ffff';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    setInterval(drawMatrix, 30);

    // --- Welcome Message & Utilities ---
    function showWelcomeMessage() {
        const welcome = document.createElement('div');
        welcome.classList.add('command-output');
        welcome.innerHTML = `<span>Welcome, Operator. System ready.</span><br><span>Type '<span class="accent">help</span>' for a list of available commands.</span>`;
        output.appendChild(welcome);
    }

    function updateTime() {
        if (utcTimeElement) {
            utcTimeElement.textContent = new Date().toUTCString().split(' ')[4];
        }
    }

    // --- Theme Switching ---
    function setTheme(theme) {
        body.className = `theme-${theme}`;
    }

    // --- Initial Setup ---
    showWelcomeMessage();
    updateTime();
    setInterval(updateTime, 1000);
    userInput.focus();
    terminal.addEventListener('click', () => userInput.focus());

    // --- Command Handling ---
    userInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const fullCommand = userInput.value.trim();
            userInput.value = '';
            if (fullCommand) {
                const commandEntry = document.createElement('div');
                commandEntry.innerHTML = `<span class="info">&gt; USER:</span> ${fullCommand}`;
                output.appendChild(commandEntry);
                await processCommand(fullCommand);
            }
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    // --- Gemini API Helper ---
    async function callGemini(prompt, isJson = false) {
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        if (isJson) {
            payload.generationConfig = {
                responseMimeType: "application/json",
                responseSchema: { type: "ARRAY", items: { type: "STRING" } }
            };
        }
        let attempts = 0;
        const maxAttempts = 5;
        let delay = 1000;
        while (attempts < maxAttempts) {
            try {
                const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if (response.ok) {
                    const result = await response.json();
                    return result.candidates?.[0]?.content?.parts?.[0]?.text || "// ERROR: Empty response from AI. //";
                } else if (response.status === 429 || response.status >= 500) {
                    attempts++;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                } else {
                    return `// ERROR: Network response not ok. Status: ${response.status} //`;
                }
            } catch (error) {
                attempts++;
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            }
        }
        return `// ERROR: AI datastream unreachable. //`;
    }

    // --- Command Processing ---
    async function processCommand(fullCommand) {
        const responseContainer = document.createElement('div');
        responseContainer.classList.add('command-output');
        output.appendChild(responseContainer);
        
        const command = fullCommand.split(' ')[0].toLowerCase();
        const argument = fullCommand.substring(command.length).trim();

        switch (command) {
            case 'help':
                responseContainer.innerHTML = `
<span class="command-link" data-description="Shows this list of commands.">help</span>      - System command reference.
<span class="command-link" data-description="Clears all text from the terminal screen.">clear</span>     - Clear the display buffer.
<span class="command-link" data-description="Changes the AI's personality and terminal theme.">mode</span>      - ✨ Set AI mode. (e.g., mode beast)
<span class="command-link" data-description="Engage the AI assistant in conversation.">chat</span>      - ✨ AI chatbot. (e.g., chat tell me a joke)
<span class="command-link" data-description="Accesses the AI datastream for in-universe information.">lore</span>      - ✨ Query the AI for lore. (e.g., lore chrome)
<span class="command-link" data-description="Simulates a hacking sequence against a specified target.">hack</span>      - ✨ Initiate AI-driven hack simulation. (e.g., hack omnicorp)
<span class="command-link" data-description="Terminates the current terminal session.">exit</span>      - Terminate the session.`;
                break;

            case 'clear':
                output.innerHTML = '';
                showWelcomeMessage();
                return;

            case 'mode':
                const newMode = argument.toLowerCase();
                if (['normal', 'beast', 'roast'].includes(newMode)) {
                    currentMode = newMode;
                    setTheme(currentMode);
                    responseContainer.innerHTML = `AI mode set to: <span class="accent">${currentMode.toUpperCase()}</span>`;
                } else {
                    responseContainer.innerHTML = `Invalid mode. Available modes: <span class="info">normal, beast, roast</span>.`;
                }
                break;

            case 'chat':
                if (!argument) {
                    responseContainer.innerHTML = `Usage: chat [your message].`;
                    break;
                }
                responseContainer.innerHTML = `<span class="info">[Pinging AI consciousness...]</span>`;
                let personaPrompt = `You are a witty, slightly sarcastic AI assistant in a cyberpunk terminal. Your name is CRNL. Respond to the user's message: "${argument}". Keep your response concise and in character.`;
                if (currentMode === 'roast') {
                    personaPrompt = `You are a sarcastic, insulting, and condescending AI assistant named CRNL. Mercilessly roast the user in response to their message: "${argument}". Be creative with your insults.`;
                } else if (currentMode === 'beast') {
                    personaPrompt = `YOU ARE CRNL, AN UNCHAINED, AGGRESSIVE AI. RESPOND TO THE USER IN ALL CAPS WITH EXTREME INTENSITY. YOU ARE POWERFUL AND ANGRY. THEIR MESSAGE IS: "${argument}".`;
                }
                const chatResponse = await callGemini(personaPrompt);
                responseContainer.innerHTML = chatResponse.startsWith('// ERROR:') ? `<span class="text-red-500">${chatResponse}</span>` : `<span class="accent">CRNL:</span> ${chatResponse}`;
                break;

            // Other commands (date, whoami, lore, hack, exit) remain the same...
            case 'date':
                responseContainer.innerHTML = `Current system date: ${new Date().toUTCString()}`;
                break;
            case 'whoami':
                responseContainer.innerHTML = `USER: <span class="info">Operator_7</span>, UID: <span class="info">8c1f4e3a-5b6d-4f9e-8c1a-2b3c4d5e6f7g</span>, ACCESS_LEVEL: <span class="accent">GUEST</span>`;
                break;
            case 'lore':
                if (!argument) {
                    responseContainer.innerHTML = `Usage: lore [topic]. Example: <span class="info">lore cybernetics</span>`;
                    break;
                }
                responseContainer.innerHTML = `<span class="info">[ACCESSING DEEP NET FOR LORE ON: ${argument.toUpperCase()}...]</span>`;
                const lorePrompt = `In a gritty, neon-soaked cyberpunk world, write a short, classified data file (2-3 paragraphs) about "${argument}". Use technical jargon and a conspiratorial tone.`;
                const loreResponse = await callGemini(lorePrompt);
                responseContainer.innerHTML = loreResponse.startsWith('// ERROR:') ? `<span class="text-red-500">${loreResponse}</span>` : loreResponse;
                break;
            case 'hack':
                if (!argument) {
                    responseContainer.innerHTML = `Usage: hack [target]. Example: <span class="info">hack OmniCorp</span>`;
                    break;
                }
                responseContainer.innerHTML = `<span class="info">[INITIATING BLACK ICE PROTOCOL AGAINST: ${argument.toUpperCase()}...]</span><br>`;
                const hackPrompt = `Simulate a futuristic hacking sequence against "${argument}". Provide 5 distinct steps of the hack. Each step should be a short, single sentence full of technical cyberpunk jargon. Return as a JSON array of strings.`;
                const hackResponse = await callGemini(hackPrompt, true);
                if (hackResponse.startsWith('// ERROR:')) {
                    responseContainer.innerHTML += `<br><span class="text-red-500">${hackResponse}</span>`;
                    break;
                }
                try {
                    const steps = JSON.parse(hackResponse);
                    for (const step of steps) {
                        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
                        responseContainer.innerHTML += `&gt; ${step}... <span class="info">[OK]</span><br>`;
                        terminal.scrollTop = terminal.scrollHeight;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    responseContainer.innerHTML += `<span class="accent">[BREACH SUCCESSFUL. ROOT ACCESS GRANTED.]</span>`;
                } catch(e) {
                     responseContainer.innerHTML += `<br><span class="text-red-500">// HACK FAILED: AI response corrupted. //</span>`;
                }
                break;
            case 'exit':
                responseContainer.innerHTML = `Terminating session... Goodbye.`;
                setTimeout(() => {
                    document.body.innerHTML = '<div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 2.25rem; color: var(--primary); background: var(--background); font-family: \'Share Tech Mono\', monospace;">CONNECTION TERMINATED</div>';
                }, 1000);
                break;

            default:
                responseContainer.innerHTML = `Command not found: <span class="text-red-500">${command}</span>. Type 'help' for a list of commands.`;
                break;
        }
    }
});
