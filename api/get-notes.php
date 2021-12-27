<?php
    require_once 'db.php';
    $conn = openMySQLConnection();

    $sql = "SELECT `key`, `title`, `noteDescription`, `noteDateTime` FROM `notes` ORDER BY `id` DESC;
";
    $result = $conn->query($sql);
    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    } else {
        echo "0 results";
    }
    echo json_encode(array('code' => 0, 'message' => 'Load success', 'data' => $data));;


?>
