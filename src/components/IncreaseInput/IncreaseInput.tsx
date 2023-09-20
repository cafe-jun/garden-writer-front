import React from 'react';
import {
  ArrayPath,
  Controller,
  FieldArray,
  FieldValues,
  Path,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

import styles from './IncreateInput.module.scss';

interface IncreateInputProps<T extends FieldValues> {
  type?: string;
  valuePayload: ArrayPath<T>;
  label: string;
  placeholder: string;
}

export const IncreaseInput = <T extends FieldValues>({
  type = 'text',
  valuePayload,
  label,
  placeholder,
}: IncreateInputProps<T>) => {
  const { control } = useFormContext<T>();
  const { fields, append, update } = useFieldArray({
    control,
    name: valuePayload,
  });

  const addInput = () => {
    if (fields.length < 3) {
      append({ link: '' } as FieldArray<T, ArrayPath<T>>);
    }
  };

  return (
    <div>
      <div className={styles.formItemContainer}>
        <p className={styles.formLabel}>{label}</p>
        <div className={styles.inputWithButtonContainer}>
          {fields.map((item: any, index: number) => (
            <div key={index}>
              <Controller
                name={`${valuePayload}[${index}][link]` as Path<T>}
                control={control}
                defaultValue={item.link}
                render={({ field }) => (
                  <input
                    type={type}
                    {...field}
                    onBlur={e => {
                      field.onBlur();
                      update(index, { link: e.target.value } as FieldArray<T, ArrayPath<T>>);
                    }}
                  />
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={addInput}>
        +
      </button>
    </div>
  );
};
