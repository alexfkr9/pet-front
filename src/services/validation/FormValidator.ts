import validator from "validator";

interface ruleTypes {
  field: string;
  method: any;
  message: string;
  validWhen: boolean;
  args?: RegExp[] | undefined;
}

class FormValidator {
  validations: any;
  constructor(validations: ruleTypes[]) {
    this.validations = validations;
  }

  valid() {
    const validation: any = {};
    this.validations.map(
      (rule: ruleTypes) =>
        (validation[rule.field] = {
          isInvalid: false,
          message: ""
        })
    );
    return {
      isValid: true,
      ...validation
    };
  }

  validate(state: Record<string, ruleTypes>) {
    const validatorPackage: any = validator;
    const validation: any = this.valid();
    this.validations.forEach((rule: ruleTypes) => {
      if (validation[rule.field].isInvalid === false) {
        const fieldValue = state[rule.field];
        const args = rule.args ?? [];
        const validationMethod =
          typeof rule.method === "string"
            ? validatorPackage[rule.method]
            : rule.method;
        if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
          validation[rule.field] = {
            isInvalid: true,
            message: rule.message
          };
          validation.isValid = false;
        }
      }
    });
    return validation;
  }
}
export default FormValidator;
