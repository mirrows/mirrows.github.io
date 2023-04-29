import { hashCode } from "@/utils/common";
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import img from "../../../../utils/img";
import { compileShader, createProgram, getUniforms } from "../../../../utils/tool";

const DIV = styled.div`
  overflow: hidden;
.fire_wrap{
  position: fixed;
  width: 100vw;
  height: 100vh;
  vertical-align: bottom;
  z-index: -1;
}
`

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

type Ext = {
  formatRGBA: {
    internalFormat: number;
    format: number;
  } | null;
  formatRG: {
    internalFormat: number;
    format: number;
  } | null;
  formatR: {
    internalFormat: number;
    format: number;
  } | null;
  halfFloatTexType: number | undefined;
  supportLinearFiltering: OES_texture_float_linear | null;
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

class Material {
  vertexShader
  fragmentShaderSource
  programs: (WebGLProgram | null)[]
  activeProgram: WebGLProgram | null
  uniforms: {
    [key: string]: WebGLUniformLocation | null;
  }
  gl
  constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShaderSource: string) {
    this.vertexShader = vertexShader;
    this.fragmentShaderSource = fragmentShaderSource;
    this.programs = [];
    this.activeProgram = null
    this.uniforms = {};
    this.gl = gl;
  }

  setKeywords(keywords: string[]) {
    let hash = 0;
    for (let i = 0; i < keywords.length; i++)
      hash += hashCode(keywords[i]);

    let program = this.programs[hash];
    if (program == null) {
      let fragmentShader = compileShader(this.gl, this.gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
      if (!fragmentShader) return;
      program = createProgram(this.gl, this.vertexShader, fragmentShader);
      this.programs[hash] = program;
    }

    if (!program || program == this.activeProgram) return;

    this.uniforms = getUniforms(this.gl, program);
    this.activeProgram = program;
  }

  bind() {
    this.gl.useProgram(this.activeProgram);
  }
}

class Program {
  uniforms
  program
  gl
  constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    this.gl = gl
    this.program = createProgram(gl, vertexShader, fragmentShader);
    if (this.program) {
      this.uniforms = getUniforms(gl, this.program);
    }
  }

  bind() {
    this.gl.useProgram(this.program);
  }
}

