/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps } from "@aws-amplify/ui-react";
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
export declare type RegisterPlayerPostPlayerFormInputValues = {
    interestedUsers?: any[];
    registeredPlayers?: any[];
};
export declare type RegisterPlayerPostPlayerFormValidationValues = {
    interestedUsers?: ValidationFunction<any>;
    registeredPlayers?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RegisterPlayerPostPlayerFormOverridesProps = {
    RegisterPlayerPostPlayerFormGrid?: PrimitiveOverrideProps<GridProps>;
    interestedUsers?: PrimitiveOverrideProps<AutocompleteProps>;
    registeredPlayers?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type RegisterPlayerPostPlayerFormProps = React.PropsWithChildren<{
    overrides?: RegisterPlayerPostPlayerFormOverridesProps | undefined | null;
} & {
    id?: string;
    playerPost?: any;
    onSubmit?: (fields: RegisterPlayerPostPlayerFormInputValues) => RegisterPlayerPostPlayerFormInputValues;
    onSuccess?: (fields: RegisterPlayerPostPlayerFormInputValues) => void;
    onError?: (fields: RegisterPlayerPostPlayerFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RegisterPlayerPostPlayerFormInputValues) => RegisterPlayerPostPlayerFormInputValues;
    onValidate?: RegisterPlayerPostPlayerFormValidationValues;
} & React.CSSProperties>;
export default function RegisterPlayerPostPlayerForm(props: RegisterPlayerPostPlayerFormProps): React.ReactElement;
