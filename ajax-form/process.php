<?php
  header('Content-Type: application/json');
  $status = "";
  $message = "";
  if(!empty ($_POST) ){
    $status = "success";
    $message = "Your message is successfully send.";
    $response_data = $_POST;
  }else{
    $status = "failed";
    $message = "Your request is not valid. Please retry.";
    $response_data = $_POST;
  }
  $data = array(
    'status' => $status,
    'message' => $message,
    'data' => $response_data
  );
  echo json_encode($data);
?>