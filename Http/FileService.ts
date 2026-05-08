import type { HttpResult } from "./HttpResult";
import request from "./Request";
import { Core } from "../Core";

/** 
 * 文件服务类
 * @description 提供文件上传相关的业务逻辑方法
 * @author coder-murphy
 * @version 1.0
 * @date 2026.04.20
 */
export class FileService{
    /**
     * 上传文件
     * @param fileName 文件名
     * @returns 上传结果
     */
    static async uploadFile(file: File): Promise<HttpResult> {
        var errRes = Core.getUserInvalidResult();
        if (errRes) {
            return errRes;
        }
        const formData = new FormData();
        formData.append('file', file);
        return await request.post('/api/file/upload', formData);
    }

    /**
     * 下载文件
     * @param fileName 文件名
     * @returns 下载结果
     */
    static async downloadFile(fileName: string): Promise<HttpResult> {
        let errRes = Core.getUserInvalidResult();
        if (errRes) {
            return errRes;
        }
        let res: HttpResult;
        try {
            const downloadRes : Blob = await request.get('/api/file/download', {
                params: { fileName },
                responseType: 'blob',
            })
            // 下载
            const url = URL.createObjectURL(downloadRes);
            const a = document.createElement('a');
            a.href = url;
            var arr = fileName.split('/');
            var downFileName = arr[arr.length -1];
            if (!downFileName) {
                return {
                    isSuccess: false,
                    code: 500,
                    message: "文件名错误，下载失败"
                }
            }
            a.download = downFileName;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            res = {
                isSuccess: true,
                code: 200,
                message: "下载成功"
            }
        }
        catch(err){
            // 安全判断错误类型
            let msg  = '下载失败';
            if (err instanceof Error) {
                msg = err.message;
            }
            res = {
                isSuccess: false,
                code: 500,
                message: msg
            }
        }
        return res;
    }

    /**
     * 下载指定文件名文件
     * @param fileName 文件名
     * @param changedFileName 修改后的文件名
     * @returns 下载结果
     */
    static async downloadCustomFile(fileName: string,changedFileName : string): Promise<HttpResult> {
        let errRes = Core.getUserInvalidResult();
        if (errRes) {
            return errRes;
        }
        let res: HttpResult;
        try {
            const downloadRes : Blob = await request.get('/api/file/downloadCustom', {
                params: { fileName, changedFileName },
                responseType: 'blob',
            })
            // 下载
            const url = URL.createObjectURL(downloadRes);
            const a = document.createElement('a');
            a.href = url;
            a.download = changedFileName;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            res = {
                isSuccess: true,
                code: 200,
                message: "下载成功"
            }
        }
        catch(err){
            // 安全判断错误类型
            let msg  = '下载失败';
            if (err instanceof Error) {
                msg = err.message;
            }
            res = {
                isSuccess: false,
                code: 500,
                message: msg
            }
        }
        return res;
    }
}