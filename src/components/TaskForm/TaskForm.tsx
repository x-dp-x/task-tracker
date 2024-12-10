import React from "react";
import { Formik, Form, Field } from "formik";
import { object as yObj, string as yStr, number as yNum } from "yup";

const taskTitleField = "add-task__title";
const taskDescField = "add-task__desc";
const taskPriorityField = "add-task__priority";
const formSchema = yObj().shape({
  [taskTitleField]: yStr().trim().required("Required"),
  [taskDescField]: yStr().trim().required("Required"),
  [taskPriorityField]: yNum().required("Required"),
});

export const TaskForm = ({ filterOpts, defaultPriority }) => {
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
        <Form>
          <Field as="select" name={taskPriorityField}>
            <option></option>
          </Field>
          <Field type="text" name={taskTitleField} placeholder="Task Title" />
          <Field
            type="text"
            name={taskDescField}
            placeholder="Task Description"
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
