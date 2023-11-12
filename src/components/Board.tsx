import { useEffect, useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./Column";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Card from "./Card";
import Swal from "sweetalert2";
// @ts-expect-error ...
import CreateTask from "./CreateTaskModal";
// @ts-expect-error ...
import { ApiUrl } from '../../global';
import { useAuth } from "../authContext";

const defaultCols: Column[] = [
  {
    id: 0,
    title: "Todo",
  },
  {
    id: 1,
    title: "Done",
  },
];

function Board() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [modalShow, setModalShow] = useState(false);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ApiUrl,
          {
            // @ts-expect-error ...
            headers: {
              'UserKey': token,
            }
          })
        if (response.ok) {

          const data = await response.json();
          if (data.length === 0) {
            Swal.fire("Informacion", `Con el código ${token} podrás acceder a tus notas desde cualquier parte del mundo. Siempre podrás visualizar tu código desde el menú. Si al cerrar sesión no tienes tareas registradas, la cuenta se eliminará automáticamente.`, "info");
          }


          setTasks(data);
        } else {
          Swal.fire("Error inesperado", "intente mas tarde o recarga la pagina", "error");
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchData();
  }, [token]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.status === col.id)}
                />
              ))}
            </SortableContext>
          </div>

        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.status === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <Card
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}

              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <CreateTask show={modalShow} onHide={() => setModalShow(false)} />
    </div>

  );

  function createTask() {

    setModalShow(true);

  }

  async function deleteTask(id: Id) {



    Swal.fire({
      title: "Estas seguro?",
      text: "No podras reversas esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        const response = await fetch(`${ApiUrl}/${id}`, {
          method: 'DELETE',
          // @ts-expect-error fff
          headers: {
            'Content-Type': 'application/json',
            'UserKey': token,
          },


        });
        if (response.ok) {
          const newTasks = tasks.filter((task) => task.id !== id);
          setTasks(newTasks);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else {
          Swal.fire("Error inesperado", "intente mas tarde", "error");
        }

      }
    });

  }

  function updateTask(id: Id, content: string) {
    alert("hola")
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }


  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {

    if (event.active.data.current?.type === "Task") {

      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  async function onDragEnd(event: DragEndEvent) {
    console.log(event)
    if (event.active.data.current != undefined) {
      const postData = {
        id: event.active.data.current.task.id,
        title: event.active.data.current.task.title,
        description: event.active.data.current.task.description,
        createdDate: "2023-11-11T20:25:54.157Z",
        status: Number(event.active.data.current.task.status)
      }
      await fetch(`${ApiUrl}/${postData.id}`, {
        method: 'PUT',
        // @ts-expect-error fff
        headers: {
          'Content-Type': 'application/json',
          'UserKey': token,

        },
        body: JSON.stringify(postData),
      });
    }
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].status != tasks[overIndex].status) {
          // Fix introduced after video recording
          tasks[activeIndex].status = tasks[overIndex].status;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].status = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}



export default Board;
