package utils;

import java.io.File;

public class DeleteUtil {
    public static boolean deleteFiles(String path) {
        File file = new File(path);
                if (!file.isFile()) {
            //System.out.println("删除失败，文件"+path+"不存在");
            return false;
        }
        file.delete();
        return true;
    }
}
