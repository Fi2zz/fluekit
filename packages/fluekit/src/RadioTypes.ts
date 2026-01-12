import { Ref, InjectionKey } from "vue";

export interface RadioGroupContext<T = any> {
  groupValue: Ref<T | undefined>;
  updateValue: (val: T) => void;
  activeColor?: Ref<string | undefined>;
  disabled?: Ref<boolean>;
}

export const RadioGroupKey: InjectionKey<RadioGroupContext> = Symbol("RadioGroup");
