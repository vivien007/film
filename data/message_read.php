<?php
header('Content-Type: application/json;charset=utf-8');
$conn = mysqli_connect('127.0.0.1','root','','juicy',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM juicy_messages WHERE film_name='《不能先说我爱你》' ";
$result = mysqli_query($conn,$sql);
$messageList=[];//留言数组
while(($message=mysqli_fetch_assoc($result))!==null){
	$messageList[] = $message;
}
//把待输出的数据编码为JSON格式，执行输出
echo json_encode($messageList);
?>