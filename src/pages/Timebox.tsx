import { useEffect, useState } from "react";
import { map } from "lodash";

export default function TimeBox() {
  const savedTasks = localStorage.getItem("tasks");
  const [task, setTask] = useState<string>("");
  const [items, setItems] = useState<string[]>(
    JSON.parse(savedTasks as string) ?? []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(items));
  }, [items]);

  const addTask = () => {
    setItems((oldItems) => [...oldItems, task]);
    setTask("");
  };

  const handleTaskComplete = (e: any) => {
    const task = e.target.value;
    setItems((oldItems) => oldItems.filter((item) => item !== task));
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col justify-between h-full">
        <div>Timeboxing</div>
        <div className="flex flex-col m-3 h-full">
          {map(items, (item: string) => {
            return (
              <label className="pointer-events-none p-1">
                <input
                  className="pointer-events-auto"
                  type="radio"
                  id="task"
                  name="task"
                  value={item}
                  onChange={handleTaskComplete}
                />
                <span className="pl-1">{item}</span>
              </label>
            );
          })}
        </div>
        <div className="flex m-2">
          <input
            className="w-auto grow shadow-md border border-solid border-sky-600 rounded-l-lg"
            id="task-box"
            type="text"
            placeholder="Write task here"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
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
    </div>
  );
}
