jQuery(function($){//防止其他封装影响$;
    // 异步加载头部和底部
    $(function(){
        $('#header').load('data/header.php');
        $('#footer').load('data/footer.php');
    });
    //封装一个函数-用于元素的获取焦点和失去焦点事件
    function formValidity(elem,elemTip,text){
        console.log(user_name);
        elem.onfocus=function(){
            elemTip.style.display="block";
            elemTip.innerHTML=text.default;
        }
        elem.onblur=function(){
            if(elem.validity.valid){
                elemTip.style.display="none";
                //console.log(elemTip.nextElementSibling.lastElementChild);
                elemTip.nextElementSibling.lastElementChild.style.display="inline-block";
                if(elem.id=="l_login_name"){
                    $.post("data/check_user_name.php",{'user_name':elem.value},function(data){
                        console.log(data);
                        if(data.msg=="用户名已存在"){
                            elemTip.style.display="block";
                            elemTip.nextElementSibling.lastElementChild.style.display="none";
                            elemTip.innerHTML="用户名已存在";
                        }
                    });
                }
            }else if(elem.validity.valueMissing){
                elemTip.style.display="block";
                elemTip.innerHTML=text.error+"不能为空";
                elemTip.nextElementSibling.lastElementChild.style.display="none";
            }else if(elem.validity.patternMismatch){
                elemTip.style.display="block";
                elemTip.innerHTML=text.error+"输入有误";
                elemTip.nextElementSibling.lastElementChild.style.display="none";
            }
        }
    }
    var email=$('#l_login_email')[0];
    var emailTip=$('.emailTip')[0];
    var username=$('#l_login_name')[0];
    var usernameTip=$('.usernameTip')[0];
    var password=$('#l_password')[0];
    var passwordTip=$('.passwordTip')[0];
    formValidity(email,emailTip,{
        "default":"请输入您的邮箱地址",
        "error":"邮箱地址"
    });
    formValidity(username,usernameTip,{
        "default":"请输入3-10位的英文或数字",
        "error":"用户名"
    });
    formValidity(password,passwordTip,{
        "default":"请输入登录密码(6-12位数字、字母或字符的组合)",
        "error":"密码"
    });
    //判断两遍密码输入是否一致
    var repassword=$('#l_repassword')[0];
    var repasswordTip=$('.repasswordTip')[0];
    repassword.onfocus=function(){
        repasswordTip.style.display="block";
        repasswordTip.innerHTML="请再输入一遍登录密码";
    }
    repassword.onblur=function(){
        if((repassword.value==password.value)&&(repassword.value)){
            //console.log(repassword.value);
            repasswordTip.style.display="none";
            repasswordTip.nextElementSibling.lastElementChild.style.display="inline-block";
        }else{
            repasswordTip.style.display="block";
            repasswordTip.innerHTML="两遍密码输入不一致";
            repasswordTip.nextElementSibling.lastElementChild.style.display="none";
        }
    }
    //为注册按钮绑定点击事件，异步提交表单
    var user_name=username.value;
    $('#l_register_in').click(function(){
        var requestData = $('#login-form').serialize();
        var b1=$('.b1').css('display').length;
        var b2=$('.b2').css('display').length;
        var b3=$('.b3').css('display').length;
        var b4=$('.b4').css('display').length;
        var n=b1+b2+b3+b4;
        if(n===48){
            console.log("注册成功……")

          $.post('data/register.php',requestData,function(){
              $('.logincont').css("display","none");
              $('.success').css("display","block");
              setTimeout(function(){
                   location.href="index.html";
              },2000);
          });
        }
    });
});

