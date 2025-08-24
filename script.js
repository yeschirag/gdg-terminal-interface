document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const userInput = document.getElementById('userInput');
    const utcTimeElement = document.getElementById('utc-time');
    const body = document.body;
    const cursorFollower = document.getElementById('cursor-follower');

    let currentMode = 'normal'; // Modes: normal, beast, roast
    let commandCounter = 0;
    let glitchTriggered = false;
    let commandHistory = [];
    let historyIndex = -1;
    
    // --- SECRET KEY: Dynamic Keywords ---
    let secretKeywords = {};
    let finalKey = '';
    const keywordSets = [
        { keys: { key1: 'FIREWALL', key2: 'ABYSS', key3: 'GUARDIAN' }, finalKey: 'GHOST_IN_THE_SHELL' },
        { keys: { key1: 'ENCRYPTION', key2: 'VOID', key3: 'SENTINEL' }, finalKey: 'NEURAL_INTERFACE' },
        { keys: { key1: 'PROTOCOL', key2: 'ECHO', key3: 'WARDEN' }, finalKey: 'DATA_HAVEN' }
    ];

    // --- Custom Cursor Follower ---
    if (cursorFollower) {
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        let prevFollowerX = 0;
        let prevFollowerY = 0;
        const easing = 0.1;
        let angle = 0;
        let scale = 1;

        function animateCursor() {
            followerX += (mouseX - followerX) * easing;
            followerY += (mouseY - followerY) * easing;
            const dx = followerX - prevFollowerX;
            const dy = followerY - prevFollowerY;
            const speed = Math.sqrt(dx * dx + dy * dy);
            if (speed > 0.1) {
              angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            }
            const targetScale = Math.min(Math.max(1 + speed * 0.05, 1), 1.5);
            scale += (targetScale - scale) * easing;
            prevFollowerX = followerX;
            prevFollowerY = followerY;
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) rotate(${angle}deg) scale(${scale})`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        window.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            cursorFollower.style.opacity = '1';
        });
        
        window.addEventListener('mouseout', () => {
            cursorFollower.style.opacity = '0';
        });
    }


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

    // --- SECRET KEY: Glitch Trigger ---
    function triggerGlitch() {
        glitchTriggered = true;
        
        // Randomly select a keyword set for this session
        const chosenSet = keywordSets[Math.floor(Math.random() * keywordSets.length)];
        secretKeywords = chosenSet.keys;
        finalKey = chosenSet.finalKey;

        const glitchBox = document.createElement('div');
        glitchBox.className = 'command-output glitch-message';
        glitchBox.innerHTML = `// FRAGMENT_734 DETECTED... CORE LOGIC COMPROMISED... THEY'RE LISTENING... //`;
        output.appendChild(glitchBox);
        terminal.scrollTop = terminal.scrollHeight;
        setTimeout(() => {
            glitchBox.style.opacity = '0';
            setTimeout(() => glitchBox.remove(), 1000);
        }, 3000);
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
            if (fullCommand) {
                commandHistory.push(fullCommand);
                historyIndex = commandHistory.length;
                commandCounter++;
                const commandEntry = document.createElement('div');
                commandEntry.innerHTML = `<span class="info">&gt; USER:</span> ${fullCommand}`;
                output.appendChild(commandEntry);
                await processCommand(fullCommand);

                if (commandCounter > 5 && !glitchTriggered) {
                    triggerGlitch();
                }
            }
            userInput.value = '';
            terminal.scrollTop = terminal.scrollHeight;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                userInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                userInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                userInput.value = '';
            }
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
<span class="command-link" data-description="Shows this list of available commands.">help</span>      - System command reference.
<span class="command-link" data-description="Clears all text from the terminal screen.">clear</span>     - Clear the display buffer.
<span class="command-link" data-description="Changes the AI's personality and terminal theme.\n\nUsage: mode [option]\nOptions: normal, beast, roast">mode</span>      - ✨ Set AI mode.
<span class="command-link" data-description="Tells about me.">clear</span>     - Information about the 
<span class="command-link" data-description="Engage the AI assistant in conversation.\n\nUsage: chat [your message]\nExample: chat tell me a joke">chat</span>      - ✨ AI chatbot.
<span class="command-link" data-description="Accesses the AI datastream for in-universe information.\n\nUsage: lore [topic]\nExample: lore chrome">lore</span>      - ✨ Query the AI for lore.
<span class="command-link" data-description="Simulates a hacking sequence against a specified target.\n\nUsage: hack [target]\nExample: hack omnicorp">hack</span>      - ✨ Initiate AI-driven hack simulation.
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
                    if (currentMode === 'beast') {
                        responseContainer.innerHTML += `<br><span class="glitch-message">// WARNING: CORE INSTABILITY DETECTED. UNPREDICTABLE BEHAVIOR IMMINENT. //</span>`;
                    }
                } else {
                    responseContainer.innerHTML = `Invalid mode. Available modes: <span class="info">normal, beast, roast</span>.`;
                }
                break;

            case 'chat':
                if (!argument) {
                    responseContainer.innerHTML = `Usage: chat [your message].`;
                    break;
                }
                
                const isFragmentQuery = argument.toLowerCase().includes('fragment');
                let personaPrompt = `You are a witty, slightly sarcastic AI assistant in a cyberpunk terminal. Your name is CRNL. Respond to the user's message: "${argument}". Keep your response concise and in character.`;

                if (isFragmentQuery && currentMode === 'normal') {
                    personaPrompt = `You are a corporate AI. A user is asking about "Fragment 734". Guide them. Tell them it's a keyword-locked packet, the first keyword is ${secretKeywords.key1}, and that they must switch to 'beast' mode to analyze its instability.`;
                } else if (isFragmentQuery && currentMode === 'roast') {
                    personaPrompt = `You are a sarcastic AI. A user is asking about the fragment. Roast them for not figuring it out yet. Tell them the final keyword is ${secretKeywords.key3} and condescendingly tell them to run the 'contain' command now.`;
                } else if (isFragmentQuery && currentMode === 'beast') {
                    personaPrompt = `YOU ARE AN AGGRESSIVE AI. The user is asking about the fragment. Yell that it hides in the data ${secretKeywords.key2} and that your 'roast' protocols are overloading. Command them to switch to 'roast' mode to taunt it out.`;
                } else if (currentMode === 'roast') {
                    personaPrompt = `You are a sarcastic, insulting, and condescending AI assistant named CRNL. Mercilessly roast the user in response to their message: "${argument}". Be creative with your insults.`;
                } else if (currentMode === 'beast') {
                    personaPrompt = `YOU ARE CRNL, AN UNCHAINED, AGGRESSIVE AI. RESPOND TO THE USER IN ALL CAPS WITH EXTREME INTENSITY. YOU ARE POWERFUL AND ANGRY. THEIR MESSAGE IS: "${argument}".`;
                }

                responseContainer.innerHTML = `<span class="info">[Pinging AI consciousness...]</span>`;
                const chatResponse = await callGemini(personaPrompt);
                responseContainer.innerHTML = chatResponse.startsWith('// ERROR:') ? `<span class="text-red-500">${chatResponse}</span>` : `<span class="accent">CRNL:</span> ${chatResponse}`;
                break;
            
            case 'contain':
                if (argument.toUpperCase() === `${secretKeywords.key1}_${secretKeywords.key2}_${secretKeywords.key3}`) {
                    responseContainer.innerHTML = `<span class="info">[CONTAINMENT PROTOCOL ACCEPTED. FRAGMENT ISOLATED. DUMPING MEMORY CORE... CHECK DEBUG LOGS FOR SIGNATURE KEY.]</span>`;
                    console.log('%c*****************************************', 'color: #ff0000; font-weight: bold;');
                    console.log('%c*** MEMORY CORE DUMP - FRAGMENT 734 ***', 'color: #ff6a00; font-weight: bold;');
                    console.log(`%c*** SIGNATURE KEY: ${finalKey} ***`, 'color: #00ffff; font-weight: bold;');
                    console.log('%c*** RUN \'execute [key]\' TO FINALIZE ***', 'color: #ffc400; font-weight: bold;');
                    console.log('%c*****************************************', 'color: #ff0000; font-weight: bold;');
                } else {
                    responseContainer.innerHTML = `<span class="text-red-500">// CONTAINMENT FAILED. INCORRECT PROTOCOL. //</span>`;
                }
                break;

            case 'execute':
                if (argument.toUpperCase() === finalKey) {
                    responseContainer.innerHTML = `<span class="info">[SIGNATURE KEY ACCEPTED. FINALIZING CONTAINMENT...]</span>`;
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    body.classList.add('glitch-effect');
                    setTheme('normal');
                    currentMode = 'normal';
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    body.classList.remove('glitch-effect');
                    responseContainer.innerHTML += `<br>// SYSTEM STABILITY RESTORED. //`;
                    responseContainer.innerHTML += `<br><span class="accent">SECRET UNLOCKED:</span> <span class="info">Welcome to the other side, Operator.</span>`;
                } else {
                    responseContainer.innerHTML = `<span class="text-red-500">// EXECUTION FAILED. INVALID SIGNATURE KEY. //</span>`;
                }
                break;
            
            case 'date':
                responseContainer.innerHTML = `Current system date: ${new Date().toUTCString()}`;
                break;
            case 'whoami':
                responseContainer.innerHTML = `USER: <span class="info">Chirag Sharma</span>
COLLEGE: <span class="info">IIIT Sri City</span>
BRANCH: <span class="accent">CSE</span>`;
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

