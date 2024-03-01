/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getMatchPost } from "../graphql/queries";
import { updateMatchPost } from "../graphql/mutations";
const client = generateClient();
export default function MatchPostUpdateForm(props) {
  const {
    id: idProp,
    matchPost: matchPostModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const { tokens } = useTheme();
  const initialValues = {
    title: "",
    description: "",
    gameType: "",
    ageGroup: "",
    teamSize: "",
    substitutionLimit: false,
    cards: false,
    halfLength: "",
    kickOff: "",
    street: "",
    townCity: "",
    county: "",
    postcode: "",
    teamName: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [gameType, setGameType] = React.useState(initialValues.gameType);
  const [ageGroup, setAgeGroup] = React.useState(initialValues.ageGroup);
  const [teamSize, setTeamSize] = React.useState(initialValues.teamSize);
  const [substitutionLimit, setSubstitutionLimit] = React.useState(
    initialValues.substitutionLimit
  );
  const [cards, setCards] = React.useState(initialValues.cards);
  const [halfLength, setHalfLength] = React.useState(initialValues.halfLength);
  const [kickOff, setKickOff] = React.useState(initialValues.kickOff);
  const [street, setStreet] = React.useState(initialValues.street);
  const [townCity, setTownCity] = React.useState(initialValues.townCity);
  const [county, setCounty] = React.useState(initialValues.county);
  const [postcode, setPostcode] = React.useState(initialValues.postcode);
  const [teamName, setTeamName] = React.useState(initialValues.teamName);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = matchPostRecord
      ? { ...initialValues, ...matchPostRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setGameType(cleanValues.gameType);
    setAgeGroup(cleanValues.ageGroup);
    setTeamSize(cleanValues.teamSize);
    setSubstitutionLimit(cleanValues.substitutionLimit);
    setCards(cleanValues.cards);
    setHalfLength(cleanValues.halfLength);
    setKickOff(cleanValues.kickOff);
    setStreet(cleanValues.street);
    setTownCity(cleanValues.townCity);
    setCounty(cleanValues.county);
    setPostcode(cleanValues.postcode);
    setTeamName(cleanValues.teamName);
    setErrors({});
  };
  const [matchPostRecord, setMatchPostRecord] =
    React.useState(matchPostModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMatchPost.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMatchPost
        : matchPostModelProp;
      setMatchPostRecord(record);
    };
    queryData();
  }, [idProp, matchPostModelProp]);
  React.useEffect(resetStateValues, [matchPostRecord]);
  const validations = {
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    gameType: [{ type: "Required" }],
    ageGroup: [{ type: "Required" }],
    teamSize: [{ type: "Required" }],
    substitutionLimit: [{ type: "Required" }],
    cards: [{ type: "Required" }],
    halfLength: [{ type: "Required" }],
    kickOff: [{ type: "Required" }],
    street: [{ type: "Required" }],
    townCity: [{ type: "Required" }],
    county: [{ type: "Required" }],
    postcode: [{ type: "Required" }],
    teamName: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap={tokens.space.xxs.value}
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          description,
          gameType,
          ageGroup,
          teamSize,
          substitutionLimit,
          cards,
          halfLength,
          kickOff,
          street,
          townCity,
          county,
          postcode,
          teamName,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateMatchPost.replaceAll("__typename", ""),
            variables: {
              input: {
                id: matchPostRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MatchPostUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextAreaField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextAreaField>
      <SelectField
        label="Game type"
        placeholder="Please select an option"
        isDisabled={false}
        value={gameType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType: value,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.gameType ?? value;
          }
          if (errors.gameType?.hasError) {
            runValidationTasks("gameType", value);
          }
          setGameType(value);
        }}
        onBlur={() => runValidationTasks("gameType", gameType)}
        errorMessage={errors.gameType?.errorMessage}
        hasError={errors.gameType?.hasError}
        {...getOverrideProps(overrides, "gameType")}
      >
        <option
          children="Friendly"
          value="FRIENDLY"
          {...getOverrideProps(overrides, "gameTypeoption0")}
        ></option>
        <option
          children="League"
          value="LEAGUE"
          {...getOverrideProps(overrides, "gameTypeoption1")}
        ></option>
        <option
          children="Cup"
          value="CUP"
          {...getOverrideProps(overrides, "gameTypeoption2")}
        ></option>
      </SelectField>
      <SelectField
        label="Age group"
        placeholder="Please select an option"
        isDisabled={false}
        value={ageGroup}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup: value,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.ageGroup ?? value;
          }
          if (errors.ageGroup?.hasError) {
            runValidationTasks("ageGroup", value);
          }
          setAgeGroup(value);
        }}
        onBlur={() => runValidationTasks("ageGroup", ageGroup)}
        errorMessage={errors.ageGroup?.errorMessage}
        hasError={errors.ageGroup?.hasError}
        {...getOverrideProps(overrides, "ageGroup")}
      >
        <option
          children="U7"
          value="U7"
          {...getOverrideProps(overrides, "ageGroupoption0")}
        ></option>
        <option
          children="U8"
          value="U8"
          {...getOverrideProps(overrides, "ageGroupoption1")}
        ></option>
        <option
          children="U9"
          value="U9"
          {...getOverrideProps(overrides, "ageGroupoption2")}
        ></option>
        <option
          children="U10"
          value="U10"
          {...getOverrideProps(overrides, "ageGroupoption3")}
        ></option>
        <option
          children="U11"
          value="U11"
          {...getOverrideProps(overrides, "ageGroupoption4")}
        ></option>
        <option
          children="U12"
          value="U12"
          {...getOverrideProps(overrides, "ageGroupoption5")}
        ></option>
        <option
          children="U13"
          value="U13"
          {...getOverrideProps(overrides, "ageGroupoption6")}
        ></option>
        <option
          children="U14"
          value="U14"
          {...getOverrideProps(overrides, "ageGroupoption7")}
        ></option>
        <option
          children="U15"
          value="U15"
          {...getOverrideProps(overrides, "ageGroupoption8")}
        ></option>
        <option
          children="U16"
          value="U16"
          {...getOverrideProps(overrides, "ageGroupoption9")}
        ></option>
        <option
          children="U17"
          value="U17"
          {...getOverrideProps(overrides, "ageGroupoption10")}
        ></option>
        <option
          children="U18"
          value="U18"
          {...getOverrideProps(overrides, "ageGroupoption11")}
        ></option>
        <option
          children="U19"
          value="U19"
          {...getOverrideProps(overrides, "ageGroupoption12")}
        ></option>
        <option
          children="U20"
          value="U20"
          {...getOverrideProps(overrides, "ageGroupoption13")}
        ></option>
        <option
          children="U21"
          value="U21"
          {...getOverrideProps(overrides, "ageGroupoption14")}
        ></option>
      </SelectField>
      <TextField
        label="Team size"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={teamSize}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize: value,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.teamSize ?? value;
          }
          if (errors.teamSize?.hasError) {
            runValidationTasks("teamSize", value);
          }
          setTeamSize(value);
        }}
        onBlur={() => runValidationTasks("teamSize", teamSize)}
        errorMessage={errors.teamSize?.errorMessage}
        hasError={errors.teamSize?.hasError}
        {...getOverrideProps(overrides, "teamSize")}
      ></TextField>
      <SwitchField
        label="Substitution limit"
        defaultChecked={false}
        isDisabled={false}
        isChecked={substitutionLimit}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit: value,
              cards,
              halfLength,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.substitutionLimit ?? value;
          }
          if (errors.substitutionLimit?.hasError) {
            runValidationTasks("substitutionLimit", value);
          }
          setSubstitutionLimit(value);
        }}
        onBlur={() =>
          runValidationTasks("substitutionLimit", substitutionLimit)
        }
        errorMessage={errors.substitutionLimit?.errorMessage}
        hasError={errors.substitutionLimit?.hasError}
        {...getOverrideProps(overrides, "substitutionLimit")}
      ></SwitchField>
      <SwitchField
        label="Allow Cards"
        defaultChecked={false}
        isDisabled={false}
        isChecked={cards}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards: value,
              halfLength,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.cards ?? value;
          }
          if (errors.cards?.hasError) {
            runValidationTasks("cards", value);
          }
          setCards(value);
        }}
        onBlur={() => runValidationTasks("cards", cards)}
        errorMessage={errors.cards?.errorMessage}
        hasError={errors.cards?.hasError}
        {...getOverrideProps(overrides, "cards")}
      ></SwitchField>
      <TextField
        label="Half length"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={halfLength}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength: value,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.halfLength ?? value;
          }
          if (errors.halfLength?.hasError) {
            runValidationTasks("halfLength", value);
          }
          setHalfLength(value);
        }}
        onBlur={() => runValidationTasks("halfLength", halfLength)}
        errorMessage={errors.halfLength?.errorMessage}
        hasError={errors.halfLength?.hasError}
        {...getOverrideProps(overrides, "halfLength")}
      ></TextField>
      <TextField
        label="Kick off"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={kickOff && convertToLocal(new Date(kickOff))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff: value,
              street,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.kickOff ?? value;
          }
          if (errors.kickOff?.hasError) {
            runValidationTasks("kickOff", value);
          }
          setKickOff(value);
        }}
        onBlur={() => runValidationTasks("kickOff", kickOff)}
        errorMessage={errors.kickOff?.errorMessage}
        hasError={errors.kickOff?.hasError}
        {...getOverrideProps(overrides, "kickOff")}
      ></TextField>
      <TextField
        label="Street"
        isRequired={true}
        isReadOnly={false}
        value={street}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street: value,
              townCity,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.street ?? value;
          }
          if (errors.street?.hasError) {
            runValidationTasks("street", value);
          }
          setStreet(value);
        }}
        onBlur={() => runValidationTasks("street", street)}
        errorMessage={errors.street?.errorMessage}
        hasError={errors.street?.hasError}
        {...getOverrideProps(overrides, "street")}
      ></TextField>
      <TextField
        label="Town city"
        isRequired={true}
        isReadOnly={false}
        value={townCity}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street,
              townCity: value,
              county,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.townCity ?? value;
          }
          if (errors.townCity?.hasError) {
            runValidationTasks("townCity", value);
          }
          setTownCity(value);
        }}
        onBlur={() => runValidationTasks("townCity", townCity)}
        errorMessage={errors.townCity?.errorMessage}
        hasError={errors.townCity?.hasError}
        {...getOverrideProps(overrides, "townCity")}
      ></TextField>
      <TextField
        label="County"
        isRequired={true}
        isReadOnly={false}
        value={county}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street,
              townCity,
              county: value,
              postcode,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.county ?? value;
          }
          if (errors.county?.hasError) {
            runValidationTasks("county", value);
          }
          setCounty(value);
        }}
        onBlur={() => runValidationTasks("county", county)}
        errorMessage={errors.county?.errorMessage}
        hasError={errors.county?.hasError}
        {...getOverrideProps(overrides, "county")}
      ></TextField>
      <TextField
        label="Postcode"
        isRequired={true}
        isReadOnly={false}
        value={postcode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street,
              townCity,
              county,
              postcode: value,
              teamName,
            };
            const result = onChange(modelFields);
            value = result?.postcode ?? value;
          }
          if (errors.postcode?.hasError) {
            runValidationTasks("postcode", value);
          }
          setPostcode(value);
        }}
        onBlur={() => runValidationTasks("postcode", postcode)}
        errorMessage={errors.postcode?.errorMessage}
        hasError={errors.postcode?.hasError}
        {...getOverrideProps(overrides, "postcode")}
      ></TextField>
      <TextField
        label="Team name"
        isRequired={true}
        isReadOnly={false}
        value={teamName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              gameType,
              ageGroup,
              teamSize,
              substitutionLimit,
              cards,
              halfLength,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              teamName: value,
            };
            const result = onChange(modelFields);
            value = result?.teamName ?? value;
          }
          if (errors.teamName?.hasError) {
            runValidationTasks("teamName", value);
          }
          setTeamName(value);
        }}
        onBlur={() => runValidationTasks("teamName", teamName)}
        errorMessage={errors.teamName?.errorMessage}
        hasError={errors.teamName?.hasError}
        {...getOverrideProps(overrides, "teamName")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || matchPostModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || matchPostModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
