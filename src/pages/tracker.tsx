import { Box, MenuItem, Select } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";

enum GradePoints {
  O = "O",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

interface Grades {
  [dates: string]: string;
}

interface Tracker {
  title?: string;
  grades: Grades;
  id?: string;
}

export default function TrackerPage() {
  const [data, setData] = useState<Tracker[]>();

  const config = {
    baseURL: "http://localhost:8000",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    getTrackerData();
  }, []);

  const getTrackerData = () => {
    axios
      .get("/tracker", config)
      .then(function (response) {
        // handle success
        setData(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const day = "Today";

  const dayEpoch = 86400000;

  const getTodayEpoch = () => {
    const datenow = new Date(Date.now());
    return new Date(
      Date.UTC(
        datenow.getUTCFullYear(),
        datenow.getUTCMonth(),
        datenow.getUTCDate()
      )
    ).valueOf();
  };

  const getTimestamps = () => {
    const timeNow = getTodayEpoch();
    let timestamps = [];
    for (let i = 1; i <= 7; i++) {
      timestamps[i] = timeNow + dayEpoch * i;
    }
    console.debug(timestamps);
    return timestamps;
  };

  const getDateLabels = (value: number) => {
    const date = new Date(value);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })}`;
  };

  const updateGrade = (row: any, value: string) => {
    const body: Tracker = {
      grades: {},
    };
    body.grades[`${getTodayEpoch()}`] = value;
    axios
      .put(`/tracker/${row["_id"]}`, body, config)
      .then(function (response) {
        // handle success
        getTrackerData();
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <Box>
      Tracker
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              {getTimestamps().map((timestamp) => (
                <TableCell>{getDateLabels(timestamp)}</TableCell>
              ))}
              <TableCell align="right">{day}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                {getTimestamps().map((timestamp) => (
                  <TableCell>{row.grades[`${timestamp}`] ?? "-"}</TableCell>
                ))}
                <TableCell align="right">
                  <Select
                    placeholder="Choose one…"
                    value={row.grades[`${getTodayEpoch()}`]}
                    onChange={(event) => updateGrade(row, event.target.value)}
                  >
                    <MenuItem value={GradePoints.O}>{GradePoints.O}</MenuItem>
                    <MenuItem value={GradePoints.A}>{GradePoints.A}</MenuItem>
                    <MenuItem value={GradePoints.B}>{GradePoints.B}</MenuItem>
                    <MenuItem value={GradePoints.C}>{GradePoints.C}</MenuItem>
                    <MenuItem value={GradePoints.D}>{GradePoints.D}</MenuItem>
                    <MenuItem value={GradePoints.E}>{GradePoints.E}</MenuItem>
                    <MenuItem value={GradePoints.F}>{GradePoints.F}</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
