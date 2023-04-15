type Pointer = {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: { r: number, g: number, b: number };
}

interface PointerPrototype {
  new(): Pointer
  (this: Pointer): void
}

type Target = {
  texture: WebGLTexture | null;
  fbo: WebGLFramebuffer | null;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach(id: any): number;
}
type TextTure = {
  texture: WebGLTexture | null;
  width: number;
  height: number;
  attach(id: number): number;
}

type DBFbo = {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: Target;
  write: Target;
  swap(): void;
}

class PointerPrototype {
  id = -1;
  texcoordX = 0;
  texcoordY = 0;
  prevTexcoordX = 0;
  prevTexcoordY = 0;
  deltaX = 0;
  deltaY = 0;
  down = false;
  moved = false;
  color = { r: 30, g: 0, b: 300 };
}

function createEffect(canvas: HTMLCanvasElement) {
  // const canvas = document.getElementsByTagName('canvas')[0];
  resizeCanvas();
  let config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 1,
    VELOCITY_DISSIPATION: 0.2,
    PRESSURE: 0.8,
    PRESSURE_ITERATIONS: 20,
    CURL: 30,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    TRANSPARENT: false,
    BLOOM: true,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 256,
    BLOOM_INTENSITY: 0.8,
    BLOOM_THRESHOLD: 0.6,
    BLOOM_SOFT_KNEE: 0.7,
    SUNRAYS: true,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 1.0,
  }



  let pointers: Pointer[] = [];
  let splatStack: number[] = [];
  pointers.push(new PointerPrototype());

  const { gl, ext } = getWebGLContext(canvas);

  if (isMobile()) {
    config.DYE_RESOLUTION = 512;
  }
  if (!ext.supportLinearFiltering) {
    config.DYE_RESOLUTION = 512;
    config.SHADING = false;
    config.BLOOM = false;
    config.SUNRAYS = false;
  }

  // 面板
  // startGUI();
  // 需要npm install dat.gui

  function getWebGLContext(canvas: HTMLCanvasElement) {
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };

    let gl: WebGLRenderingContext | WebGL2RenderingContext = canvas.getContext('webgl2', params) as WebGL2RenderingContext;
    const isWebGL2 = !!gl && gl instanceof WebGL2RenderingContext;
    if (!isWebGL2)
      gl = canvas.getContext('webgl', params) as WebGLRenderingContext || canvas.getContext('experimental-webgl', params) as WebGLRenderingContext;
    let halfFloat;
    let supportLinearFiltering;
    if (isWebGL2) {
      gl.getExtension('EXT_color_buffer_float');
      supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {

      halfFloat = gl.getExtension('OES_texture_half_float');
      supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const halfFloatTexType = gl instanceof WebGL2RenderingContext ? gl.HALF_FLOAT : halfFloat?.HALF_FLOAT_OES;
    let formatRGBA;
    let formatRG;
    let formatR;

    if (gl instanceof WebGL2RenderingContext) {
      formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    }
    else {
      formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    // ga('send', 'event', isWebGL2 ? 'webgl2' : 'webgl', formatRGBA == null ? 'not supported' : 'supported');

    return {
      gl,
      ext: {
        formatRGBA,
        formatRG,
        formatR,
        halfFloatTexType,
        supportLinearFiltering
      }
    };
  }

  function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type = 0): {
    internalFormat: number,
    format: number
  } | null {
    if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
      if (gl instanceof WebGLRenderingContext)
        return null;
      switch (internalFormat) {
        case gl.R16F:
          return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
        case gl.RG16F:
          return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
        default:
          return null;
      }
    }

    return {
      internalFormat,
      format
    }
  }

  function supportRenderTextureFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    return status == gl.FRAMEBUFFER_COMPLETE;
  }

  // function startGUI () {
  //     var gui = new dat.GUI({ width: 300 });
  //     gui.add(config, 'DYE_RESOLUTION', { 'high': 1024, 'medium': 512, 'low': 256, 'very low': 128 }).name('quality').onFinishChange(initFramebuffers);
  //     gui.add(config, 'SIM_RESOLUTION', { '32': 32, '64': 64, '128': 128, '256': 256 }).name('sim resolution').onFinishChange(initFramebuffers);
  //     gui.add(config, 'DENSITY_DISSIPATION', 0, 4.0).name('density diffusion');
  //     gui.add(config, 'VELOCITY_DISSIPATION', 0, 4.0).name('velocity diffusion');
  //     gui.add(config, 'PRESSURE', 0.0, 1.0).name('pressure');
  //     gui.add(config, 'CURL', 0, 50).name('vorticity').step(1);
  //     gui.add(config, 'SPLAT_RADIUS', 0.01, 1.0).name('splat radius');
  //     gui.add(config, 'SHADING').name('shading').onFinishChange(updateKeywords);
  //     gui.add(config, 'COLORFUL').name('colorful');
  //     gui.add(config, 'PAUSED').name('paused').listen();

  //     gui.add({ fun: () => {
  //         splatStack.push(parseInt(Math.random() * 20) + 5);
  //     } }, 'fun').name('Random splats');

  //     let bloomFolder = gui.addFolder('Bloom');
  //     bloomFolder.add(config, 'BLOOM').name('enabled').onFinishChange(updateKeywords);
  //     bloomFolder.add(config, 'BLOOM_INTENSITY', 0.1, 2.0).name('intensity');
  //     bloomFolder.add(config, 'BLOOM_THRESHOLD', 0.0, 1.0).name('threshold');

  //     let sunraysFolder = gui.addFolder('Sunrays');
  //     sunraysFolder.add(config, 'SUNRAYS').name('enabled').onFinishChange(updateKeywords);
  //     sunraysFolder.add(config, 'SUNRAYS_WEIGHT', 0.3, 1.0).name('weight');

  //     let captureFolder = gui.addFolder('Capture');
  //     captureFolder.addColor(config, 'BACK_COLOR').name('background color');
  //     captureFolder.add(config, 'TRANSPARENT').name('transparent');
  //     captureFolder.add({ fun: captureScreenshot }, 'fun').name('take screenshot');
  // 	/*
  //     let github = gui.add({ fun : () => {
  //         window.open('https://github.com/PavelDoGreat/WebGL-Fluid-Simulation');
  //         ga('send', 'event', 'link button', 'github');
  //     } }, 'fun').name('Github');
  //     github.__li.className = 'cr function bigFont';
  //     github.__li.style.borderLeft = '3px solid #8C8C8C';
  //     let githubIcon = document.createElement('span');
  //     github.domElement.parentElement.appendChild(githubIcon);
  //     githubIcon.className = 'icon github';

  //     let twitter = gui.add({ fun : () => {
  //         ga('send', 'event', 'link button', 'twitter');
  //         window.open('https://twitter.com/PavelDoGreat');
  //     } }, 'fun').name('Twitter');
  //     twitter.__li.className = 'cr function bigFont';
  //     twitter.__li.style.borderLeft = '3px solid #8C8C8C';
  //     let twitterIcon = document.createElement('span');
  //     twitter.domElement.parentElement.appendChild(twitterIcon);
  //     twitterIcon.className = 'icon twitter';

  //     let discord = gui.add({ fun : () => {
  //         ga('send', 'event', 'link button', 'discord');
  //         window.open('https://discordapp.com/invite/CeqZDDE');
  //     } }, 'fun').name('Discord');
  //     discord.__li.className = 'cr function bigFont';
  //     discord.__li.style.borderLeft = '3px solid #8C8C8C';
  //     let discordIcon = document.createElement('span');
  //     discord.domElement.parentElement.appendChild(discordIcon);
  //     discordIcon.className = 'icon discord';

  //     let app = gui.add({ fun : () => {
  //         ga('send', 'event', 'link button', 'app');
  //         window.open('http://onelink.to/5b58bn');
  //     } }, 'fun').name('Check out mobile app');
  //     app.__li.className = 'cr function appBigFont';
  //     app.__li.style.borderLeft = '3px solid #00FF7F';
  //     let appIcon = document.createElement('span');
  //     app.domElement.parentElement.appendChild(appIcon);
  //     appIcon.className = 'icon app';

  //     if (isMobile())
  //         gui.close();
  // 	*/
  // }

  function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  function captureScreenshot() {
    let res = getResolution(config.CAPTURE_RESOLUTION);
    let target: Target = createFBO(res.width, res.height, ext.formatRGBA?.internalFormat, ext.formatRGBA?.format, ext.halfFloatTexType, gl.NEAREST);
    render(target);

    let texture = normalizeTexture(framebufferToTexture(target), target.width, target.height);

    let captureCanvas = textureToCanvas(texture, target.width, target.height);
    let datauri = captureCanvas ? captureCanvas.toDataURL() : '';
    downloadURI('fluid.png', datauri);
    URL.revokeObjectURL(datauri);
  }

  function framebufferToTexture(target: Target) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    let length = target.width * target.height * 4;
    let texture = new Float32Array(length);
    gl.readPixels(0, 0, target.width, target.height, gl.RGBA, gl.FLOAT, texture);
    return texture;
  }

  function normalizeTexture(texture: Float32Array, width: number, height: number) {
    let result = new Uint8Array(texture.length);
    let id = 0;
    for (let i = height - 1; i >= 0; i--) {
      for (let j = 0; j < width; j++) {
        let nid = i * width * 4 + j * 4;
        result[nid + 0] = clamp01(texture[id + 0]) * 255;
        result[nid + 1] = clamp01(texture[id + 1]) * 255;
        result[nid + 2] = clamp01(texture[id + 2]) * 255;
        result[nid + 3] = clamp01(texture[id + 3]) * 255;
        id += 4;
      }
    }
    return result;
  }

  function clamp01(input: number) {
    return Math.min(Math.max(input, 0), 1);
  }

  function textureToCanvas(texture: ArrayLike<number>, width: number, height: number) {
    let captureCanvas = document.createElement('canvas');
    let ctx = captureCanvas.getContext('2d');
    captureCanvas.width = width;
    captureCanvas.height = height;
    if (!ctx) return null
    let imageData = ctx.createImageData(width, height);
    imageData.data.set(texture);
    ctx.putImageData(imageData, 0, 0);

    return captureCanvas;
  }

  function downloadURI(filename: string, uri: string) {
    let link = document.createElement('a');
    link.download = filename;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  class Material {
    vertexShader
    fragmentShaderSource
    programs: (WebGLProgram | null)[]
    activeProgram: WebGLProgram | null
    uniforms: {
      [key: string]: WebGLUniformLocation | null;
    }
    constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
      this.vertexShader = vertexShader;
      this.fragmentShaderSource = fragmentShaderSource;
      this.programs = [];
      this.activeProgram = null
      this.uniforms = {};
    }

    setKeywords(keywords: string[]) {
      let hash = 0;
      for (let i = 0; i < keywords.length; i++)
        hash += hashCode(keywords[i]);

      let program = this.programs[hash];
      if (program == null) {
        let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
        if (!fragmentShader) return;
        program = createProgram(this.vertexShader, fragmentShader);
        this.programs[hash] = program;
      }

      if (!program || program == this.activeProgram) return;

      this.uniforms = getUniforms(program);
      this.activeProgram = program;
    }

    bind() {
      gl.useProgram(this.activeProgram);
    }
  }

  class Program {
    uniforms
    program
    constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      this.program = createProgram(vertexShader, fragmentShader);
      if (this.program) {
        this.uniforms = getUniforms(this.program);
      }
    }

    bind() {
      gl.useProgram(this.program);
    }
  }

  function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    let program = gl.createProgram();
    if (!program) return program;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      console.trace(gl.getProgramInfoLog(program));

    return program;
  }

  function getUniforms(program: WebGLProgram) {
    let uniforms: { [key: string]: WebGLUniformLocation | null } = {};
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      let uniformName = gl.getActiveUniform(program, i)?.name;
      if (!uniformName) continue
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
  }

  function compileShader(type: number, source: string, keywords?: string[]) {
    source = addKeywords(source, keywords);

    const shader = gl.createShader(type);
    if (!shader) return shader;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      console.trace(gl.getShaderInfoLog(shader));

    return shader;
  };

  function addKeywords(source: string, keywords?: string[]) {
    if (keywords == null) return source;
    let keywordsString = '';
    keywords.forEach(keyword => {
      keywordsString += '#define ' + keyword + '\n';
    });
    return keywordsString + source;
  }

  const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
  precision highp float;

  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;

  void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`);

  const blurVertexShader = compileShader(gl.VERTEX_SHADER, `
  precision highp float;

  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  uniform vec2 texelSize;

  void main () {
      vUv = aPosition * 0.5 + 0.5;
      float offset = 1.33333333;
      vL = vUv - texelSize * offset;
      vR = vUv + texelSize * offset;
      gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`);

  const blurShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  uniform sampler2D uTexture;

  void main () {
      vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
      sum += texture2D(uTexture, vL) * 0.35294117;
      sum += texture2D(uTexture, vR) * 0.35294117;
      gl_FragColor = sum;
  }
`);

  const copyShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying highp vec2 vUv;
  uniform sampler2D uTexture;

  void main () {
      gl_FragColor = texture2D(uTexture, vUv);
  }