const FireCanvas = () => {
  const fire = useRef<HTMLCanvasElement | null>(null)
  const glRef = useRef<WebGLRenderingContext | WebGL2RenderingContext>()
  const blit = useRef<(target?: Target | undefined, clear?: boolean) => void>(() => { })
  const extRef = useRef<Ext>()
  const pointers = useRef<Pointer[]>([])
  const splatStack = useRef<number[]>([])

  const blurProgram = useRef<Program | null>(null);
  const copyProgram = useRef<Program | null>(null);
  const clearProgram = useRef<Program | null>(null);
  const colorProgram = useRef<Program | null>(null);
  const checkerboardProgram = useRef<Program | null>(null);
  const bloomPrefilterProgram = useRef<Program | null>(null);
  const bloomBlurProgram = useRef<Program | null>(null);
  const bloomFinalProgram = useRef<Program | null>(null);
  const sunraysMaskProgram = useRef<Program | null>(null);
  const sunraysProgram = useRef<Program | null>(null);
  const splatProgram = useRef<Program | null>(null);
  const advectionProgram = useRef<Program | null>(null);
  const divergenceProgram = useRef<Program | null>(null);
  const curlProgram = useRef<Program | null>(null);
  const vorticityProgram = useRef<Program | null>(null);
  const pressureProgram = useRef<Program | null>(null);
  const gradienSubtractProgram = useRef<Program | null>(null);
  const displayMaterial = useRef<Material | null>(null)

  const dye = useRef<DBFbo | null>();
  const velocity = useRef<DBFbo | null>();
  const divergence = useRef<Target>();
  const curl = useRef<Target>();
  const pressure = useRef<DBFbo>();
  const bloom = useRef<Target>();
  const bloomFramebuffers = useRef<Target[]>([]);
  const sunrays = useRef<Target>();
  const sunraysTemp = useRef<Target>();

  const lastUpdateTime = useRef(Date.now());
  const colorUpdateTimer = useRef(0.0);

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

  function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  function captureScreenshot(gl: WebGLRenderingContext | WebGL2RenderingContext, ext: Ext) {
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
    const gl = glRef.current;
    if (!gl) return new Float32Array(0)
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





  function CHECK_FRAMEBUFFER_STATUS() {
    const gl = glRef.current;
    if (!gl) return;
    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE)
      console.trace("Framebuffer error: " + status);
  }

  function initFramebuffers() {
    const gl = glRef.current;
    const ext = extRef.current;
    if (!gl || !ext) return;
    let simRes = getResolution(config.SIM_RESOLUTION);
    let dyeRes = getResolution(config.DYE_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    gl.disable(gl.BLEND);

    if (dye.current == null)
      dye.current = createDoubleFBO(dyeRes.width, dyeRes.height, rgba?.internalFormat, rgba?.format, texType, filtering);
    else
      dye.current = resizeDoubleFBO(dye.current, dyeRes.width, dyeRes.height, rgba?.internalFormat, rgba?.format, texType, filtering);

    if (velocity.current == null)
      velocity.current = createDoubleFBO(simRes.width, simRes.height, rg?.internalFormat, rg?.format, texType, filtering);
    else
      velocity.current = resizeDoubleFBO(velocity.current, simRes.width, simRes.height, rg?.internalFormat, rg?.format, texType, filtering);

    divergence.current = createFBO(simRes.width, simRes.height, r?.internalFormat, r?.format, texType, gl.NEAREST);
    curl.current = createFBO(simRes.width, simRes.height, r?.internalFormat, r?.format, texType, gl.NEAREST);
    pressure.current = createDoubleFBO(simRes.width, simRes.height, r?.internalFormat, r?.format, texType, gl.NEAREST);

    initBloomFramebuffers();
    initSunraysFramebuffers();
  }

  function initBloomFramebuffers() {
    const gl = glRef.current;
    const ext = extRef.current;
    if (!gl || !ext) return;
    let res = getResolution(config.BLOOM_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    bloom.current = createFBO(res.width, res.height, rgba?.internalFormat, rgba?.format, texType, filtering);

    bloomFramebuffers.current.length = 0;
    for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
      let width = res.width >> (i + 1);
      let height = res.height >> (i + 1);

      if (width < 2 || height < 2) break;

      let fbo = createFBO(width, height, rgba?.internalFormat, rgba?.format, texType, filtering);
      bloomFramebuffers.current.push(fbo);
    }
  }

  function initSunraysFramebuffers() {
    const gl = glRef.current;
    const ext = extRef.current;
    if (!gl || !ext) return;
    let res = getResolution(config.SUNRAYS_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    sunrays.current = createFBO(res.width, res.height, r?.internalFormat, r?.format, texType, filtering);
    sunraysTemp.current = createFBO(res.width, res.height, r?.internalFormat, r?.format, texType, filtering);
  }

  function createFBO(w: number, h: number, internalFormat = 0, format = 0, type = 0, param = 0) {
    const gl = glRef.current;
    gl?.activeTexture(gl.TEXTURE0);
    let texture = gl?.createTexture() || null;
    gl?.bindTexture(gl.TEXTURE_2D, texture);
    gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl?.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    let fbo = gl?.createFramebuffer() || null;
    gl?.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl?.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl?.viewport(0, 0, w, h);
    gl?.clear(gl.COLOR_BUFFER_BIT);

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
        gl?.activeTexture(gl.TEXTURE0 + id);
        gl?.bindTexture(gl.TEXTURE_2D, texture);
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
    const gl = glRef.current;
    let newFBO = createFBO(w, h, internalFormat, format, type, param);
    copyProgram.current?.bind();
    copyProgram.current?.uniforms && gl?.uniform1i(copyProgram.current.uniforms.uTexture, target.attach(0));
    blit.current(newFBO);
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
    const gl = glRef.current;
    if (!gl) return null;
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
    displayMaterial.current?.setKeywords(displayKeywords);
  }

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
    let dt = (now - lastUpdateTime.current) / 1000;
    dt = Math.min(dt, 0.016666);
    lastUpdateTime.current = now;
    return dt;
  }

  function resizeCanvas() {
    const canvas = fire.current;
    if (!canvas) return false;
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

    colorUpdateTimer.current += dt * config.COLOR_UPDATE_SPEED;
    if (colorUpdateTimer.current >= 1) {
      colorUpdateTimer.current = wrap(colorUpdateTimer.current, 0, 1);
      pointers.current.forEach(p => {
        p.color = generateColor();
      });
    }
  }

  function applyInputs() {
    if (splatStack.current.length > 0) {
      const num = splatStack.current.pop();
      typeof num === 'number' && multipleSplats(num);
    }

    pointers.current.forEach(p => {
      if (p.moved) {
        p.moved = false;
        splatPointer(p);
      }
    });
  }

  function step(dt: number) {
    const gl = glRef.current;
    const ext = extRef.current;
    if (!gl) return;
    gl.disable(gl.BLEND);

    if (curlProgram.current?.uniforms && velocity.current) {
      curlProgram.current.bind();
      gl.uniform2f(curlProgram.current.uniforms.texelSize, velocity.current.texelSizeX, velocity.current.texelSizeY);
      gl.uniform1i(curlProgram.current.uniforms.uVelocity, velocity.current.read.attach(0));
      blit.current(curl.current);
    }

    if (vorticityProgram.current?.uniforms && velocity.current) {
      vorticityProgram.current.bind();
      gl.uniform2f(vorticityProgram.current.uniforms.texelSize, velocity.current.texelSizeX, velocity.current.texelSizeY);
      gl.uniform1i(vorticityProgram.current.uniforms.uVelocity, velocity.current.read.attach(0));
      curl.current && gl.uniform1i(vorticityProgram.current.uniforms.uCurl, curl.current.attach(1));
      gl.uniform1f(vorticityProgram.current.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.current.uniforms.dt, dt);
      blit.current(velocity.current.write);
      velocity.current.swap();
    }

    if (divergenceProgram.current?.uniforms && velocity.current) {
      divergenceProgram.current.bind();
      gl.uniform2f(divergenceProgram.current.uniforms.texelSize, velocity.current.texelSizeX, velocity.current.texelSizeY);
      gl.uniform1i(divergenceProgram.current.uniforms.uVelocity, velocity.current.read.attach(0));
      blit.current(divergence.current);
    }
    if (clearProgram.current?.uniforms && velocity && pressure.current) {
      clearProgram.current.bind();
      gl.uniform1i(clearProgram.current.uniforms.uTexture, pressure.current.read.attach(0));
      gl.uniform1f(clearProgram.current.uniforms.value, config.PRESSURE);
      blit.current(pressure.current.write);
      pressure.current.swap();
    }
    if (pressureProgram.current?.uniforms && velocity.current && pressure.current) {
      pressureProgram.current.bind();
      gl.uniform2f(pressureProgram.current.uniforms.texelSize, velocity.current.texelSizeX, velocity.current.texelSizeY);
      divergence.current && gl.uniform1i(pressureProgram.current.uniforms.uDivergence, divergence.current.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.current.uniforms.uPressure, pressure.current.read.attach(1));
        blit.current(pressure.current.write);
        pressure.current.swap();
      }
    }
    if (gradienSubtractProgram.current?.uniforms && velocity.current) {
      gradienSubtractProgram.current.bind();
      gl.uniform2f(gradienSubtractProgram.current.uniforms.texelSize, velocity.current.texelSizeX, velocity.current.texelSizeY);
      pressure.current && gl.uniform1i(gradienSubtractProgram.current.uniforms.uPressure, pressure.current.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.current.uniforms.uVelocity, velocity.current.read.attach(1));
      blit.current(velocity.current.write);
      velocity.current.swap();
    }
    if (advectionProgram.current?.uniforms && velocity.current) {
      advectionProgram.current.bind();
      gl.uniform2f(advectionProgram.current.uniforms.texelSize, velocity.current.texelSizeX, velocity.current.texelSizeY);
      if (!ext?.supportLinearFiltering)
        gl.uniform2f(advectionProgram.current.uniforms.dyeTexelSize, velocity.current.texelSizeX, velocity.current.texelSizeY);
      let velocityId = velocity.current.read.attach(0);
      gl.uniform1i(advectionProgram.current.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.current.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.current.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.current.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit.current(velocity.current.write);
      velocity.current.swap();
    }
    if (advectionProgram.current?.uniforms && velocity.current && dye.current) {
      if (!ext?.supportLinearFiltering)
        gl.uniform2f(advectionProgram.current.uniforms.dyeTexelSize, dye.current.texelSizeX, dye.current.texelSizeY);

      gl.uniform1i(advectionProgram.current.uniforms.uVelocity, velocity.current.read.attach(0));
      gl.uniform1i(advectionProgram.current.uniforms.uSource, dye.current.read.attach(1));
      gl.uniform1f(advectionProgram.current.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit.current(dye.current.write);
      dye.current.swap();
    }
  }

  function render(target?: Target) {
    const gl = glRef.current;
    if (!gl) return;
    if (config.BLOOM)
      applyBloom(dye.current?.read, bloom.current);
    if (config.SUNRAYS && sunrays.current && sunraysTemp.current) {
      applySunrays(dye.current?.read, dye.current?.write, sunrays.current);
      blur(sunrays.current, sunraysTemp.current, 1);
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
    const gl = glRef.current;
    if (!(colorProgram.current?.uniforms && color)) return
    colorProgram.current.bind();
    gl?.uniform4f(colorProgram.current.uniforms.color, color.r, color.g, color.b, 1);
    blit.current(target);
  }

  function drawCheckerboard(target?: Target) {
    const gl = glRef.current;
    const canvas = fire.current;
    if (!checkerboardProgram.current?.uniforms || !canvas) return
    checkerboardProgram.current.bind();
    gl?.uniform1f(checkerboardProgram.current.uniforms.aspectRatio, canvas.width / canvas.height);
    blit.current(target);
  }

  function drawDisplay(target?: Target) {
    const gl = glRef.current;
    if (!gl || !bloom.current) return;
    let ditheringTexture = createTextureAsync(img);
    let width = target == null ? gl.drawingBufferWidth : target.width;
    let height = target == null ? gl.drawingBufferHeight : target.height;
    if (!(displayMaterial.current && dye.current)) return
    displayMaterial.current.bind();
    if (config.SHADING)
      gl.uniform2f(displayMaterial.current.uniforms.texelSize, 1.0 / width, 1.0 / height);
    gl.uniform1i(displayMaterial.current.uniforms.uTexture, dye.current.read.attach(0));
    if (config.BLOOM && ditheringTexture) {
      gl.uniform1i(displayMaterial.current.uniforms.uBloom, bloom.current.attach(1));
      gl.uniform1i(displayMaterial.current.uniforms.uDithering, ditheringTexture.attach(2));
      let scale = getTextureScale(ditheringTexture, width, height);
      gl.uniform2f(displayMaterial.current.uniforms.ditherScale, scale.x, scale.y);
    }
    if (config.SUNRAYS && sunrays.current)
      gl.uniform1i(displayMaterial.current.uniforms.uSunrays, sunrays.current.attach(3));
    blit.current(target);
  }

  function applyBloom(source?: Target, destination?: Target) {
    const gl = glRef.current;
    if (!gl) return;
    if (bloomFramebuffers.current.length < 2)
      return;

    let last = destination;
    if (bloomPrefilterProgram.current?.uniforms && source) {
      gl.disable(gl.BLEND);
      bloomPrefilterProgram.current.bind();
      let knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
      let curve0 = config.BLOOM_THRESHOLD - knee;
      let curve1 = knee * 2;
      let curve2 = 0.25 / knee;
      gl.uniform3f(bloomPrefilterProgram.current.uniforms.curve, curve0, curve1, curve2);
      gl.uniform1f(bloomPrefilterProgram.current.uniforms.threshold, config.BLOOM_THRESHOLD);
      gl.uniform1i(bloomPrefilterProgram.current.uniforms.uTexture, source.attach(0));
      blit.current(last);
    }

    if (bloomBlurProgram.current?.uniforms && last) {
      bloomBlurProgram.current.bind();
      for (let i = 0; i < bloomFramebuffers.current.length; i++) {
        let dest = bloomFramebuffers.current[i];
        gl.uniform2f(bloomBlurProgram.current.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.current.uniforms.uTexture, last.attach(0));
        blit.current(dest);
        last = dest;
      }
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.enable(gl.BLEND);

      for (let i = bloomFramebuffers.current.length - 2; i >= 0; i--) {
        let baseTex = bloomFramebuffers.current[i];
        gl.uniform2f(bloomBlurProgram.current.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.current.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, baseTex.width, baseTex.height);
        blit.current(baseTex);
        last = baseTex;
      }
    }

    gl.disable(gl.BLEND);
    if (bloomFinalProgram.current?.uniforms && last) {
      bloomFinalProgram.current.bind();
      gl.uniform2f(bloomFinalProgram.current.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomFinalProgram.current.uniforms.uTexture, last.attach(0));
      gl.uniform1f(bloomFinalProgram.current.uniforms.intensity, config.BLOOM_INTENSITY);
      blit.current(destination);
    }
  }

  function applySunrays(source?: Target, mask?: Target, destination?: Target) {
    const gl = glRef.current;
    if (!gl) return;
    gl.disable(gl.BLEND);
    if (sunraysMaskProgram.current?.uniforms && source) {
      sunraysMaskProgram.current.bind();
      gl.uniform1i(sunraysMaskProgram.current.uniforms.uTexture, source.attach(0));
      blit.current(mask);
    }
    if (sunraysProgram.current?.uniforms && mask) {
      sunraysProgram.current.bind();
      gl.uniform1f(sunraysProgram.current.uniforms.weight, config.SUNRAYS_WEIGHT);
      gl.uniform1i(sunraysProgram.current.uniforms.uTexture, mask.attach(0));
      blit.current(destination);
    }
  }

  function blur(target: Target, temp: Target, iterations: number) {
    const gl = glRef.current;
    if (!blurProgram.current?.uniforms || !gl) return;
    blurProgram.current.bind();
    for (let i = 0; i < iterations; i++) {
      gl.uniform2f(blurProgram.current.uniforms.texelSize, target.texelSizeX, 0.0);
      gl.uniform1i(blurProgram.current.uniforms.uTexture, target.attach(0));
      blit.current(temp);

      gl.uniform2f(blurProgram.current.uniforms.texelSize, 0.0, target.texelSizeY);
      gl.uniform1i(blurProgram.current.uniforms.uTexture, temp.attach(0));
      blit.current(target);
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
    if (!splatProgram.current?.uniforms) return
    const gl = glRef.current;
    const canvas = fire.current;
    if (!velocity.current || !gl || !canvas) return
    splatProgram.current.bind();
    gl.uniform1i(splatProgram.current.uniforms.uTarget, velocity.current.read.attach(0));
    gl.uniform1f(splatProgram.current.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.current.uniforms.point, x, y);
    gl.uniform3f(splatProgram.current.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.current.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
    blit.current(velocity.current.write);
    velocity.current.swap();

    if (!dye.current) return
    gl.uniform1i(splatProgram.current.uniforms.uTarget, dye.current.read.attach(0));
    gl.uniform3f(splatProgram.current.uniforms.color, color.r, color.g, color.b);
    blit.current(dye.current.write);
    dye.current.swap();
  }

  function correctRadius(radius: number) {
    const canvas = fire.current;
    if (!canvas) return radius;
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1)
      radius *= aspectRatio;
    return radius;
  }

  function onMousedown(e: MouseEvent) {
    let posX = scaleByPixelRatio(e.offsetX);
    let posY = scaleByPixelRatio(e.offsetY);
    let pointer = pointers.current.find(p => p.id == -1);
    if (pointer == null)
      pointer = new PointerPrototype();
    updatePointerDownData(pointer, -1, posX, posY);
  }

  function onMousemove(e: MouseEvent) {
    let pointer = pointers.current[0];
    if (!pointer?.down) return;
    let posX = scaleByPixelRatio(e.offsetX);
    let posY = scaleByPixelRatio(e.offsetY);
    updatePointerMoveData(pointer, posX, posY);
  }

  function onMouseup(e: MouseEvent) {
    updatePointerUpData(pointers.current[0]);
  }

  function onTouchstart(e: TouchEvent) {
    e.preventDefault();
    const touches = e.targetTouches;
    const pts = JSON.parse(JSON.stringify(pointers))
    while (touches.length >= pointers.current.length)
      pointers.current = [...pts, new PointerPrototype()]
    for (let i = 0; i < touches.length; i++) {
      let posX = scaleByPixelRatio(touches[i].pageX);
      let posY = scaleByPixelRatio(touches[i].pageY);
      updatePointerDownData(pointers.current[i + 1], touches[i].identifier, posX, posY);
    }
  }

  function onTouchmove(e: TouchEvent) {
    e.preventDefault();
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
      let pointer = pointers.current[i + 1];
      if (!pointer.down) continue;
      let posX = scaleByPixelRatio(touches[i].pageX);
      let posY = scaleByPixelRatio(touches[i].pageY);
      updatePointerMoveData(pointer, posX, posY);
    }
  }

  function onTouchend(e: TouchEvent) {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let pointer = pointers.current.find(p => p.id == touches[i].identifier);
      if (pointer == null) continue;
      updatePointerUpData(pointer);
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.code === 'KeyP')
      config.PAUSED = !config.PAUSED;
    if (e.key === ' ')
      splatStack.current.push(parseInt(String(Math.random() * 20)) + 5)
  }

  function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {
    const canvas = fire.current;
    if (!canvas) return;
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
    const canvas = fire.current;
    if (!canvas) return;
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
    const canvas = fire.current;
    if (!canvas) return delta;
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio < 1) delta *= aspectRatio;
    return delta;
  }

  function correctDeltaY(delta: number) {
    const canvas = fire.current;
    if (!canvas) return delta;
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
    let min = Math.round(resolution);
    const gl = glRef.current
    if (!gl) return { width: 0, height: 0 };
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1)
      aspectRatio = 1.0 / aspectRatio;
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

  function ruin() {
    if (!fire.current) return;
    const canvas = fire.current;
    canvas.removeEventListener('mousedown', onMousedown);
    canvas.removeEventListener('mousemove', onMousemove);
    window.removeEventListener('mouseup', onMouseup);
    canvas.removeEventListener('touchstart', onTouchstart);
    canvas.removeEventListener('touchmove', onTouchmove, false);
    window.removeEventListener('touchend', onTouchend);
    window.removeEventListener('keydown', onKeydown);
  }


  useEffect(() => {
    console.log(config)
    if (!fire.current) return;
    const canvas = fire.current;
    // const obj = fire.current && createEffect(fire.current)
    resizeCanvas();
    pointers.current = [new PointerPrototype()];
    const { gl, ext } = getWebGLContext(fire.current);
    glRef.current = gl;
    extRef.current = ext;

    blit.current = (() => {
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

    if (isMobile()) {
      config.DYE_RESOLUTION = 512;
    }
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 512;
      config.SHADING = false;
      config.BLOOM = false;
      config.SUNRAYS = false;
    }

    const baseVertexShader = compileShader(gl, gl.VERTEX_SHADER, `
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

    const blurVertexShader = compileShader(gl, gl.VERTEX_SHADER, `
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

    const blurShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const copyShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
  
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
  
    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
  `);

    const clearShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
  
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
  
    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `);

    const colorShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
  
    uniform vec4 color;
  
    void main () {
        gl_FragColor = color;
    }
  `);

    const checkerboardShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const bloomPrefilterShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const bloomBlurShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const bloomFinalShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const sunraysMaskShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const sunraysShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const splatShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const advectionShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const divergenceShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const curlShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const vorticityShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const pressureShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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

    const gradientSubtractShader = compileShader(gl, gl.FRAGMENT_SHADER, `
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


    blurProgram.current = blurVertexShader && blurShader && (new Program(gl, blurVertexShader, blurShader));
    copyProgram.current = baseVertexShader && copyShader && (new Program(gl, baseVertexShader, copyShader));
    clearProgram.current = baseVertexShader && clearShader && (new Program(gl, baseVertexShader, clearShader));
    colorProgram.current = baseVertexShader && colorShader && (new Program(gl, baseVertexShader, colorShader));
    checkerboardProgram.current = baseVertexShader && checkerboardShader && (new Program(gl, baseVertexShader, checkerboardShader));
    bloomPrefilterProgram.current = baseVertexShader && bloomPrefilterShader && (new Program(gl, baseVertexShader, bloomPrefilterShader));
    bloomBlurProgram.current = baseVertexShader && bloomBlurShader && (new Program(gl, baseVertexShader, bloomBlurShader));
    bloomFinalProgram.current = baseVertexShader && bloomFinalShader && (new Program(gl, baseVertexShader, bloomFinalShader));
    sunraysMaskProgram.current = baseVertexShader && sunraysMaskShader && (new Program(gl, baseVertexShader, sunraysMaskShader));
    sunraysProgram.current = baseVertexShader && sunraysShader && (new Program(gl, baseVertexShader, sunraysShader));
    splatProgram.current = baseVertexShader && splatShader && (new Program(gl, baseVertexShader, splatShader));
    advectionProgram.current = baseVertexShader && advectionShader && (new Program(gl, baseVertexShader, advectionShader));
    divergenceProgram.current = baseVertexShader && divergenceShader && (new Program(gl, baseVertexShader, divergenceShader));
    curlProgram.current = baseVertexShader && curlShader && (new Program(gl, baseVertexShader, curlShader));
    vorticityProgram.current = baseVertexShader && vorticityShader && (new Program(gl, baseVertexShader, vorticityShader));
    pressureProgram.current = baseVertexShader && pressureShader && (new Program(gl, baseVertexShader, pressureShader));
    gradienSubtractProgram.current = baseVertexShader && gradientSubtractShader && (new Program(gl, baseVertexShader, gradientSubtractShader));

    displayMaterial.current = baseVertexShader && displayShaderSource && new Material(gl, baseVertexShader, displayShaderSource);

    updateKeywords();
    initFramebuffers();
    multipleSplats(parseInt(String(Math.random() * 20)) + 5);

    update();

    canvas.addEventListener('mousedown', onMousedown);
    canvas.addEventListener('mousemove', onMousemove);
    window.addEventListener('mouseup', onMouseup);
    canvas.addEventListener('touchstart', onTouchstart);
    canvas.addEventListener('touchmove', onTouchmove, false);
    window.addEventListener('touchend', onTouchend);
    window.addEventListener('keydown', onKeydown);


    return () => {
      ruin();
    }
  }, [])
  return (<DIV>
    <canvas className='fire_wrap' ref={fire}></canvas>
  </DIV>)
}

export default FireCanvas