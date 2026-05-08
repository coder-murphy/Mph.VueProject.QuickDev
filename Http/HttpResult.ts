/**
 * 通用结果模型接口
 * @interface ResultModel
 * @description 定义通用结果模型接口
 * @author wangyongjie
 * @date 2026-04-16
 */
export interface HttpResult{
    /** 是否成功 */
    isSuccess : boolean;

    /** 响应消息 */
    message? : string;

    /** 响应状态码 */
    code : number;

    /** 响应数据 */
    data? : any;
}
