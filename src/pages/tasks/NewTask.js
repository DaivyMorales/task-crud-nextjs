import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import ListCategory from "Components/Category/ListCategory";
import { StateContext } from "Context/StateContext";
import { HiCursorClick, HiDocumentSearch, HiPuzzle } from "react-icons/hi";

const NewTask = () => {
  const { push, query, replace, asPath } = useRouter();

  const { task, setTask, myState, setMyState } = useContext(StateContext);

  console.log("task", task);

  const handleTitleChange = (event) => {
    const newTask = {
      ...task,
      title: event.target.value,
    };
    setTask(newTask);
  };

  const handleUrlChange = (event) => {
    const newTask = {
      ...task,
      url: event.target.value,
    };
    setTask(newTask);
  };

  const handleDescriptionChange = (event) => {
    const newTask = {
      ...task,
      description: event.target.value,
    };
    setTask(newTask);
  };

  const deleteTask = async (id) => {
    const result = await axios.delete(`https://task-crud-nextjs.vercel.app/api/tasks/${id}`);
    console.log(result);
  };

  const createTask = async (task) => {
    try {
      const response = await axios.post(
        "https://task-crud-nextjs.vercel.app/api/tasks",
        task
      );

      setMyState([...myState, response.data]);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await axios.put(
        `https://task-crud-nextjs.vercel.app/api/tasks/${query.id}`,
        task
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    const response = await axios.get(
      `https://task-crud-nextjs.vercel.app/api/tasks/` + query.id
    );
    const data = response.data;
    setTask({
      title: data.title,
      url: data.url,
      description: data.description,
      category: data.category,
    });
  };

  useEffect(() => {
    if (query.id) {
      getTask();
    }
  }, []);

  return (
    <div className=" flex flex-col h-screen justify-center -mt-16 items-center">
      {/* <h1 className="font-bold">
        {query.id ? "Update Task" : "Save your URL!"}
      </h1> */}
      <Formik
        enableReinitialize={true}
        initialValues={task}
        onSubmit={async (values, { resetForm }) => {
          if (query.id) {
            updateTask(values);
          } else {
            createTask(values);
            console.log("crear");
          }
          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {console.log("values", values)}
            <div className="grid grid-cols-1  gap-x-3 gap-y-5 ">
              <div className="flex flex-col  gap-y-1">
                <div className="flex justify-start items-center gap-x-1">
                  <HiDocumentSearch color="black" />
                  <label>Title</label>
                </div>
                <input
                  className="url-input"
                  type="text"
                  name="title"
                  placeholder="Anypage"
                  onChange={(event) => {
                    handleChange(event);
                    handleTitleChange(event);
                  }}
                  value={values.title}
                />
              </div>
              <div className="flex flex-col gap-y-1  ">
                <div className="flex justify-start items-center gap-x-1">
                  <HiCursorClick color="black" />
                  <label>Url</label>
                </div>
                <input
                  className="url-input "
                  type="text"
                  name="url"
                  placeholder="www.anypage.co"
                  onChange={(event) => {
                    handleChange(event);
                    handleUrlChange(event);
                  }}
                  value={values.url}
                />
              </div>
              <div className="flex  flex-col  gap-y-1 ">
                <div className="flex justify-start items-center gap-x-1">
                  <HiPuzzle color="black" />
                  <label>Notes <span className="text-gray-500">(Optional)</span> </label>
                </div>
                <textarea
                  className="url-input"
                  name="description"
                  placeholder="Why you save this url?"
                  onChange={(event) => {
                    handleChange(event);
                    handleDescriptionChange(event);
                  }}
                  value={values.description}
                />
              </div>
              <div className="">
                <Field name="nameCategory">
                  {({ field, form }) => <ListCategory />}
                </Field>
              </div>

              <div className="flex justify-center">
                <button
                  style={
                    task.url.length > 0
                      ? { backgroundColor: "black", cursor: "pointer" }
                      : { backgroundColor: "gray", cursor: "no-drop" }
                  }
                  className=" bg-black text-white text-sm font-normal py-3 w-32 rounded-lg shadow-2xl"
                  type="submit"
                  onClick={() => {
                    push("/");
                    replace(asPath);
                  }}
                >
                  Create
                </button>
              </div>
              {query.id && (
                <button
                  className=" bg-[#ff0000] text-white text-xs font-semibold p-2 rounded-lg"
                  type="submit"
                  onClick={() => {
                    deleteTask(query.id);
                    push("/");
                  }}
                >
                  Eliminar
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewTask;
