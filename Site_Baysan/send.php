<?php
$getQuery = array(
    "chat_id"  => '-1001982371484',
    "text"   => $message,
    "parse_mode" => "html"
);
$message = "Имя: ".$_POST['name']."\r\n";
$message .= "E-mail: ".$_POST['email']."\r\n";
$message .= "Phone: ".$_POST['phone']."\r\n";
$ch = curl_init("t.me/testnew9819839bot". $token ."/sendMessage?" . http_build_query($getQuery));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
$resultQuery = curl_exec($ch);
curl_close($ch);
echo $resultQuery;
?>