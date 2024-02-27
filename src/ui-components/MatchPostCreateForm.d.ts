/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type MatchPostCreateFormInputValues = {
    title?: string;
    description?: string;
    street?: string;
    townCity?: string;
    county?: string;
    postcode?: string;
    team?: string;
    coach?: string;
};
export declare type MatchPostCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    street?: ValidationFunction<string>;
    townCity?: ValidationFunction<string>;
    county?: ValidationFunction<string>;
    postcode?: ValidationFunction<string>;
    team?: ValidationFunction<string>;
    coach?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MatchPostCreateFormOverridesProps = {
    MatchPostCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    street?: PrimitiveOverrideProps<TextFieldProps>;
    townCity?: PrimitiveOverrideProps<TextFieldProps>;
    county?: PrimitiveOverrideProps<TextFieldProps>;
    postcode?: PrimitiveOverrideProps<TextFieldProps>;
    team?: PrimitiveOverrideProps<TextFieldProps>;
    coach?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MatchPostCreateFormProps = React.PropsWithChildren<{
    overrides?: MatchPostCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MatchPostCreateFormInputValues) => MatchPostCreateFormInputValues;
    onSuccess?: (fields: MatchPostCreateFormInputValues) => void;
    onError?: (fields: MatchPostCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MatchPostCreateFormInputValues) => MatchPostCreateFormInputValues;
    onValidate?: MatchPostCreateFormValidationValues;
} & React.CSSProperties>;
export default function MatchPostCreateForm(props: MatchPostCreateFormProps): React.ReactElement;
