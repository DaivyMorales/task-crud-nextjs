import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CategoryForm from "Components/CategoryForm";
import ListCategory from "Components/Category/ListCategory";

const NewTask = () => {
  const { push, query } = useRouter();

  const [nameCategory, setNameCategory] = useState("Without Type");

  const [task, setTask] = useState({
    title: "",
    description: "",
    nameCategory: nameCategory,
  });

  const handleCategoryChange = (categoryValue) => {
    setNameCategory(categoryValue);
  };

  const createTask = async (task) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tasks",
        task
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/tasks/${query.id}`,
        task
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/tasks/` + query.id
    );
    const data = response.data;
    setTask({
      title: data.title,
      description: data.description,
    });
  };

  useEffect(() => {
    if (query.id) getTask();
  }, []);

  return (
    <div className=" h-screen flex flex-col justify-center gap-y-4 items-center">
      <h1 className="font-bold">
        {query.id ? "Update Task" : "Save your URL!"}
      </h1>
      <Formik
        enableReinitialize={true}
        initialValues={task}
        onSubmit={async (values, { resetForm }) => {
          if (query.id) {
            updateTask(values);
          } else {
            createTask(values);
          }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {console.log("values", values)}
            <div className="grid grid-cols-3 gap-3">
              <label className=" ">URL</label>
              <input
                className="col-span-2 bg-black text-white font-gray-300 pr-1 pl-1 rounded-lg py-2 placeholder:text-gray-800 font-medium text-sm"
                type="text"
                name="title"
                placeholder="www.anypage.co"
                onChange={handleChange}
                value={values.title}
              />
              <label className=" ">Description</label>
              <textarea
                className="col-span-2 bg-black text-white font-gray-300 pr-1 pl-1 rounded-lg py-2 placeholder:text-gray-800 font-medium text-sm"
                name="description"
                placeholder="My description"
                onChange={handleChange}
                value={values.description}
              />
              <div className="col-span-3">
                <Field name="nameCategory">
                  {({ field, form }) => (
                    <ListCategory onChange={handleCategoryChange} />
                  )}
                </Field>
              </div>

              <button
                className="col-start-2 bg-white text-black text-xs font-bold p-2 rounded-lg"
                type="submit"
                onClick={() => {
                  push("/");
                }}
              >
                Enviar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewTask;
