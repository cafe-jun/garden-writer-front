import React from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

import styles from './IncreateInput.module.scss';

interface IncreateInputProps<T extends FieldValues> {
  type?: string;
  valuePayload: Path<T>;
  label: string;
  placeholder: string;
}

export const IncreaseInput = <T extends FieldValues>({
  type = 'text',
  valuePayload,
  label,
  placeholder,
}: IncreateInputProps<T>) => {
  const { getValues, control, setValue } = useFormContext<T>();

  const inputFieldValue = getValues(valuePayload);

  const handleChange = (index: number, link: string) => {
    // setValue(`${valuePayload}[${index}].link`, link);
  };

  return (
    <div>
      <div className={styles.formItemContainer}>
        <p className={styles.formLabel}>{label}</p>
        <div className={styles.inputWithButtonContainer}>
          {/* {inputFieldValue.map((item: Portfolio, index: number) => (
            <div key={index}>
              <Controller
                name={valuePayload}
                control={control}
                defaultValue={item.link}
                render={({ field }) => (
                  <input {...field} onChange={e => handleChange(index, e.target.value)} />
                )}
              />
            </div>
          ))} */}
        </div>
      </div>
      <button type="button">+</button>
    </div>
  );
};
