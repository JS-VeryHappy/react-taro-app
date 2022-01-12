export declare type DialogCustomType = {
  /**
   * 是否显示
   * @default false
   */
  open: boolean;
  /**
   * 点击X || 取消 || 遮罩
   */
  onCancel?: () => void;
  /**
   * 点击确认
   */
  onOk?: () => void;
  /**
   * 标题
   */
  title?: string | React.ReactNode;
  /**
   * 内容
   */
  content?: string | React.ReactNode;
};
