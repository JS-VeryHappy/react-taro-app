declare type OptionsType = {
  /**
   * 显示内容
   */
  label: string;
  /**
   * 值
   */
  value: string | number;
};

declare type FieldPropsType = {
  /**
   * 显示的placeholder
   */
  placeholder?: string;
  /**
   * maxLength
   */
  maxLength?: string;
  /**
   * 需要传递的选择数据
   */
  options?: OptionsType[];
};

declare type RuleType = 'string' | 'number';

declare type RulesType = {
  /**
   * 是否必须会显示*
   */
  required?: boolean;
  /**
   * 错误的提示信息
   */
  message?: string;
  /**
   * 验证规则的类型
   */
  type?: RuleType;
  /**
   * 自定义规则
   */
  validator?: (
    rule: any,
    value: any,
    callback: (error?: string) => void,
  ) => Promise<void | any> | void;
};

declare type FormItemPropsType = {
  rules: RulesType[];
};

declare type ValueType = 'text' | 'select';

export declare type ColumnsType = {
  /**
   * 字段限制名称
   */
  title?: string;
  /**
   * 字段key
   */
  dataIndex?: string;
  /**
   * 能够使用的表单类型
   * @default text
   */
  ValueType?: ValueType;
  /**
   * 传递给子组件的Props
   */
  fieldProps?: FieldPropsType;
  /**
   * 传递给Item的Props
   */
  formItemProps?: FormItemPropsType;
};

export declare type FormCustomType = {
  /**
   * 显示的字段列表
   */
  columns?: ColumnsType[];
  /**
   * 点击完成
   */
  onFinish?: (value: any) => Promise<void | any> | void;
};
