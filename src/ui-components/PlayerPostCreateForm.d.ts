/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type PlayerPostCreateFormInputValues = {
    title?: string;
    description?: string;
    createdByName?: string;
    createdByProfileID?: string;
    ageGroup?: string;
    positionsNeeded?: string[];
    numOfPlayersNeeded?: number;
    skillLevel?: string;
    kickOff?: string;
    street?: string;
    townCity?: string;
    county?: string;
    postcode?: string;
    isActive?: boolean;
    interestedUsers?: any[];
    registeredPlayers?: any[];
    selectedPlayers?: string[];
};
export declare type PlayerPostCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    createdByName?: ValidationFunction<string>;
    createdByProfileID?: ValidationFunction<string>;
    ageGroup?: ValidationFunction<string>;
    positionsNeeded?: ValidationFunction<string>;
    numOfPlayersNeeded?: ValidationFunction<number>;
    skillLevel?: ValidationFunction<string>;
    kickOff?: ValidationFunction<string>;
    street?: ValidationFunction<string>;
    townCity?: ValidationFunction<string>;
    county?: ValidationFunction<string>;
    postcode?: ValidationFunction<string>;
    isActive?: ValidationFunction<boolean>;
    interestedUsers?: ValidationFunction<any>;
    registeredPlayers?: ValidationFunction<any>;
    selectedPlayers?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PlayerPostCreateFormOverridesProps = {
    PlayerPostCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    createdByName?: PrimitiveOverrideProps<TextFieldProps>;
    createdByProfileID?: PrimitiveOverrideProps<AutocompleteProps>;
    ageGroup?: PrimitiveOverrideProps<SelectFieldProps>;
    positionsNeeded?: PrimitiveOverrideProps<SelectFieldProps>;
    numOfPlayersNeeded?: PrimitiveOverrideProps<TextFieldProps>;
    skillLevel?: PrimitiveOverrideProps<SelectFieldProps>;
    kickOff?: PrimitiveOverrideProps<TextFieldProps>;
    street?: PrimitiveOverrideProps<TextFieldProps>;
    townCity?: PrimitiveOverrideProps<TextFieldProps>;
    county?: PrimitiveOverrideProps<TextFieldProps>;
    postcode?: PrimitiveOverrideProps<TextFieldProps>;
    isActive?: PrimitiveOverrideProps<SwitchFieldProps>;
    interestedUsers?: PrimitiveOverrideProps<AutocompleteProps>;
    registeredPlayers?: PrimitiveOverrideProps<AutocompleteProps>;
    selectedPlayers?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PlayerPostCreateFormProps = React.PropsWithChildren<{
    overrides?: PlayerPostCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PlayerPostCreateFormInputValues) => PlayerPostCreateFormInputValues;
    onSuccess?: (fields: PlayerPostCreateFormInputValues) => void;
    onError?: (fields: PlayerPostCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PlayerPostCreateFormInputValues) => PlayerPostCreateFormInputValues;
    onValidate?: PlayerPostCreateFormValidationValues;
} & React.CSSProperties>;
export default function PlayerPostCreateForm(props: PlayerPostCreateFormProps): React.ReactElement;
