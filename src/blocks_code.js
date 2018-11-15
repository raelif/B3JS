Blockly.JavaScript['initialization'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code =
  // Scene - Context
		"var scene = new THREE.Scene();\n"+
		"var context = webglCanvas.getContext( 'webgl2' );\n"+

		// Camera
		"var camera = new THREE.PerspectiveCamera( 75, webglCanvas.offsetWidth/webglCanvas.offsetHeight, 0.1, 1000 );\n"+

		// Renderer
		"var renderer = new THREE.WebGLRenderer( { canvas: webglCanvas, context: context } );\n"+
		"renderer.setSize( webglCanvas.offsetWidth, webglCanvas.offsetHeight );\n"+

		// Cube = Geometry + Material
		"var geometry = new THREE.BoxGeometry( 1, 1, 1 );\n"+
		"var material = new THREE.MeshBasicMaterial( { color: 0xB30033 } );\n"+
		"var cube = new THREE.Mesh( geometry, material );\n"+
		"scene.add( cube );\n"+

		"camera.position.z = 5;\n"+

		"var animate = function () {\n"+
		"	requestAnimationFrame( animate );\n"+

		"	cube.rotation.x += 0.01;\n"+
		"	cube.rotation.y += 0.01;\n"+

		"	renderer.render( scene, camera );\n"+
		"};\n"+
		"animate();\n";
  return code;
};
