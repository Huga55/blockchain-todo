import { Form, Input, Select } from "antd";
import { FC } from "react";
import Modal from "../../Modal/Modal";
import TextArea from "antd/es/input/TextArea";
import { taskPriorityOptions } from "../../../const/tasks";
import { IEditTaskModal, TEditTaskFormFields } from "./EditTaskModal.types";
import { editTaskFormName } from "./EditTaskModal.const";

export const EditTaskModal: FC<IEditTaskModal> = ({
  onEdit,
  task,
  ...modalProps
}) => {
  const [form] = Form.useForm<TEditTaskFormFields>();

  const handleSubmit = (updatedTask: TEditTaskFormFields) => {
    if (!task) {
      return;
    }

    onEdit({ ...task, ...updatedTask });
    form.resetFields();
  };

  return (
    <Modal
      {...modalProps}
      footerButtons={{
        formName: editTaskFormName,
        submitText: "Add",
      }}
      title="Add new task"
    >
      <Form<TEditTaskFormFields>
        initialValues={{
          title: task?.title,
          description: task?.description,
          priority: task?.priority,
        }}
        name={editTaskFormName}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item<TEditTaskFormFields>
          rules={[{ required: true, message: "Please input your task name" }]}
          label="Task name"
          name="title"
        >
          <Input defaultValue={task?.title} />
        </Form.Item>
        <Form.Item<TEditTaskFormFields>
          label="Task description"
          name="description"
        >
          <TextArea defaultValue={task?.description} />
        </Form.Item>
        <Form.Item<TEditTaskFormFields> label="Task priority" name="priority">
          <Select>
            {taskPriorityOptions.map(({ label, value }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
