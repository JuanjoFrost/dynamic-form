"use client";

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Checkbox,
    FormControl,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Select,
    MenuItem
} from '@mui/material';
import InfoModal from '@/app/components/forms/InfoModal';
import InputField from '../common/InputField';
import { getApi } from '@/app/utils/api';

const DynamicForm = () => {
    const [dataForm, setDataForm] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const toggleModal = () => {
        if (!dataForm.data) {
            alert('Ingrese data para generar formulario 😞');
            return;
        }
        if (verifyData()) {
            setOpenModal(!openModal);
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
            }, 5000);
        }
    };

    useEffect(() => {
        obtenerDatosApi();
    }, []);

    const obtenerDatosApi = async () => {
        try {
            const response = await getApi('https://run.mocky.io/v3/5320545a-7539-4c71-9730-8f9f4de3aec6');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const text = await response.text();
    
            // Corregir el JSON
            const correctedJson = text
                .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Arreglar las claves
                .replace(/'/g, '"') // Arreglar las comillas
                .replace(/,(\s*[}\]])/g, '$1'); // Eliminar comas innecesarias antes de los corchetes y llaves
    
            const datosApi = JSON.parse(correctedJson);
            
            setDataForm(datosApi);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    }

    const verifyData = () => {
        const data = dataForm.data;
        const requiredFields = data.filter((field) => field.isRequired);
        const emptyFields = requiredFields.filter((field) => {
            if (field.type === 'Checkbox') {
                return field.value.length === 0;
            }
            return field.value === '';
        });
        if (emptyFields.length > 0) {
            alert(`Faltan campos por completar: ${emptyFields.map((field) => field.label).join(', ')}`);
            return false;
        }
        return true;
    }

    const updateData = (value, fieldName) => {
        setDataForm((currentState) => {
            const updatedData = currentState.data.map((field) => {
                if (field.name === fieldName) {
                    return { ...field, value: value };
                }
                return field;
            });
            return { ...currentState, data: updatedData };
        });
    }

    const generateForm = () => {
        if (!dataForm.data) {
            return (
            <>
                <p className="text-center">Ingrese data para generar formulario 😞</p>
                <p></p>
            </>
            );
        }
        return dataForm.data.map((field, index) => {
            const { label, name, type, value, isRequired, disabled, options } = field;
            if (!label || !name || isRequired === undefined || disabled === undefined || !type || value === undefined) {
                return <p key={index}>Formato de json N° {index + 1} es incorrecto. Por favor verifique.</p>;
            }
            let inputComponent;
            switch (type.toLowerCase()) {
                case 'radio':
                    inputComponent = (
                        <div>
                            <InputLabel className="text-center">{label}</InputLabel>
                            <RadioGroup
                                key={index}
                                name={name}
                                label={label}
                                value={value || ''}
                                required={isRequired}
                                disabled={disabled}
                                onChange={(event) => updateData(event.target.value, name)}
                            >
                                {options.map((option, optionIndex) => (
                                    <FormControlLabel
                                        key={optionIndex}
                                        control={<Radio />}
                                        label={option.label}
                                        value={option.value}
                                    />
                                ))}
                            </RadioGroup>
                        </div>
                    );
                    break;
                case 'select':
                    inputComponent = (
                        <div>
                            <InputLabel className='text-center'>{label}</InputLabel>
                            <FormControl key={index} className='w-40'>
                                <InputLabel>Ingrese país</InputLabel>
                                <Select
                                    value={value || ''}
                                    onChange={(e) => updateData(e.target.value, name)}
                                    name={name}
                                    required={isRequired}
                                    disabled={disabled}
                                >
                                    {options.map((option, idx) => (
                                        <MenuItem key={idx} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    );
                    break;
                case 'checkbox':
                    inputComponent = (
                        <div>
                            <InputLabel className="text-center">{label}</InputLabel>
                            <FormGroup key={index} row>
                                {options.map((option, optionIndex) => (
                                    <FormControlLabel
                                        key={optionIndex}
                                        control={
                                            <Checkbox
                                                checked={value.includes(option.value)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        updateData([...value, option.value], name);
                                                    } else {
                                                        updateData(value.filter(val => val !== option.value), name);
                                                    }
                                                }}
                                            />
                                        }
                                        label={option.label}
                                        value={option.value}
                                        required={option.isRequired}
                                    />
                                ))}
                            </FormGroup>
                        </div>
                    );
                    break;
                default:
                    inputComponent = (
                        <InputField
                            key={index}
                            label={label}
                            name={name}
                            type={type.toLowerCase()}
                            value={value || ''}
                            color="secondary"
                            required={isRequired}
                            disabled={disabled}
                            onChange={(e) => updateData(e.target.value, name)}
                            {...(type.toLowerCase() === 'date' || type.toLowerCase() === 'file' ? { InputLabelProps: { shrink: true } } : {})}
                        />
                    );
            }
            return (
                <div key={index} className="flex flex-col items-center mb-2">
                    {inputComponent}
                </div>
            );
        });
    };

    return (
        <div>
            <Container maxWidth="sm" className="bg-gray-100 rounded-lg p-3 shadow-2xl">
                <div className="grid grid-cols-2 items-center justify-center">
                    {generateForm()}
                </div>
            </Container>
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={toggleModal}
                className="w-full"
            >
                Mostrar información
            </Button>
            <InfoModal
                dataForm={dataForm}
                toggleModal={toggleModal}
                openModal={openModal}
                showConfetti={showConfetti}
            />
        </div>
    );
};

DynamicForm.propTypes = {
    dataForm: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            isRequired: PropTypes.bool,
            disabled: PropTypes.bool,
            type: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
            options: PropTypes.arrayOf(PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            }))
        }))
    }).isRequired,
    openModal: PropTypes.bool.isRequired,
    setDataForm: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    generateForm: PropTypes.func.isRequired,
};

export default DynamicForm;

