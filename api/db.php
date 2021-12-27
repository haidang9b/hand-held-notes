<?php
    function openMySQLConnection(){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "mynotes";
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        return $conn;
    }


    function closeMySQLConnection($conn){
        $conn->close();
    }

?>
