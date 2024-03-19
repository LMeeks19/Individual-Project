/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createPlayerPost } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function PlayerPostCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    description: "",
    ageGroup: "",
    positionsNeeded: [],
    numOfPlayersNeeded: "",
    skillLevel: "",
    kickOff: "",
    street: "",
    townCity: "",
    county: "",
    postcode: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [ageGroup, setAgeGroup] = React.useState(initialValues.ageGroup);
  const [positionsNeeded, setPositionsNeeded] = React.useState(
    initialValues.positionsNeeded
  );
  const [numOfPlayersNeeded, setNumOfPlayersNeeded] = React.useState(
    initialValues.numOfPlayersNeeded
  );
  const [skillLevel, setSkillLevel] = React.useState(initialValues.skillLevel);
  const [kickOff, setKickOff] = React.useState(initialValues.kickOff);
  const [street, setStreet] = React.useState(initialValues.street);
  const [townCity, setTownCity] = React.useState(initialValues.townCity);
  const [county, setCounty] = React.useState(initialValues.county);
  const [postcode, setPostcode] = React.useState(initialValues.postcode);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setAgeGroup(initialValues.ageGroup);
    setPositionsNeeded(initialValues.positionsNeeded);
    setCurrentPositionsNeededValue("");
    setNumOfPlayersNeeded(initialValues.numOfPlayersNeeded);
    setSkillLevel(initialValues.skillLevel);
    setKickOff(initialValues.kickOff);
    setStreet(initialValues.street);
    setTownCity(initialValues.townCity);
    setCounty(initialValues.county);
    setPostcode(initialValues.postcode);
    setErrors({});
  };
  const [currentPositionsNeededValue, setCurrentPositionsNeededValue] =
    React.useState("");
  const positionsNeededRef = React.createRef();
  const getDisplayValue = {
    positionsNeeded: (r) => {
      const enumDisplayValueMap = {
        GK: "Gk",
        LB: "Lb",
        CB: "Cb",
        RB: "Rb",
        LM: "Lm",
        CM: "Cm",
        RM: "Rm",
        ST: "St",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    ageGroup: [{ type: "Required" }],
    positionsNeeded: [{ type: "Required" }],
    numOfPlayersNeeded: [{ type: "Required" }],
    skillLevel: [{ type: "Required" }],
    kickOff: [{ type: "Required" }],
    street: [{ type: "Required" }],
    townCity: [{ type: "Required" }],
    county: [{ type: "Required" }],
    postcode: [{ type: "Required" }],
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
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          description,
          ageGroup,
          positionsNeeded,
          numOfPlayersNeeded,
          skillLevel,
          kickOff,
          street,
          townCity,
          county,
          postcode,
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
            query: createPlayerPost.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PlayerPostCreateForm")}
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
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
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
      <TextField
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
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
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
      ></TextField>
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
              ageGroup: value,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              ageGroup,
              positionsNeeded: values,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
            };
            const result = onChange(modelFields);
            values = result?.positionsNeeded ?? values;
          }
          setPositionsNeeded(values);
          setCurrentPositionsNeededValue("");
        }}
        currentFieldValue={currentPositionsNeededValue}
        label={"Positions needed"}
        items={positionsNeeded}
        hasError={errors?.positionsNeeded?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "positionsNeeded",
            currentPositionsNeededValue
          )
        }
        errorMessage={errors?.positionsNeeded?.errorMessage}
        getBadgeText={getDisplayValue.positionsNeeded}
        setFieldValue={setCurrentPositionsNeededValue}
        inputFieldRef={positionsNeededRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Positions needed"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentPositionsNeededValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.positionsNeeded?.hasError) {
              runValidationTasks("positionsNeeded", value);
            }
            setCurrentPositionsNeededValue(value);
          }}
          onBlur={() =>
            runValidationTasks("positionsNeeded", currentPositionsNeededValue)
          }
          errorMessage={errors.positionsNeeded?.errorMessage}
          hasError={errors.positionsNeeded?.hasError}
          ref={positionsNeededRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "positionsNeeded")}
        >
          <option
            children="Gk"
            value="GK"
            {...getOverrideProps(overrides, "positionsNeededoption0")}
          ></option>
          <option
            children="Lb"
            value="LB"
            {...getOverrideProps(overrides, "positionsNeededoption1")}
          ></option>
          <option
            children="Cb"
            value="CB"
            {...getOverrideProps(overrides, "positionsNeededoption2")}
          ></option>
          <option
            children="Rb"
            value="RB"
            {...getOverrideProps(overrides, "positionsNeededoption3")}
          ></option>
          <option
            children="Lm"
            value="LM"
            {...getOverrideProps(overrides, "positionsNeededoption4")}
          ></option>
          <option
            children="Cm"
            value="CM"
            {...getOverrideProps(overrides, "positionsNeededoption5")}
          ></option>
          <option
            children="Rm"
            value="RM"
            {...getOverrideProps(overrides, "positionsNeededoption6")}
          ></option>
          <option
            children="St"
            value="ST"
            {...getOverrideProps(overrides, "positionsNeededoption7")}
          ></option>
        </SelectField>
      </ArrayField>
      <TextField
        label="Num of players needed"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={numOfPlayersNeeded}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              description,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded: value,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
            };
            const result = onChange(modelFields);
            value = result?.numOfPlayersNeeded ?? value;
          }
          if (errors.numOfPlayersNeeded?.hasError) {
            runValidationTasks("numOfPlayersNeeded", value);
          }
          setNumOfPlayersNeeded(value);
        }}
        onBlur={() =>
          runValidationTasks("numOfPlayersNeeded", numOfPlayersNeeded)
        }
        errorMessage={errors.numOfPlayersNeeded?.errorMessage}
        hasError={errors.numOfPlayersNeeded?.hasError}
        {...getOverrideProps(overrides, "numOfPlayersNeeded")}
      ></TextField>
      <SelectField
        label="Skill level"
        placeholder="Please select an option"
        isDisabled={false}
        value={skillLevel}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel: value,
              kickOff,
              street,
              townCity,
              county,
              postcode,
            };
            const result = onChange(modelFields);
            value = result?.skillLevel ?? value;
          }
          if (errors.skillLevel?.hasError) {
            runValidationTasks("skillLevel", value);
          }
          setSkillLevel(value);
        }}
        onBlur={() => runValidationTasks("skillLevel", skillLevel)}
        errorMessage={errors.skillLevel?.errorMessage}
        hasError={errors.skillLevel?.hasError}
        {...getOverrideProps(overrides, "skillLevel")}
      >
        <option
          children="Beginner"
          value="BEGINNER"
          {...getOverrideProps(overrides, "skillLeveloption0")}
        ></option>
        <option
          children="Intermediate"
          value="INTERMEDIATE"
          {...getOverrideProps(overrides, "skillLeveloption1")}
        ></option>
        <option
          children="Experienced"
          value="EXPERIENCED"
          {...getOverrideProps(overrides, "skillLeveloption2")}
        ></option>
      </SelectField>
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
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff: value,
              street,
              townCity,
              county,
              postcode,
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
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street: value,
              townCity,
              county,
              postcode,
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
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity: value,
              county,
              postcode,
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
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county: value,
              postcode,
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
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
