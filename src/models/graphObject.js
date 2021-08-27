const GraphObject = new (function() {
  self = this

  self.primitive = gl.TRIANGLE_STRIP

  self.posVertBuffId = null
  self.colorVertBuffId = null
  self.normalsBuffId = null

  // Initialize vertices
  self.posVertices = SampleGenerator.samples
  self.normals = SampleGenerator.normals

  self.color = new Float32Array([0.5, 0.3, 0.5])
  self.fading = 0.0
  self.ambientStrength = 1.0

  self.update = function() {
    SampleGenerator.update()
  }
})()
