jQuery(function($){
    //调用函数加载留言列表
    loadMessageList();
    var loginUserName = null;
    var user_header=$('.user_header');
    var user_name=$('.user_name');
    var now=new Date();
    var year=now.getFullYear();
    var month=parseInt(now.getMonth())+1;
    month=(month<10?("0"+month):month);
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var message_time=year+"-"+month+"-"+date+" "+hour+":" +minute;
    // 异步获得头部、侧边栏和底部
    $('#header').load('data/header.php',function(){
        //console.log(value);
        updateUserInfo();
    });
    $('#footer').load('data/footer.php');
    $('.aside').load('data/aside.php');
    //加载留言列表的函数
    function loadMessageList(){
        $.getJSON('data/message_read.php',function(data){
            $('.message_list').empty();
			data.reverse();
			for(var i=0; i<data.length; i++){
                var record=data[i];
                var html=`
                <li>
                    <ul class="lf">
                        <li>
                            <img  class="user_header" src="images/user_head/${record.user_head}">
                        </li>
                        <li class="user_name">${record.user_name}</li>
                    </ul>
                    <div class="message_content">
                        <p>${record.message}</p>
                        <p class="message_time">${record.message_time}</p>
                        <i class="dian_zan"></i>
                        <i class="dian_zan_down"></i>
                    </div>
                </li>
                `;
                $('.message_list').append(html);
            }
        })
    }
    //为登录绑定函数
    $('#header').on('click','#my_login',function(e){
        e.preventDefault();
        $('.modal').css("display","block");
    });
    //为登录按钮绑定函数
    $('#l_login_in').click(function(){
        //表单序列化
        var requestData = $('#login-form').serialize();
        //console.log(requestData);
        //使用异步请求$.post  $.ajax
        $.post('data/login.php',requestData,function(data,msg,xhr){
            console.log('正在请求……');
            console.log(data);
            if(data.msg!=='succ'){  //登录失败
                $('.logerror').css("display","block");
            }else{  //登录成功
                loginUserName = $('[name="user_name"]').val();
                $('.modal').fadeOut();
                //把用户名和用户头像存入sessionStorage
                var key=data.user_id;
                var loginImage=data.user_head;
                var value=loginUserName+","+loginImage;
                window.sessionStorage.setItem(key,value);
                updateUserInfo();
            }
        });
    });
    //修改用户名，头像以及评论区用户名的函数
    function updateUserInfo(){
        for(var i=0;i<window.sessionStorage.length;i++) {
            //在遍历过程中，得到每一条存储的数据,sessionStorage提供 key(index) 得到对应数据的 key 值
            var key = window.sessionStorage.key(i);
            // sessionStorage提供的 getItem(key) 得到对应的value值
            var value = window.sessionStorage.getItem(key);
        }
        if(value){
            var arr=[];
            arr=value.split(',');
            var html=`
            <span>${arr[0]}</span>
            <a href="#" id="quit">[退出]</a>
            `;
            $('#user_in').html('');
            $('#user_in').append(html);
            $('.user_head')[0].src="images/user_head/"+arr[1];
            //评论模块用户名和用户头像修改
            user_name.html( arr[0]);
            user_header.attr("src",$('.user_head')[0].src);
            //为发表评论按钮绑定监听事件
            $('#message_submit').on('click',function(){
                var message=$('#message').val();
                if(message===""){
                    $('.message_alert').css('display','block');
                }else{
                    $('.message_alert').css('display','none');
                    $.post('data/message_in.php',{user_name:arr[0],user_head:arr[1],message_time:message_time,message:message},function(){
                        console.log(message);
                        loadMessageList();
                    });
                    $('#message').val('');
                    $('.message_alert').css('display','none');
                }
            });
        }
    }
    //为退出绑定函数
    $('#header').on('click','#quit',function(e){
        e.preventDefault();
        window.sessionStorage.clear();
        $('#user_in').html('');
        var html=`
        <a href="#" id="my_login">登录</a> |
        <a href="register.html" target="_blank" id="my_register">注册</a>
    `;
        $('#user_in').append(html);
        $('.user_head')[0].src="images/user_head/user_head.png";
        user_name.html('');
        user_header.attr("src",$('.user_head')[0].src);
    });
    //进入留言框时
    $('#message').focus(function(){
        //如果已登录，就判断留言框是否为空，如果没有登录，跳出登陆框;
        console.log(user_name.html());
        $('.message_alert').css('display','none');
        if(user_name.html()==""){
            $('.modal').css("display","block");
        }
    });
    //点赞按钮和喝彩按钮
    $('.message_list').on('click','.dian_zan',function(){
       $(this).addClass('active');
    });
    $('.message_list').on('click','.dian_zan_down',function(){
        $(this).addClass('active');
    });
});