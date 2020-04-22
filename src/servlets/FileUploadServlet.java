package servlets;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadBase;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import utils.UploadUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

/**
 * @author Chiaki
 */
@WebServlet(name = "FileUploadServlet",value = "/uploadFile")
public class FileUploadServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //设置文件上传基本路径
        String savePath = this.getServletContext().getRealPath("uploadFiles");
        //设置临时文件路径
        String tempPath = this.getServletContext().getRealPath("tempFiles");
        File tempFile = new File(tempPath);
        if (!tempFile.exists()) {
            tempFile.mkdir();
        }

        //定义异常消息
        String errorMessage = "";
        //创建file items工厂
        DiskFileItemFactory factory = new DiskFileItemFactory();
        //设置缓冲区大小
        factory.setSizeThreshold(1024 * 100);
        //设置临时文件路径
        factory.setRepository(tempFile);
        //创建文件上传处理器
        ServletFileUpload upload = new ServletFileUpload(factory);
        /**
         //监听文件上传进度
         ProgressListener progressListener = new ProgressListener() {
         public void update(long pBytesRead, long pContentLength, int pItems) {
         System.out.println("正在读取文件： " + pItems);
         if (pContentLength == -1) {
         System.out.println("已读取： " + pBytesRead + " 剩余0");
         } else {
         System.out.println("文件总大小：" + pContentLength + " 已读取：" + pBytesRead);
         }
         }
         };
         upload.setProgressListener(progressListener);
         */

        //解决上传文件名的中文乱码
        upload.setHeaderEncoding("UTF-8");
        //判断提交上来的数据是否是上传表单的数据
        if (!ServletFileUpload.isMultipartContent(request)) {
            //按照传统方式获取数据
            return;
        }

        //设置上传单个文件的大小的最大值
        upload.setFileSizeMax(1024 * 1024 * 100);
        //设置上传文件总量的最大值，最大值=同时上传的多个文件的大小的最大值的和
        upload.setSizeMax(1024 * 1024 * 1000);

        try {
            //使用ServletFileUpload解析器解析上传数据，解析结果返回的是一个List<FileItem>集合，每一个FileItem对应一个Form表单的输入项
            List<FileItem> items = upload.parseRequest(request);
            Iterator<FileItem> iterator = items.iterator();
            while (iterator.hasNext()) {
                FileItem item = iterator.next();

                //判断jsp提交过来的是不是文件
                if (item.isFormField()) {
                    errorMessage = "请提交文件！";
                    break;
                } else {
                    //文件名
                    String fileName = item.getName();
                    if (fileName == null || fileName.trim() == "") {
                        System.out.println("文件名为空！");
                    }
                    //处理不同浏览器提交的文件名带路径问题
                    fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
                    //文件扩展名
                    String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
                    //判断扩展名是否合法
                    if (!validExtension(fileExtension)) {
                        errorMessage = "上传文件非法！";
                        item.delete();
                        break;
                    }
                    //获得文件输入流
                    InputStream in = item.getInputStream();
                    //得到保存文件的名称
                    String saveFileName = UploadUtil.createFileName(fileName);
                    //得到文件保存路径
                    String realFilePath = UploadUtil.createRealFilePath(savePath, saveFileName);
                    //创建文件输出流
                    FileOutputStream out = new FileOutputStream(realFilePath);
                    //创建缓冲区
                    byte buffer[] = new byte[1024];
                    int len = 0;
                    while ((len = in.read(buffer)) > 0) {
                        //写文件
                        out.write(buffer, 0, len);
                    }
                    //关闭输入流
                    in.close();
                    //关闭输出流
                    out.close();
                    //删除临时文件 TODO
                    item.delete();
                    //保存成功
                    response.sendRedirect("fileLists");
                    //request.getRequestDispatcher("upload.jsp").forward(request, response);
                    //return;
                }

            }

        } catch (FileUploadBase.FileSizeLimitExceededException e) {
            e.printStackTrace();
            errorMessage ="单个文件超出最大值！！！";
        } catch (FileUploadBase.SizeLimitExceededException e) {
            e.printStackTrace();
            errorMessage ="上传文件的总的大小超出限制的最大值！！！";
        } catch (FileUploadException e) {
            e.printStackTrace();
            errorMessage ="文件上传失败！！！";
        }finally{
            if (!"".equals(errorMessage)) {
                request.setAttribute("errorMessage", errorMessage);
                request.getRequestDispatcher("upload.jsp").forward(request, response);
            }
        }
    }

    private boolean validExtension(String fileExtension) {
        String[] exts = {"pdf"};
        for (int i = 0; i < exts.length; i++) {
            if (fileExtension.equals(exts[i])) {
                return true;
            }

        }
        return false;
    }
}
