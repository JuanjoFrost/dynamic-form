import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const InputField = ({ label, name, type, value, isRequired, disabled, onChange, ...rest }) => (
    <div className="flex flex-col items-center m-3 w-full">
        <label htmlFor={name} className="m-1">
            {label + (isRequired ? '*' : '')}
        </label>
        <TextField
            label={label}
            name={name}
            type={type.toLowerCase()}
            value={value || ''}
            color="secondary"
            required={isRequired}
            disabled={disabled}
            onChange={onChange}
            {...rest}
        />
    </div>
);

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    isRequired: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default InputField;
