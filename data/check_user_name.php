<?php
header('Content-Type: application/json;charset=utf-8');
$user_name=$_REQUEST['user_name'];
$conn=mysqli_connect('127.0.0.1','root','','vfilm',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="SELECT * FROM vfilm_users WHERE user_name='$user_name'";
$result = mysqli_query($conn,$sql);
// 查看查询结果(抓取一次即可)，如果有记录，就向客户端输出用户名已存在
//查询语句执行失败：返回FALSE
//查询语句执行成功：返回结果集
$output=[];
if($result){
	$row = mysqli_fetch_assoc($result);
	//var_dump($row);
	if($row===null){
		$output['msg']="该用户名可以使用";
	}else{
		$output['msg']="用户名已存在";
	}
}else {
	echo "ERR: $sql";
}
echo json_encode($output);