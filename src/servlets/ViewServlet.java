package servlets;

import utils.UploadUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;


/**
 * @author Chiaki
 */
@WebServlet(name = "ViewServlet",value = "/viewFiles")
public class ViewServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //获得下载目录路径
        String realPath = request.getServletContext().getRealPath("uploadFiles");
        //Map集合 键值对：UUID-原文件名
        HashMap<String, String> filenames = new HashMap<String,String>();
        //调用工具类方法将所有文件的名字和UUID封装在集合里
        UploadUtil.getFileList(realPath,filenames);
        //存放在作用域
        request.setAttribute("filenames",filenames);
        String  filename = request.getParameter("filename");
        //获取文件路径
        String basePath = "http://" +request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/uploadFiles";

        String viewPath = UploadUtil.getViewPath(basePath,filename);
        request.setAttribute("viewPath",viewPath);
        //转发
        request.getRequestDispatcher("view.jsp").forward(request,response);
        //重定向
        //response.sendRedirect("/viewFiles");
    }
}