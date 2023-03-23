import { useState, useEffect } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type TVTextFieldProps = TextFieldProps & {
  name: string;
}

export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  const {
    fieldName,
    registerField,
    defaultValue,
    error, clearError
  } = useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName, // campo de registro
      getValue: () => value, // pega o valor do state
      setValue: (_, newValue) => setValue(newValue), //altera um novo valor que o value pode receber
    });

  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}

      error={!!error} // '!' -> tranforma de string para boolean. '!!' -> apos tranformar para boolean transforma em negativo.
      helperText={error}
      defaultValue={defaultValue}

      value={value}
      onChange={e => { setValue(e.target.value); rest.onChange?.(e); }}
      onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }}

    />

  );
};