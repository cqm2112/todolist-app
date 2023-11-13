import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import {  useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiUrl } from '../../global';
import { useAuth } from "../authContext";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function CreateTask(props) {
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [status, setStatus] = useState("0");
 const [validated, setValidated] = useState(false);
 const [selectedDate, setSelectedDate] = useState(null);
 const [isDisabledButton, setIsDisabledButton ] = useState(false)
 
 const { token } = useAuth();
 const handleSubmit = async (e) => {
  const form = e.currentTarget;

  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    e.preventDefault(); 
    setIsDisabledButton(true);
   var date = new Date()
    const postData = {
      title: title,
      description: description,
      createdDate: date.toISOString(),
      dueDate: selectedDate,
      status: Number(status),
    };

    var response = await fetch(ApiUrl, {
      method: "POST",
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

  setValidated(true);
};

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Crear Tarea
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}  noValidate validated={validated} >
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
        <Form.Control  required as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} />
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
      <Form.Group className="mb-3 flex flex-col w-full" noValidate >
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
                <Button type='submit' disabled={isDisabledButton}>Crear</Button>
            </Modal.Footer>
    </Form>
        </Modal>
    );
    }


export default CreateTask;