/**
 * 分页查询模型
 * @interface QueryPageModel
 * @description 用于分页查询的模型接口
 * @author coder-murphy
 * @date 2026-04-16
 */
export interface QueryPageModel{
    /** 当前页码 */
    pageNum? : number;

    /** 每页记录数 */
    pageSize? : number;

    /** 总记录数 */
    total? : number;

    /** 总页数 */
    pageCount? : number;
}