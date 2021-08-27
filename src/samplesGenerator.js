const SampleGenerator = new (function () {
  self = this;

  self.samples = null;
  self.normals = null;

  let minX, maxX, minY, maxY;
  let range_x, range_y, old_range_x, old_range_y;
  let input_expr = "",
    old_input_expr = "";
  let samples_step, old_sample_step;
  let x_samples = [];
  let y_samples = [];

  const _updateRanges = function () {
    range_x = document.getElementById("rangeX").value * 10;
    range_y = document.getElementById("rangeY").value * 10;
  };

  const _updateEqn = function () {
    input_expr = document.getElementById("function").value;
  };

  const _updateResolution = function () {
    samples_step = (1 - document.getElementById("resolution_scale").value) / 20;
  };

  const _generateXYSamples = function () {
    old_range_x = range_x;
    old_sample_step = samples_step;

    minX = -range_x;
    maxX = range_x;
    minY = -range_y;
    maxY = range_y;

    for (
      let x = minX, y = minY;
      x <= maxX, y <= maxY;
      x += samples_step, y += samples_step
    ) {
      x_samples.push(x);
      y_samples.push(y);
    }
  };

  // Generates normal vector using 3 vertices
  const _generateNormal = function (v1, v2, v3) {
    let normal = vec3.create();
    let v12 = vec3.create();
    let v13 = vec3.create();

    vec3.cross(normal, vec3.subtract(v12, v1, v2), vec3.subtract(v13, v1, v3));
    vec3.normalize(normal, normal);

    return Array(...normal);
  };

  const _zipWithZSamples = function () {
    if (!input_expr) return;

    let v1 = [],
      v2 = [],
      v3 = [];
    const zippedZ = [];
    const zippedNormals = [];
    const evaluateZ = () => {
      return math.evaluate(input_expr, { x, y });
    };
    old_input_expr = input_expr;
    old_sample_step = samples_step;

    for (x of x_samples) {
      for (y of y_samples) {
        // create vertices of a triangle
        v1 = [x, y, evaluateZ()];
        x++;
        v2 = [x, y, evaluateZ()];
        y++;
        v3 = [x, y, evaluateZ()];

        zippedZ.push(...v1, ...v2, ...v3);
        for (let i = 0; i < 3; ++i)
          zippedNormals.push(
            ..._generateNormal(
              vec3.fromValues(...v1),
              vec3.fromValues(...v2),
              vec3.fromValues(...v3)
            )
          );

        v1 = [x, y, evaluateZ()];
        x--;
        v2 = [x, y, evaluateZ()];
        y--;
        v3 = [x, y, evaluateZ()];

        zippedZ.push(...v1, ...v2, ...v3);
        for (let i = 0; i < 3; ++i)
          zippedNormals.push(
            ..._generateNormal(
              vec3.fromValues(...v1),
              vec3.fromValues(...v2),
              vec3.fromValues(...v3)
            )
          );

        
      }
    }
    console.log("Samples: ", zippedZ.length);
    self.samples = zippedZ;
    self.normals = zippedNormals;
  };

  self.update = function () {
    _updateEqn();
    _updateRanges();
    _updateResolution();

    _generateXYSamples();
    _zipWithZSamples();
  };
  self.update();
})();
