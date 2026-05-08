import { Core } from "../Core";
import type { HttpResult, QueryPageResultModel } from "./HttpResult";
import { QueryPageModel } from "../QueryPageModel";
import { RetrospectModel } from "../CommonModel";
import service from "./Request";
import { Constants } from "../Constants";

/**
 * API包装器类
 * @description API包装器类，用于简化API调用
 * @author coder-murphy
 * @date 2026年4月23日
 * @template T 实体类型
 * @version 1.0
 */
export class ApiWarpper<T extends RetrospectModel> {
    constructor(entityName: string) {
        this._entityName = entityName;
    }

    /**
     * 获取列表
     * @param pageNum 当前页码
     * @param pageSize 每页记录数
     * @returns 分页查询结果
     */
     async getList(pageNum: number, pageSize: number): Promise<QueryPageResultModel<T>> {
        const query: QueryPageModel = {
            pageNum: pageNum,
            pageSize: pageSize,
        };
        return await service.get(`/api/${this._entityName}/query`, { params: query });
    }

    /**
     * 添加实体
     * @param entity 需要添加的实体
     * @returns 添加结果
     */
    async add(entity: T): Promise<HttpResult> {
        let errRes = Core.getUserInvalidResult();
        if (errRes) {
            return errRes;
        }
        let currentUser = Core.getCurrentUser();
        entity.createdBy = currentUser?.userId ?? 0;
        return await service.post(`/api/${this._entityName}/add`, entity, { headers: Constants.JsonHeaders });
    }

    /**
     * 更新实体
     * @param entity 需要更新的实体
     * @returns 更新结果
     */
    async update(entity: T): Promise<HttpResult> {
        let errRes = Core.getUserInvalidResult();
        if (errRes) {
            return errRes;
        }
        let currentUser = Core.getCurrentUser();
        entity.updatedBy = currentUser?.userId ?? 0;
        return await service.put(`/api/${this._entityName}/update`, entity, { headers: Constants.JsonHeaders });
    }

    /**
     * 删除实体
     * @param id 需要删除的实体ID
     * @returns 删除结果
     */
    async delete(id: number): Promise<HttpResult> {
        let errRes = Core.getUserInvalidResult();
        if (errRes) {
            return errRes;
        }
        let currentUser = Core.getCurrentUser();
        return await service.put(`/api/${this._entityName}/delete?id=${id}&userId=${currentUser?.userId ?? 0}`);
    }

    /**
     * 批量删除实体
     * @param ids 需要删除的实体ID数组
     * @returns 批量删除结果
     */
    async batchDelete(ids: number[]): Promise<HttpResult> {
        let errRes = Core.getUserInvalidResult();
        if (errRes) {
            return errRes;
        }
        let currentUser = Core.getCurrentUser();
        return await service.put(`/api/${this._entityName}/batchDelete`, {
            deleteList: ids,
            userId: currentUser?.userId ?? 0
        }, { headers: Constants.JsonHeaders });
    }

    private readonly _entityName: string;
}