import { useEffect, useState } from "react";
import { cloneDeep, find, findIndex, map } from "lodash";
import axios from "axios";
interface SideBarProps {
  sideBarInfo: Task;
  setSideBarInfo: (task: Task | ((task: Task) => Task)) => void;
  tasks: Task[];
  setTasks: (tasks: Task[] | ((tasks: Task[]) => Task[])) => void;
}

interface ModalProps {
  _id: string;
  setTasks: (tasks: Task[] | ((tasks: Task[]) => Task[])) => void;
  setSideBarInfo: (task: Task | ((task: Task) => Task)) => void;
}

interface Task {
  _id: string;
  isSideBar: boolean;
  title: string;
  description: string;
  isComplete: boolean;
}
const config = {
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function TimeBox() {
  const sidebarInit: Task = {
    _id: "",
    isSideBar: false,
    title: "",
    description: "",
    isComplete: false,
  };
  const [sideBarInfo, setSideBarInfo] = useState<Task>(sidebarInit);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get("/karmas", config)
      .then(function (response) {
        // handle success
        setTasks(response.data);
        console.debug(response);
      })
      .catch(function (error) {
        // handle error
        console.debug(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const addTask = () => {
    const task: Omit<Task, "_id"> = {
      isSideBar: false,
      title: taskTitle,
      description: "",
      isComplete: false,
    };
    axios
      .post(`/karmas`, task, config)
      .then(function (response) {
        // handle success
        console.debug(response);
        setTasks((oldItems) => [
          ...oldItems,
          { ...task, _id: response.data._id },
        ]);
      })
      .catch(function (error) {
        // handle error
        console.debug(error);
      })
      .finally(function () {
        // always executed
        setTaskTitle("");
      });
  };

  const handleTaskComplete = (e: any) => {
    const id: string = e.target.value;
    const completedTask = cloneDeep(
      find(tasks, (task) => {
        return task._id === id;
      })
    );
    if (completedTask) completedTask.isComplete = !completedTask?.isComplete;
    axios
      .put(`/karmas/${id}/check`, completedTask, config)
      .then(function (response) {
        // handle success
        console.debug(response);
      })
      .catch(function (error) {
        // handle error
        console.debug(error);
      })
      .finally(function () {
        // always executed
        console.debug("timbox#handleTaskComplete", {
          id,
        });
        setTasks((oldTasks) =>
          oldTasks.map((task: Task) =>
            task._id === id ? { ...task, isComplete: !task.isComplete } : task
          )
        );
      });
  };

  const toggleSidebar = (task: Task) => {
    setSideBarInfo({
      ...task,
      isSideBar: task._id !== sideBarInfo._id ? true : !sideBarInfo.isSideBar,
    });
  };

  return (
    <div className="h-screen flex flex-row">
      <div className="flex flex-col justify-between h-full w-full">
        <div>Timeboxing</div>
        <div className=" h-full">
          <div>To Do</div>
          <div className="flex flex-col m-3">
            {map(tasks, (task: Task) => {
              if (!task.isComplete)
                return (
                  <div
                    onClick={(e: any) => toggleSidebar(task)}
                    className="p-2 border"
                    key={task._id}
                  >
                    <input
                      type="checkbox"
                      id="task"
                      name="task"
                      value={task._id}
                      onClick={(e) => e.stopPropagation()}
                      onChange={handleTaskComplete}
                    />
                    <span className="pl-1">{task.title}</span>
                  </div>
                );
            })}
          </div>
          <div>Completed</div>
          <div className="flex flex-col m-3">
            {map(tasks, (task: Task) => {
              if (task.isComplete)
                return (
                  <div
                    onClick={(e: any) => toggleSidebar(task)}
                    className="p-2 border"
                    key={task._id}
                  >
                    <input
                      type="checkbox"
                      id="task"
                      name="task"
                      value={task._id}
                      onClick={(e) => e.stopPropagation()}
                      onChange={handleTaskComplete}
                    />
                    <span className="pl-1">{task.title}</span>
                  </div>
                );
            })}
          </div>
        </div>
        <div className="flex m-2">
          <input
            className="w-auto grow shadow-md border border-solid border-sky-600 rounded-l-lg p-2"
            id="task-box"
            type="text"
            placeholder="Write task here"
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />
          <button
            className="shadow-md rounded-r-lg p-3 bg-sky-600 text-white"
            onClick={addTask}
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <SideBar
          sideBarInfo={sideBarInfo}
          setSideBarInfo={setSideBarInfo}
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
}

function replaceItem(array: any[], oldItem: any, newItem: any) {
  return array.reduce((acc, curr) => {
    if (curr === oldItem) {
      acc.push(newItem);
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
}

function SideBar({
  sideBarInfo,
  setSideBarInfo,
  tasks,
  setTasks,
}: SideBarProps): JSX.Element {
  const onChange = (e: any, property: string) => {
    setSideBarInfo((oldSidebarInfo) => ({
      ...oldSidebarInfo,
      [property]: e.target.value,
    }));
  };

  const closeSidebar = () => {
    setSideBarInfo((oldSidebarInfo) => ({
      ...oldSidebarInfo,
      isSideBar: false,
    }));
    if (sideBarInfo._id !== "") {
      axios
        .put(`/karmas/${sideBarInfo._id}`, sideBarInfo, config)
        .then(function (response) {
          // handle success
          console.debug(response);
        })
        .catch(function (error) {
          // handle error
          console.debug(error);
        })
        .finally(function () {
          // always executed
          const index = findIndex(
            tasks,
            (task) => task._id === sideBarInfo._id
          );
          setTasks((oldTasks) =>
            replaceItem(oldTasks, oldTasks[index], sideBarInfo)
          );
        });
    }
  };

  const onKeyDown = (event: any) => {
    if (event.key === "Enter") {
      axios
        .put(`/karmas/${sideBarInfo._id}`, sideBarInfo, config)
        .then(function (response) {
          // handle success
          console.debug(response);
        })
        .catch(function (error) {
          // handle error
          console.debug(error);
        })
        .finally(function () {
          // always executed
          const index = findIndex(
            tasks,
            (task) => task._id === sideBarInfo._id
          );
          setTasks((oldTasks) =>
            replaceItem(oldTasks, oldTasks[index], sideBarInfo)
          );
        });
    }
    if (event.key === "Escape") {
      closeSidebar();
    }
  };

  if (!sideBarInfo.isSideBar) return <></>;
  return (
    <div className="">
      <div
        onClick={() => {
          closeSidebar();
        }}
      >
        close
      </div>
      <DeleteModal
        _id={sideBarInfo._id}
        setTasks={setTasks}
        setSideBarInfo={setSideBarInfo}
      />
      <input
        type="text"
        id="sidebar-task-title"
        onKeyDown={onKeyDown}
        onChange={(e: any) => onChange(e, "title")}
        value={sideBarInfo.title}
      ></input>
      <div>
        Description
        <textarea
          rows={5}
          cols={33}
          placeholder={"Add note"}
          onChange={(e: any) => onChange(e, "description")}
          onKeyDown={onKeyDown}
          value={sideBarInfo.description}
        />
      </div>
    </div>
  );
}

function DeleteModal({ _id, setTasks, setSideBarInfo }: ModalProps) {
  const [showModal, setShowModal] = useState(false);

  const onDelete = () => {
    console.debug("DeleteModal#onDelete", _id);
    axios
      .delete(`/karmas/${_id}`, config)
      .then(function (response) {
        // handle success
        console.debug(response);
      })
      .catch(function (error) {
        // handle error
        console.debug(error);
      })
      .finally(function () {
        // always executed
        setTasks((oldTasks: Task[]) =>
          oldTasks.filter((item) => item._id !== _id)
        );
        setShowModal(false);
        setSideBarInfo((oldSidebarInfo) => ({
          ...oldSidebarInfo,
          isSideBar: false,
        }));
      });
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete task</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you want to delete this task?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