`);

  const clearShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;

  void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
  }
`);

  const colorShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;

  uniform vec4 color;

  void main () {
      gl_FragColor = color;
  }
`);

  const checkerboardShader = compileShader(gl.FRAGMENT_SHADER, `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float aspectRatio;

  #define SCALE 25.0

  void main () {
      vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
      float v = mod(uv.x + uv.y, 2.0);
      v = v * 0.1 + 0.8;
      gl_FragColor = vec4(vec3(v), 1.0);
  }
`);

  const displayShaderSource = `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  uniform sampler2D uBloom;
  uniform sampler2D uSunrays;
  uniform sampler2D uDithering;
  uniform vec2 ditherScale;
  uniform vec2 texelSize;

  vec3 linearToGamma (vec3 color) {
      color = max(color, vec3(0));
      return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
  }

  void main () {
      vec3 c = texture2D(uTexture, vUv).rgb;

  #ifdef SHADING
      vec3 lc = texture2D(uTexture, vL).rgb;
      vec3 rc = texture2D(uTexture, vR).rgb;
      vec3 tc = texture2D(uTexture, vT).rgb;
      vec3 bc = texture2D(uTexture, vB).rgb;

      float dx = length(rc) - length(lc);
      float dy = length(tc) - length(bc);

      vec3 n = normalize(vec3(dx, dy, length(texelSize)));
      vec3 l = vec3(0.0, 0.0, 1.0);

      float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
      c *= diffuse;
  #endif

  #ifdef BLOOM
      vec3 bloom = texture2D(uBloom, vUv).rgb;
  #endif

  #ifdef SUNRAYS
      float sunrays = texture2D(uSunrays, vUv).r;
      c *= sunrays;
  #ifdef BLOOM
      bloom *= sunrays;
  #endif
  #endif

  #ifdef BLOOM
      float noise = texture2D(uDithering, vUv * ditherScale).r;
      noise = noise * 2.0 - 1.0;
      bloom += noise / 255.0;
      bloom = linearToGamma(bloom);
      c += bloom;
  #endif

      float a = max(c.r, max(c.g, c.b));
      gl_FragColor = vec4(c, a);
  }
