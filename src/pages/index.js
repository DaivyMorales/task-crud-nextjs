import ListCategory from "Components/Category/ListCategory";
import CategoryForm from "Components/CategoryForm";
import CardTask from "./tasks/CardTask";

export default function index({ tasks }) {
  console.log(tasks);

  return (
    <div className="flex justify-center items-start gap-y-2 flex-col  container mx-auto">
      <h1 className="font-bold px-10">Your tasks</h1>
      <div className="grid grid-cols-3 gap-6 w-full px-10">
        {tasks.map((task) => (
          <CardTask task={task} key={task._id} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();
  return {
    props: {
      tasks,
    },
  };
};
