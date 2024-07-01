import React from "react";
import CreateTaskForm from "../../sharedComponent/CreateTaskForm";

const CreatePage = (props: any) => {
  return (
    <div>
      <div className="text-center text-2xl text-black/80 font-semibold my-5">
        CREATE NEW TASK
      </div>
      <CreateTaskForm />
    </div>
  );
};

export default CreatePage;
