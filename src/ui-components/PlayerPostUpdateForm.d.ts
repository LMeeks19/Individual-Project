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
export declare type PlayerPostUpdateFormInputValues = {
    title?: string;
    description?: string;
    ageGroup?: string;
    positionsNeeded?: string[];
    numOfPlayersNeeded?: number;
    skillLevel?: string;
    kickOff?: string;
    street?: string;
    townCity?: string;
    county?: string;
    postcode?: string;
};
export declare type PlayerPostUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    ageGroup?: ValidationFunction<string>;
    positionsNeeded?: ValidationFunction<string>;
    numOfPlayersNeeded?: ValidationFunction<number>;
    skillLevel?: ValidationFunction<string>;
    kickOff?: ValidationFunction<string>;
    street?: ValidationFunction<string>;
    townCity?: ValidationFunction<string>;
    county?: ValidationFunction<string>;
    postcode?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PlayerPostUpdateFormOverridesProps = {
    PlayerPostUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    ageGroup?: PrimitiveOverrideProps<SelectFieldProps>;
    positionsNeeded?: PrimitiveOverrideProps<SelectFieldProps>;
    numOfPlayersNeeded?: PrimitiveOverrideProps<TextFieldProps>;
    skillLevel?: PrimitiveOverrideProps<SelectFieldProps>;
    kickOff?: PrimitiveOverrideProps<TextFieldProps>;
    street?: PrimitiveOverrideProps<TextFieldProps>;
    townCity?: PrimitiveOverrideProps<TextFieldProps>;
    county?: PrimitiveOverrideProps<TextFieldProps>;
    postcode?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PlayerPostUpdateFormProps = React.PropsWithChildren<{
    overrides?: PlayerPostUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    playerPost?: any;
    onSubmit?: (fields: PlayerPostUpdateFormInputValues) => PlayerPostUpdateFormInputValues;
    onSuccess?: (fields: PlayerPostUpdateFormInputValues) => void;
    onError?: (fields: PlayerPostUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PlayerPostUpdateFormInputValues) => PlayerPostUpdateFormInputValues;
    onValidate?: PlayerPostUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PlayerPostUpdateForm(props: PlayerPostUpdateFormProps): React.ReactElement;
