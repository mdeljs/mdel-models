import { Model } from "mdel";
declare namespace Validate {
    type ErrorMessage = null | string;
    interface Validator {
        (data: any): ErrorMessage;
        [index: string]: boolean;
    }
    type Validators = Validator[];
    type RuleOptions = {
        errorMessage?: ErrorMessage;
    };
    interface Rule {
        (options?: RuleOptions): Validator;
        (param: any, options?: RuleOptions): Validator;
    }
    interface Rules {
        [index: string]: Rule;
    }
}
declare type FormValues<FO extends FormFields> = {
    [P in keyof FO]: FO[P]['value'];
};
interface FormField {
    value: any;
    error: Validate.ErrorMessage;
    readonly name: string;
    readonly validators: Validate.Validators;
}
interface FormFields {
    [index: string]: FormField;
}
export declare type FormData<F extends FormFields> = F & {
    loading: boolean;
};
export declare class FormModel<F extends FormFields, K extends keyof F> extends Model<FormData<F>> {
    static rules: {
        required(options?: Validate.RuleOptions): {
            (value: any): Validate.ErrorMessage;
            requiredValidator: boolean;
        };
    };
    fieldKeys: K[];
    initialValues: FormValues<F>;
    constructor(initialFields: {
        [P in K]: Partial<F[P]> & Pick<F[P], 'value'>;
    });
    setLoading(status: any): void;
    setValues(values: Partial<FormValues<F>>): void;
    resetValues(initialValues?: FormValues<F>): void;
    validateValues(): Promise<FormValues<F>>;
    protected cloneValues(): FormValues<F>;
}
export {};
