import React, { useState } from "react";
import {
  Button,
  DatePicker,
  DateValue,
  Input,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { TaskState } from "../../types";
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeTask } from "../../../redux/reducers/taskSlice";
import { IoReorderThree } from "react-icons/io5";
import { useDateFormatter } from "@react-aria/i18n";
import { getLocalTimeZone, ZonedDateTime } from "@internationalized/date";

const LandingPage = () => {
  const dispatch = useDispatch();
  const tasks: TaskState[] = useSelector(
    (state: RootState) => state.tasks.alltask
  );
  let formatter = useDateFormatter();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<any>("");
  const [assigenFilter, setAssigenFilter] = useState<any>("");
  const [priorityFilter, setPriorityFilter] = useState<any>("");
  const [dateFilter, setDateFilter] = useState<DateValue>();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const hasSearchFilter = Boolean(filterValue);
  let timeFormatter = useDateFormatter({
    timeStyle: "short",
  });

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...tasks];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "") {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === statusFilter
      );
    }

    if (assigenFilter !== "") {
      filteredUsers = filteredUsers.filter(
        (user) => user.isAssigned === assigenFilter
      );
    }

    if (priorityFilter !== "") {
      filteredUsers = filteredUsers.filter(
        (user) => user.priority === priorityFilter
      );
    }

    if (dateFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.dueDate ===
          formatter.format(dateFilter.toDate(getLocalTimeZone()))
      );
    }

    return filteredUsers;
  }, [
    tasks,
    filterValue,
    hasSearchFilter,
    assigenFilter,
    statusFilter,
    priorityFilter,
    dateFilter,
    formatter,
  ]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);
  return (
    <div className="py-10 mx-3">
      <h1 className="text-center font-medium text-xl">TASK MANAGEMENT TABLE</h1>
      <div className="flex justify-end">
        <Button color="primary" className="mb-2">
          <Link to="/create">CREATE NEW TASK</Link>
        </Button>
      </div>

      {/* Filter field */}

      <div className="flex gap-5 items-center align-baseline my-7">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<FaSearch />}
          label="Task title"
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <Select
          label="Status"
          placeholder="Select Status"
          className="flex items-center"
          selectedKeys={[statusFilter]}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <SelectItem key="uninitiated">Uninitiated</SelectItem>
          <SelectItem key="inprogress">In Progress</SelectItem>
          <SelectItem key="completed">Completed</SelectItem>
        </Select>

        <DatePicker
          className=""
          label="Due Date"
          value={dateFilter}
          onChange={setDateFilter}
        />
        <Select
          label="Is Assigned"
          placeholder="Select Is Assigned"
          className="flex items-center"
          selectedKeys={[assigenFilter]}
          onChange={(e) => setAssigenFilter(e.target.value)}
        >
          <SelectItem key="true">True</SelectItem>
          <SelectItem key="false">False</SelectItem>
        </Select>

        <Select
          label="Priority"
          placeholder="Select Priorty"
          className="flex items-center "
          selectedKeys={[priorityFilter]}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <SelectItem key="low">Low</SelectItem>
          <SelectItem key="medium">Medium</SelectItem>
          <SelectItem key="high">High</SelectItem>
        </Select>
      </div>

      {/* Table of Task */}
      <Table
        aria-label="Tasks table"
        className=""
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
      >
        <TableHeader className="">
          {HEADERTITLE.map((title, key) => {
            return (
              <TableColumn key={key} className="bg-red-400 text-black">
                <div>{title}</div>
              </TableColumn>
            );
          })}
        </TableHeader>
        <TableBody items={items}>
          {items.map((i, key) => {
            return (
              <TableRow key={i.taskId} className="">
                <TableCell>
                  <IoReorderThree className="text-2xl" />
                </TableCell>
                <TableCell className="">{key + 1}</TableCell>
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
                <TableCell>
                  {
                    <p>
                      {i.estimatedHour instanceof ZonedDateTime
                        ? timeFormatter.format(i.estimatedHour.toDate()) || "--"
                        : ""}
                    </p>
                  }
                </TableCell>
                <TableCell>{i.priority}</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>
                  {
                    <div className="flex gap-5 items-center ">
                      <Link to={`/edit/${i.taskId}`}>
                        <FaPencilAlt className="text-blue-700 hover:scale-125 transition-all duration-100" />
                      </Link>
                      <button onClick={() => dispatch(removeTask(i.taskId))}>
                        <MdDelete className="text-xl text-red-500 hover:scale-125 transition-all duration-100" />
                      </button>
                    </div>
                  }
                </TableCell>
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
