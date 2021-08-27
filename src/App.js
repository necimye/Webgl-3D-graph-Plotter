const main = (() => {
  SceneRenderer.render()
})()

// const objMat = coordAxes.axesVertices

// gl.bindBuffer(gl.ARRAY_BUFFER, coordAxes.vertBuff)
// gl.bufferData(gl.ARRAY_BUFFER, objMat, gl.STATIC_DRAW)

// const posVertAttribLoc = gl.getAttribLocation(shaderProg, 'a_ObjVert')
// const mvpMatLoc = gl.getUniformLocation(shaderProg, 'u_MVP')

// gl.vertexAttribPointer(
//   posVertAttribLoc,
//   3,
//   gl.FLOAT,
//   gl.FALSE,
//   3 * Float32Array.BYTES_PER_ELEMENT,
//   0
// )
// gl.enableVertexAttribArray(posVertAttribLoc)

// const modelMat = mat4.create()
// const viewMat = mat4.create()
// const projMat = mat4.create()
// const mvpMat = mat4.create()

// mat4.identity(modelMat)
// mat4.lookAt(
//   viewMat,
//   INIT_EYE_POS, // eye
//   [0, 0, 0],  // center
//   Y_AXIS,  // up
// )
// mat4.perspective(
//   projMat,
//   45 * Math.PI/180,
//   1,
//   0.1,
//   1000.0
// )
// mat4.multiply(mvpMat, projMat, viewMat, modelMat)

// gl.uniformMatrix4fv(mvpMatLoc, gl.false, mvpMat)



// gl.drawArrays(
//   gl.LINES,
//   0,
//   6
// )