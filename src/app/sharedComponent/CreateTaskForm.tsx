import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  TimeInput,
  TimeInputValue,
} from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Members, TaskState } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDateFormatter } from "@react-aria/i18n";
import {
  DateValue,
  parseDate,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { addTask } from "../../redux/reducers/taskSlice";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CreateTaskForm = () => {
  const members: Members[] = useSelector((state: RootState) => state.members);
  const [selectDate, setSelectDate] = useState<DateValue>(
    parseDate("2024-04-04")
  );
  const [timeDuration, setTimeDuration] = useState<TimeInputValue>(
    parseAbsoluteToLocal("2024-04-08T18:45:22Z")
  );

  const [selectMembers, setSelectMembers] = useState<any>([]);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskState>();

  let formatter = useDateFormatter();

  const handleSelectionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectMembers(e.target.value.split(","));
    },
    []
  );

  const filteredMembers = useMemo(
    () =>
      members.filter((member) => selectMembers.includes(member.id.toString())),
    [members, selectMembers]
  );

  const onSubmit: SubmitHandler<TaskState> = (data) => {
    const addNewTask = {
      ...data,
      taskId: Date.now(),
      dueDate: formatter.format(selectDate.toDate(getLocalTimeZone())),
      members: filteredMembers,
      estimatedHour: timeDuration,
    };
    dispatch(addTask(addNewTask));
  };

  return (
    <div className="flex justify-center my-10 px-3 items-center  ">
      <div className="">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center ">
            <label>Task Title</label>
            <Input
              {...register("title", { required: "Task Title is required" })}
              type="text"
              placeholder="Task title"
              className="max-w-[250px]"
            />
          </div>
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
          <Select
            {...register("status", { required: "Status is required" })}
            labelPlacement="outside-left"
            label="Status"
            placeholder="Select Status"
            className="flex items-center "
          >
            <SelectItem key="uninitiated">Uninitiated</SelectItem>
            <SelectItem key="inProgress">In Progress</SelectItem>
            <SelectItem key="completed">Completed</SelectItem>
          </Select>
          {errors.status && (
            <span className="text-red-500 text-sm">
              {errors.status.message}
            </span>
          )}
          <Select
            labelPlacement="outside-left"
            label="Assigned Members"
            className="max-w-[500px] flex items-center"
            selectionMode="multiple"
            placeholder="Select Assigned Team Members"
            selectedKeys={selectMembers}
            onChange={handleSelectionChange}
          >
            {members.map((i) => (
              <SelectItem key={i.id}>{i.name}</SelectItem>
            ))}
          </Select>

          <DatePicker
            className=""
            label="Due Date"
            labelPlacement="outside-left"
            value={selectDate}
            onChange={setSelectDate}
          />

          <Select
            {...register("isAssigned")}
            labelPlacement="outside-left"
            label="Is Assigned"
            placeholder="Select Is Assigned"
            className="flex items-center"
          >
            <SelectItem key="true">True</SelectItem>
            <SelectItem key="false">False</SelectItem>
          </Select>
          <TimeInput
            label="Estimated Hour"
            labelPlacement="outside-left"
            value={timeDuration}
            onChange={setTimeDuration}
          />

          <Select
            {...register("priority", { required: "Priority is required" })}
            labelPlacement="outside-left"
            label="Priority"
            placeholder="Select Priorty"
            className="flex items-center "
          >
            <SelectItem key="low">Low</SelectItem>
            <SelectItem key="medium">Medium</SelectItem>
            <SelectItem key="high">High</SelectItem>
          </Select>
          {/* {errors.priority && <span>{errors.priority.message}</span>} */}
          <div className="flex items-center justify-between">
            <Button color="primary" className="text-lg" type="submit">
              Save
            </Button>
            <Link
              to="/"
              className="bg-blue-600 hover:scale-105 transition-all duration-400 text-white p-2 rounded-lg flex items-center gap-3 max-w-[150px] justify-center"
            >
              Go to home
              <span>
                <FaArrowRight />
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;
