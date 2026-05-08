/**
 * 登录信息模型
 * @interface LoginInfoModel
 * @description 定义登录信息模型接口
 * @author coder-murphy
 * @date 2026-04-16
 */
export interface LoginInfo {
    /**用户ID */
    userId: number;

    /**用户名 */
    userName: string;

    /**密码 */
    password: string;

    /**令牌 */
    token?: string;

    /**权限列表 */
    permissions: string[];
}