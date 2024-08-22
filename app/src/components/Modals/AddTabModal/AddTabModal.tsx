import { Form, Input } from "antd";
import { addTabFormName } from "./AddTabModal.const";
import { IAddTabFormFields, IAddTabModal } from "./AddTabModal.types";
import { FC } from "react";
import Modal from "../../Modal/Modal";

export const AddTabModal: FC<IAddTabModal> = ({ onAdd, ...modalProps }) => {
  const [form] = Form.useForm<IAddTabFormFields>();

  const handleSubmit = ({ name }: IAddTabFormFields) => {
    onAdd(name);
    form.resetFields();
  };

  return (
    <Modal
      {...modalProps}
      footerButtons={{
        formName: addTabFormName,
        submitText: "Add",
      }}
      title="Add new tab"
    >
      <Form<IAddTabFormFields> name={addTabFormName} onFinish={handleSubmit}>
        <Form.Item<IAddTabFormFields>
          rules={[{ required: true, message: "Please input your tab name" }]}
          label="Tab name"
          name="name"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
