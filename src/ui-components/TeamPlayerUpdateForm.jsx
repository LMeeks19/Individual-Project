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
import { getTeamPlayer } from "../graphql/queries";
import { updateTeamPlayer } from "../graphql/mutations";
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
export default function TeamPlayerUpdateForm(props) {
  const {
    id: idProp,
    teamPlayer: teamPlayerModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    age: "",
    kitNumber: "",
    positions: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [age, setAge] = React.useState(initialValues.age);
  const [kitNumber, setKitNumber] = React.useState(initialValues.kitNumber);
  const [positions, setPositions] = React.useState(initialValues.positions);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = teamPlayerRecord
      ? { ...initialValues, ...teamPlayerRecord }
      : initialValues;
    setName(cleanValues.name);
    setAge(cleanValues.age);
    setKitNumber(cleanValues.kitNumber);
    setPositions(cleanValues.positions ?? []);
    setCurrentPositionsValue("");
    setErrors({});
  };
  const [teamPlayerRecord, setTeamPlayerRecord] =
    React.useState(teamPlayerModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTeamPlayer.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTeamPlayer
        : teamPlayerModelProp;
      setTeamPlayerRecord(record);
    };
    queryData();
  }, [idProp, teamPlayerModelProp]);
  React.useEffect(resetStateValues, [teamPlayerRecord]);
  const [currentPositionsValue, setCurrentPositionsValue] = React.useState("");
  const positionsRef = React.createRef();
  const getDisplayValue = {
    positions: (r) => {
      const enumDisplayValueMap = {
        GK: "GK",
        LB: "LB",
        CB: "CB",
        RB: "RB",
        LM: "LM",
        CM: "CM",
        RM: "RM",
        ST: "ST",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    name: [{ type: "Required" }],
    age: [{ type: "Required" }],
    kitNumber: [{ type: "Required" }],
    positions: [{ type: "Required" }],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          age,
          kitNumber,
          positions,
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
            query: updateTeamPlayer.replaceAll("__typename", ""),
            variables: {
              input: {
                id: teamPlayerRecord.id,
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
      {...getOverrideProps(overrides, "TeamPlayerUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              age,
              kitNumber,
              positions,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Age"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              age: value,
              kitNumber,
              positions,
            };
            const result = onChange(modelFields);
            value = result?.age ?? value;
          }
          if (errors.age?.hasError) {
            runValidationTasks("age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("age", age)}
        errorMessage={errors.age?.errorMessage}
        hasError={errors.age?.hasError}
        {...getOverrideProps(overrides, "age")}
      ></TextField>
      <TextField
        label="Kit number"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={kitNumber}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              age,
              kitNumber: value,
              positions,
            };
            const result = onChange(modelFields);
            value = result?.kitNumber ?? value;
          }
          if (errors.kitNumber?.hasError) {
            runValidationTasks("kitNumber", value);
          }
          setKitNumber(value);
        }}
        onBlur={() => runValidationTasks("kitNumber", kitNumber)}
        errorMessage={errors.kitNumber?.errorMessage}
        hasError={errors.kitNumber?.hasError}
        {...getOverrideProps(overrides, "kitNumber")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              age,
              kitNumber,
              positions: values,
            };
            const result = onChange(modelFields);
            values = result?.positions ?? values;
          }
          setPositions(values);
          setCurrentPositionsValue("");
        }}
        currentFieldValue={currentPositionsValue}
        label={"Positions"}
        items={positions}
        hasError={errors?.positions?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("positions", currentPositionsValue)
        }
        errorMessage={errors?.positions?.errorMessage}
        getBadgeText={getDisplayValue.positions}
        setFieldValue={setCurrentPositionsValue}
        inputFieldRef={positionsRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Positions"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentPositionsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.positions?.hasError) {
              runValidationTasks("positions", value);
            }
            setCurrentPositionsValue(value);
          }}
          onBlur={() => runValidationTasks("positions", currentPositionsValue)}
          errorMessage={errors.positions?.errorMessage}
          hasError={errors.positions?.hasError}
          ref={positionsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "positions")}
        >
          <option
            children="GK"
            value="GK"
            {...getOverrideProps(overrides, "positionsoption0")}
          ></option>
          <option
            children="LB"
            value="LB"
            {...getOverrideProps(overrides, "positionsoption1")}
          ></option>
          <option
            children="CB"
            value="CB"
            {...getOverrideProps(overrides, "positionsoption2")}
          ></option>
          <option
            children="RB"
            value="RB"
            {...getOverrideProps(overrides, "positionsoption3")}
          ></option>
          <option
            children="LM"
            value="LM"
            {...getOverrideProps(overrides, "positionsoption4")}
          ></option>
          <option
            children="CM"
            value="CM"
            {...getOverrideProps(overrides, "positionsoption5")}
          ></option>
          <option
            children="RM"
            value="RM"
            {...getOverrideProps(overrides, "positionsoption6")}
          ></option>
          <option
            children="ST"
            value="ST"
            {...getOverrideProps(overrides, "positionsoption7")}
          ></option>
        </SelectField>
      </ArrayField>
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
          isDisabled={!(idProp || teamPlayerModelProp)}
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
              !(idProp || teamPlayerModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
