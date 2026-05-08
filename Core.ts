import { LoginInfo } from "./Authentication/LoginInfo";
import { HttpResult } from "./Http/HttpResult";
import { safeLocalStorage } from "./Http/SafeLocalStorage";

/**
 * 核心服务
 * @file Core.ts
 * @description 定义核心服务类，用于处理用户登录和权限验证等通用操作
 * @author coder-murphy
 * @date 2026-04-16
 */
export class Core {

    /**
     * 获取当前用户信息
     * @description 从安全的 localStorage 中获取当前用户信息，解析为 UserModel 对象返回
     * @returns 当前用户信息，如果未登录则返回 null
     */
    static getCurrentUser(): LoginInfo | null {
        return this.currentUser;
    }

    /**
     * 设置当前用户信息
     * @description 将用户信息保存到安全的 localStorage 中，并更新 currentUser 变量
     * @param user 要设置的用户信息，如果为 null 则表示用户已退出登录
     */
    static setCurrentUser(user: LoginInfo | null) {
        this.currentUser = user;
    }

    /**
     * 获取用户无效结果
     * @description 检查当前用户信息是否有效，如果无效则返回一个表示用户未登录的 ResultModel 对象，否则返回 null
     * @returns 
     */
    static getUserInvalidResult(): HttpResult | null {
        var user = this.getCurrentUser();
        if (!user) {
            this.restoreUserFromStorage();
            user = this.getCurrentUser();
        }
        if (!user) {
            return {
                isSuccess: false,
                code: 401,
                message: '用户未登录'
            };
        }
        if (!user.token) {
            return {
                isSuccess: false,
                code: 401,
                message: '用户信息无效'
            }; // 用户信息中没有 token，表示无效
        }
        return null;
    }

    /**
     * 从存储中恢复用户信息
     * @description 从安全的 localStorage 中获取用户信息并设置到 currentUser 变量中，确保页面刷新后用户信息仍然可用
     * @returns 无返回值
     */
    static restoreUserFromStorage() {
        const userJson = safeLocalStorage.getItem('user');
        if (userJson) {
            try {
                const user = JSON.parse(userJson) as LoginInfo;
                this.setCurrentUser(user);
            } catch (e) {
                console.warn('解析用户信息失败:', e);
                this.setCurrentUser(null);
            }
        }
    }
    
    /**
     * 检查用户是否有指定权限
     * @param permission 要检查的权限字符串
     * @returns 如果用户有指定权限，则返回 true，否则返回 false
     */
    static hasPermission(permission: string){
        var invalidRes = this.getUserInvalidResult();
        if(invalidRes){
            return false;
        }
        var user = this.getCurrentUser();
        if(!user){

            return false;
        }
        return user.permissions.some(x => x.toLowerCase() == permission.toLowerCase());
    }

    private static currentUser: LoginInfo | null = null; // 当前用户信息，初始为 null
}