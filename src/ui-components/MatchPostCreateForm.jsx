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
  SwitchField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { listProfiles } from "../graphql/queries";
import { createMatchPost, createProfileMatchPost } from "../graphql/mutations";
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
export default function MatchPostCreateForm(props) {
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
  const { tokens } = useTheme();
  const initialValues = {
    title: "",
    description: "",
    createdByProfileID: undefined,
    team: "",
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
    interestedUsers: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [createdByProfileID, setCreatedByProfileID] = React.useState(
    initialValues.createdByProfileID
  );
  const [createdByProfileIDLoading, setCreatedByProfileIDLoading] =
    React.useState(false);
  const [createdByProfileIDRecords, setCreatedByProfileIDRecords] =
    React.useState([]);
  const [
    selectedCreatedByProfileIDRecords,
    setSelectedCreatedByProfileIDRecords,
  ] = React.useState([]);
  const [team, setTeam] = React.useState(initialValues.team);
  const [teamLoading, setTeamLoading] = React.useState(false);
  const [teamRecords, setTeamRecords] = React.useState([]);
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
  const [interestedUsers, setInterestedUsers] = React.useState(
    initialValues.interestedUsers
  );
  const [interestedUsersLoading, setInterestedUsersLoading] =
    React.useState(false);
  const [interestedUsersRecords, setInterestedUsersRecords] = React.useState(
    []
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setCreatedByProfileID(initialValues.createdByProfileID);
    setCurrentCreatedByProfileIDValue(undefined);
    setCurrentCreatedByProfileIDDisplayValue("");
    setTeam(initialValues.team);
    setCurrentTeamValue("");
    setCurrentTeamDisplayValue("");
    setGameType(initialValues.gameType);
    setAgeGroup(initialValues.ageGroup);
    setTeamSize(initialValues.teamSize);
    setSubstitutionLimit(initialValues.substitutionLimit);
    setCards(initialValues.cards);
    setHalfLength(initialValues.halfLength);
    setKickOff(initialValues.kickOff);
    setStreet(initialValues.street);
    setTownCity(initialValues.townCity);
    setCounty(initialValues.county);
    setPostcode(initialValues.postcode);
    setInterestedUsers(initialValues.interestedUsers);
    setCurrentInterestedUsersValue(undefined);
    setCurrentInterestedUsersDisplayValue("");
    setErrors({});
  };
  const [
    currentCreatedByProfileIDDisplayValue,
    setCurrentCreatedByProfileIDDisplayValue,
  ] = React.useState("");
  const [currentCreatedByProfileIDValue, setCurrentCreatedByProfileIDValue] =
    React.useState(undefined);
  const createdByProfileIDRef = React.createRef();
  const [currentTeamDisplayValue, setCurrentTeamDisplayValue] =
    React.useState("");
  const [currentTeamValue, setCurrentTeamValue] = React.useState("");
  const teamRef = React.createRef();
  const [
    currentInterestedUsersDisplayValue,
    setCurrentInterestedUsersDisplayValue,
  ] = React.useState("");
  const [currentInterestedUsersValue, setCurrentInterestedUsersValue] =
    React.useState(undefined);
  const interestedUsersRef = React.createRef();
  const getIDValue = {
    team: (r) => JSON.stringify({ id: r?.id }),
    interestedUsers: (r) => JSON.stringify({ id: r?.id }),
  };
  const teamIdSet = new Set(
    Array.isArray(team)
      ? team.map((r) => getIDValue.team?.(r))
      : getIDValue.team?.(team)
  );
  const interestedUsersIdSet = new Set(
    Array.isArray(interestedUsers)
      ? interestedUsers.map((r) => getIDValue.interestedUsers?.(r))
      : getIDValue.interestedUsers?.(interestedUsers)
  );
  const getDisplayValue = {
    createdByProfileID: (r) => `${r?.username}`,
    team: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    interestedUsers: (r) => `${r?.username}`,
  };
  const validations = {
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    createdByProfileID: [{ type: "Required" }],
    team: [],
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
    interestedUsers: [],
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
  const fetchCreatedByProfileIDRecords = async (value) => {
    setCreatedByProfileIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: { or: [{ username: { contains: value } }] },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listProfiles.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listProfiles?.items;
      var loaded = result.filter((item) => createdByProfileID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setCreatedByProfileIDRecords(newOptions.slice(0, autocompleteLength));
    setCreatedByProfileIDLoading(false);
  };
  const fetchInterestedUsersRecords = async (value) => {
    setInterestedUsersLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: { or: [{ username: { contains: value } }] },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listProfiles.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listProfiles?.items;
      var loaded = result.filter(
        (item) => !interestedUsersIdSet.has(getIDValue.interestedUsers?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setInterestedUsersRecords(newOptions.slice(0, autocompleteLength));
    setInterestedUsersLoading(false);
  };
  React.useEffect(() => {
    fetchCreatedByProfileIDRecords("");
    fetchInterestedUsersRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding={tokens.space.medium.value}
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          description,
          createdByProfileID,
          team,
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
          interestedUsers,
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
          const modelFieldsToSave = {
            title: modelFields.title,
            description: modelFields.description,
            createdByProfileID: modelFields.createdByProfileID,
            matchPostTeamId: modelFields?.team?.id,
            gameType: modelFields.gameType,
            ageGroup: modelFields.ageGroup,
            teamSize: modelFields.teamSize,
            substitutionLimit: modelFields.substitutionLimit,
            cards: modelFields.cards,
            halfLength: modelFields.halfLength,
            kickOff: modelFields.kickOff,
            street: modelFields.street,
            townCity: modelFields.townCity,
            county: modelFields.county,
            postcode: modelFields.postcode,
          };
          const matchPost = (
            await client.graphql({
              query: createMatchPost.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createMatchPost;
          const promises = [];
          promises.push(
            ...interestedUsers.reduce((promises, profile) => {
              promises.push(
                client.graphql({
                  query: createProfileMatchPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      matchPostId: matchPost.id,
                      profileId: profile.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "MatchPostCreateForm")}
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              createdByProfileID,
              team,
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
              interestedUsers,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              description,
              createdByProfileID: value,
              team,
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
              interestedUsers,
            };
            const result = onChange(modelFields);
            value = result?.createdByProfileID ?? value;
          }
          setCreatedByProfileID(value);
          setCurrentCreatedByProfileIDValue(undefined);
        }}
        currentFieldValue={currentCreatedByProfileIDValue}
        label={"Created by"}
        items={createdByProfileID ? [createdByProfileID] : []}
        hasError={errors?.createdByProfileID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "createdByProfileID",
            currentCreatedByProfileIDValue
          )
        }
        errorMessage={errors?.createdByProfileID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.createdByProfileID(
                createdByProfileIDRecords.find((r) => r.id === value) ??
                  selectedCreatedByProfileIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentCreatedByProfileIDDisplayValue(
            value
              ? getDisplayValue.createdByProfileID(
                  createdByProfileIDRecords.find((r) => r.id === value) ??
                    selectedCreatedByProfileIDRecords.find(
                      (r) => r.id === value
                    )
                )
              : ""
          );
          setCurrentCreatedByProfileIDValue(value);
          const selectedRecord = createdByProfileIDRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedCreatedByProfileIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={createdByProfileIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Created by"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Profile"
          value={currentCreatedByProfileIDDisplayValue}
          options={createdByProfileIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.createdByProfileID?.(r),
            }))}
          isLoading={createdByProfileIDLoading}
          onSelect={({ id, label }) => {
            setCurrentCreatedByProfileIDValue(id);
            setCurrentCreatedByProfileIDDisplayValue(label);
            runValidationTasks("createdByProfileID", label);
          }}
          onClear={() => {
            setCurrentCreatedByProfileIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchCreatedByProfileIDRecords(value);
            if (errors.createdByProfileID?.hasError) {
              runValidationTasks("createdByProfileID", value);
            }
            setCurrentCreatedByProfileIDDisplayValue(value);
            setCurrentCreatedByProfileIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "createdByProfileID",
              currentCreatedByProfileIDValue
            )
          }
          errorMessage={errors.createdByProfileID?.errorMessage}
          hasError={errors.createdByProfileID?.hasError}
          ref={createdByProfileIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "createdByProfileID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              description,
              createdByProfileID,
              team: value,
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
              interestedUsers,
            };
            const result = onChange(modelFields);
            value = result?.team ?? value;
          }
          setTeam(value);
          setCurrentTeamValue("");
          setCurrentTeamDisplayValue("");
        }}
        currentFieldValue={currentTeamValue}
        label={"Team"}
        items={team ? [team] : []}
        hasError={errors?.team?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("team", currentTeamValue)
        }
        errorMessage={errors?.team?.errorMessage}
        getBadgeText={getDisplayValue.team}
        setFieldValue={(model) => {
          setCurrentTeamDisplayValue(model ? getDisplayValue.team(model) : "");
          setCurrentTeamValue(model);
        }}
        inputFieldRef={teamRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Team"
          placeholder="Search Team"
          isDisabled={false}
          value={currentTeamDisplayValue}
          onChange={(e) => {
            let { value } = e.target;
            fetchTeamRecords(value);
            if (errors.team?.hasError) {
              runValidationTasks("team", value);
            }
            setCurrentTeamDisplayValue(value);
            setCurrentTeamValue(undefined);
          }}
          onBlur={() => runValidationTasks("team", currentTeamDisplayValue)}
          errorMessage={errors.team?.errorMessage}
          hasError={errors.team?.hasError}
          ref={teamRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "team")}
        >
          <option
            children={`${r?.name}${" - "}${r?.id}`}
            value={Team?.id}
            {...getOverrideProps(overrides, "teamoption0")}
          ></option>
        </SelectField>
      </ArrayField>
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
              createdByProfileID,
              team,
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
              interestedUsers,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              createdByProfileID,
              team,
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
              interestedUsers: values,
            };
            const result = onChange(modelFields);
            values = result?.interestedUsers ?? values;
          }
          setInterestedUsers(values);
          setCurrentInterestedUsersValue(undefined);
          setCurrentInterestedUsersDisplayValue("");
        }}
        currentFieldValue={currentInterestedUsersValue}
        label={"Interested users"}
        items={interestedUsers}
        hasError={errors?.interestedUsers?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "interestedUsers",
            currentInterestedUsersValue
          )
        }
        errorMessage={errors?.interestedUsers?.errorMessage}
        getBadgeText={getDisplayValue.interestedUsers}
        setFieldValue={(model) => {
          setCurrentInterestedUsersDisplayValue(
            model ? getDisplayValue.interestedUsers(model) : ""
          );
          setCurrentInterestedUsersValue(model);
        }}
        inputFieldRef={interestedUsersRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Interested users"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Profile"
          value={currentInterestedUsersDisplayValue}
          options={interestedUsersRecords.map((r) => ({
            id: getIDValue.interestedUsers?.(r),
            label: getDisplayValue.interestedUsers?.(r),
          }))}
          isLoading={interestedUsersLoading}
          onSelect={({ id, label }) => {
            setCurrentInterestedUsersValue(
              interestedUsersRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentInterestedUsersDisplayValue(label);
            runValidationTasks("interestedUsers", label);
          }}
          onClear={() => {
            setCurrentInterestedUsersDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchInterestedUsersRecords(value);
            if (errors.interestedUsers?.hasError) {
              runValidationTasks("interestedUsers", value);
            }
            setCurrentInterestedUsersDisplayValue(value);
            setCurrentInterestedUsersValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "interestedUsers",
              currentInterestedUsersDisplayValue
            )
          }
          errorMessage={errors.interestedUsers?.errorMessage}
          hasError={errors.interestedUsers?.hasError}
          ref={interestedUsersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "interestedUsers")}
        ></Autocomplete>
      </ArrayField>
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
