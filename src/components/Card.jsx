import { useState } from "react";
import TrashIcon from "../icons/trash-icon.png";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditTask from "./EditTaskModal";




function Card({ task, deleteTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [isDelitingTask, setIsDelitingTask] = useState(false)




  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {

    if (!isDelitingTask && !modalEditShow) {
      setEditMode(true)
      setModalEditShow(true)
    }
  };

  if (isDragging) {

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-secondaryBackgroundColor cursor-grab relative
      "
      />
    );
  }



  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className={`${new Date(task.dueDate) < new Date() && task.status == 0 ? "bg-red-600" : "bg-mainBackgroundColor"} p-2.5 h-[100px]  min-h-[100px] items-center flex flex-col text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-secondaryBackgroundColor cursor-grab relative task`}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div className="w-full border-b-2  flex flex-row justify-between solid border-secondaryBackgroundColor ">
        <h6 className="text-xs">
          {task.title}
        </h6>
        <h6 className="text-xs">{new Date(task.createdDate).toLocaleDateString('es-ES')} - {new Date(task.dueDate).toLocaleDateString('es-ES')}</h6>
      </div>
      <div className="p-2">

        <textarea className="bg-transparent resize-none " rows={2} cols={35} readOnly value={task.description} />
      </div>

      {mouseIsOver && (

        <button
          onMouseOver={() => {
            setIsDelitingTask(true);
          }}
          onMouseLeave={() => {
            setIsDelitingTask(false);
          }}
          onClick={() => {
            deleteTask(task.id);
            setIsDelitingTask(false);
          }}
          className="stroke-white absolute z-10 right-2 top-20 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <img src={TrashIcon} className="w-4" />
        </button>
      )
      }
      {modalEditShow && (
        <EditTask show={modalEditShow} onHide={() => setModalEditShow(false)} task={task} />
      )}

    </div>
  );
}

export default Card;
