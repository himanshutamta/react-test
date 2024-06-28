import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { TaskState } from "../../types";

const LandingPage = (props: any) => {
  const tasks: TaskState[] = useSelector((state: RootState) => state.tasks);
  return (
    <div className="py-10 mx-3">
      <h1 className="text-center font-medium text-xl">TASK MANAGEMENT TABLE</h1>
      <div className="flex justify-end">
        <Button color="primary" className="mb-2">
          <Link to="/create">CREATE NEW TASK</Link>
        </Button>
      </div>

      <Table aria-label="" className="">
        <TableHeader className="">
          {HEADERTITLE.map((title) => {
            return (
              <TableColumn className="bg-red-400 text-black">
                {title}
              </TableColumn>
            );
          })}
        </TableHeader>
        <TableBody>
          {tasks.map((i) => {
            return (
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>{i.title}</TableCell>
                <TableCell>{i.taskId}</TableCell>
                <TableCell>{i.status}</TableCell>
                <TableCell>
                  {i.members.map((member) => {
                    return <div key={member.id}>{member.name}</div>;
                  })}
                </TableCell>
                <TableCell>{i.dueDate}</TableCell>
                <TableCell>{i.isAssigned}</TableCell>
                <TableCell>{i.estimatedHour}</TableCell>
                <TableCell>{i.priority}</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LandingPage;

const HEADERTITLE: string[] = [
  "ORDER",
  "SERIAL NO.",
  "TASK TITLE",
  "TASK ID",
  "STATUS",
  "ASSIGNED MEMBERS",
  "DUE DATE",
  "IS ASSIGNED",
  "ESTIMATED HOURS",
  "PRIORTY",
  "CREATE ON",
  "ACTIONS",
];
