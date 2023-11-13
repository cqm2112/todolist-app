import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiUrl } from '../../global';
import { useAuth } from "../authContext";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



function EditTask(props) {
  console.log(props)
  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.description);
  const [status, setStatus] = useState(props.task.status);
  const [validated, setValidated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(props.task.dueDate));
  const [isDisabledButton, setIsDisabledButton ] = useState(false)
  const { token } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = e.currentTarget;

      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true); 
      } else {
        setIsDisabledButton(true);
        const postData = {
          id: props.task.id,
          title: title,
          description: description,
          createdDate: props.task.createdDate,
          dueDate: selectedDate,
          status: Number(status),
        };

        const response = await fetch(`${ApiUrl}/${props.task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            UserKey: token,
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          window.location.reload();
        } else {
          Swal.fire("Error inesperado", "intente más tarde", "error");
          setIsDisabledButton(false);
        }
      }
    } catch (error) {
      Swal.fire("Error inesperado", "intente más tarde", "error");
    }
  };


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          editar Tarea
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate validated={validated} >
        <Modal.Body>
          <Form.Group className="mb-3" >
            <Form.Label>Titulo:</Form.Label>
            <Form.Control required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Lavar platos" />
            <Form.Control.Feedback type="invalid">
              Por favor escriba un titulo
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Descripcion:</Form.Label>
            <Form.Control required as="textarea" value={description} rows={3} onChange={(e) => setDescription(e.target.value)} />
            <Form.Control.Feedback type="invalid">
              Por favor escriba una descripcion
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Estado:</Form.Label>
            <Form.Select onChange={(e) => setStatus(e.target.value)} value={status} aria-label="Default select example">
              <option value="0">Pendiente</option>
              <option value="1">Lista</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 flex flex-col w-full"  >
            <Form.Label>Vencimiento-opcional:</Form.Label>
            <DatePicker
              selected={selectedDate}
        
              onChange={(date) => setSelectedDate(date)}
              className="form-control"
              noValidate
              placeholderText="Selecciona un fecha de vencimiento para esta tarea"
            />

          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button type='submit' disabled={isDisabledButton}>Editar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default EditTask;