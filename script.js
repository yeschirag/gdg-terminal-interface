// Import the playAscii function and frames from your file
import { playAscii, asciiFrames } from './ascii.js';

document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const userInput = document.getElementById('userInput');
    const startupTextContainer = document.getElementById('startup-text');
    const asciiArtLogo = document.getElementById('ascii-art');
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

    // --- Matrix Effect Function ---
    function runMatrixEffect() {
        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890";
        const matrixContainer = document.createElement('div');
        matrixContainer.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.9); z-index: 1000; overflow: hidden;
            font-family: 'Share Tech Mono', monospace; color: #00ff41;
            pointer-events: none;
        `;
        document.body.appendChild(matrixContainer);

        for (let i = 0; i < 50; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute; top: -100px; 
                left: ${Math.random() * 100}%; 
                font-size: ${Math.random() * 16 + 12}px;
                animation: matrix-fall ${Math.random() * 3 + 2}s linear infinite;
            `;
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
            }
            column.innerHTML = text;
            matrixContainer.appendChild(column);
        }

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes matrix-fall {
                to { transform: translateY(100vh); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            matrixContainer.remove();
            style.remove();
        }, 5000);
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
  help       - Displays this list of commands.
  clear      - Clears the terminal screen.
  date       - Shows the current system date.
  whoami     - Displays information about the current user.
  art        - Display ASCII animation.
  matrix     - Engage matrix display effect.
  exit       - Terminate the session.`;
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

            case 'art':
                // Create animation container within the response
                const animationDiv = document.createElement('div');
                animationDiv.style.cssText = `
                    text-align: center; 
                    margin: 1rem 0; 
                    background: rgba(0,0,0,0.3); 
                    border: 1px solid #33ff77;
                    padding: 10px;
                `;
                
                const asciiPre = document.createElement('pre');
                asciiPre.style.cssText = `
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 0.4rem;
                    line-height: 0.5rem;
                    margin: 0;
                    padding: 0;
                    white-space: pre;
                `;
                
                animationDiv.appendChild(asciiPre);
                responseContainer.appendChild(animationDiv);
                
                // Start the animation
                let i = 0;
                function playInlineAscii() {
                    asciiPre.innerHTML = `<span style="color: #00ff41;">${asciiFrames[i]}</span>`;
                    i = (i + 1) % asciiFrames.length;
                    setTimeout(playInlineAscii, 100);
                }
                playInlineAscii();
                
                responseContainer.innerHTML += `<br>[ASCII animation playing in terminal...]`;
                asciiArtPlayed = true;
                break;

            case 'matrix':
                responseContainer.innerHTML = `Engaging matrix display effect... stand by.`;
                setTimeout(runMatrixEffect, 1000);
                break;

            case 'exit':
                responseContainer.innerHTML = `Terminating session... Goodbye, Operator.`;
                setTimeout(() => {
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
