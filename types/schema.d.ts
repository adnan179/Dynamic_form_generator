export interface Field{
  id:  string;
  type: string;
  label: string;
  required: boolean;
  placeholder ?: string;
  validation ?:{
    max: ValidationRule<string | number> | undefined;
    min: ValidationRule<string | number> | undefined;
    maxLength: ValidationRule<number> | undefined;
    minLength: ValidationRule<number> | undefined;
    pattern: string;
    message: string;
  };
  options ?: {value: string; label: string}[];
};

export interface FormSchema{
  formTitle: string;
  formDescription?: string;
  fields: Field[];
};
