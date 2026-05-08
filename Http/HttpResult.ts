import type { QueryPageModel } from "../QueryPageModel";

/**
 * 通用结果模型接口
 * @interface HttpResult
 * @description 定义通用结果模型接口
 * @author coder-murphy
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

/**
 * 分页查询结果模型
 * @interface QueryPageResultModel
 * @description 用于分页查询结果的模型接口
 * @author coder-murphy
 * @date 2026-04-16
 */
export interface QueryPageResultModel<T> extends HttpResult{

    /** 查询结果列表 */
    dataList : T[];

    /** 分页信息 */
    pageInfo : QueryPageModel;
}