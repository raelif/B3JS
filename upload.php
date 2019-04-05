<?php
// Count # of uploaded files in array
$total = count($_FILES['uploadRes']['name']);
$target_dir = './resources/uploads/';

// Loop through each file
for($i=0; $i<$total; $i++) {
	//Get the temp file path
	$target_file = $target_dir . basename($_FILES['uploadRes']['name'][$i]);
	$uploadOk = 1;
	$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

	// Check if file already exists
	if (file_exists($target_file)) {
		echo "Sorry, file already exists.\n";
		$uploadOk = 0;
	}

	// Check file size
	if ($_FILES['uploadRes']['size'][$i] > 8000000) {
		echo "Sorry, your file is too large.\n";
		$uploadOk = 0;
	}

	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) {
		echo "Sorry, `" . basename( $_FILES['uploadRes']['name'][$i]) . "` was not uploaded.\n";
	// if everything is ok, try to upload file
	}
	else {
		if (move_uploaded_file($_FILES['uploadRes']['tmp_name'][$i], $target_file)) {
			echo "The file `" . basename($_FILES['uploadRes']['name'][$i]) . "` has been uploaded.\n";
		}
		else {
			echo "Sorry, there was an error uploading your file.\n";
		}
	}
}
?>
