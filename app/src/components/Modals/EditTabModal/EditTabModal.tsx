import { FC } from "react";
import { IEditTabFormFields, IEditTabModal } from "./EditTabModal.types";
import { Form, Input } from "antd";
import { editTabFormName } from "./EditTabModal.const";
import Modal from "../../Modal/Modal";

export const EditTabModal: FC<IEditTabModal> = ({
  tab,
  onEdit,
  ...modalProps
}) => {
  const [form] = Form.useForm<IEditTabFormFields>();

  const handleSubmit = ({ name }: IEditTabFormFields) => {
    if (!tab) {
      return;
    }

    onEdit(tab.id, name);
    form.resetFields();
  };

  return (
    <Modal
      {...modalProps}
      title="Edit tab"
      footerButtons={{
        formName: editTabFormName,
        submitText: "Edit",
      }}
    >
      <Form<IEditTabFormFields>
        initialValues={{ name: tab?.name }}
        name={editTabFormName}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item<IEditTabFormFields>
          rules={[{ required: true, message: "Please input new tab name" }]}
          label="Tab name"
          name="name"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
