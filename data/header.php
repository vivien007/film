<?php
header('Content-Type: text/html;charset=UTF-8');
?>
<!-- 顶部导航栏  -->
		<div id="top_box">
			<!-- logo -->
			<a href="#" class="logo">
				<img src="images/index/logo.jpg" alt="logo.png">
			</a>
			<!-- 当前城市 -->
			<div  id="city_container" class="lf">
				<div class="city_selected lf">
					<div class="city_name lf">南京</div>
					<span class="caret lf"></span>
				</div>
				<div class="city-list">

				</div>
			</div>
			<!-- 页面导航 -->
			<ul id="nav" class="lf">
				<li class="lf"><a href="index.html" target="_self">首页</a></li>
				<li class="lf"><a href="film_01.html">电影</a></li>
				<li class="lf"><a href="film_01.html">分类</a></li>
				<li class="lf"><a href="film_01.html">社区</a></li>
			</ul>
			<!-- 用户登录注册 -->
			<div id="user_info" class="rt">
				<img class="user_head" src="images/index/user_head.png" alt="user_head.png">
				<div id="user_in">
					<a href="film_01.html" id="my_login">登录</a> |
					<a href="register.html" target="_blank" id="my_register">注册</a>
				</div>
			</div>
			<!-- 搜索框 -->
			<form target="_self" class="rt">
				<input name="kw" class="search" type="search" maxlength="32" placeholder="输入电影名字">
				<input class="submit" type="submit" value="">
			</form>
		</div>
