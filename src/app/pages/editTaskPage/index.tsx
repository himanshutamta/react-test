import React, { useEffect, useState } from "react";
import EditTaskForm from "./EditTaskForm";
import { TaskState } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";

const EditPage = (props: any) => {
  const { userId } = useParams();
  const editable: TaskState[] = useSelector(
    (state: RootState) => state.tasks.alltask
  );
  const [selectTask, setSelectTask] = useState<TaskState | undefined>();
  useEffect(() => {
    const selectEdit = editable.filter((i) => i.taskId === Number(userId));
    setSelectTask(selectEdit[0]);
  }, [editable, userId]);

  return (
    <div>
      <div className="text-center text-2xl text-black/80 font-semibold my-5">
        EDIT TASK
      </div>
      {selectTask?.taskId && <EditTaskForm data={selectTask} />}
    </div>
  );
};

export default EditPage;
