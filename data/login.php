<?php
/***
��֤�ͻ����ύ�ĵ�¼��Ϣ��������֤���ΪJSON��ʽ�����磺
��¼�ɹ�{"msg":"succ", "user_id": 1}
��¼ʧ��{"msg":"err", "reason":"�û������������"}
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