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
export declare type PlayerCreateFormInputValues = {
    name?: string;
    dob?: string;
    ageGroup?: string;
    skillLevel?: string;
    positions?: string[];
    registeredPlayerPosts?: any[];
};
export declare type PlayerCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    dob?: ValidationFunction<string>;
    ageGroup?: ValidationFunction<string>;
    skillLevel?: ValidationFunction<string>;
    positions?: ValidationFunction<string>;
    registeredPlayerPosts?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PlayerCreateFormOverridesProps = {
    PlayerCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    dob?: PrimitiveOverrideProps<TextFieldProps>;
    ageGroup?: PrimitiveOverrideProps<SelectFieldProps>;
    skillLevel?: PrimitiveOverrideProps<SelectFieldProps>;
    positions?: PrimitiveOverrideProps<SelectFieldProps>;
    registeredPlayerPosts?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type PlayerCreateFormProps = React.PropsWithChildren<{
    overrides?: PlayerCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PlayerCreateFormInputValues) => PlayerCreateFormInputValues;
    onSuccess?: (fields: PlayerCreateFormInputValues) => void;
    onError?: (fields: PlayerCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PlayerCreateFormInputValues) => PlayerCreateFormInputValues;
    onValidate?: PlayerCreateFormValidationValues;
} & React.CSSProperties>;
export default function PlayerCreateForm(props: PlayerCreateFormProps): React.ReactElement;
