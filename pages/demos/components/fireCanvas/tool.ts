function compileShader(gl: WebGLRenderingContext | WebGL2RenderingContext, type: number, source: string, keywords?: string[]) {
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

function createProgram(gl: WebGLRenderingContext | WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  let program = gl.createProgram();
  if (!program) return program;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.trace(gl.getProgramInfoLog(program));

  return program;
}

function getUniforms(gl: WebGLRenderingContext | WebGL2RenderingContext, program: WebGLProgram) {
  let uniforms: { [key: string]: WebGLUniformLocation | null } = {};
  let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    let uniformName = gl.getActiveUniform(program, i)?.name;
    if (!uniformName) continue
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
  }
  return uniforms;
}

export {
  compileShader,
  createProgram,
  getUniforms,
}