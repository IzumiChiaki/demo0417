package servlets;

import utils.DeleteUtil;
import utils.UploadUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Chiaki
 */
@WebServlet(name = "DeleteServlet",value = "/deleteFiles")
public class DeleteServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //拿到文件
        String  filename = request.getParameter("filename");
        //获取文件路径
        String realPath = request.getServletContext().getRealPath("uploadFiles");
        //获取带有文件名的路径
        String deletePath = UploadUtil.createRealFilePath(realPath,filename);
        DeleteUtil.deleteFiles(deletePath);
        response.sendRedirect("fileLists");
    }
}
