<?php
$target_dir = 'resources/uploads/';
$target_file = $target_dir . basename($_FILES['uploadedModel']['name']);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if file already exists
if (file_exists($target_file)) {
	echo 'Sorry, file already exists.';
	$uploadOk = 0;
}

// Check file size
if ($_FILES['uploadedModel']['size'] > 500000) {
	echo 'Sorry, your file is too large.';
	$uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != 'obj' && $imageFileType != 'mtl' && $imageFileType != 'gltf'
&& $imageFileType != 'dae' ) {
	echo 'Sorry, only OBJ, MTL, glTF & DAE files are allowed.';
	$uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
	echo 'Sorry, your file was not uploaded.';
// if everything is ok, try to upload file
}
else {
	if (move_uploaded_file($_FILES['uploadedModel']['tmp_name'], $target_file)) {
		echo 'The file '. basename( $_FILES['uploadedModel']['name']). ' has been uploaded.';
	}
	else {
		echo 'Sorry, there was an error uploading your file.';
	}
}
?>
