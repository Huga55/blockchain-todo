import { Form, Input, Select } from "antd";
import { FC } from "react";
import Modal from "../../Modal/Modal";
import { IAddTaskModal, TAddTaskFormFields } from "./AddTaskModal.types";
import { addTaskFromName } from "./AddTaskModal.const";
import TextArea from "antd/es/input/TextArea";
import { taskPriorityOptions } from "../../../const/tasks";

export const AddTaskModal: FC<IAddTaskModal> = ({ onAdd, ...modalProps }) => {
  const [form] = Form.useForm<TAddTaskFormFields>();

  const handleSubmit = (task: TAddTaskFormFields) => {
    onAdd(task);
    form.resetFields();
  };

  return (
    <Modal
      {...modalProps}
      footerButtons={{
        formName: addTaskFromName,
        submitText: "Add",
      }}
      title="Add new task"
    >
      <Form<TAddTaskFormFields>
        form={form}
        initialValues={{ priority: taskPriorityOptions[0].value }}
        name={addTaskFromName}
        onFinish={handleSubmit}
      >
        <Form.Item<TAddTaskFormFields>
          rules={[{ required: true, message: "Please input your task name" }]}
          label="Task name"
          name="title"
        >
          <Input />
        </Form.Item>
        <Form.Item<TAddTaskFormFields>
          label="Task description"
          name="description"
        >
          <TextArea />
        </Form.Item>
        <Form.Item<TAddTaskFormFields> label="Task priority" name="priority">
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
