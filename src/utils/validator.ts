import {isObject} from "mdel";

export type TType = 'required' | string;

export type TMessage = string;

export type TValidate = (rule: IRule, value: any) => boolean

export interface IRule {
  type: TType,
  message: TMessage,
  param?: any
}

export interface IValidator {
  type: TType,
  validate: TValidate
}
export interface IResult {
  status:boolean,
  message:TMessage,
  rule:IRule
}

const validators: IValidator[] = [];

function getIsEmpty(value) {
  if ([null, undefined, ''].includes(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

//添加验证器
export function addValidator(type: TType, validate: TValidate) {
  if (!validators.some(validate => validate.type === type)) {
    validators.push({
      type,
      validate
    })
  }
}

//校验数据
export function validateValue(rules: IRule[], value: any): TMessage {
  const required = rules.find(rule => rule.type === 'required');

  if (getIsEmpty(value)) {
    if (required) {
      return required.message;
    }
  } else {
    for (const rule of rules) {
      const validator = validators.find(item => item.type === rule.type);

      if (rule.type !== 'required' && validator && !validator.validate(rule, value)) {
        return rule.message;
      }
    }
  }

  return '';
}
