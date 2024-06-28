import {
  Button,
  Chip,
  DatePicker,
  Input,
  Select,
  SelectedItems,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Members, TaskState } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";

// type FormValues = {
//   title: string;
//   status: string;
//   members: Members[];
//   dueDate: Date;
//   isAssigned: boolean;
//   estimatedHour: string;
//   priority: string;
// };

const FormSection = () => {
  const members: Members[] = useSelector((state: RootState) => state.members);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskState>();

  const onSubmit: SubmitHandler<TaskState> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center my-10 px-3 items-center w-[100%] ">
      <div className="">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("title", { required: "Task Title is required" })}
            type="text"
            label="Task Title"
            labelPlacement="outside-left"
            placeholder="Task title"
            className="w-full "
          />
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
            items={members}
            labelPlacement="outside-left"
            label="Assigned Members"
            className="max-w-[500px] flex items-center"
            selectionMode="multiple"
            placeholder="Select Assigned Team Members"
            // renderValue={(items: SelectedItems<Members>) => {
            //   return (
            //     <div className="flex flex-wrap gap-2">
            //       {items.map((item) => {
            //         console.log(items);
            //         return <Chip key={item.key}>{item.textValue}</Chip>;
            //       })}
            //     </div>
            //   );
            // }}
            onSelectionChange={(items) => console.log(items)}
          >
            {members.map((i) => (
              <SelectItem key={i.id}>{i.name}</SelectItem>
            ))}
          </Select>
          <DatePicker
            label="Due Date"
            labelPlacement="outside-left"
            className="max-w-[284px]"
            onChange={(date) => console.log(date)}
          />
          <Select
            {...register("isAssigned", {
              required: "Assignment status is required",
            })}
            labelPlacement="outside-left"
            label="Is Assigned"
            placeholder="Select Is Assigned"
            className="flex items-center "
          >
            <SelectItem key="true">True</SelectItem>
            <SelectItem key="false">False</SelectItem>
          </Select>
          {errors.isAssigned && <span>{errors.isAssigned.message}</span>}
          <TimeInput label="Estimated Hour" labelPlacement="outside-left" />
          {errors.estimatedHour && <span>{errors.estimatedHour.message}</span>}
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
          {errors.priority && <span>{errors.priority.message}</span>}
          <Button color="primary" className="text-lg" type="submit">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormSection;
