/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
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
import { getTeam, getTeamPlayer, listTeams } from "../graphql/queries";
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
    positions: "",
    teamID: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [age, setAge] = React.useState(initialValues.age);
  const [kitNumber, setKitNumber] = React.useState(initialValues.kitNumber);
  const [positions, setPositions] = React.useState(initialValues.positions);
  const [teamID, setTeamID] = React.useState(initialValues.teamID);
  const [teamIDLoading, setTeamIDLoading] = React.useState(false);
  const [teamIDRecords, setTeamIDRecords] = React.useState([]);
  const [selectedTeamIDRecords, setSelectedTeamIDRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = teamPlayerRecord
      ? { ...initialValues, ...teamPlayerRecord, teamID }
      : initialValues;
    setName(cleanValues.name);
    setAge(cleanValues.age);
    setKitNumber(cleanValues.kitNumber);
    setPositions(cleanValues.positions);
    setTeamID(cleanValues.teamID);
    setCurrentTeamIDValue(undefined);
    setCurrentTeamIDDisplayValue("");
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
      const teamIDRecord = record ? record.teamID : undefined;
      const teamRecord = teamIDRecord
        ? (
            await client.graphql({
              query: getTeam.replaceAll("__typename", ""),
              variables: { id: teamIDRecord },
            })
          )?.data?.getTeam
        : undefined;
      setTeamID(teamIDRecord);
      setSelectedTeamIDRecords([teamRecord]);
      setTeamPlayerRecord(record);
    };
    queryData();
  }, [idProp, teamPlayerModelProp]);
  React.useEffect(resetStateValues, [teamPlayerRecord, teamID]);
  const [currentTeamIDDisplayValue, setCurrentTeamIDDisplayValue] =
    React.useState("");
  const [currentTeamIDValue, setCurrentTeamIDValue] = React.useState(undefined);
  const teamIDRef = React.createRef();
  const getDisplayValue = {
    teamID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    age: [{ type: "Required" }],
    kitNumber: [],
    positions: [{ type: "Required" }],
    teamID: [{ type: "Required" }],
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
  const fetchTeamIDRecords = async (value) => {
    setTeamIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listTeams.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTeams?.items;
      var loaded = result.filter((item) => teamID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setTeamIDRecords(newOptions.slice(0, autocompleteLength));
    setTeamIDLoading(false);
  };
  React.useEffect(() => {
    fetchTeamIDRecords("");
  }, []);
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
          kitNumber: kitNumber ?? null,
          positions,
          teamID,
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
              teamID,
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
      <SelectField
        label="Age"
        placeholder="Please select an option"
        isDisabled={false}
        value={age}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              age: value,
              kitNumber,
              positions,
              teamID,
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
      >
        <option
          children="U7"
          value="U7"
          {...getOverrideProps(overrides, "ageoption0")}
        ></option>
        <option
          children="U8"
          value="U8"
          {...getOverrideProps(overrides, "ageoption1")}
        ></option>
        <option
          children="U9"
          value="U9"
          {...getOverrideProps(overrides, "ageoption2")}
        ></option>
        <option
          children="U10"
          value="U10"
          {...getOverrideProps(overrides, "ageoption3")}
        ></option>
        <option
          children="U11"
          value="U11"
          {...getOverrideProps(overrides, "ageoption4")}
        ></option>
        <option
          children="U12"
          value="U12"
          {...getOverrideProps(overrides, "ageoption5")}
        ></option>
        <option
          children="U13"
          value="U13"
          {...getOverrideProps(overrides, "ageoption6")}
        ></option>
        <option
          children="U14"
          value="U14"
          {...getOverrideProps(overrides, "ageoption7")}
        ></option>
        <option
          children="U15"
          value="U15"
          {...getOverrideProps(overrides, "ageoption8")}
        ></option>
        <option
          children="U16"
          value="U16"
          {...getOverrideProps(overrides, "ageoption9")}
        ></option>
        <option
          children="U17"
          value="U17"
          {...getOverrideProps(overrides, "ageoption10")}
        ></option>
        <option
          children="U18"
          value="U18"
          {...getOverrideProps(overrides, "ageoption11")}
        ></option>
        <option
          children="U19"
          value="U19"
          {...getOverrideProps(overrides, "ageoption12")}
        ></option>
        <option
          children="U20"
          value="U20"
          {...getOverrideProps(overrides, "ageoption13")}
        ></option>
        <option
          children="U21"
          value="U21"
          {...getOverrideProps(overrides, "ageoption14")}
        ></option>
      </SelectField>
      <TextField
        label="Kit number"
        isRequired={false}
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
              teamID,
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
      <SelectField
        label="Positions"
        placeholder="Please select an option"
        isDisabled={false}
        value={positions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              age,
              kitNumber,
              positions: value,
              teamID,
            };
            const result = onChange(modelFields);
            value = result?.positions ?? value;
          }
          if (errors.positions?.hasError) {
            runValidationTasks("positions", value);
          }
          setPositions(value);
        }}
        onBlur={() => runValidationTasks("positions", positions)}
        errorMessage={errors.positions?.errorMessage}
        hasError={errors.positions?.hasError}
        {...getOverrideProps(overrides, "positions")}
      >
        <option
          children="Gk"
          value="GK"
          {...getOverrideProps(overrides, "positionsoption0")}
        ></option>
        <option
          children="Lb"
          value="LB"
          {...getOverrideProps(overrides, "positionsoption1")}
        ></option>
        <option
          children="Cb"
          value="CB"
          {...getOverrideProps(overrides, "positionsoption2")}
        ></option>
        <option
          children="Rb"
          value="RB"
          {...getOverrideProps(overrides, "positionsoption3")}
        ></option>
        <option
          children="Lm"
          value="LM"
          {...getOverrideProps(overrides, "positionsoption4")}
        ></option>
        <option
          children="Cm"
          value="CM"
          {...getOverrideProps(overrides, "positionsoption5")}
        ></option>
        <option
          children="Rm"
          value="RM"
          {...getOverrideProps(overrides, "positionsoption6")}
        ></option>
        <option
          children="St"
          value="ST"
          {...getOverrideProps(overrides, "positionsoption7")}
        ></option>
      </SelectField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              age,
              kitNumber,
              positions,
              teamID: value,
            };
            const result = onChange(modelFields);
            value = result?.teamID ?? value;
          }
          setTeamID(value);
          setCurrentTeamIDValue(undefined);
        }}
        currentFieldValue={currentTeamIDValue}
        label={"Team id"}
        items={teamID ? [teamID] : []}
        hasError={errors?.teamID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("teamID", currentTeamIDValue)
        }
        errorMessage={errors?.teamID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.teamID(
                teamIDRecords.find((r) => r.id === value) ??
                  selectedTeamIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentTeamIDDisplayValue(
            value
              ? getDisplayValue.teamID(
                  teamIDRecords.find((r) => r.id === value) ??
                    selectedTeamIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentTeamIDValue(value);
          const selectedRecord = teamIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedTeamIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={teamIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Team id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Team"
          value={currentTeamIDDisplayValue}
          options={teamIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.teamID?.(r),
            }))}
          isLoading={teamIDLoading}
          onSelect={({ id, label }) => {
            setCurrentTeamIDValue(id);
            setCurrentTeamIDDisplayValue(label);
            runValidationTasks("teamID", label);
          }}
          onClear={() => {
            setCurrentTeamIDDisplayValue("");
          }}
          defaultValue={teamID}
          onChange={(e) => {
            let { value } = e.target;
            fetchTeamIDRecords(value);
            if (errors.teamID?.hasError) {
              runValidationTasks("teamID", value);
            }
            setCurrentTeamIDDisplayValue(value);
            setCurrentTeamIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("teamID", currentTeamIDValue)}
          errorMessage={errors.teamID?.errorMessage}
          hasError={errors.teamID?.hasError}
          ref={teamIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "teamID")}
        ></Autocomplete>
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
