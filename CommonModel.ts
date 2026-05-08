/**
 * 模型基础接口
 * @interface ModelBase
 * @description 定义模型基础接口，包含所有模型共有的属性
 * @author coder-murphy
 * @date 2026-04-16
 */
export interface ModelBase {
    /**
     * 唯一标识
     */
    id: number;

    /**
     * 是否被选择
     * @description 仅用于前端展示，后端不处理
     * @default false
     */
    isSelected?: boolean;
}

/**
 * 通用数据追溯模型接口
 * @description 定义通用数据追溯模型接口
 * @author coder-murphy
 * @date 2026-04-16
 */
export interface RetrospectModel extends ModelBase {
    /** 创建时间 */
    createdAt? : Date;

    /** 创建者id */
    createdBy? : number;

    /** 更新时间 */
    updatedAt? : Date;

    /** 更新者id */
    updatedBy? : number;

    /** 删除时间 */
    deletedAt? : Date;

    /** 删除者id */
    deletedBy? : number;

    /** 备注 */
    remarks? : string;
}