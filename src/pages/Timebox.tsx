import { Box, Button, FormControlLabel, Radio, TextField } from "@mui/material";
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
    <Box height={"100vh"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <Box>Timeboxing</Box>
        <Box
          margin={1}
          display={"flex"}
          flexDirection={"column"}
          height={"100%"}
        >
          {map(items, (item: string) => {
            return (
              <FormControlLabel
                style={{ pointerEvents: "none" }}
                value={item}
                control={
                  <Radio
                    style={{ pointerEvents: "auto" }}
                    onChange={handleTaskComplete}
                  />
                }
                label={item}
                labelPlacement="end"
              />
            );
          })}
        </Box>
        <Box display={"flex"} margin={1}>
          <TextField
            sx={{ width: "auto", flexGrow: "2" }}
            id="task-box"
            label="Write task here"
            variant="outlined"
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
          <Button variant="contained" onClick={addTask}>
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
