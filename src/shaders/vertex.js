const vertexShaderSrc = 
`
precision mediump float;
precision mediump int;

attribute vec3 a_ObjVert;
attribute vec3 a_Normal;

uniform mat4 u_MVP;

varying vec3 v_Normal;

void main() {
    gl_Position = u_MVP * vec4(a_ObjVert, 1.0);
    v_Normal = normalize(vec3(u_MVP * vec4(a_Normal, 1.0)));
}
`