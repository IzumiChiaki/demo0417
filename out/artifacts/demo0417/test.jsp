<%--
  Created by IntelliJ IDEA.
  User: Chiaki
  Date: 2020-04-21
  Time: 13:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">
    $(function(){
        $("#displayPdfIframe").attr("src",'<c:url value="pdfjs/web/viewer.html" />?file=/viewPDF.do');
    });
</script>
<div class="ctrlDiv">
    <div class="eleContainer elePaddingBtm">
        <iframe id="displayPdfIframe" width="100%" height="100%"></iframe>
    </div>
</div>
