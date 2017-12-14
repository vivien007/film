<?php
/***
验证客户端提交的登录信息，返回验证结果为JSON格式，形如：
登录成功{"msg":"succ", "user_id": 1}
登录失败{"msg":"err", "reason":"用户名或密码错误"}
***/
header('Content-Type: application/json;charset=utf-8');

$user_name = $_REQUEST['user_name'];
$user_pwd = $_REQUEST['user_pwd'];

$conn = mysqli_connect('127.0.0.1','root','','vfilm',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM vfilm_users WHERE user_name='$user_name' AND user_pwd='$user_pwd'";
$result = mysqli_query($conn,$sql);

$output = [];
$row = mysqli_fetch_assoc($result);
if($row){
   $output['msg'] = 'succ';
   $output['user_id'] = $row['user_id'];
   $output['user_head']=$row['user_head'];
}else{
   $output['msg'] = 'err';
}
echo json_encode($output);