`;

  const bloomPrefilterShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec3 curve;
  uniform float threshold;

  void main () {
      vec3 c = texture2D(uTexture, vUv).rgb;
      float br = max(c.r, max(c.g, c.b));
      float rq = clamp(br - curve.x, 0.0, curve.y);
      rq = curve.z * rq * rq;
      c *= max(rq, br - threshold) / max(br, 0.0001);
      gl_FragColor = vec4(c, 0.0);
  }
`);

  const bloomBlurShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;

  void main () {
      vec4 sum = vec4(0.0);
      sum += texture2D(uTexture, vL);
      sum += texture2D(uTexture, vR);
      sum += texture2D(uTexture, vT);
      sum += texture2D(uTexture, vB);
      sum *= 0.25;
      gl_FragColor = sum;
  }
`);

  const bloomFinalShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  uniform float intensity;

  void main () {
      vec4 sum = vec4(0.0);
      sum += texture2D(uTexture, vL);
      sum += texture2D(uTexture, vR);
      sum += texture2D(uTexture, vT);
      sum += texture2D(uTexture, vB);
      sum *= 0.25;
      gl_FragColor = sum * intensity;
  }
`);

  const sunraysMaskShader = compileShader(gl.FRAGMENT_SHADER, `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;
  uniform sampler2D uTexture;

  void main () {
      vec4 c = texture2D(uTexture, vUv);
      float br = max(c.r, max(c.g, c.b));
      c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
      gl_FragColor = c;
  }
`);

  const sunraysShader = compileShader(gl.FRAGMENT_SHADER, `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float weight;

  #define ITERATIONS 16

  void main () {
      float Density = 0.3;
      float Decay = 0.95;
      float Exposure = 0.7;

      vec2 coord = vUv;
      vec2 dir = vUv - 0.5;

      dir *= 1.0 / float(ITERATIONS) * Density;
      float illuminationDecay = 1.0;

      float color = texture2D(uTexture, vUv).a;

      for (int i = 0; i < ITERATIONS; i++)
      {
          coord -= dir;
          float col = texture2D(uTexture, coord).a;
          color += col * illuminationDecay * weight;
          illuminationDecay *= Decay;
      }

      gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
  }
`);

  const splatShader = compileShader(gl.FRAGMENT_SHADER, `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;

  void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
  }
`);

  const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform vec2 dyeTexelSize;
  uniform float dt;
  uniform float dissipation;

  vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
      vec2 st = uv / tsize - 0.5;

      vec2 iuv = floor(st);
      vec2 fuv = fract(st);

      vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
      vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
      vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
      vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

      return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
  }

  void main () {
  #ifdef MANUAL_FILTERING
      vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
      vec4 result = bilerp(uSource, coord, dyeTexelSize);
  #else
      vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
      vec4 result = texture2D(uSource, coord);
  #endif
      float decay = 1.0 + dissipation * dt;
      gl_FragColor = result / decay;
  }`,
    ext.supportLinearFiltering ? undefined : ['MANUAL_FILTERING']
  );

  const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;

      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }

      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`);

  const curlShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      float vorticity = R - L - T + B;
      gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`);

  const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;

  void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;

      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;

      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity += force * dt;
      velocity = min(max(velocity, -1000.0), 1000.0);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`);

  const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;

  void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float C = texture2D(uPressure, vUv).x;
      float divergence = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + B + T - divergence) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`);

  const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
  precision mediump float;
  precision mediump sampler2D;

  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;

  void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity.xy -= vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`);

  const blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    return (target?: Target, clear = false) => {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (clear) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      // CHECK_FRAMEBUFFER_STATUS();
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
  })();

  function CHECK_FRAMEBUFFER_STATUS() {
    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE)
      console.trace("Framebuffer error: " + status);
  }

  let dye: DBFbo | null;
  let velocity: DBFbo | null;
  let divergence: Target;
  let curl: Target;
  let pressure: DBFbo;
  let bloom: Target;
  let bloomFramebuffers: Target[] = [];
  let sunrays: Target;
  let sunraysTemp: Target;

  const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAbkklEQVR4nD3b%0AZdhVVRMG4KVY2Ah2t2Jid3diYRd2d7fYYAvYIAaCCioo2I2BYHd3d+f43XNd%0A870/99l7rYknZu1z3rbmmmvGb7/9FmPHjo077rgjlltuuejbt2/stttucfbZ%0AZ8fxxx8fq622Whx00EExfvz4mHXWWeONN96Iyy+/PPbZZ5/4888/Y7PNNsv7%0APv744+jQoUNstdVW8cUXX8TAgQNjscUWix9//DEOPPDAWGihheKkk06KnXfe%0AOZ5++umYd95547PPPov77rsv/v3333juuefi0ksvjammmiq23XbbOOuss+LX%0AX3+NJ554ImN7//33Y+WVV46ddtopzjjjjBgyZEh069YtRo0aFX369Mm9V1pp%0ApbjxxhszzmeffTamnHLKjOfxxx+PiSaaKAYMGJD3W8O6bejQofnwTDPNFKec%0Ackom6k9wL774Ymy++ebxyCOPxJ133hnnn39+3HzzzTHFFFPEuuuuG6effnrc%0AfffduZnAl1hiiXjooYfCmmuttVYmIrlNNtkkWmu54XXXXZefXXLJJXHrrbfG%0Avvvum4kKfPfdd8/1Pv/88xg0aFAcccQRMc8888SGG24YE044YXz77bd5/f77%0A749JJpkkfvrpp3jzzTdjzjnnzHjE+fPPP2fxrC++33//Pff54IMPcq+vvvoq%0App9++nzuqKOOivb1119nFT101VVXZRctNs0008RNN92UDyjOkksuGT169Ihj%0AjjkmA3nsscdihx12yEDeeeedrPp+++0XXbp0yQIee+yxGcRLL70Up512Wmy3%0A3XZhL5svs8wy8csvv0SnTp0yuWuvvTb3mHTSSePkk0+ORRZZJNZYY4148MEH%0AM9Bdd901Tj311JhxxhkTJYsvvngcdthhcfHFF8c222wTe++9d3zyyScZG5Tt%0Av//+8e6772ah5QatimRtz3puxRVXjMknnzyajqnMK6+8khDq2rVrdkonXNfZ%0ACSaYIN577734+++/Y5VVVsmu6CR4q/iqq64azz//fJx55pmx/fbbx5NPPhnz%0Azz9/rLDCCpno7LPPHsOGDctADj/88Ezs5ZdfTsSNGDEiC/r6669nUUEeCmeZ%0AZZb4/vvvE01LL710NgeNtthii/jjjz9ittlmy/vFM3z48Ljiiiuic+fOGQe6%0A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%0ARK5CYII='


  let ditheringTexture = createTextureAsync(img);
  // let ditheringTexture = createTextureAsync('./LDR_LLL1_0.png');

  const blurProgram = blurVertexShader && blurShader && new Program(blurVertexShader, blurShader);
  const copyProgram = baseVertexShader && copyShader && new Program(baseVertexShader, copyShader);
  const clearProgram = baseVertexShader && clearShader && new Program(baseVertexShader, clearShader);
  const colorProgram = baseVertexShader && colorShader && new Program(baseVertexShader, colorShader);
  const checkerboardProgram = baseVertexShader && checkerboardShader && new Program(baseVertexShader, checkerboardShader);
  const bloomPrefilterProgram = baseVertexShader && bloomPrefilterShader && new Program(baseVertexShader, bloomPrefilterShader);
  const bloomBlurProgram = baseVertexShader && bloomBlurShader && new Program(baseVertexShader, bloomBlurShader);
  const bloomFinalProgram = baseVertexShader && bloomFinalShader && new Program(baseVertexShader, bloomFinalShader);
  const sunraysMaskProgram = baseVertexShader && sunraysMaskShader && new Program(baseVertexShader, sunraysMaskShader);
  const sunraysProgram = baseVertexShader && sunraysShader && new Program(baseVertexShader, sunraysShader);
  const splatProgram = baseVertexShader && splatShader && new Program(baseVertexShader, splatShader);
  const advectionProgram = baseVertexShader && advectionShader && new Program(baseVertexShader, advectionShader);
  const divergenceProgram = baseVertexShader && divergenceShader && new Program(baseVertexShader, divergenceShader);
  const curlProgram = baseVertexShader && curlShader && new Program(baseVertexShader, curlShader);
  const vorticityProgram = baseVertexShader && vorticityShader && new Program(baseVertexShader, vorticityShader);
  const pressureProgram = baseVertexShader && pressureShader && new Program(baseVertexShader, pressureShader);
  const gradienSubtractProgram = baseVertexShader && gradientSubtractShader && new Program(baseVertexShader, gradientSubtractShader);

  const displayMaterial = baseVertexShader && displayShaderSource && new Material(baseVertexShader, displayShaderSource);

  function initFramebuffers() {
    let simRes = getResolution(config.SIM_RESOLUTION);
    let dyeRes = getResolution(config.DYE_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    gl.disable(gl.BLEND);

    if (dye == null)
      dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba?.internalFormat, rgba?.format, texType, filtering);
    else
      dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba?.internalFormat, rgba?.format, texType, filtering);

    if (velocity == null)
      velocity = createDoubleFBO(simRes.width, simRes.height, rg?.internalFormat, rg?.format, texType, filtering);
    else
      velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg?.internalFormat, rg?.format, texType, filtering);

    divergence = createFBO(simRes.width, simRes.height, r?.internalFormat, r?.format, texType, gl.NEAREST);
    curl = createFBO(simRes.width, simRes.height, r?.internalFormat, r?.format, texType, gl.NEAREST);
    pressure = createDoubleFBO(simRes.width, simRes.height, r?.internalFormat, r?.format, texType, gl.NEAREST);

    initBloomFramebuffers();
    initSunraysFramebuffers();
  }

  function initBloomFramebuffers() {
    let res = getResolution(config.BLOOM_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    bloom = createFBO(res.width, res.height, rgba?.internalFormat, rgba?.format, texType, filtering);

    bloomFramebuffers.length = 0;
    for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
      let width = res.width >> (i + 1);
      let height = res.height >> (i + 1);

      if (width < 2 || height < 2) break;

      let fbo = createFBO(width, height, rgba?.internalFormat, rgba?.format, texType, filtering);
      bloomFramebuffers.push(fbo);
    }
  }

  function initSunraysFramebuffers() {
    let res = getResolution(config.SUNRAYS_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    sunrays = createFBO(res.width, res.height, r?.internalFormat, r?.format, texType, filtering);
    sunraysTemp = createFBO(res.width, res.height, r?.internalFormat, r?.format, texType, filtering);
  }

  function createFBO(w: number, h: number, internalFormat = 0, format = 0, type = 0, param = 0) {
    gl.activeTexture(gl.TEXTURE0);
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let texelSizeX = 1.0 / w;
    let texelSizeY = 1.0 / h;

    return {
      texture,
      fbo,
      width: w,
      height: h,
      texelSizeX,
      texelSizeY,
      attach(id: number) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      }
    };
  }

  function createDoubleFBO(w: number, h: number, internalFormat?: number, format?: number, type?: number, param?: number) {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);

    return {
      width: w,
      height: h,
      texelSizeX: fbo1.texelSizeX,
      texelSizeY: fbo1.texelSizeY,
      get read() {
        return fbo1;
      },
      set read(value) {
        fbo1 = value;
      },
      get write() {
        return fbo2;
      },
      set write(value) {
        fbo2 = value;
      },
      swap() {
        let temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      }
    }
  }

  function resizeFBO(target: Target, w: number, h: number, internalFormat?: number, format?: number, type?: number, param?: number) {
    let newFBO = createFBO(w, h, internalFormat, format, type, param);
    copyProgram?.bind();
    copyProgram?.uniforms && gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
    blit(newFBO);
    return newFBO;
  }

  function resizeDoubleFBO(target: DBFbo, w: number, h: number, internalFormat?: number, format?: number, type?: number, param?: number) {
    if (target.width == w && target.height == h)
      return target;
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
    target.write = createFBO(w, h, internalFormat, format, type, param);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1.0 / w;
    target.texelSizeY = 1.0 / h;
    return target;
  }

  function createTextureAsync(url: string) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));

    let obj = {
      texture,
      width: 1,
      height: 1,
      attach(id: number) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      }
    };

    let image = new Image();
    image.setAttribute("crossOrigin", 'Anonymous')
    image.onload = () => {
      obj.width = image.width;
      obj.height = image.height;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    };
    image.src = url;

    return obj;
  }

  function updateKeywords() {
    let displayKeywords = [];
    if (config.SHADING) displayKeywords.push("SHADING");
    if (config.BLOOM) displayKeywords.push("BLOOM");
    if (config.SUNRAYS) displayKeywords.push("SUNRAYS");
    displayMaterial?.setKeywords(displayKeywords);
  }

  updateKeywords();
  initFramebuffers();
  multipleSplats(parseInt(String(Math.random() * 20)) + 5);

  let lastUpdateTime = Date.now();
  let colorUpdateTimer = 0.0;
  update();

  function update() {
    const dt = calcDeltaTime();
    if (resizeCanvas())
      initFramebuffers();
    updateColors(dt);
    applyInputs();
    if (!config.PAUSED)
      step(dt);
    render();
    requestAnimationFrame(update);
  }

  function calcDeltaTime() {
    let now = Date.now();
    let dt = (now - lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    lastUpdateTime = now;
    return dt;
  }

  function resizeCanvas() {
    let width = scaleByPixelRatio(canvas.clientWidth);
    let height = scaleByPixelRatio(canvas.clientHeight);
    if (canvas.width != width || canvas.height != height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  function updateColors(dt: number) {
    if (!config.COLORFUL) return;

    colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
    if (colorUpdateTimer >= 1) {
      colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
      pointers.forEach(p => {
        p.color = generateColor();
      });
    }
  }

  function applyInputs() {
    if (splatStack.length > 0) {
      const num = splatStack.pop()
      typeof num === 'number' && multipleSplats(num);
    }

    pointers.forEach(p => {
      if (p.moved) {
        p.moved = false;
        splatPointer(p);
      }
    });
  }

  function step(dt: number) {
    gl.disable(gl.BLEND);

    if (curlProgram?.uniforms && velocity) {
      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);
    }

    if (vorticityProgram?.uniforms && velocity) {
      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();
    }

    if (divergenceProgram?.uniforms && velocity) {
      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);
    }
    if (clearProgram?.uniforms && velocity) {
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();
    }
    if (pressureProgram?.uniforms && velocity) {
      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }
    }
    if (gradienSubtractProgram?.uniforms && velocity) {
      gradienSubtractProgram.bind();
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();
    }
    if (advectionProgram?.uniforms && velocity) {
      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      let velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();
    }
    if (advectionProgram?.uniforms && velocity && dye) {
      if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);

      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    }
  }

  function render(target?: Target) {
    if (config.BLOOM)
      applyBloom(dye?.read, bloom);
    if (config.SUNRAYS) {
      applySunrays(dye?.read, dye?.write, sunrays);
      blur(sunrays, sunraysTemp, 1);
    }

    if (target == null || !config.TRANSPARENT) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
    }
    else {
      gl.disable(gl.BLEND);
    }

    if (!config.TRANSPARENT)
      drawColor(target, normalizeColor(config.BACK_COLOR));
    if (target == null && config.TRANSPARENT)
      drawCheckerboard(target);
    drawDisplay(target);
  }

  function drawColor(target?: Target, color?: Pointer['color']) {
    if (!(colorProgram?.uniforms && color)) return
    colorProgram.bind();
    gl.uniform4f(colorProgram.uniforms.color, color.r, color.g, color.b, 1);
    blit(target);
  }

  function drawCheckerboard(target?: Target) {
    if (!checkerboardProgram?.uniforms) return
    checkerboardProgram.bind();
    gl.uniform1f(checkerboardProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    blit(target);
  }

  function drawDisplay(target?: Target) {
    let width = target == null ? gl.drawingBufferWidth : target.width;
    let height = target == null ? gl.drawingBufferHeight : target.height;
    if (!(displayMaterial && dye)) return
    displayMaterial.bind();
    if (config.SHADING)
      gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
    if (config.BLOOM) {
      gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1));
      gl.uniform1i(displayMaterial.uniforms.uDithering, ditheringTexture.attach(2));
      let scale = getTextureScale(ditheringTexture, width, height);
      gl.uniform2f(displayMaterial.uniforms.ditherScale, scale.x, scale.y);
    }
    if (config.SUNRAYS)
      gl.uniform1i(displayMaterial.uniforms.uSunrays, sunrays.attach(3));
    blit(target);
  }

  function applyBloom(source?: Target, destination?: Target) {
    if (bloomFramebuffers.length < 2)
      return;

    let last = destination;
    if (bloomPrefilterProgram?.uniforms && source) {
      gl.disable(gl.BLEND);
      bloomPrefilterProgram.bind();
      let knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
      let curve0 = config.BLOOM_THRESHOLD - knee;
      let curve1 = knee * 2;
      let curve2 = 0.25 / knee;
      gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
      gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, config.BLOOM_THRESHOLD);
      gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
      blit(last);
    }

    if (bloomBlurProgram?.uniforms && last) {
      bloomBlurProgram.bind();
      for (let i = 0; i < bloomFramebuffers.length; i++) {
        let dest = bloomFramebuffers[i];
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        blit(dest);
        last = dest;
      }
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.enable(gl.BLEND);

      for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
        let baseTex = bloomFramebuffers[i];
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, baseTex.width, baseTex.height);
        blit(baseTex);
        last = baseTex;
      }
    }

    gl.disable(gl.BLEND);
    if (bloomFinalProgram?.uniforms && last) {
      bloomFinalProgram.bind();
      gl.uniform2f(bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
      gl.uniform1f(bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY);
      blit(destination);
    }
  }

  function applySunrays(source?: Target, mask?: Target, destination?: Target) {
    gl.disable(gl.BLEND);
    if (sunraysMaskProgram?.uniforms && source) {
      sunraysMaskProgram.bind();
      gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
      blit(mask);
    }
    if (sunraysProgram?.uniforms && mask) {
      sunraysProgram.bind();
      gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT);
      gl.uniform1i(sunraysProgram.uniforms.uTexture, mask.attach(0));
      blit(destination);
    }
  }

  function blur(target: Target, temp: Target, iterations: number) {
    if (!blurProgram?.uniforms) return;
    blurProgram.bind();
    for (let i = 0; i < iterations; i++) {
      gl.uniform2f(blurProgram.uniforms.texelSize, target.texelSizeX, 0.0);
      gl.uniform1i(blurProgram.uniforms.uTexture, target.attach(0));
      blit(temp);

      gl.uniform2f(blurProgram.uniforms.texelSize, 0.0, target.texelSizeY);
      gl.uniform1i(blurProgram.uniforms.uTexture, temp.attach(0));
      blit(target);
    }
  }

  function splatPointer(pointer: Pointer) {
    let dx = pointer.deltaX * config.SPLAT_FORCE;
    let dy = pointer.deltaY * config.SPLAT_FORCE;
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
  }

  function multipleSplats(amount: number) {
    for (let i = 0; i < amount; i++) {
      const color = generateColor();
      color.r *= 10.0;
      color.g *= 10.0;
      color.b *= 10.0;
      const x = Math.random();
      const y = Math.random();
      const dx = 1000 * (Math.random() - 0.5);
      const dy = 1000 * (Math.random() - 0.5);
      splat(x, y, dx, dy, color);
    }
  }

  function splat(x: number, y: number, dx: number, dy: number, color: Pointer['color']) {
    if (!splatProgram?.uniforms) return
    if (!velocity) return
    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
    blit(velocity.write);
    velocity.swap();

    if (!dye) return
    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
  }

  function correctRadius(radius: number) {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1)
      radius *= aspectRatio;
    return radius;
  }

  function onMousedown(e: MouseEvent) {
    let posX = scaleByPixelRatio(e.offsetX);
    let posY = scaleByPixelRatio(e.offsetY);
    let pointer = pointers.find(p => p.id == -1);
    if (pointer == null)
      pointer = new PointerPrototype();
    updatePointerDownData(pointer, -1, posX, posY);
  }

  function onMousemove(e: MouseEvent) {
    let pointer = pointers[0];
    if (!pointer.down) return;
    let posX = scaleByPixelRatio(e.offsetX);
    let posY = scaleByPixelRatio(e.offsetY);
    updatePointerMoveData(pointer, posX, posY);
  }

  function onMouseup(e: MouseEvent) {
    updatePointerUpData(pointers[0]);
  }

  function onTouchstart(e: TouchEvent) {
    e.preventDefault();
    const touches = e.targetTouches;
    while (touches.length >= pointers.length)
      pointers.push(new PointerPrototype());
    for (let i = 0; i < touches.length; i++) {
      let posX = scaleByPixelRatio(touches[i].pageX);
      let posY = scaleByPixelRatio(touches[i].pageY);
      updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY);
    }
  }

  function onTouchmove(e: TouchEvent) {
    e.preventDefault();
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
      let pointer = pointers[i + 1];
      if (!pointer.down) continue;
      let posX = scaleByPixelRatio(touches[i].pageX);
      let posY = scaleByPixelRatio(touches[i].pageY);
      updatePointerMoveData(pointer, posX, posY);
    }
  }

  function onTouchend(e: TouchEvent) {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let pointer = pointers.find(p => p.id == touches[i].identifier);
      if (pointer == null) continue;
      updatePointerUpData(pointer);
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.code === 'KeyP')
      config.PAUSED = !config.PAUSED;
    if (e.key === ' ')
      splatStack.push(parseInt(String(Math.random() * 20)) + 5);
  }

  canvas.addEventListener('mousedown', onMousedown);
  canvas.addEventListener('mousemove', onMousemove);
  window.addEventListener('mouseup', onMouseup);
  canvas.addEventListener('touchstart', onTouchstart);
  canvas.addEventListener('touchmove', onTouchmove, false);
  window.addEventListener('touchend', onTouchend);
  window.addEventListener('keydown', onKeydown);

  function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.color = generateColor();
  }

  function updatePointerMoveData(pointer: Pointer, posX: number, posY: number) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
  }

  function updatePointerUpData(pointer: Pointer) {
    pointer.down = false;
  }

  function correctDeltaX(delta: number) {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio < 1) delta *= aspectRatio;
    return delta;
  }

  function correctDeltaY(delta: number) {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) delta /= aspectRatio;
    return delta;
  }

  function generateColor() {
    let c = HSVtoRGB(Math.random(), 1.0, 1.0);
    c.r *= 0.15;
    c.g *= 0.15;
    c.b *= 0.15;
    return c;
  }

  function HSVtoRGB(h: number, s: number, v: number) {
    let r = 0, g = 0, b = 0, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }

    return {
      r,
      g,
      b
    };
  }

  function normalizeColor(input: Pointer['color']) {
    let output = {
      r: input.r / 255,
      g: input.g / 255,
      b: input.b / 255
    };
    return output;
  }

  function wrap(value: number, min: number, max: number) {
    let range = max - min;
    if (range == 0) return min;
    return (value - min) % range + min;
  }

  function getResolution(resolution: number) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1)
      aspectRatio = 1.0 / aspectRatio;

    let min = Math.round(resolution);
    let max = Math.round(resolution * aspectRatio);

    if (gl.drawingBufferWidth > gl.drawingBufferHeight)
      return { width: max, height: min };
    else
      return { width: min, height: max };
  }

  function getTextureScale(texture: TextTure, width: number, height: number) {
    return {
      x: width / texture.width,
      y: height / texture.height
    };
  }

  function scaleByPixelRatio(input: number) {
    let pixelRatio = window.devicePixelRatio || 1;
    return Math.floor(input * pixelRatio);
  }

  function hashCode(s: string) {
    if (s.length == 0) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  function ruin() {
    console.log(7777)
    canvas.removeEventListener('mousedown', onMousedown);
    canvas.removeEventListener('mousemove', onMousemove);
    window.removeEventListener('mouseup', onMouseup);
    canvas.removeEventListener('touchstart', onTouchstart);
    canvas.removeEventListener('touchmove', onTouchmove, false);
    window.removeEventListener('touchend', onTouchend);
    window.removeEventListener('keydown', onKeydown);
  }

  return {
    ruin
  }
}

export default createEffect