import axios from "axios";
import { useRouter } from "next/router";

export default function TaskDetail({ task }) {
  const router = useRouter();

  const deleteTask = async (id) => {
    const result = await axios.delete(`http://localhost:3000/api/tasks/${id}`);
    console.log(result);
  };

  return (
    <div>
      <h1>{task.title}</h1>
      <button
        onClick={() => {
          deleteTask(task._id);
          router.push("/");
        }}
      >
        Eliminar
      </button>
    </div>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const result = await axios.get(`http://localhost:3000/api/tasks/${id}`);

  if (result.status === 200) {
    return {
      props: {
        task: result.data,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}
