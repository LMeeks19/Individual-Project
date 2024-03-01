/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TeamPlayerCreateFormInputValues = {
    name?: string;
    age?: string;
    kitNumber?: number;
    positions?: string;
    teamID?: string;
};
export declare type TeamPlayerCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    age?: ValidationFunction<string>;
    kitNumber?: ValidationFunction<number>;
    positions?: ValidationFunction<string>;
    teamID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeamPlayerCreateFormOverridesProps = {
    TeamPlayerCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<SelectFieldProps>;
    kitNumber?: PrimitiveOverrideProps<TextFieldProps>;
    positions?: PrimitiveOverrideProps<SelectFieldProps>;
    teamID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TeamPlayerCreateFormProps = React.PropsWithChildren<{
    overrides?: TeamPlayerCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TeamPlayerCreateFormInputValues) => TeamPlayerCreateFormInputValues;
    onSuccess?: (fields: TeamPlayerCreateFormInputValues) => void;
    onError?: (fields: TeamPlayerCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeamPlayerCreateFormInputValues) => TeamPlayerCreateFormInputValues;
    onValidate?: TeamPlayerCreateFormValidationValues;
} & React.CSSProperties>;
export default function TeamPlayerCreateForm(props: TeamPlayerCreateFormProps): React.ReactElement;
