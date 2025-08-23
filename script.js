// Import the playAscii function and frames from your file
import { playAscii, asciiFrames } from './ascii.js';

document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const userInput = document.getElementById('userInput');
    const startupTextContainer = document.getElementById('startup-text');
    const asciiArtLogo = document.getElementById('ascii-art');
    const asciiAnimationContainer = document.getElementById('ascii-animation-container');

    // Matrix effect state
    let matrixContainer = null;
    let matrixStyle = null;
    let isMatrixActive = false;

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

    // Start the boot sequence
    initialBoot();

    // --- Command Handling ---
    userInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const fullCommand = userInput.value.trim().toLowerCase();
            userInput.value = '';
            if (fullCommand) {
                const commandEntry = document.createElement('div');
                commandEntry.innerHTML = `CRNL:/~$ ${fullCommand}`;
                output.appendChild(commandEntry);
                await processCommand(fullCommand);
            }
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    let asciiArtPlayed = false;

    // --- Matrix Effect Functions ---
    function startMatrixEffect() {
        if (isMatrixActive) return;
        
        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890";
        
        // Create matrix container BEHIND the terminal
        matrixContainer = document.createElement('div');
        matrixContainer.id = 'matrix-background';
        matrixContainer.style.cssText = `
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: rgba(0,0,0,0.1);
            z-index: 1;
            overflow: hidden;
            font-family: 'Share Tech Mono', monospace; 
            color: #00ff41;
            pointer-events: none;
        `;
        
        // Insert BEFORE the CRT container so it appears behind
        document.body.insertBefore(matrixContainer, document.body.firstChild);

        // Create falling matrix columns
        for (let i = 0; i < 40; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.cssText = `
                position: absolute; 
                top: -200px; 
                left: ${Math.random() * 100}%; 
                font-size: ${Math.random() * 14 + 10}px;
                animation: matrix-fall ${Math.random() * 4 + 3}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                opacity: ${Math.random() * 0.7 + 0.3};
            `;
            
            let text = '';
            for (let j = 0; j < 30; j++) {
                text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
            }
            column.innerHTML = text;
            matrixContainer.appendChild(column);
        }

        // Add CSS animation
        matrixStyle = document.createElement('style');
        matrixStyle.id = 'matrix-styles';
        matrixStyle.textContent = `
            @keyframes matrix-fall {
                0% { transform: translateY(-200px); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(calc(100vh + 200px)); opacity: 0; }
            }
            .matrix-column:nth-child(even) {
                color: #00ff41;
            }
            .matrix-column:nth-child(odd) {
                color: #008f11;
            }
        `;
        document.head.appendChild(matrixStyle);
        
        isMatrixActive = true;
    }

    function stopMatrixEffect() {
        if (!isMatrixActive) return;
        
        if (matrixContainer) {
            matrixContainer.remove();
            matrixContainer = null;
        }
        
        if (matrixStyle) {
            matrixStyle.remove();
            matrixStyle = null;
        }
        
        isMatrixActive = false;
    }

    // --- Command Processing ---
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
  help         - Displays this list of commands.
  clear        - Clears the terminal screen.
  date         - Shows the current system date.
  whoami       - Displays information about the current user.
  matrix       - Toggle matrix background effect.
  matrix on    - Enable matrix background effect.
  matrix off   - Disable matrix background effect.
  exit         - Terminate the session.`;
                break;

            case 'clear':
                output.innerHTML = '';
                startupTextContainer.innerHTML = '';
                asciiArtLogo.style.display = 'none';
                asciiAnimationContainer.style.display = 'none';
                return;

            case 'date':
                responseContainer.innerHTML = `Current system date: ${new Date().toUTCString()}`;
                break;

            case 'whoami':
                responseContainer.innerHTML = `USER: Operator_7
UID: 8c1f4e3a-5b6d-4f9e-8c1a-2b3c4d5e6f7g
ACCESS_LEVEL: GUEST
CLEARANCE: CLASSIFIED`;
                break;

            case 'matrix':
                if (argument === 'on') {
                    if (isMatrixActive) {
                        responseContainer.innerHTML = `Matrix background is already active.`;
                    } else {
                        startMatrixEffect();
                        responseContainer.innerHTML = `Matrix background effect enabled. Use 'matrix off' to disable.`;
                    }
                } else if (argument === 'off') {
                    if (!isMatrixActive) {
                        responseContainer.innerHTML = `Matrix background is not active.`;
                    } else {
                        stopMatrixEffect();
                        responseContainer.innerHTML = `Matrix background effect disabled.`;
                    }
                } else {
                    // Toggle matrix effect
                    if (isMatrixActive) {
                        stopMatrixEffect();
                        responseContainer.innerHTML = `Matrix background effect disabled.`;
                    } else {
                        startMatrixEffect();
                        responseContainer.innerHTML = `Matrix background effect enabled. Use 'matrix off' to disable.`;
                    }
                }
                break;

            case 'exit':
                responseContainer.innerHTML = `Terminating session... Goodbye, Operator.`;
                setTimeout(() => {
                    // Stop matrix effect before closing
                    stopMatrixEffect();
                    document.body.innerHTML = `
                        <div style="
                            display: flex; justify-content: center; align-items: center; 
                            height: 100vh; font-family: 'Share Tech Mono', monospace; 
                            color: #00ff41; background: #000; text-align: center;
                        ">
                            <div>
                                <h1>SESSION TERMINATED</h1>
                                <p>Connection to CRNL.SYS closed.</p>
                                <p><a href="javascript:location.reload()" style="color: #00ff41;">Restart Session</a></p>
                            </div>
                        </div>`;
                }, 2000);
                break;

            default:
                responseContainer.innerHTML = `Command not found: "${command}"<br>Type "help" for a list of available commands.`;
                break;
        }
    }
});
