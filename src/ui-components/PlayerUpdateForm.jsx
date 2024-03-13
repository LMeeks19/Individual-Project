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
import {
  getPlayer,
  listPlayerPlayerPosts,
  listPlayerPosts,
  playerPlayerPostsByPlayerId,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import {
  createPlayerPlayerPost,
  deletePlayerPlayerPost,
  updatePlayer,
} from "../graphql/mutations";
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
export default function PlayerUpdateForm(props) {
  const {
    id: idProp,
    player: playerModelProp,
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
    dob: "",
    ageGroup: "",
    skillLevel: "",
    positions: [],
    registeredPlayerPosts: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [dob, setDob] = React.useState(initialValues.dob);
  const [ageGroup, setAgeGroup] = React.useState(initialValues.ageGroup);
  const [skillLevel, setSkillLevel] = React.useState(initialValues.skillLevel);
  const [positions, setPositions] = React.useState(initialValues.positions);
  const [registeredPlayerPosts, setRegisteredPlayerPosts] = React.useState(
    initialValues.registeredPlayerPosts
  );
  const [registeredPlayerPostsLoading, setRegisteredPlayerPostsLoading] =
    React.useState(false);
  const [registeredPlayerPostsRecords, setRegisteredPlayerPostsRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = playerRecord
      ? {
          ...initialValues,
          ...playerRecord,
          registeredPlayerPosts: linkedRegisteredPlayerPosts,
        }
      : initialValues;
    setName(cleanValues.name);
    setDob(cleanValues.dob);
    setAgeGroup(cleanValues.ageGroup);
    setSkillLevel(cleanValues.skillLevel);
    setPositions(cleanValues.positions ?? []);
    setCurrentPositionsValue("");
    setRegisteredPlayerPosts(cleanValues.registeredPlayerPosts ?? []);
    setCurrentRegisteredPlayerPostsValue(undefined);
    setCurrentRegisteredPlayerPostsDisplayValue("");
    setErrors({});
  };
  const [playerRecord, setPlayerRecord] = React.useState(playerModelProp);
  const [linkedRegisteredPlayerPosts, setLinkedRegisteredPlayerPosts] =
    React.useState([]);
  const canUnlinkRegisteredPlayerPosts = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPlayer.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPlayer
        : playerModelProp;
      const linkedRegisteredPlayerPosts = record
        ? (
            await client.graphql({
              query: playerPlayerPostsByPlayerId.replaceAll("__typename", ""),
              variables: {
                playerId: record.id,
              },
            })
          ).data.playerPlayerPostsByPlayerId.items.map((t) => t.playerPost)
        : [];
      setLinkedRegisteredPlayerPosts(linkedRegisteredPlayerPosts);
      setPlayerRecord(record);
    };
    queryData();
  }, [idProp, playerModelProp]);
  React.useEffect(resetStateValues, [
    playerRecord,
    linkedRegisteredPlayerPosts,
  ]);
  const [currentPositionsValue, setCurrentPositionsValue] = React.useState("");
  const positionsRef = React.createRef();
  const [
    currentRegisteredPlayerPostsDisplayValue,
    setCurrentRegisteredPlayerPostsDisplayValue,
  ] = React.useState("");
  const [
    currentRegisteredPlayerPostsValue,
    setCurrentRegisteredPlayerPostsValue,
  ] = React.useState(undefined);
  const registeredPlayerPostsRef = React.createRef();
  const getIDValue = {
    registeredPlayerPosts: (r) => JSON.stringify({ id: r?.id }),
  };
  const registeredPlayerPostsIdSet = new Set(
    Array.isArray(registeredPlayerPosts)
      ? registeredPlayerPosts.map((r) => getIDValue.registeredPlayerPosts?.(r))
      : getIDValue.registeredPlayerPosts?.(registeredPlayerPosts)
  );
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
    registeredPlayerPosts: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    dob: [{ type: "Required" }],
    ageGroup: [{ type: "Required" }],
    skillLevel: [{ type: "Required" }],
    positions: [{ type: "Required" }],
    registeredPlayerPosts: [],
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
  const fetchRegisteredPlayerPostsRecords = async (value) => {
    setRegisteredPlayerPostsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ title: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listPlayerPosts.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listPlayerPosts?.items;
      var loaded = result.filter(
        (item) =>
          !registeredPlayerPostsIdSet.has(
            getIDValue.registeredPlayerPosts?.(item)
          )
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setRegisteredPlayerPostsRecords(newOptions.slice(0, autocompleteLength));
    setRegisteredPlayerPostsLoading(false);
  };
  React.useEffect(() => {
    fetchRegisteredPlayerPostsRecords("");
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
          dob,
          ageGroup,
          skillLevel,
          positions,
          registeredPlayerPosts: registeredPlayerPosts ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const promises = [];
          const registeredPlayerPostsToLinkMap = new Map();
          const registeredPlayerPostsToUnLinkMap = new Map();
          const registeredPlayerPostsMap = new Map();
          const linkedRegisteredPlayerPostsMap = new Map();
          registeredPlayerPosts.forEach((r) => {
            const count = registeredPlayerPostsMap.get(
              getIDValue.registeredPlayerPosts?.(r)
            );
            const newCount = count ? count + 1 : 1;
            registeredPlayerPostsMap.set(
              getIDValue.registeredPlayerPosts?.(r),
              newCount
            );
          });
          linkedRegisteredPlayerPosts.forEach((r) => {
            const count = linkedRegisteredPlayerPostsMap.get(
              getIDValue.registeredPlayerPosts?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedRegisteredPlayerPostsMap.set(
              getIDValue.registeredPlayerPosts?.(r),
              newCount
            );
          });
          linkedRegisteredPlayerPostsMap.forEach((count, id) => {
            const newCount = registeredPlayerPostsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                registeredPlayerPostsToUnLinkMap.set(id, diffCount);
              }
            } else {
              registeredPlayerPostsToUnLinkMap.set(id, count);
            }
          });
          registeredPlayerPostsMap.forEach((count, id) => {
            const originalCount = linkedRegisteredPlayerPostsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                registeredPlayerPostsToLinkMap.set(id, diffCount);
              }
            } else {
              registeredPlayerPostsToLinkMap.set(id, count);
            }
          });
          registeredPlayerPostsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const playerPlayerPostRecords = (
              await client.graphql({
                query: listPlayerPlayerPosts.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { playerPostId: { eq: recordKeys.id } },
                      { playerId: { eq: playerRecord.id } },
                    ],
                  },
                },
              })
            )?.data?.listPlayerPlayerPosts?.items;
            for (let i = 0; i < count; i++) {
              promises.push(
                client.graphql({
                  query: deletePlayerPlayerPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: playerPlayerPostRecords[i].id,
                    },
                  },
                })
              );
            }
          });
          registeredPlayerPostsToLinkMap.forEach((count, id) => {
            const playerPostToLink = registeredPlayerPostsRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                client.graphql({
                  query: createPlayerPlayerPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      playerId: playerRecord.id,
                      playerPostId: playerPostToLink.id,
                    },
                  },
                })
              );
            }
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            dob: modelFields.dob,
            ageGroup: modelFields.ageGroup,
            skillLevel: modelFields.skillLevel,
            positions: modelFields.positions,
          };
          promises.push(
            client.graphql({
              query: updatePlayer.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: playerRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "PlayerUpdateForm")}
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
              dob,
              ageGroup,
              skillLevel,
              positions,
              registeredPlayerPosts,
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
        label="Dob"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={dob}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dob: value,
              ageGroup,
              skillLevel,
              positions,
              registeredPlayerPosts,
            };
            const result = onChange(modelFields);
            value = result?.dob ?? value;
          }
          if (errors.dob?.hasError) {
            runValidationTasks("dob", value);
          }
          setDob(value);
        }}
        onBlur={() => runValidationTasks("dob", dob)}
        errorMessage={errors.dob?.errorMessage}
        hasError={errors.dob?.hasError}
        {...getOverrideProps(overrides, "dob")}
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
              name,
              dob,
              ageGroup: value,
              skillLevel,
              positions,
              registeredPlayerPosts,
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
      <SelectField
        label="Skill level"
        placeholder="Please select an option"
        isDisabled={false}
        value={skillLevel}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dob,
              ageGroup,
              skillLevel: value,
              positions,
              registeredPlayerPosts,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              dob,
              ageGroup,
              skillLevel,
              positions: values,
              registeredPlayerPosts,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              dob,
              ageGroup,
              skillLevel,
              positions,
              registeredPlayerPosts: values,
            };
            const result = onChange(modelFields);
            values = result?.registeredPlayerPosts ?? values;
          }
          setRegisteredPlayerPosts(values);
          setCurrentRegisteredPlayerPostsValue(undefined);
          setCurrentRegisteredPlayerPostsDisplayValue("");
        }}
        currentFieldValue={currentRegisteredPlayerPostsValue}
        label={"Registered player posts"}
        items={registeredPlayerPosts}
        hasError={errors?.registeredPlayerPosts?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "registeredPlayerPosts",
            currentRegisteredPlayerPostsValue
          )
        }
        errorMessage={errors?.registeredPlayerPosts?.errorMessage}
        getBadgeText={getDisplayValue.registeredPlayerPosts}
        setFieldValue={(model) => {
          setCurrentRegisteredPlayerPostsDisplayValue(
            model ? getDisplayValue.registeredPlayerPosts(model) : ""
          );
          setCurrentRegisteredPlayerPostsValue(model);
        }}
        inputFieldRef={registeredPlayerPostsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Registered player posts"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search PlayerPost"
          value={currentRegisteredPlayerPostsDisplayValue}
          options={registeredPlayerPostsRecords.map((r) => ({
            id: getIDValue.registeredPlayerPosts?.(r),
            label: getDisplayValue.registeredPlayerPosts?.(r),
          }))}
          isLoading={registeredPlayerPostsLoading}
          onSelect={({ id, label }) => {
            setCurrentRegisteredPlayerPostsValue(
              registeredPlayerPostsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentRegisteredPlayerPostsDisplayValue(label);
            runValidationTasks("registeredPlayerPosts", label);
          }}
          onClear={() => {
            setCurrentRegisteredPlayerPostsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchRegisteredPlayerPostsRecords(value);
            if (errors.registeredPlayerPosts?.hasError) {
              runValidationTasks("registeredPlayerPosts", value);
            }
            setCurrentRegisteredPlayerPostsDisplayValue(value);
            setCurrentRegisteredPlayerPostsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "registeredPlayerPosts",
              currentRegisteredPlayerPostsDisplayValue
            )
          }
          errorMessage={errors.registeredPlayerPosts?.errorMessage}
          hasError={errors.registeredPlayerPosts?.hasError}
          ref={registeredPlayerPostsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "registeredPlayerPosts")}
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
          isDisabled={!(idProp || playerModelProp)}
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
              !(idProp || playerModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
