import Modal from 'react-bootstrap/Modal';
import { Button, ListGroup } from 'react-bootstrap';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../authContext";



function Menu(props) {
    const { token, setToken } = useAuth();
    console.log(token)
    const handleLogOut = () => {
        setToken(null);
        window.location.reload();
    }
    if (token != null) {

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Opciones
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label className='text-center p-4 w-full'>Puedes iniciar sesion con tu codigo secreto desde cualquier parte del mundo*</label>
                    <ListGroup>

                        <ListGroup.Item className='text-center font-bold'> <label>Codigo secreto: </label> {token}</ListGroup.Item>
                        <ListGroup.Item className='font-bold'> <label>Codigo Fuente Front: <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>
                        <ListGroup.Item className='font-bold'> <label>Codigo Fuente Api: <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>

                        <ListGroup.Item className='font-bold'> <label>Api: <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>

                        <ListGroup.Item className='font-bold'> <label>Valorar prueba tecnica <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>

                        <ListGroup.Item className='font-bold'> <label>Telemedik: <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button onClick={handleLogOut} variant='danger'>Cerrar sesion</Button>
                </Modal.Footer>

            </Modal>
        );
    } else {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Opciones
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label className='text-center p-4 w-full'>Puedes iniciar sesion con tu codigo secreto desde cualquier parte del mundo. Si al cerrar sesión no tienes tareas registradas, la cuenta se eliminará automáticamente.</label>
                    <ListGroup>

                        <ListGroup.Item className='text-center font-bold'>Inicia sesion</ListGroup.Item>
                        <ListGroup.Item className='font-bold'> <label>Codigo Fuente Front: <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>
                        <ListGroup.Item className='font-bold'> <label>Codigo Fuente Api: <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>

                        <ListGroup.Item className='font-bold'> <label>Api: <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>

                        <ListGroup.Item className='font-bold'> <label>Valorar prueba tecnica <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>

                        <ListGroup.Item className='font-bold'> <label>Telemedik: <a href='https://github.com/' target='_Blank'> Aqui</a> </label></ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>

            </Modal>
        );
    }
}


export default Menu;