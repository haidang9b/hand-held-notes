<?php
	header('Content-Type: application/json; charset=utf-8');
	$input = json_decode(file_get_contents('php://input'));

	if ($_SERVER['REQUEST_METHOD'] != 'POST' &&
		$_SERVER['REQUEST_METHOD'] != 'PUT') {
		die(json_encode(array('code' => 4, 'message' => 'API này chỉ hỗ trợ POST hoặc PUT')));
	}

	if (is_null($input)) {
		die(json_encode(array('code' => 2, 'message' => 'Chỉ nhận dữ liệu đầu vào là JSON Object')));
	}

	if (!property_exists($input,'key') ||
		!property_exists($input,'title') ||
		!property_exists($input,'noteDescription')||
		!property_exists($input,'noteDateTime')) {
		die(json_encode(array('code' => 1, 'message' => 'Thiếu thông tin đầu vào')));
	}

	if (empty($input->key) || empty($input->title) || empty($input->noteDateTime)) {
		die(json_encode(array('code' => 1, 'message' => 'Thông tin đầu vào không hợp lệ')));
	}
	

	$sql = "UPDATE `notes` SET `title`= ?, `noteDescription`= ? , `noteDateTime`= ? WHERE `key` = ? ";

	require_once 'db.php';
	$conn = openMySQLConnection();
    $stm = $conn->prepare($sql);
    $key_edit = $input->key;
    $stm->bind_param('ssss', $input->title, $input->noteDescription, $input->noteDateTime,$input->key);
    if (!$stm->execute()) {
        die(json_encode(array('code' => 3, 'message' => $stm->error)));
    }
    $id = $input->key;
    die(json_encode(array('code' => 0, 'message' => 'Update thành công', 'data' => $id)));
?>