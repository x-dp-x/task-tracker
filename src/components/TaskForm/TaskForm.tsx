import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { object as yObj, string as yStr } from "yup";
import { v4 as uuidv4 } from "uuid";
import type {
  TaskPriority,
  Tasks,
} from "../../context/TaskContext/TaskContext.tsx";
import { AddTask } from "../../hooks/useTasks/useTasks.ts";
import "./TaskForm.css";

const taskTitleField = "title";
const taskDescField = "description";
const taskPriorityField = "priority";
const formSchema = yObj().shape({
  [taskTitleField]: yStr().trim().required("Required"),
  [taskDescField]: yStr().trim().required("Required"),
  [taskPriorityField]: yStr().trim().required("Required"),
});

interface TaskFormProps {
  options: string[];
  defaultPriority: TaskPriority;
  handleSubmit({ task }: AddTask): Tasks;
}

export const TaskForm = ({
  options,
  defaultPriority,
  handleSubmit,
}: TaskFormProps) => {
  const [id, setId] = useState(uuidv4());
  const initialValues = {
    [taskTitleField]: "",
    [taskDescField]: "",
    [taskPriorityField]: defaultPriority,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        handleSubmit({ task: { ...values, id } });
        setId(uuidv4());
        actions.resetForm();
      }}
    >
      {({ isValid, isSubmitting, dirty }) => (
        <Form className="task-form">
          <Field
            as="select"
            name={taskPriorityField}
            className="task-form__field task-form__select"
            data-testid="task-form-select"
          >
            <option key="default" value="">
              Select Priority
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Field>
          <Field
            type="text"
            name={taskTitleField}
            placeholder="Task Title"
            className="task-form__field"
          />
          <Field
            type="text"
            name={taskDescField}
            placeholder="Task Description"
            className="task-form__field"
          />
          <button type="submit" disabled={!isValid || isSubmitting || !dirty}>
            Add task!
          </button>
        </Form>
      )}
    </Formik>
  );
};
