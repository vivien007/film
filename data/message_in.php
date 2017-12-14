<?php
header('Content-Type: text/plain;charset=utf-8');
$user_name=$_REQUEST['user_name'];
$user_head=$_REQUEST['user_head'];
$message_time=$_REQUEST['message_time'];
$message=$_REQUEST['message'];
$conn=mysqli_connect('127.0.0.1','root','','juicy',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="INSERT INTO juicy_messages VALUES(NULL,'《不能先说我爱你》','$user_name','$user_head','$message_time','$message')";
$result=mysqli_query($conn,$sql);
if($result){
	echo mysqli_insert_id($conn);
}else{
	echo "ERR:$sql";
}
?>