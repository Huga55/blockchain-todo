export interface IModalButtons {
  onSubmit?(e: React.SyntheticEvent): void;
  onCancel?(e: React.SyntheticEvent): void;
  cancelText?: string;
  submitText: string;
  formName?: string;
}
