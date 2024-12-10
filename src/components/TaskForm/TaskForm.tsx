import React from "react";
import { Formik, Form, Field } from "formik";
import { object as yObj, string as yStr, number as yNum } from "yup";
import "./TaskForm.css";

const taskTitleField = "add-task__title";
const taskDescField = "add-task__desc";
const taskPriorityField = "add-task__priority";
const formSchema = yObj().shape({
  [taskTitleField]: yStr().trim().required("Required"),
  [taskDescField]: yStr().trim().required("Required"),
  [taskPriorityField]: yNum().required("Required"),
});

export const TaskForm = ({ options, defaultPriority }) => {
  const initialValues = {
    [taskTitleField]: "",
    [taskDescField]: "",
    [taskPriorityField]: defaultPriority,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={async () => {
        console.log("hi!");
      }}
    >
      {({ isValid, isSubmitting, handleSubmit }) => (
        <Form className="task-form">
          <Field
            as="select"
            name={taskPriorityField}
            className="task-form__field task-form__select"
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
          <button
            type="button"
            disabled={!isValid || isSubmitting}
            onClick={() => handleSubmit()}
          >
            Add task!
          </button>
        </Form>
      )}
    </Formik>
  );
};
