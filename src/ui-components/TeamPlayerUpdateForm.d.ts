/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TeamPlayerUpdateFormInputValues = {
    name?: string;
    age?: number;
    kitNumber?: number;
    positions?: string[];
};
export declare type TeamPlayerUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    age?: ValidationFunction<number>;
    kitNumber?: ValidationFunction<number>;
    positions?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeamPlayerUpdateFormOverridesProps = {
    TeamPlayerUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<TextFieldProps>;
    kitNumber?: PrimitiveOverrideProps<TextFieldProps>;
    positions?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type TeamPlayerUpdateFormProps = React.PropsWithChildren<{
    overrides?: TeamPlayerUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    teamPlayer?: any;
    onSubmit?: (fields: TeamPlayerUpdateFormInputValues) => TeamPlayerUpdateFormInputValues;
    onSuccess?: (fields: TeamPlayerUpdateFormInputValues) => void;
    onError?: (fields: TeamPlayerUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeamPlayerUpdateFormInputValues) => TeamPlayerUpdateFormInputValues;
    onValidate?: TeamPlayerUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TeamPlayerUpdateForm(props: TeamPlayerUpdateFormProps): React.ReactElement;
