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
export declare type ProfileUpdateFormInputValues = {
    username?: string;
    name?: string;
    dob?: string;
    email?: string;
    accountType?: string;
    street?: string;
    townCity?: string;
    county?: string;
    postcode?: string;
    phoneNumber?: string;
};
export declare type ProfileUpdateFormValidationValues = {
    username?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    dob?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    accountType?: ValidationFunction<string>;
    street?: ValidationFunction<string>;
    townCity?: ValidationFunction<string>;
    county?: ValidationFunction<string>;
    postcode?: ValidationFunction<string>;
    phoneNumber?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfileUpdateFormOverridesProps = {
    ProfileUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    dob?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    accountType?: PrimitiveOverrideProps<TextFieldProps>;
    street?: PrimitiveOverrideProps<TextFieldProps>;
    townCity?: PrimitiveOverrideProps<TextFieldProps>;
    county?: PrimitiveOverrideProps<TextFieldProps>;
    postcode?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNumber?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfileUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProfileUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    profile?: any;
    onSubmit?: (fields: ProfileUpdateFormInputValues) => ProfileUpdateFormInputValues;
    onSuccess?: (fields: ProfileUpdateFormInputValues) => void;
    onError?: (fields: ProfileUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfileUpdateFormInputValues) => ProfileUpdateFormInputValues;
    onValidate?: ProfileUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProfileUpdateForm(props: ProfileUpdateFormProps): React.ReactElement;
