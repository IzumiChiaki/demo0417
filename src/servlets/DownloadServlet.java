package servlets;

import utils.UploadUtil;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;

/**
 * @author Chiaki
 */
@WebServlet(name = "DownloadServlet",value = "/downloadFiles")
public class DownloadServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        //获取源文件带UUID
        String  filename = request.getParameter("filename");
        //获取下载路径
        String realPath = request.getServletContext().getRealPath("uploadFiles");
        //获取带UUID的_的下标
        int index = filename.indexOf("_");
        //截取源文件名称
        String realName = filename.substring(index + 1);
        //告诉浏览器如何处理流 作为文件保存
        response.setHeader("content-disposition","attachment;filename="+ URLEncoder.encode(realName,"utf-8"));
        //根据路径和文件名称读取文件
        FileInputStream fileInputStream = new FileInputStream(UploadUtil.createRealFilePath(realPath,filename));
        ServletOutputStream outputStream = response.getOutputStream();
        byte[] bytes = new byte[1024*1024*100];
        int len = 0;
        while ((len=fileInputStream.read(bytes))!=-1) {
            outputStream.write(bytes,0,len);
            outputStream.flush();
        }
        outputStream.close();
        fileInputStream.close();
    }
}
