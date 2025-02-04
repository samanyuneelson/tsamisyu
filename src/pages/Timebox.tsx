import { PropsWithChildren, useEffect, useState } from "react";
import { cloneDeep, find, findIndex, map } from "lodash";
import axios from "axios";
import ContextMenu from "../components/ContextMenu/ContextMenu";
interface SideBarProps {
  sideBarInfo: Karma;
  setSideBarInfo: (task: Karma | ((task: Karma) => Karma)) => void;
  tasks: Karma[];
  setTasks: (tasks: Karma[] | ((tasks: Karma[]) => Karma[])) => void;
}

interface ModalProps {
  _id: string;
  setTasks: (tasks: Karma[] | ((tasks: Karma[]) => Karma[])) => void;
  setSideBarInfo: (task: Karma | ((task: Karma) => Karma)) => void;
}

interface Karma {
  title: string;
  myDay?: string;
  description: string;
  isComplete: boolean;
  list: string;
  _id: string;
  isSideBar: boolean;
}

export interface KarmaList {
  _id: string;
  listName: string;
}

interface LeftPanelProps {
  setList: (list: KarmaList) => void;
  setListUpdateFlag: (flag: boolean) => void;
  listUpdateFlag: boolean;
}

const config = {
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function TimeBox() {
  const sidebarInit: Karma = {
    _id: "",
    isSideBar: false,
    title: "",
    description: "",
    isComplete: false,
    list: "default",
  };
  const [sideBarInfo, setSideBarInfo] = useState<Karma>(sidebarInit);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [tasks, setTasks] = useState<Karma[]>([]);
  const [listUpdateFlag, setListUpdateFlag] = useState<boolean>(false);
  const [list, setList] = useState<KarmaList>({
    _id: "default",
    listName: "default",
  });

  useEffect(() => {
    axios
      .get(`/karmas/karma?list=${list._id}`, config)
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
  }, [list._id]);

  const addTask = () => {
    const task: Omit<Karma, "_id"> = {
      isSideBar: false,
      title: taskTitle,
      description: "",
      isComplete: false,
      list: list._id,
    };
    axios
      .post(`/karmas/karma`, task, config)
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
      .put(`/karmas/karma/${id}`, completedTask, config)
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
          oldTasks.map((task: Karma) =>
            task._id === id ? { ...task, isComplete: !task.isComplete } : task
          )
        );
      });
  };

  const toggleSidebar = (task: Karma) => {
    setSideBarInfo({
      ...task,
      isSideBar: task._id !== sideBarInfo._id ? true : !sideBarInfo.isSideBar,
    });
  };

  const onEditList = (e: any, list: KarmaList) => {
    axios
      .put(
        `/karmas/karmalist/${list._id}`,
        { _id: list._id, listName: e.target.value },
        config
      )
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
        setList({ _id: list._id, listName: e.target.value });
        setListUpdateFlag(true);
      });
  };

  const onChangeList = (e: any) => {
    setList((oldList) => ({ ...oldList, listName: e.target.value }));
  };

  return (
    <div className="h-screen flex flex-row">
      <LeftPanel
        setListUpdateFlag={setListUpdateFlag}
        listUpdateFlag={listUpdateFlag}
        setList={setList}
      />
      <div className="flex flex-col justify-between h-full w-full">
        <div>Timeboxing</div>
        {list._id !== "default" && (
          <div>
            <input
              type="text"
              id="sidebar-task-title"
              onKeyDown={(e: any) => {
                if (e.key === "Enter") onEditList(e, list);
              }}
              onChange={(e: any) => onChangeList(e)}
              value={list.listName}
            ></input>
          </div>
        )}
        <div className=" h-full">
          <div>To Do</div>
          <div className="flex flex-col m-3">
            {map(tasks, (task: Karma) => {
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
            {map(tasks, (task: Karma) => {
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
        .put(`/karmas/karma/${sideBarInfo._id}`, sideBarInfo, config)
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
        .put(`/karmas/karma/${sideBarInfo._id}`, sideBarInfo, config)
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

function LeftPanel({
  setList,
  setListUpdateFlag,
  listUpdateFlag,
}: LeftPanelProps) {
  const [taskLists, setTaskLists] = useState<KarmaList[]>([]);
  const [taskListTitle, setTaskListTitle] = useState<string>("");

  const getKarmaList = () => {
    axios
      .get(`/karmas/karmalist`, config)
      .then(function (response) {
        // handle success
        setTaskLists(response.data);
        console.debug(response);
      })
      .catch(function (error) {
        // handle error
        console.debug(error);
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect(() => {
    if (taskLists.length === 0 || listUpdateFlag) getKarmaList();
    setListUpdateFlag(false);
  }, [listUpdateFlag, setListUpdateFlag, taskLists.length]);

  const createList = () => {
    const taskList: Omit<KarmaList, "_id"> = {
      listName: taskListTitle,
    };
    axios
      .post(`/karmas/karmalist`, taskList, config)
      .then(function (response) {
        // handle success
        console.debug(response);
        setTaskLists((oldLists) => [
          ...oldLists,
          { _id: response.data._id, listName: taskListTitle },
        ]);
      })
      .catch(function (error) {
        // handle error
        console.debug(error);
      })
      .finally(function () {
        // always executed
        setTaskListTitle("");
      });
  };

  const deleteTaskList = (_id: any) => {
    console.debug("DeleteModal#onDeleteTaskList", _id);
    axios
      .delete(`/karmas/karmalist/${_id}`, config)
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
        getKarmaList();
      });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>Left Sidebar</div>
      <div className="h-full">
        <div className="p-2 border">My Day</div>
        <div
          className="p-2 border"
          onClick={() => setList({ _id: "default", listName: "default" })}
        >
          Tasks
        </div>
        {map(taskLists, (taskList: KarmaList) => {
          return (
            <div
              className="p-2 border"
              key={taskList._id}
              id={taskList._id}
              onClick={() => setList(taskList)}
            >
              {taskList.listName}
              <ContextMenu
                item={taskList}
                contextFunctionList={[
                  { fn: deleteTaskList, modalSpecs: { isModal: true } },
                ]}
              />
            </div>
          );
        })}
      </div>
      <div className="flex m-2">
        <input
          className="w-auto grow shadow-md border border-solid border-sky-600 rounded-l-lg p-2"
          id="list-box"
          type="text"
          placeholder="New List"
          value={taskListTitle}
          onChange={(e) => {
            setTaskListTitle(e.target.value);
          }}
          onKeyDown={(event) => {
            console.debug("test");
            if (event.key === "Enter") {
              createList();
            }
          }}
        />
        <button className="shadow-md rounded-r-lg p-3 bg-sky-600 text-white">
          Group
        </button>
      </div>
    </div>
  );
}

function DeleteModal({ _id, setTasks, setSideBarInfo }: ModalProps) {
  const [showModal, setShowModal] = useState(false);

  const onDelete = () => {
    console.debug("DeleteModal#onDelete", _id);
    axios
      .delete(`/karmas/karma/${_id}`, config)
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
        setTasks((oldTasks: Karma[]) =>
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
