import * as THREE from 'three';
<<<<<<< HEAD
=======
import { CanvAscii } from './ascii.js'; // Import the new class

>>>>>>> ascii-art
document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const userInput = document.getElementById('userInput');
    const utcTimeElement = document.getElementById('utc-time');
    const body = document.body;
    const cursorFollower = document.getElementById('cursor-follower');

    const asciiPopup = document.getElementById('ascii-popup');
    const asciiContainer = document.getElementById('ascii-container');
<<<<<<< HEAD
    const closeAsciiButton = document.getElementById('close-ascii');
    let activeAsciiEffect = null;

    let currentMode = 'normal'; // Modes: normal, beast, roast
=======
    let activeAsciiEffect = null;

    let currentMode = 'normal';
>>>>>>> ascii-art
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

    let secretKeywords = {};
    let finalKey = '';
    const keywordSets = [
        { keys: { key1: 'FIREWALL', key2: 'ABYSS', key3: 'GUARDIAN' }, finalKey: 'GHOST_IN_THE_SHELL' },
        { keys: { key1: 'ENCRYPTION', key2: 'VOID', key3: 'SENTINEL' }, finalKey: 'NEURAL_INTERFACE' },
        { keys: { key1: 'PROTOCOL', key2: 'ECHO', key3: 'WARDEN' }, finalKey: 'DATA_HAVEN' }
    ];

    if (cursorFollower) {
<<<<<<< HEAD
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        let prevFollowerX = 0;
        let prevFollowerY = 0;
        const easing = 0.1;
        let angle = 0;
        let scale = 1;

=======
        let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0, prevFollowerX = 0, prevFollowerY = 0;
        const easing = 0.1;
        let angle = 0, scale = 1;
>>>>>>> ascii-art
        function animateCursor() {
            followerX += (mouseX - followerX) * easing;
            followerY += (mouseY - followerY) * easing;
            const dx = followerX - prevFollowerX;
            const dy = followerY - prevFollowerY;
            const speed = Math.sqrt(dx * dx + dy * dy);
<<<<<<< HEAD
            if (speed > 0.1) {
              angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            }
=======
            if (speed > 0.1) angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
>>>>>>> ascii-art
            const targetScale = Math.min(Math.max(1 + speed * 0.05, 1), 1.5);
            scale += (targetScale - scale) * easing;
            prevFollowerX = followerX;
            prevFollowerY = followerY;
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) rotate(${angle}deg) scale(${scale})`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
<<<<<<< HEAD

=======
>>>>>>> ascii-art
        window.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            cursorFollower.style.opacity = '1';
        });
<<<<<<< HEAD
        
=======
>>>>>>> ascii-art
        window.addEventListener('mouseout', () => {
            cursorFollower.style.opacity = '0';
        });
    }

<<<<<<< HEAD


    // --- Permanent Matrix Background ---
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
=======
    const matrixCanvas = document.getElementById('matrix-bg');
    const matrixCtx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
>>>>>>> ascii-art
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    const drawMatrix = () => {
        matrixCtx.fillStyle = 'rgba(10, 4, 24, 0.05)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        matrixCtx.fillStyle = getComputedStyle(body).getPropertyValue('--primary').trim() || '#00ffff';
        matrixCtx.font = fontSize + 'px monospace';
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            matrixCtx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    setInterval(drawMatrix, 30);

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

    function setTheme(theme) {
        body.className = `theme-${theme}`;
    }

    function triggerGlitch() {
        glitchTriggered = true;
<<<<<<< HEAD
        
        // Randomly select a keyword set for this session
        const chosenSet = keywordSets[Math.floor(Math.random() * keywordSets.length)];
        secretKeywords = chosenSet.keys;
        finalKey = chosenSet.finalKey;

=======
        const chosenSet = keywordSets[Math.floor(Math.random() * keywordSets.length)];
        secretKeywords = chosenSet.keys;
        finalKey = chosenSet.finalKey;
>>>>>>> ascii-art
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

    showWelcomeMessage();
    updateTime();
    setInterval(updateTime, 1000);
    userInput.focus();
    terminal.addEventListener('click', () => userInput.focus());

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

    async function callGemini(prompt, isJson = false) {
        const apiKey = "AIzaSyA29tZWVdrXydY5NGz3VZ3wYffzZg2eyNk";
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
<<<<<<< HEAD
<span class="command-link" data-description="Changes the AI's personality and terminal theme.\n\nUsage: mode [option]\nOptions: normal, beast, roast">mode</span>      - Set AI mode.
<span class="command-link" data-description="Tells about me.">whomai</span>    - Information about the owner of this terminal.
<span class="command-link" data-description="Renders your text as a 3D ASCII art piece.\n\nUsage: asciify [text]\nExample: asciify chirag">asciify</span>   - Generate 3D ASCII art.
<span class="command-link" data-description="Engage the AI assistant in conversation.\n\nUsage: chat [your message]\nExample: chat tell me a joke">chat</span>      - AI chatbot.
<span class="command-link" data-description="Accesses the AI datastream for in-universe information.\n\nUsage: lore [topic]\nExample: lore chrome">lore</span>      - Query the AI for lore.
<span class="command-link" data-description="Simulates a hacking sequence against a specified target.\n\nUsage: hack [target]\nExample: hack omnicorp">hack</span>      - Initiate AI-driven hack simulation.
=======
<span class="command-link" data-description="Changes the AI's personality and terminal theme.\n\nUsage: mode [option]\nOptions: normal, beast, roast">mode</span>      - ✨ Set AI mode.
<span class="command-link" data-description="Displays information about the terminal's operator.">whoami</span>    - Information about the current operator.
<span class="command-link" data-description="Engage the AI assistant in conversation.\n\nUsage: chat [your message]\nExample: chat tell me a joke">chat</span>      - ✨ AI chatbot.
<span class="command-link" data-description="Renders your text as a 3D ASCII art piece.\n\nUsage: asciify [text]\nExample: asciify chirag">asciify</span>   - ✨ Generate 3D ASCII art.
<span class="command-link" data-description="Accesses the AI datastream for in-universe information.\n\nUsage: lore [topic]\nExample: lore chrome">lore</span>      - ✨ Query the AI for lore.
<span class="command-link" data-description="Simulates a hacking sequence against a specified target.\n\nUsage: hack [target]\nExample: hack omnicorp">hack</span>      - ✨ Initiate AI-driven hack simulation.
>>>>>>> ascii-art
<span class="command-link" data-description="Terminates the current terminal session.">exit</span>      - Terminate the session.`;
                break;

            case 'clear':
                output.innerHTML = '';
                showWelcomeMessage();
                return;

            case 'asciify':
                if (!argument) {
                    responseContainer.innerHTML = `Usage: asciify [text]. Example: <span class="info">asciify hello</span>`;
                    break;
                }
                responseContainer.innerHTML = `<span class="info">[Rendering 3D ASCII for: ${argument}]</span>`;
                startAsciiEffect(argument);
                break;


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

            case 'asciify':
                if (!argument) {
                    responseContainer.innerHTML = `Usage: asciify [text]. Example: <span class="info">asciify hello</span>`;
                    break;
                }
                responseContainer.innerHTML = `<span class="info">[Rendering 3D ASCII for: ${argument}]</span>`;
                startAsciiEffect(argument);
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
                if (hackResponse.startsWith('// ERROR:') ? `<span class="text-red-500">${hackResponse}</span>` : `<span class="accent">CRNL:</span> ${hackResponse}`.startsWith('// ERROR:')) {
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
                } catch (e) {
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
<<<<<<< HEAD

    const vertexShader=`varying vec2 vUv;uniform float uTime;uniform float uEnableWaves;void main(){vUv=uv;float time=uTime*5.;float waveFactor=uEnableWaves;vec3 transformed=position;transformed.x+=sin(time+position.y)*.5*waveFactor;transformed.y+=cos(time+position.z)*.15*waveFactor;transformed.z+=sin(time+position.x)*waveFactor;gl_Position=projectionMatrix*modelViewMatrix*vec4(transformed,1.);}`;
    const fragmentShader=`varying vec2 vUv;uniform float uTime;uniform sampler2D uTexture;void main(){float time=uTime;vec2 pos=vUv;float r=texture2D(uTexture,pos+cos(time*2.-time+pos.x)*.01).r;float g=texture2D(uTexture,pos+tan(time*.5+pos.x-time)*.01).g;float b=texture2D(uTexture,pos-cos(time*2.+time+pos.y)*.01).b;float a=texture2D(uTexture,pos).a;gl_FragColor=vec4(r,g,b,a);}`;
    Math.map = (n, start, stop, start2, stop2) => ((n - start) / (stop - start)) * (stop2 - start2) + start2;
    class AsciiFilter{constructor(renderer,{fontSize,fontFamily,charset,invert}={}){this.renderer=renderer;this.domElement=document.createElement("div");Object.assign(this.domElement.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"});this.pre=document.createElement("pre");this.domElement.appendChild(this.pre);this.canvas=document.createElement("canvas");this.context=this.canvas.getContext("2d");this.domElement.appendChild(this.canvas);this.invert=invert??!0;this.fontSize=fontSize??12;this.fontFamily=fontFamily??"'Courier New', monospace";this.charset=charset??" .'`^\\\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";this.context.imageSmoothingEnabled=!1;this.onMouseMove=this.onMouseMove.bind(this);document.addEventListener("mousemove",this.onMouseMove)}setSize(width,height){this.width=width;this.height=height;this.renderer.setSize(width,height);this.context.font=`${this.fontSize}px ${this.fontFamily}`;const charWidth=this.context.measureText("A").width;this.cols=Math.floor(this.width/(this.fontSize*(charWidth/this.fontSize)));this.rows=Math.floor(this.height/this.fontSize);this.canvas.width=this.cols;this.canvas.height=this.rows;this.pre.style.fontFamily=this.fontFamily;this.pre.style.fontSize=`${this.fontSize}px`;this.center={x:width/2,y:height/2};this.mouse={x:this.center.x,y:this.center.y}}render(scene,camera){this.renderer.render(scene,camera);const{width:w,height:h}=this.canvas;this.context.clearRect(0,0,w,h);if(this.context&&w&&h)this.context.drawImage(this.renderer.domElement,0,0,w,h);this.asciify(this.context,w,h);this.hue()}onMouseMove(e){this.mouse={x:e.clientX,y:e.clientY}}get dx(){return this.mouse.x-this.center.x}get dy(){return this.mouse.y-this.center.y}hue(){const deg=180*Math.atan2(this.dy,this.dx)/Math.PI;this.deg=(this.deg||0)+(.075*(deg-(this.deg||0)));this.domElement.style.filter=`hue-rotate(${this.deg.toFixed(1)}deg)`}asciify(ctx,w,h){if(!w||!h)return;const imgData=ctx.getImageData(0,0,w,h).data;let str="";for(let y=0;y<h;y++){for(let x=0;x<w;x++){const i=4*(x+y*w),[r,g,b,a]=[imgData[i],imgData[i+1],imgData[i+2],imgData[i+3]];if(0===a){str+=" ";continue}const gray=(.3*r+.6*g+.1*b)/255;let idx=Math.floor((this.invert?gray:1-gray)*(this.charset.length-1));str+=this.charset[idx]}str+="\n"}this.pre.innerHTML=str}}
    class CanvasTxt{constructor(){this.canvas=document.createElement("canvas");this.context=this.canvas.getContext("2d")}draw(txt,{fontSize:fontSize=200,fontFamily:fontFamily="Arial",color:color="#fdf9f3"}={}){this.font=`600 ${fontSize}px ${fontFamily}`;this.context.font=this.font;const metrics=this.context.measureText(txt);this.canvas.width=Math.ceil(metrics.width)+20;this.canvas.height=Math.ceil(metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent)+20;this.context.font=this.font;this.context.fillStyle=color;this.context.fillText(txt,10,10+metrics.actualBoundingBoxAscent);return this.canvas}}
    class CanvAscii{constructor(settings,containerElem){this.settings=settings;this.container=containerElem;const{width:width,height:height}=containerElem.getBoundingClientRect();this.width=width;this.height=height;this.camera=new THREE.PerspectiveCamera(45,width/height,1,1e3);this.camera.position.z=30;this.scene=new THREE.Scene;this.mouse={x:0,y:0};this.onMouseMove=this.onMouseMove.bind(this);this.textCanvas=new CanvasTxt;this.setMesh();this.setRenderer()}setMesh(){const{text:text,textFontSize:textFontSize,textColor:textColor,planeBaseHeight:planeBaseHeight,enableWaves:enableWaves}=this.settings,textureCanvas=this.textCanvas.draw(text,{fontSize:textFontSize,fontFamily:"IBM Plex Mono",color:textColor});this.texture=new THREE.CanvasTexture(textureCanvas),this.texture.minFilter=THREE.NearestFilter;const textAspect=textureCanvas.width/textureCanvas.height,planeH=planeBaseHeight,planeW=planeH*textAspect;this.geometry=new THREE.PlaneGeometry(planeW,planeH,36,36),this.material=new THREE.ShaderMaterial({vertexShader:vertexShader,fragmentShader:fragmentShader,transparent:!0,uniforms:{uTime:{value:0},uTexture:{value:this.texture},uEnableWaves:{value:enableWaves?1:0}}}),this.mesh=new THREE.Mesh(this.geometry,this.material),this.scene.add(this.mesh)}setRenderer(){this.renderer=new THREE.WebGLRenderer({antialias:!1,alpha:!0}),this.renderer.setPixelRatio(1),this.renderer.setClearColor(0,0),this.filter=new AsciiFilter(this.renderer,{fontFamily:"IBM Plex Mono",fontSize:this.settings.asciiFontSize}),this.container.appendChild(this.filter.domElement),this.setSize(this.width,this.height),this.container.addEventListener("mousemove",this.onMouseMove)}updateText(newText){this.settings.text=newText;this.scene.remove(this.mesh);this.mesh.geometry.dispose();this.mesh.material.uniforms.uTexture.value.dispose();this.mesh.material.dispose();this.setMesh()}setSize(w,h){this.width=w;this.height=h;this.camera.aspect=w/h;this.camera.updateProjectionMatrix(),this.filter.setSize(w,h),this.center={x:w/2,y:h/2}}load(){this.animate()}onMouseMove(evt){const e=evt.touches?evt.touches[0]:evt,bounds=this.container.getBoundingClientRect();this.mouse={x:e.clientX-bounds.left,y:e.clientY-bounds.top}}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this));this.render()}render(){const time=.001*Date.now();this.texture.needsUpdate=!0,this.mesh.material.uniforms.uTime.value=Math.sin(time);const x=Math.map(this.mouse.y,0,this.height,.5,-.5),y=Math.map(this.mouse.x,0,this.width,-.5,.5);this.mesh.rotation.x+=(x-this.mesh.rotation.x)*.05,this.mesh.rotation.y+=(y-this.mesh.rotation.y)*.05,this.filter.render(this.scene,this.camera)}dispose(){cancelAnimationFrame(this.animationFrameId);this.container.removeEventListener("mousemove",this.onMouseMove);this.filter.dispose();this.scene.remove(this.mesh);this.mesh.geometry.dispose();this.mesh.material.uniforms.uTexture.value.dispose();this.mesh.material.dispose();while(this.container.firstChild){this.container.removeChild(this.container.firstChild)}}}
    
    function startAsciiEffect(text) {
        if (activeAsciiEffect) {
            activeAsciiEffect.dispose();
        }
        const settings = { text, asciiFontSize: 8, textFontSize: 200, textColor: '#fdf9f3', planeBaseHeight: 8, enableWaves: true };
        asciiPopup.style.display = 'flex';
        activeAsciiEffect = new CanvAscii(settings, asciiContainer);
        activeAsciiEffect.load();
    }

    closeAsciiButton.addEventListener('click', () => {
        asciiPopup.style.display = 'none';
        if (activeAsciiEffect) {
            activeAsciiEffect.dispose();
            activeAsciiEffect = null;
        }
    });
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
            const targetScale = Math.min(Math.max(1 + speed * 0.25, 1), 1.5);
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
=======
    function startAsciiEffect(text) {
        if (activeAsciiEffect) {
            activeAsciiEffect.dispose();
>>>>>>> ascii-art
        }

        const asciiSize = 10; // 👈 master control (try 10–14)

<<<<<<< HEAD
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

        
        const vertexShader = `
            varying vec2 vUv; uniform float uTime; uniform float uEnableWaves;
            void main() {
                vUv = uv; float time = uTime * 5.; float waveFactor = uEnableWaves;
                vec3 transformed = position;
                transformed.x += sin(time + position.y) * 0.5 * waveFactor;
                transformed.y += cos(time + position.z) * 0.15 * waveFactor;
                transformed.z += sin(time + position.x) * waveFactor;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
            }
        `;
        const fragmentShader = `
            varying vec2 vUv; uniform float uTime; uniform sampler2D uTexture;
            void main() {
                float time = uTime; vec2 pos = vUv;
                float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
                float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
                float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
                float a = texture2D(uTexture, pos).a;
                gl_FragColor = vec4(r, g, b, a);
            }
        `;
        
        Math.map = (n, start, stop, start2, stop2) => ((n - start) / (stop - start)) * (stop2 - start2) + start2;

        class AsciiFilter {
            constructor(renderer, { fontSize, fontFamily, charset, invert } = {}) {
                this.renderer = renderer;
                this.domElement = document.createElement('div');
                Object.assign(this.domElement.style, { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' });
                this.pre = document.createElement('pre');
                this.domElement.appendChild(this.pre);
                this.canvas = document.createElement('canvas');
                this.context = this.canvas.getContext('2d');
                this.domElement.appendChild(this.canvas);
                this.invert = invert ?? true;
                this.fontSize = fontSize ?? 12;
                this.fontFamily = fontFamily ?? "'Courier New', monospace";
                this.charset = charset ?? " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
                this.context.imageSmoothingEnabled = false;
                this.onMouseMove = this.onMouseMove.bind(this);
                document.addEventListener('mousemove', this.onMouseMove);
            }
            setSize(width, height) {
                this.width = width; this.height = height;
                this.renderer.setSize(width, height);
                this.context.font = `${this.fontSize}px ${this.fontFamily}`;
                const charWidth = this.context.measureText('A').width;
                this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)));
                this.rows = Math.floor(this.height / this.fontSize);
                this.canvas.width = this.cols; this.canvas.height = this.rows;
                this.pre.style.fontFamily = this.fontFamily; this.pre.style.fontSize = `${this.fontSize}px`;
                this.center = { x: width / 2, y: height / 2 }; this.mouse = { x: this.center.x, y: this.center.y };
            }
            render(scene, camera) {
                this.renderer.render(scene, camera);
                const { width: w, height: h } = this.canvas;
                this.context.clearRect(0, 0, w, h);
                if (this.context && w && h) this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
                this.asciify(this.context, w, h);
                this.hue();
            }
            onMouseMove(e) { this.mouse = { x: e.clientX, y: e.clientY }; }
            get dx() { return this.mouse.x - this.center.x; }
            get dy() { return this.mouse.y - this.center.y; }
            hue() {
                const deg = (Math.atan2(this.dy, this.dx) * 180) / Math.PI;
                this.deg = (this.deg || 0) + (deg - (this.deg || 0)) * 0.075;
                this.domElement.style.filter = `hue-rotate(${this.deg.toFixed(1)}deg)`;
            }
            asciify(ctx, w, h) {
                if (!w || !h) return;
                const imgData = ctx.getImageData(0, 0, w, h).data;
                let str = '';
                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        const i = (x + y * w) * 4;
                        const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];
                        if (a === 0) { str += ' '; continue; }
                        const gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
                        let idx = Math.floor((this.invert ? gray : 1 - gray) * (this.charset.length - 1));
                        str += this.charset[idx];
                    }
                    str += '\n';
                }
                this.pre.innerHTML = str;
            }
        }

        class CanvasTxt {
            constructor() {
                this.canvas = document.createElement('canvas');
                this.context = this.canvas.getContext('2d');
            }
            draw(txt, { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' } = {}) {
                this.font = `600 ${fontSize}px ${fontFamily}`;
                this.context.font = this.font;
                const metrics = this.context.measureText(txt);
                this.canvas.width = Math.ceil(metrics.width) + 20;
                this.canvas.height = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20;
                this.context.font = this.font; // Font needs to be reset after canvas resize
                this.context.fillStyle = color;
                this.context.fillText(txt, 10, 10 + metrics.actualBoundingBoxAscent);
                return this.canvas;
            }
        }

        class CanvAscii {
            constructor(settings, containerElem) {
                this.settings = settings;
                this.container = containerElem;
                const { width, height } = containerElem.getBoundingClientRect();
                this.width = width; this.height = height;

                this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
                this.camera.position.z = 30;
                this.scene = new THREE.Scene();
                this.mouse = { x: 0, y: 0 };
                this.onMouseMove = this.onMouseMove.bind(this);
                this.textCanvas = new CanvasTxt();
                
                this.setMesh();
                this.setRenderer();
            }

            setMesh() {
                const { text, textFontSize, textColor, planeBaseHeight, enableWaves } = this.settings;
                
                const textureCanvas = this.textCanvas.draw(text, { fontSize: textFontSize, fontFamily: 'IBM Plex Mono', color: textColor });
                this.texture = new THREE.CanvasTexture(textureCanvas);
                this.texture.minFilter = THREE.NearestFilter;
                
                const textAspect = textureCanvas.width / textureCanvas.height;
                const planeH = planeBaseHeight;
                const planeW = planeH * textAspect;
                
                this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);
                this.material = new THREE.ShaderMaterial({
                    vertexShader, fragmentShader, transparent: true,
                    uniforms: {
                        uTime: { value: 0 }, uTexture: { value: this.texture }, uEnableWaves: { value: enableWaves ? 1.0 : 0.0 }
                    },
                });
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.scene.add(this.mesh);
            }

            setRenderer() {
                this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
                this.renderer.setPixelRatio(1);
                this.renderer.setClearColor(0x000000, 0);
                this.filter = new AsciiFilter(this.renderer, { fontFamily: 'IBM Plex Mono', fontSize: this.settings.asciiFontSize });
                this.container.appendChild(this.filter.domElement);
                this.setSize(this.width, this.height);
                this.container.addEventListener('mousemove', this.onMouseMove);
            }
            
            // --- NEW METHOD TO UPDATE TEXT ---
            updateText(newText) {
                // Update the text in our settings
                this.settings.text = newText;

                // Clean up the old 3D object to prevent memory leaks
                this.scene.remove(this.mesh);
                this.mesh.geometry.dispose();
                this.mesh.material.uniforms.uTexture.value.dispose();
                this.mesh.material.dispose();
                
                // Create a new mesh with the updated text
                this.setMesh();
            }

            setSize(w, h) {
                this.width = w; this.height = h;
                this.camera.aspect = w / h;
                this.camera.updateProjectionMatrix();
                this.filter.setSize(w, h);
                this.center = { x: w / 2, y: h / 2 };
            }
            
            load() { this.animate(); }
            onMouseMove(evt) {
                const e = evt.touches ? evt.touches[0] : evt;
                const bounds = this.container.getBoundingClientRect();
                this.mouse = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
            }
            animate() {
                requestAnimationFrame(this.animate.bind(this));
                this.render();
            }
            render() {
                const time = Date.now() * 0.001;
                this.texture.needsUpdate = true;
                this.mesh.material.uniforms.uTime.value = Math.sin(time);
                
                const x = Math.map(this.mouse.y, 0, this.height, 0.5, -0.5);
                const y = Math.map(this.mouse.x, 0, this.width, -0.5, 0.5);
                this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;
                this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;
                
                this.filter.render(this.scene, this.camera);
            }
        }

        // --- INITIALIZATION SCRIPT ---
        const settings = {
            text: 'Hello World!',
            asciiFontSize: 8,
            textFontSize: 200,
            textColor: '#fdf9f3',
            planeBaseHeight: 8,
            enableWaves: true
        };

        const container = document.getElementById('ascii-container');
        const asciiEffect = new CanvAscii(settings, container);
        asciiEffect.load();
        
        // --- EVENT LISTENERS FOR UI ---
        const textInput = document.getElementById('text-input');
        const updateButton = document.getElementById('update-button');

        updateButton.addEventListener('click', () => {
            if (textInput.value) {
                asciiEffect.updateText(textInput.value);
            }
        });
        
        window.addEventListener('resize', () => {
            const { width, height } = container.getBoundingClientRect();
            asciiEffect.setSize(width, height);
        });
=======
        const settings = {
            text,
            asciiFontSize: asciiSize,
            textFontSize: 200,
            textColor: '#fdf9f3',
            planeBaseHeight: asciiSize * 1.2, // 👈 tie plane height to ascii size
            enableWaves: true
        };

        asciiPopup.style.display = 'flex';
        activeAsciiEffect = new CanvAscii(settings, asciiContainer);
        activeAsciiEffect.load();
    }

    function closeAsciiEffect() {
        asciiPopup.style.display = 'none';
        if (activeAsciiEffect) {
            activeAsciiEffect.dispose();
            activeAsciiEffect = null;
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && asciiPopup.style.display === 'flex') {
            closeAsciiEffect();
        }
    });

});
>>>>>>> ascii-art
