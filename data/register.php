<?php
header('Content-Type: text/plain;charset=utf-8');
$user_name=$_REQUEST['user_name'];
$user_pwd=$_REQUEST['user_pwd'];
$user_email=$_REQUEST['user_email'];
$conn=mysqli_connect('127.0.0.1','root','','juicy',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="INSERT INTO juicy_users VALUES(NULL,'$user_name','$user_pwd','$user_email')";
$result=mysqli_query($conn,$sql);
if($result){
	echo mysqli_insert_id($conn);
}else{
	echo "ERR:$sql";
}