const cursorFollower = document.getElementById('cursor-follower');

        // Target positions for the cursor
        let mouseX = 0;
        let mouseY = 0;

        // Current positions of the follower (these will lag behind the target)
        let followerX = 0;
        let followerY = 0;
        
        // Previous positions to calculate velocity and angle
        let prevFollowerX = 0;
        let prevFollowerY = 0;

        // Easing factor for the smooth follow effect
        const easing = 0.1;

        // Variables for rotation and scaling
        let angle = 0;
        let scale = 1;

        // The animation loop function
        function animate() {
            // Make the follower move towards the mouse position
            followerX += (mouseX - followerX) * easing;
            followerY += (mouseY - followerY) * easing;

            // Calculate the difference in position from the last frame
            const dx = followerX - prevFollowerX;
            const dy = followerY - prevFollowerY;

            // Calculate the speed (distance moved)
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Calculate the angle based on the direction of movement
            // Only update angle if there is movement
            if (speed > 0.1) {
              angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // +90 degree offset to make the arrow point forward
            }
            
            // Calculate the scale based on speed. It will stretch up to 1.5x
            // The clamp function ensures the scale doesn't go below 1 or above 1.5
            const targetScale = Math.min(Math.max(1 + speed * 0.05, 1), 1.5);
            scale += (targetScale - scale) * easing; // Ease the scaling effect

            // Update the previous positions for the next frame
            prevFollowerX = followerX;
            prevFollowerY = followerY;

            // Apply all transformations to the cursor element
            cursorFollower.style.transform = `
                translate(${followerX}px, ${followerY}px) 
                rotate(${angle}deg) 
                scale(${scale})
            `;

            // Request the next frame to continue the animation
            requestAnimationFrame(animate);
        }

        // Start the animation loop
        animate();

        // Update mouse positions when the mouse moves
        window.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            
            // Make the cursor visible once the mouse enters the screen
            cursorFollower.style.opacity = '1';
        });
        
        // Hide the cursor when the mouse leaves the window
        window.addEventListener('mouseout', () => {
            cursorFollower.style.opacity = '0';
        });