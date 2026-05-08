/**
 * 安全的 localStorage 访问封装，防止被跟踪防护阻止导致的错误
 * 使用 safeLocal
 * Storage.setItem('key', 'value') 和 safeLocalStorage.getItem('key') 来访问 localStorage
 * 如果 localStorage 被阻止，setItem 会返回 false，getItem 会返回 null，并在控制台警告
 * 这样可以避免因 localStorage 访问被阻止而导致的 uncaught error，提升用户体验
 * 注意：这个封装只是为了安全访问 localStorage，如果需要更复杂的功能（如过期时间、命名空间等），建议使用成熟的库，如 localForage 或 store.js
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#privacy_and_security_considerations
 * @author coder-murphy
 * @date 2026-04-16
 */
export const safeLocalStorage = {
  /**
   * 安全地设置 localStorage 项
   * @param key 
   * @param value 
   * @returns 是否成功设置
   */
  setItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn('localStorage 被跟踪防护阻止:', e);
      return false;
    }
  },
  /**
   * 安全地获取 localStorage 项
   * @param key 
   * @returns 
   */
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage 读取被阻止:', e);
      return null;
    }
  },
  /**
   * 安全地删除 localStorage 项
   * @param key 
   * @returns 是否成功删除
   */
  removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn('localStorage 删除被阻止:', e);
      return false;
    }
  },
  /**
   * 安全地清除所有 localStorage 项
   * @returns 是否成功清除
   */
  clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.warn('localStorage 清除被阻止:', e);
      return false;
    }
  }
};

/**
 * 安全获取 token，不会报错，如果 localStorage 被阻止会返回空字符串
 * @returns 
 */
export function getToken(): string {
  try {
    return safeLocalStorage.getItem('token') || ''
  } catch (e) {
    console.warn('存储被拦截，无法获取token', e)
    return '' // 不抛异常，避免页面崩溃
  }
}

/**
 * 安全存储 token
 * @param token 
 */
export function setToken(token: string) {
  try {
    safeLocalStorage.setItem('token', token)
  } catch (e) {}
}

/**
 * 安全删除 token
 * @returns 
 */
export function removeToken() {
  try {
    safeLocalStorage.removeItem('token')
  } catch (e) {}
}