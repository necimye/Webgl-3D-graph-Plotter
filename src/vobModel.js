"use strict";

var VOBModel = function (obj_model) {
  // Shader variables
  let vert_loc = null;
  let color_loc = null;
  let normals_loc = null;
  let fading_loc = null;
  let ambient_loc = null;
  //-----------------------------------------------------------------------
  function _createGpuVob(data) {
    // Create a buffer object
    var buffer_id;

    buffer_id = gl.createBuffer();
    if (!buffer_id) {
      console.log("Failed to create the buffer object for " + obj_model);
      return null;
    }

    // Make the buffer object the active buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_id);

    // Upload the data for this buffer object to the GPU.
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    return buffer_id;
  }

  //-----------------------------------------------------------------------
  function _buildVobBuffers() {
    obj_model.posVertBuffId = _createGpuVob(new Float32Array(obj_model.posVertices));
    obj_model.normalsBuffId = _createGpuVob(new Float32Array(obj_model.normals));
  }

  //-----------------------------------------------------------------------
  function _getLocationOfShaderVariables() {
    // Get the location of the shader variables
    vert_loc = gl.getAttribLocation(shaderProg, "a_ObjVert");
    normals_loc = gl.getAttribLocation(shaderProg, "a_Normal");

    color_loc = gl.getUniformLocation(shaderProg, "u_Color");
    fading_loc = gl.getUniformLocation(shaderProg, "u_Fading");
    ambient_loc = gl.getUniformLocation(shaderProg, "u_AmbientStrength");
  }

  //-----------------------------------------------------------------------
  // These one-time tasks set up the rendering of the models.
  _buildVobBuffers();
  _getLocationOfShaderVariables();

  //-----------------------------------------------------------------------
  this.delete = function () {
    gl.deleteBuffer(obj_model.posVertBuffId);
    gl.deleteBuffer(obj_model.colorVertBuffId);
  };

  //-----------------------------------------------------------------------
  this.render = function (transform_loc, transform) {
    // Set the transform for all the faces, lines, and points
    gl.uniformMatrix4fv(transform_loc, false, transform);

    if (obj_model.primitive === gl.LINES) {
      // Activate
      gl.disable(gl.DEPTH_TEST)
      gl.bindBuffer(gl.ARRAY_BUFFER, obj_model.posVertBuffId);

      // Bind the vertices VOB to the 'a_ObjVert' shader variable
      gl.vertexAttribPointer(vert_loc, 3, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(vert_loc);

      gl.bindBuffer(gl.ARRAY_BUFFER, obj_model.normalsBuffId);

      gl.vertexAttribPointer(normals_loc, 3, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(normals_loc);

      gl.uniform3fv(color_loc, obj_model.color);
      gl.uniform1f(fading_loc, obj_model.fading);
      gl.uniform1f(ambient_loc, obj_model.ambientStrength);
      // Draw coordinate axes
      gl.drawArrays(obj_model.primitive, 0, 3 * 2);
    }

    if (obj_model.primitive === gl.TRIANGLE_STRIP) {
      // Activate the model's triangle vertex object buffer (VOB)
      gl.bindBuffer(gl.ARRAY_BUFFER, obj_model.posVertBuffId);

      // Bind the vertices VOB to the 'a_Vertex' shader variable
      gl.vertexAttribPointer(vert_loc, 3, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(vert_loc);

      gl.bindBuffer(gl.ARRAY_BUFFER, obj_model.normalsBuffId);

      gl.vertexAttribPointer(normals_loc, 3, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(normals_loc);

      gl.uniform3fv(color_loc, obj_model.color);
      gl.uniform1f(fading_loc, obj_model.fading);
      gl.uniform1f(ambient_loc, obj_model.ambientStrength);

      gl.drawArrays(obj_model.primitive, 0, obj_model.posVertices.length / 3);
    }
  };
};
