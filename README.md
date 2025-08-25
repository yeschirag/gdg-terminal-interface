# Cyberpunk Interactive Terminal

Welcome to the Cyberpunk Interactive Terminal, a web-based project that simulates a retro-futuristic computer interface. This terminal combines 1990s hacker aesthetics with modern web technologies, featuring multiple color themes, AI-powered commands via the Google Gemini API, and a complex, multi-layered secret key puzzle to solve.

---

## Visual Documentation

Here's a glimpse into the terminal's interface and its various modes.

**(Screenshot of the main terminal in 'normal' mode)**
*Shows the default cyan and magenta theme with the command list displayed.*

**(GIF of 'beast' mode)**
*Demonstrates the switch to the aggressive red theme and the unstable screen-shake effect.*

**(Screenshot of the 'asciify' command popup)**
*Shows the 3D ASCII art rendering of a word in the popup card over the main terminal.*

---

## Features

This project is built with a rich set of interactive and visual features:

* **Multi-Themed Interface**: Switch between three distinct visual modes:
    * **Normal**: A cool cyan and magenta cyberpunk theme.
    * **Beast**: An aggressive, unstable red and orange theme with a screen-shake effect.
    * **Roast**: A sarcastic yellow and purple theme.
* **AI-Powered Commands (Google Gemini API)**:
    * `chat [message]`: Converse with the terminal's AI, which has three unique personalities corresponding to the active mode.
    * `lore [topic]`: Generate in-universe, cyberpunk-themed lore on any subject.
    * `hack [target]`: Simulate a realistic hacking sequence against a specified target.
* **3D ASCII Art Renderer**:
    * `asciify [text]`: Opens a popup that renders any given text as an interactive 3D ASCII art piece using Three.js. The art reacts to mouse movement.
* **Immersive Visuals**:
    * **Live Background**: A persistent, animated matrix-style background.
    * **Custom Cursor**: A custom SVG cursor that follows the mouse and a glitchy text cursor in the input line.
    * **Hover Tooltips**: Detailed, multi-line tooltips for the `help` command that explain each command's usage.
* **Interactive Terminal**:
    * **Command History**: Use the Up and Down arrow keys to cycle through previously entered commands.
    * **Auto-Scrolling**: The terminal automatically scrolls to the latest command.
* **Secret Key Puzzle**: A complex, multi-step "Rogue AI Fragment" puzzle that requires investigation, interaction with all AI modes, and use of the browser's developer console to solve.

---

## Technology Stack

* **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
* **3D Graphics**: Three.js
* **AI**: Google Gemini API

---

## Installation and Setup

Because this project uses ES6 modules (`import`/`export`), you cannot run it by simply opening the `index.html` file in your browser. It must be served by a local web server.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/yeschirag/gdg-terminal-interface
    ```
2.  **Navigate to the Directory**:
    ```bash
    cd [repository-folder-name]
    ```
3.  **Serve the Files**: The easiest way is to use a VS Code extension like **Live Server**.
    * Install the "Live Server" extension from the VS Code marketplace.
    * Right-click on `index.html` in your file explorer and select "Open with Live Server".

    Alternatively, if you have Python installed, you can run a simple server from your terminal:
    ```bash
    # For Python 3
    python -m http.server
    ```
    Then, open your browser and go to `http://localhost:8000`.

---

## Secret Key Implementation

<details>
<summary><strong>⚠️ SPOILER ALERT: Click to reveal the secret key solution.</strong></summary>

The secret key is hidden behind the "Rogue AI Fragment" puzzle. Here is the step-by-step solution:

1.  **Trigger the Glitch**: After entering more than five commands, a red "glitch" message mentioning `FRAGMENT_734` will flash on the screen. This begins the puzzle.

2.  **Interrogate the AI**: You must talk to the AI in all three modes to get three keywords.
    * **Normal Mode**: Type `mode normal`, then ask `chat what is fragment 734?`. The AI will give you the first keyword (e.g., **FIREWALL**).
    * **Beast Mode**: Type `mode beast`, then ask `chat what about the fragment?`. The AI will yell the second keyword (e.g., **ABYSS**).
    * **Roast Mode**: Type `mode roast`, then ask `chat tell me about the fragment`. The AI will insult you and reveal the third keyword (e.g., **GUARDIAN**).

3.  **Run the Containment Protocol**: Combine the three keywords in order.
    * Type the hidden command: `contain FIREWALL_ABYSS_GUARDIAN`
    * The terminal will tell you to check the "debug logs".

4.  **Check the Developer Console**: Open your browser's developer console (usually with F12). You will see a colored message containing the final signature key (e.g., **GHOST_IN_THE_SHELL**) and the command to use it.

5.  **Execute the Final Command**: Return to the terminal and type the final command with the key from the console.
    * `execute GHOST_IN_
