import React from 'react';
import {
  ArrayPath,
  Controller,
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
  const { control, setValue } = useFormContext<T>();
  const { fields, append, replace } = useFieldArray({
    control,
    name: valuePayload,
  });

  const addInput = () => {
    if (fields.length < 3) {
      append({ link: '' } as any);
    }
  };

  return (
    <div>
      <div className={styles.formItemContainer}>
        <p className={styles.formLabel}>{label}</p>
        <div className={styles.inputWithButtonContainer}>
          {fields.map((item: any, index) => (
            <div key={index}>
              <Controller
                name={`${valuePayload}[${index}].link` as Path<T>}
                control={control}
                defaultValue={item.link}
                render={({ field }) => (
                  <input
                    {...field}
                    onBlur={e => {
                      field.onBlur();
                      // replace(index, { link: e.target.value });
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
