<%--
  Created by IntelliJ IDEA.
  User: Chiaki
  Date: 2020-04-17
  Time: 21:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="format-detection" content="telephone=no" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="renderer" content="webkit"/>
  <title>一致性查询平台</title>
  <link rel="stylesheet" href="css/base.css"/>
  <link rel="stylesheet" href="css/subcon.css"/>
  <link rel="stylesheet" href="css/index.css"/>
  <link rel="icon" type="image/x-icon" href="images/favicon.ico"/>
  <script src="js/jquery.min.js"></script>
  <script src="js/script.js"></script>
  <script type="text/javascript" src="js/choose.js"></script>


</head>
<body>
<!--header开始-->
<header class="header">
  <section class="top1">
    <div class="top1_w pr">
      <div class="mbtn"><img src="images/nav.jpg"/></div>
      <div class="top1_lf pa"></div>
    </div>
  </section>
  <div class="navm">
    <ul>
      <li class="sub_has"><a href="javascript:;">文件查阅<span><img src="images/snav_icon1.png"/></span></a>
        <dl>
          <dd><a href="<%=request.getContextPath()%>/fileLists">文件列表</a></dd>
          <dd><a href="upload.jsp">文件上传</a></dd>
        </dl>
      </li>
      <li><a href="#">内容对比</a></li>
      <li><a href="#">SB→AD</a></li>
      <li><a href="#">AD→SB</a></li>
    </ul>
  </div>
  <nav class="nav" id="nav">
    <ul>
      <li>
        <div><a href="#">文件查阅</a></div>
        <dl>
          <dd><a href="<%=request.getContextPath()%>/fileLists">文件列表</a></dd>
          <dd><a href="upload.jsp">文件上传</a></dd>
        </dl>
      </li>
      <li>
        <div><a href="#">内容对比</a></div>
      </li>
      <li>
        <div><a href="#">SB→AD</a></div>
      </li>
      <li>
        <div><a href="#">AD→SB</a></div>
      </li>
    </ul>
  </nav>
</header>
<!--header结束 -->
<div class="wraq_content">
  <div class="wraq_pg">
    <div class="page_banner" style="background-image:url('images/page_banner3.jpg');"></div>
    <div class="page_main">
      <div class="page_con">
        <div class="pg_rt">
          <div class="menu">
            <div class="menu_tit"><h2>文件查阅</h2></div>
            <ul>
              <li class=""><a href="<%=request.getContextPath()%>/fileLists">文件列表</a></li>
              <li class="active"><a href="upload.jsp">文件上传</a></li>
            </ul>
          </div>
        </div>
        <div class="pg_lf">
          <div class="pg_lf_main">
            <div class="pg_rt_tit">
              <div class="Bread">
                <a href="#">首页</a> / <a href="#">文件查阅</a> / <a href="upload.jsp">文件上传</a>
              </div>
              <h2>选择文件上传</h2>
            </div>
            <div class="pg_rt_con">
              <div class="news_list">
                <form method="post" style="font-size: 15px" enctype="multipart/form-data" action="<%=request.getContextPath()%>/uploadFile">
                  选择PDF文件: <input type="file" name="file">
                  <input type="submit" value="上传">
                </form>
                <c:if test="${not empty errorMessage}">
                  <a style="font-size: 15px;color: red" type="text" id="errorMessage"  disabled="disabled">${errorMessage}</a>
                </c:if>
                <c:if test="${not empty message}">
                  <a style="font-size: 15px;color: red" type="text" id="errorMessage"  disabled="disabled">${message}</a>
                </c:if>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>
<script type="text/javascript" src="js/jquery.flexslider-min.js"></script>

<!-- 焦点图切换JS -->
<script src="js/responsiveslides.min.js"></script>
<script type="text/javascript" src="js/content.js"></script>


<script type="text/javascript">
  Menu('.mbtn','.navm');
  nav();  //下拉菜单

  $(function () {
    $("#slider").responsiveSlides({
      auto: true,
      pager: false,
      timeout: 6000,
      nav: true,
      speed: 500,
      pager:true,
      // 对应外层div的class : slide_container
      namespace: "slide"
    });
  });
  FontSize2('.size','.art');
</script>

</body>

</html>

