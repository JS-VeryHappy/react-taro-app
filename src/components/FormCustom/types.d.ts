export declare type OptionsType = {
  /**
   * 显示内容
   */
  label: string;
  /**
   * 值
   */
  value: string | number;
  /**
   * 值禁用
   */
  disabled?: boolean;
};

declare type FieldPropsType = {
  /**
   * 显示的placeholder
   */
  placeholder?: string;
  /**
   * maxlength
   */
  maxlength?: number;
  /**
   * 需要传递的选择数据
   */
  options?: OptionsType[];
  /**
   * 是否是多列
   * @default false
   */
  multiple?: boolean;
  /**
   * 多选最大选择数量
   * @default 3
   */
  multipleLength?: number;
  /**
   * 密码模式
   */
  password?: boolean;
  /**
   * 组件类型 input| number，digit等ui组件
   */
  type?: 'number' | 'text' | 'idcard' | 'digit' | undefined;
  /**
   * 只读
   */
  readonly?: boolean;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 显示清楚按钮
   */
  clearable?: boolean;

  /**
   * 选择时间类型
   * @default date
   */
  datetimePickerType?:
    | 'date'
    | 'time'
    | 'datetime'
    | 'date-hour'
    | 'date-minute'
    | 'year-month'
    | 'month-day'
    | 'hour-minute';
  /**
   * 选择时间最小值
   */
  datetimePickerMinDate?: Date;
  /**
   * 选择时间最大值
   */
  datetimePickermaxDate?: Date;
  /**
   * 选择时间默认值
   * @default new Date()
   */
  datetimeDefaultValue?: Date;
  /**
   * 时间显示格式
   * @default 'YYYY-MM-DD'
   */
  datetimeShowFormat?: string;
  /**
   * 限制上传文件的后缀名
   */
  uploaderFormat?: [];
  /**
   * 限制上传图片的大小 单位kb
   */
  uploaderSize?: number;
  /**
   * 其他自定义组件的参数
   */
  [key: string]: any;
};

declare type RulesType = {
  /**
   * 是否必须会显示*
   */
  required?: boolean;
  /**
   * 错误的提示信息
   */
  message?: string | ((value: any, rule: RulesType) => string);
  /**
   * 验证规则的类型 utils/validator.ts 验证库的 所有导出
   *
   */
  type?: any;
  /**
   * 通过函数进行校验	自定义规则
   */
  validator?: (value: any, rule: RulesType) => boolean | string | Promise<boolean | string>;
  /**
   * 通过正则表达式进行校验
   */
  pattern?: RegExp;
  /**
   * 本项规则的触发时机，可选值为 onSubmit
   */
  trigger?: 'onSubmit';
  /**
   * 格式化函数，将表单项的值转换后进行校验
   */
  formatter?: (value: any, rule: RulesType) => string;
  /**
   * 最小长度或者最小值
   */
  min?: number;
  /**
   * 最大长度或者最大值
   */
  max?: number;
};

declare type CellPropsType = {
  rules?: RulesType[];
  /**
   * 左侧标题
   */
  title?: number | string;
  /**
   * 标题下方的描述信息
   */
  brief?: string;
  /**
   * 单元格大小，可选值为 large
   */
  size?: 'medium' | 'large';
  /**
   * 左侧图标或图片
   */
  icon?: React.ReactNode;
  /**
   * 右侧图标或图片
   */
  rightIcon?: React.ReactNode;
  /**
   * 是否显示内边框
   * @default true
   */
  bordered?: boolean;
  /**
   * 是否开启点击反馈
   * @default false
   */
  clickable?: boolean;
  /**
   * 是否显示表单必填星号
   * @default false
   */
  required?: boolean;
  /**
   * 对齐方式，可选值为 start center end
   */
  align?: 'start' | 'center' | 'end';
};

/**
 * 可以使用的表单组件类型
 */
declare type ValueType =
  | 'InputCustom'
  | 'SelectCustom'
  | 'DatetimePickerCustom'
  | 'UploaderCustom'
  | 'CellGroup';

export declare type ColumnsType = {
  /**
   * 字段限制名称
   */
  title?: string;
  /**
   * 字段key
   */
  dataIndex: string;
  /**
   * 能够使用的表单类型
   * @default text
   */
  ValueType: ValueType;
  /**
   * 传递给子组件的Props
   */
  fieldProps?: FieldPropsType;
  /**
   * 传递给cell的的Props
   */
  cellProps?: CellPropsType;
};

/**
 * 自定义表单type定义
 */
export declare type FormCustomType = {
  /**
   * 通过 ref 可以获取到 Form 实例并调用实例方法
   */
  formRef?: FormCustomRefType | any;
  /**
   * 显示的字段列表
   */
  columns?: ColumnsType[];
  /**
   * 表单初始值
   */
  initialValues?: object;
  /**
   * 点击完成
   */
  onFinish?: (value: any) => Promise<void | any> | void;

  /**
   * 表单数据变化时
   */
  onValueChange?: (value: any) => Promise<void | any> | void;
  /**
   * 点击提交验证通过后返回表单值
   */
  onSubmit?: (value: any) => void;
};

/**
 * 子组件得到的Props
 */
export declare type ComponentsPropsType = {
  /**
   * 传递进组件的值 多选或者多列 是数组
   */
  value: any;
  /**
   * 值切换触发方法 修改表单的值
   */
  onChange: (value: any) => void | undefined;
  /**
   *
   */
  placeholder?: string;
} & FieldPropsType;

export declare type FormCustomRefType = {
  setFieldsValue?: (params: any) => void;
  getFieldsValue?: (name?: string | string[]) => object;
  validateFields?: (name?: string | string[]) => Promise<any>;
  resetFieldsValue?: () => void;
};
