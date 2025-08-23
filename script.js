document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const userInput = document.getElementById('userInput');
    const startupTextContainer = document.getElementById('startup-text');
    const inputLine = document.getElementById('input-line');

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

    function typeWriter() {
        if (lineIndex < startupLines.length) {
            if (charIndex < startupLines[lineIndex].length) {
                if (lineIndex === 0) { // Add glitch effect to the first line
                    // The glitch effect is now more complex, applying to each character
                    const charSpan = document.createElement('span');
                    charSpan.className = 'glitch text-2xl sm:text-4xl';
                    charSpan.setAttribute('data-text', startupLines[lineIndex][charIndex]);
                    charSpan.textContent = startupLines[lineIndex][charIndex];
                    startupTextContainer.appendChild(charSpan);
                } else {
                    startupTextContainer.innerHTML += startupLines[lineIndex].charAt(charIndex);
                }
                charIndex++;
                setTimeout(typeWriter, 25);
            } else {
                startupTextContainer.innerHTML += '<br>';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeWriter, 200);
            }
        }
    }
    
    // --- Command Handling ---
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = userInput.value.trim().toLowerCase();
            if (command) {
                const commandEntry = document.createElement('div');
                commandEntry.innerHTML = `<span class="text-cyan-400">CRNL:/~$&nbsp;</span>${command}`;
                output.appendChild(commandEntry);
                processCommand(command);
                userInput.value = '';
            }
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    function processCommand(command) {
        const response = document.createElement('div');
        response.classList.add('command-output', 'mt-1', 'mb-2');
        let responseText = '';

        switch (command) {
            case 'help':
                responseText = `
Available commands:
  <span class="accent">help</span>      - Displays this list of commands.
  <span class="accent">clear</span>     - Clears the terminal screen.
  <span class="accent">date</span>      - Shows the current system date.
  <span class="accent">whoami</span>    - Displays information about the current user.
  <span class="accent">matrix</span>    - Engage matrix display effect.
  <span class="accent">exit</span>      - Terminate the session.
`;
                break;
            case 'clear':
                output.innerHTML = '';
                startupTextContainer.innerHTML = '';
                document.getElementById('ascii-art').style.display = 'none';
                return;
            case 'date':
                responseText = `Current system date: ${new Date().toUTCString()}`;
                break;
            case 'whoami':
                responseText = `USER: <span class="info">Operator_7</span>
UID: <span class="info">8c1f4e3a-5b6d-4f9e-8c1a-2b3c4d5e6f7g</span>
ACCESS_LEVEL: <span class="info">GUEST</span>`;
                break;
            case 'matrix':
                responseText = `Engaging matrix effect... stand by.`;
                runMatrixEffect();
                break;
            case 'exit':
                responseText = `Terminating session... Goodbye.`;
                setTimeout(() => {
                    document.body.innerHTML = '<div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 2.25rem;">CONNECTION TERMINATED</div>';
                }, 1000);
                break;
            
            // --- SECRET KEY COMMANDS ---
            case 'scan':
                responseText = `
<span class="info">Scanning for anomalies...</span>
[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%
Scan complete.
Found a hidden frequency resonating with the keyword '<span class="accent">glitch</span>'.
Further investigation required.`;
                break;
            case 'glitch':
                responseText = `
<span class="info">ACCESSING HIDDEN FREQUENCY...</span>
<span class="info">DECRYPTING PAYLOAD...</span>
<span class="accent">SUCCESS!</span>

You found it, operator.

<span class="accent">SECRET KEY:</span> <span class="info">C78B-A9F2-E4D0-11E9</span>

Keep this safe. It grants access to the inner systems.
`;
                break;

            default:
                responseText = `Command not found: <span class="text-red-500">${command}</span>. Type 'help' for a list of commands.`;
                break;
        }
        response.innerHTML = responseText;
        output.appendChild(response);
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
            stopMsg.classList.add('command-output', 'mt-1', 'mb-2');
            stopMsg.innerHTML = `Matrix effect will disengage in 10 seconds. Type 'clear' to remove canvas residue.`;
            output.appendChild(stopMsg);
            terminal.scrollTop = terminal.scrollHeight;
        }, 2000);

        setTimeout(() => {
            clearInterval(matrixInterval);
        }, 12000);
    }

    // Start the typewriter effect on load
    typeWriter();
});
