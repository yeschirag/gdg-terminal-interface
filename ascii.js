import * as THREE from 'three';

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

// --- HELPER CLASSES ---
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
    dispose() {
        document.removeEventListener('mousemove', this.onMouseMove);
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

export class CanvAscii {
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
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
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
    dispose() {
        cancelAnimationFrame(this.animationFrameId);
        this.container.removeEventListener('mousemove', this.onMouseMove);
        this.filter.dispose();
        this.scene.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.material.uniforms.uTexture.value.dispose();
        this.mesh.material.dispose();
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
}