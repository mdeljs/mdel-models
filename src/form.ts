import {isObject, Model} from "mdel";

namespace Validate {
  export type ErrorMessage = null | string;

  export interface Validator {
    (data: any): ErrorMessage;

    [index: string]: boolean
  }

  export type Validators = Validator[];

  export type RuleOptions = {
    errorMessage?: ErrorMessage
  };

  export interface Rule {
    (options?: RuleOptions): Validator;

    (param: any, options?: RuleOptions): Validator;
  }

  export interface Rules {
    [index: string]: Rule
  }
}

export type FormValues<FO extends FormFields> = {
  [P in keyof FO]: FO[P]['value'];
};

export interface FormField {
  value: any,
  error: Validate.ErrorMessage,
  readonly name: string,
  readonly validators: Validate.Validators,
}

export interface FormFields {
  [index: string]: FormField
}

export type FormData<F extends FormFields> = F & {
  loading: boolean,
}

export interface FormValidateOptions<F extends FormFields> {
  beforeValidate?(formData:FormValues<F>):FormValues<F>
}

export class FormModel<F extends FormFields, K extends keyof F> extends Model<FormData<F>> {
  static rules = {
    required(options: Validate.RuleOptions = {}) {
      const errorMessage: Validate.ErrorMessage = options.errorMessage || '必填';

      function validator(value) {
        if (['', undefined, null].includes(value)) {
          return errorMessage;
        }
        if (Array.isArray(value) && value.length === 0) {
          return errorMessage;
        }
        if (isObject(value) && Object.keys(value).length === 0) {
          return errorMessage;
        }
        return null;
      }

      validator.requiredValidator = true;

      return validator;
    }
  };

  fieldKeys: K[];
  initialValues: FormValues<F>;

  constructor(initialFields: { [P in K]: Partial<F[P]> & Pick<F[P], 'value'> }) {
    const keys = Object.keys(initialFields);
    const data = {
      loading: false,
      ...initialFields
    };
    //必填处理
    keys.forEach(key => {
      data[key].name = data[key].name || '';
      data[key].validators = data[key].validators ? data[key].validators.sort((a, b) => {
        if (a && a.requiredValidator === true) {
          return -1
        }
        return 1;
      }) : [];
      data[key].error = data[key].error || '';
    });

    super(data as FormData<F>);
    this.fieldKeys = keys as K[];
    this.initialValues = this.cloneValues();
  }


  setLoading(status) {
    this.setData({
      loading: status
    })
  }

  setValues(values: Partial<FormValues<F>>) {
    const newFields = {} as Partial<FormData<F>>;

    this.fieldKeys.forEach(key => {
      const field = newFields[key] = this.data[key];

      field['error'] = '';
      if (values.hasOwnProperty(key)) {
        field['value'] = values[key];
      }
    });

    this.setData(newFields)
  }

  resetValues(initialValues?: FormValues<F>) {
    this.setValues(initialValues || this.initialValues);
    this.initialValues = this.cloneValues();
  }

  validateValues(options:FormValidateOptions<F> = {}): Promise<FormValues<F>> {
    const sleep = time => new Promise(resolve => setTimeout(resolve, time));
    const beforeValidate = options.beforeValidate;

    return new Promise(async (resolve, reject) => {
      let errorMessage: Validate.ErrorMessage = null;
      const newFields = {} as Partial<FormData<F>>;
      const formData = beforeValidate ? beforeValidate(this.cloneValues()): this.cloneValues();

      this.fieldKeys.forEach(key => {
        const field = this.data[key];
        const isRequired = field.validators.length && field.validators[0] && field.validators[0].requiredValidator;

        if(!(key in formData)) return;
        if (!isRequired && !FormModel.rules.required()(field.value) === null) return;
        for (let validator of field.validators) {
          const error = validator(field.value);

          newFields[key] = {
            ...field,
          };
          if (error !== null) {
            newFields[key]['error'] = error;
            errorMessage = errorMessage || error;
            break;
          }
        }
      });
      await sleep(100);
      this.setData(newFields);
      if (errorMessage === null) {
        resolve(formData);
      } else {
        reject(errorMessage);
      }
    })
  }

  protected cloneValues(): FormValues<F> {
    const result = {} as FormValues<F>;

    this.fieldKeys.forEach(key => {
      result[key] = this.data[key].value;
    });

    return result;
  }
}
