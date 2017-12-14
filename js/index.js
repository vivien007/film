judgeUser_in();
var loginUserName = null;
/**1 header中登录绑定**/
$('#header').on('click','#my_login',function(e){
    e.preventDefault();
    $('.modal').css("display","block");
});
/**2 为登录按钮绑定事件**/
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
            judgeUser_in();
        }
    });
});
//修改用户名和登录头像
function judgeUser_in(){
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
        console.log( $('.user_head'));
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
});
/**电影部分排序为登录按钮绑定事件**/
//方法1 直接排序，用appendchild 方法2 把li排序后用clone分别放在ul2和ul3中，toggle显示ul1，ul2，ul3
//封装一个函数，点击可切换样式
function toggleClass(elem){
    elem.addClass("hover").siblings().removeClass("hover");
}
//封装一个函数，把li加入到ul中去
function append_li(){
    for(var i=0;i<lis2.length;i++){
        ul.appendChild(lis2[i]);
    }
}
var ul=$('#main_content')[0];
//定义lis数组，将所有的li都放入
var lis=$('.panel');
var lis1=[];
for(var i=0;i<lis.length;i++){
    lis1.push(lis[i]);
}
//定义一个和lis类型相同的数组lis2，对lis2进行排序;
var lis2=[];
for(var j=0;j<lis1.length;j++){
    lis2.push(lis1[j]);
}
//按评分排序
$('.hot').on('click',function(){
    toggleClass($('.hot'));
    lis2.sort(function(a,b){
       return b.children[1].children[0].children[1].innerHTML- a.children[1].children[0].children[1].innerHTML;
    });
    //console.log(lis);
    append_li();
});
//按时间排序
$('.new_rec').on('click',function(){
    toggleClass($('.new_rec'));
    lis2.sort(function(a,b){
        //console.log((a.lastElementChild.lastElementChild.lastElementChild.innerHTML).replace(/-/g,""));
        return b.lastElementChild.lastElementChild.lastElementChild.innerHTML.replace(/-/g,"")- a.lastElementChild.lastElementChild.lastElementChild.innerHTML.replace(/-/g,"");
    });
    append_li();

});
//随便看看
$('.see_random').on('click',function(){
    toggleClass($('.see_random'));
    for(var i=0;i<lis.length;i++){
        ul.appendChild(lis[i]);
    }
});