import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import Confetti from 'react-confetti';

const InfoModal = ({ dataForm, toggleModal, openModal, showConfetti }) => {
    if (!dataForm.data) return null;
    return (
        <div>
            <Dialog open={openModal} onClose={openModal}>
                <DialogTitle>Información del Formulario</DialogTitle>
                <DialogContent>
                    {dataForm.data.map((campo) => (
                        <div key={campo.name}>
                            <p><strong>{campo.label}:</strong> {campo.value || 'No ingresado'}</p>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal} color="secondary">Cerrar</Button>
                </DialogActions>
            </Dialog>
            {showConfetti && <Confetti className= "" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%'}} />}
        </div>
    );
};

export default InfoModal;