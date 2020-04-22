<%--
  Created by IntelliJ IDEA.
  User: Chiaki
  Date: 2020-04-18
  Time: 19:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
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
    <script src="pdfjs/build/pdf.js"></script>
    <script src="pdfjs/web/viewer.js" charset="UTF-8"></script>
    <script type="text/javascript" src="js/choose.js"></script>
    <script type="text/javascript" src="js/pager.js"></script>


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
        <div class="page_banner" style="background-image:url('images/page_banner3.jpg');"></div><div class="page_main"></div>
        <div class="page_main">
            <div class="page_con">
                <div class="pg_rt">
                    <div class="menu">
                        <div class="menu_tit"><h2>文件查阅</h2></div>
                        <ul>
                            <li class="active"><a href="<%=request.getContextPath()%>/fileLists">文件列表</a></li>
                            <li class=""><a href="upload.jsp">文件上传</a></li>
                        </ul>
                    </div>
                </div>
                <div class="pg_lf">
                    <div class="pg_lf_main">
                        <div class="pg_rt_tit">
                            <div class="Bread">
                                <a href="#">首页</a> / <a href="#">文件查阅</a> / <a href="<%=request.getContextPath()%>/fileLists">文件列表</a>
                            </div>
                            <h2>浏览文件列表</h2>
                        </div>
                        <div class="pg_rt_con">
                            <div class="news_list">
                                <table class="table4_7" id = "table">
                                    <thead>
                                    <tr>
                                        <th>文件名</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody id="group">
                                    <c:forEach items="${filenames}" var="acc">
                                        <tr>
                                            <td align="center">${acc.value}</td>
                                            <td align="center" style="width: 20%">
                                                <a href="<%=request.getContextPath()%>/viewFiles?filename=${acc.key}">预览</a>&nbsp;
                                                <a href="<%=request.getContextPath()%>/downloadFiles?filename=${acc.key}">下载</a>&nbsp;
                                                <a href="<%=request.getContextPath()%>/deleteFiles?filename=${acc.key}" onclick="return del();">删除</a>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                    </tbody>
                                </table>
                                <table>
                                    <tr>
                                        <td width="55px"></td>
                                        <td width="50px"><a href="#" onclick="page.firstPage();">首页</a></td>
                                        <td width="65px"><a href="#" onclick="page.prePage();">上一页</a></td>
                                        <td width="65px"><a href="#" onclick="page.nextPage();">下一页</a></td>
                                        <td width="100px"><a href="#" onclick="page.lastPage();">尾页</a></td>
                                        <td id="divFood" width="240px"></td>
                                        <td style="width: 20%" align="center"> 第<input id="pageno" value="" style="width:20px"/>页/<a href="#" onclick="page.aimPage();">跳转</a></td>
                                    </tr>
                                </table>
                            </div>
                            <iframe id="view" src = "<c:url value="pdfjs/web/viewer.html?file=${viewPath}"/>" style="width: 100%; height: 800px" disabled="none"></iframe>
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

<!--确认删除提示-->
<script>
    function del() {
        const result = confirm(" 确 定 删 除 ？ ");
        return result;
    }
</script>
<!-- 分页js -->
<script type="text/javascript" language="javascript">
    table1("group");
</script>
<script type="text/javascript" language="javascript">
    window.onload = function(){
        page = new Page(5,'table','group','pageBar'); };
</script>
