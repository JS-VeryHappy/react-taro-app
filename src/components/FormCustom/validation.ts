import { isPromise } from '@/utils';
import type { RulesType } from './types';
import * as customValidator from '@/utils/validator';

function isEmptyValue(value: any) {
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (value === 0) {
    return false;
  }
  return !value;
}

function getRuleMessage(value: any, rule: RulesType) {
  const { message } = rule;

  if (typeof message === 'function') {
    return message(value, rule);
  }
  return message;
}

async function getSyncRule(value: any, rule: RulesType) {
  if (rule.required && isEmptyValue(value)) {
    return Promise.resolve(getRuleMessage(value, rule));
  }

  if (rule.pattern && !rule.pattern.test(String(value))) {
    return Promise.resolve(getRuleMessage(value, rule));
  }

  if (rule.type && customValidator[rule.type]) {
    try {
      await customValidator[rule.type](rule, value);
    } catch (error) {
      return Promise.resolve(getRuleMessage(value, rule));
    }
  }
  if (rule.min) {
    if (typeof value === 'number') {
      if (value < rule.min) {
        return Promise.resolve(getRuleMessage(value, rule));
      }
    } else {
      if (value.length < rule.min) {
        return Promise.resolve(getRuleMessage(value, rule));
      }
    }
  }

  if (rule.max) {
    if (typeof value === 'number') {
      if (value > rule.max) {
        return Promise.resolve(getRuleMessage(value, rule));
      }
    } else {
      if (value.length > rule.max) {
        return Promise.resolve(getRuleMessage(value, rule));
      }
    }
  }
}

function getValidatorRule(value: any, rule: RulesType) {
  return new Promise<any>((resolve) => {
    const promise: any = rule.validator?.(value, rule);
    if (isPromise(promise)) {
      promise
        .then((error) => (_.isBoolean(error) && !error ? getRuleMessage(value, rule) : error))
        .then(resolve);
      return;
    }

    if (_.isBoolean(promise) && !promise) {
      resolve(getRuleMessage(value, rule));
      return;
    }
    resolve(promise);
  });
}

function validateRule(value: any, rule: RulesType): Promise<any> {
  return getSyncRule(value, rule) ?? getValidatorRule(value, rule);
}

export function validateRules(value: any, rules: RulesType[]): Promise<any[]> {
  return rules.reduce(
    (promise, rule) =>
      promise.then((errors) => {
        if (rule.formatter) {
          // eslint-disable-next-line no-param-reassign
          value = rule.formatter(value, rule);
        }

        return validateRule(value, rule).then((error) => {
          if (error) {
            errors.push(error);
          }
          return errors;
        });
      }),
    Promise.resolve<any[]>([]),
  );
}
