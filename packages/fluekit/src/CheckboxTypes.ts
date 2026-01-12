import { Ref, InjectionKey } from "vue";

export interface CheckboxGroupContext<T = any> {
  value: Ref<T[]>;
  disabled: Ref<boolean>;
  updateValue: (val: T) => void;
}

export const CheckboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol("CheckboxGroup");
