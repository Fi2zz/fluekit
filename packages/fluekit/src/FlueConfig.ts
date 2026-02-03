import { InjectionKey, inject, provide } from "vue";

export interface FlueConfigsProps {
  transform?: boolean;
  designWidth?: number;
  assetBaseURL?: string;
  toastCount?: number;
  lineHeight?: number | string;
}
export const FlueConfigInjectionKey: InjectionKey<FlueConfigsProps> = Symbol("FlueConfig");
export const useFlueConfig = () => inject(FlueConfigInjectionKey);
export const provideFlueConfig = (config: FlueConfigsProps) =>
  provide(FlueConfigInjectionKey, config);
