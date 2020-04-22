package utils;

import java.io.File;
import java.util.HashMap;
import java.util.UUID;

/**
 * @author Chiaki
 */
public class UploadUtil {

    public static String createFileName(String fileName) {
        return UUID.randomUUID().toString() + "_" + fileName;
    }

    public static String createRealFilePath(String basePath, String fileName) {
        String upPath = basePath + File.separator;
        File uploadFolder = new File(upPath);
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }
        String realFilePath = upPath + fileName;

        return realFilePath;
    }

    public static String getViewPath(String basePath, String fileName) {
        String viewPath = basePath +'/' +fileName;
        return viewPath;
    }


    public static void getFileList(String path, HashMap<String,String> filenames) {
        //路径当成文件对象
        File file = new File(path);
        //获取目录（upload）下所有内容 包括文件和文件夹
        File[] files = file.listFiles();
        if (files!=null) {
            for (File file1 :files) {
                //如果是文件夹 递归遍历
                if (file1.isDirectory()) {
                    getFileList(file1.getPath(), filenames);
                }else {
                    String name = file1.getName();
                    //拿到UUID和源文件名词拼接的_的下标
                    int index = name.indexOf("_");
                    //截取
                    String filename = name.substring(index+1);
                    //把需要的存放在集合里
                    filenames.put(name,filename);
                }
            }
        }
    }

}