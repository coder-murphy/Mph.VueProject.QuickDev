import type { ModelBase } from "./CommonModel";
import type { Ref } from "vue";

/**
 * 交互操作帮助类
 * @description 提供UI相关的帮助方法
 * @author coder-murphy
 * @version 1.0
 * @date 2026.04.20
 */
export class Interactvity {
    /**
     * 同步行数据到表格
     * @param tableRef 表格引用
     * @param items 行数据列表
     * @description 将行数据中的 isSelected 属性同步到表格的选择状态，确保表格显示与数据一致
     */
    static syncRowsToTable<T extends ModelBase>(tableRef: any, items: T[]) {
        items.forEach(row => {
            tableRef.value?.toggleRowSelection(row, row.isSelected)
        })
    }

    /**
     * 监听选择变化 → 自动同步 isSelected属性
     * @param tableData 
     * @param selectedItems 
     */
    static refreshSelectedRows<T extends ModelBase>(tableData: T[], selectedItems: T[]) {
        // 取消全选时，清除所有用户的 isSelected 状态
        if (selectedItems.length === 0) {
            tableData.forEach(user => user.isSelected = false);
        } else {
            // 更新被选中用户的 isSelected 状态
            tableData.forEach(user => {
                user.isSelected = selectedItems.some(selected => selected.id === user.id);
            });
        }
    }

    /**
     * 处理文件读取事件
     * @param e 文件读取事件
     * @returns 读取到的文件
     */
    static handleReadFile(e: Event) {
        const input = e.target as HTMLInputElement;
        if (!input.files) return;

        // ✅ 合法拿到本地真实 File 对象
        const file = input.files[0];
        return file;
    }

    /**
     * 清空表单数据
     * @param formRef 
     */
    static resetForm(formRef: Ref) {
        if (formRef.value) {
            formRef.value?.resetFields();
        }
    }
}