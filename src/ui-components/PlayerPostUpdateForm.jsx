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
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import {
  getPlayerPost,
  getProfile,
  listPlayerPlayerPosts,
  listPlayers,
  listProfilePlayerPosts,
  listProfiles,
  playerPlayerPostsByPlayerPostId,
  profilePlayerPostsByPlayerPostId,
} from "../graphql/queries";
import {
  createPlayerPlayerPost,
  createProfilePlayerPost,
  deletePlayerPlayerPost,
  deleteProfilePlayerPost,
  updatePlayerPost,
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
export default function PlayerPostUpdateForm(props) {
  const {
    id: idProp,
    playerPost: playerPostModelProp,
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
    createdByName: "",
    createdByProfileID: undefined,
    ageGroup: "",
    positionsNeeded: [],
    numOfPlayersNeeded: "",
    skillLevel: "",
    kickOff: "",
    street: "",
    townCity: "",
    county: "",
    postcode: "",
    isActive: false,
    interesetdUsers: [],
    registeredPlayers: [],
    selectedPlayers: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [createdByName, setCreatedByName] = React.useState(
    initialValues.createdByName
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
  const [isActive, setIsActive] = React.useState(initialValues.isActive);
  const [interesetdUsers, setInteresetdUsers] = React.useState(
    initialValues.interesetdUsers
  );
  const [interesetdUsersLoading, setInteresetdUsersLoading] =
    React.useState(false);
  const [interesetdUsersRecords, setInteresetdUsersRecords] = React.useState(
    []
  );
  const [registeredPlayers, setRegisteredPlayers] = React.useState(
    initialValues.registeredPlayers
  );
  const [registeredPlayersLoading, setRegisteredPlayersLoading] =
    React.useState(false);
  const [registeredPlayersRecords, setRegisteredPlayersRecords] =
    React.useState([]);
  const [selectedPlayers, setSelectedPlayers] = React.useState(
    initialValues.selectedPlayers
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = playerPostRecord
      ? {
          ...initialValues,
          ...playerPostRecord,
          createdByProfileID,
          interesetdUsers: linkedInteresetdUsers,
          registeredPlayers: linkedRegisteredPlayers,
        }
      : initialValues;
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setCreatedByName(cleanValues.createdByName);
    setCreatedByProfileID(cleanValues.createdByProfileID);
    setCurrentCreatedByProfileIDValue(undefined);
    setCurrentCreatedByProfileIDDisplayValue("");
    setAgeGroup(cleanValues.ageGroup);
    setPositionsNeeded(cleanValues.positionsNeeded ?? []);
    setCurrentPositionsNeededValue("");
    setNumOfPlayersNeeded(cleanValues.numOfPlayersNeeded);
    setSkillLevel(cleanValues.skillLevel);
    setKickOff(cleanValues.kickOff);
    setStreet(cleanValues.street);
    setTownCity(cleanValues.townCity);
    setCounty(cleanValues.county);
    setPostcode(cleanValues.postcode);
    setIsActive(cleanValues.isActive);
    setInteresetdUsers(cleanValues.interesetdUsers ?? []);
    setCurrentInteresetdUsersValue(undefined);
    setCurrentInteresetdUsersDisplayValue("");
    setRegisteredPlayers(cleanValues.registeredPlayers ?? []);
    setCurrentRegisteredPlayersValue(undefined);
    setCurrentRegisteredPlayersDisplayValue("");
    setSelectedPlayers(cleanValues.selectedPlayers ?? []);
    setCurrentSelectedPlayersValue("");
    setErrors({});
  };
  const [playerPostRecord, setPlayerPostRecord] =
    React.useState(playerPostModelProp);
  const [linkedInteresetdUsers, setLinkedInteresetdUsers] = React.useState([]);
  const canUnlinkInteresetdUsers = false;
  const [linkedRegisteredPlayers, setLinkedRegisteredPlayers] = React.useState(
    []
  );
  const canUnlinkRegisteredPlayers = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPlayerPost.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPlayerPost
        : playerPostModelProp;
      const createdByProfileIDRecord = record
        ? record.createdByProfileID
        : undefined;
      const profileRecord = createdByProfileIDRecord
        ? (
            await client.graphql({
              query: getProfile.replaceAll("__typename", ""),
              variables: { id: createdByProfileIDRecord },
            })
          )?.data?.getProfile
        : undefined;
      setCreatedByProfileID(createdByProfileIDRecord);
      setSelectedCreatedByProfileIDRecords([profileRecord]);
      const linkedInteresetdUsers = record
        ? (
            await client.graphql({
              query: profilePlayerPostsByPlayerPostId.replaceAll(
                "__typename",
                ""
              ),
              variables: {
                playerPostId: record.id,
              },
            })
          ).data.profilePlayerPostsByPlayerPostId.items.map((t) => t.profile)
        : [];
      setLinkedInteresetdUsers(linkedInteresetdUsers);
      const linkedRegisteredPlayers = record
        ? (
            await client.graphql({
              query: playerPlayerPostsByPlayerPostId.replaceAll(
                "__typename",
                ""
              ),
              variables: {
                playerPostId: record.id,
              },
            })
          ).data.playerPlayerPostsByPlayerPostId.items.map((t) => t.player)
        : [];
      setLinkedRegisteredPlayers(linkedRegisteredPlayers);
      setPlayerPostRecord(record);
    };
    queryData();
  }, [idProp, playerPostModelProp]);
  React.useEffect(resetStateValues, [
    playerPostRecord,
    createdByProfileID,
    linkedInteresetdUsers,
    linkedRegisteredPlayers,
  ]);
  const [
    currentCreatedByProfileIDDisplayValue,
    setCurrentCreatedByProfileIDDisplayValue,
  ] = React.useState("");
  const [currentCreatedByProfileIDValue, setCurrentCreatedByProfileIDValue] =
    React.useState(undefined);
  const createdByProfileIDRef = React.createRef();
  const [currentPositionsNeededValue, setCurrentPositionsNeededValue] =
    React.useState("");
  const positionsNeededRef = React.createRef();
  const [
    currentInteresetdUsersDisplayValue,
    setCurrentInteresetdUsersDisplayValue,
  ] = React.useState("");
  const [currentInteresetdUsersValue, setCurrentInteresetdUsersValue] =
    React.useState(undefined);
  const interesetdUsersRef = React.createRef();
  const [
    currentRegisteredPlayersDisplayValue,
    setCurrentRegisteredPlayersDisplayValue,
  ] = React.useState("");
  const [currentRegisteredPlayersValue, setCurrentRegisteredPlayersValue] =
    React.useState(undefined);
  const registeredPlayersRef = React.createRef();
  const [currentSelectedPlayersValue, setCurrentSelectedPlayersValue] =
    React.useState("");
  const selectedPlayersRef = React.createRef();
  const getIDValue = {
    interesetdUsers: (r) => JSON.stringify({ id: r?.id }),
    registeredPlayers: (r) => JSON.stringify({ id: r?.id }),
  };
  const interesetdUsersIdSet = new Set(
    Array.isArray(interesetdUsers)
      ? interesetdUsers.map((r) => getIDValue.interesetdUsers?.(r))
      : getIDValue.interesetdUsers?.(interesetdUsers)
  );
  const registeredPlayersIdSet = new Set(
    Array.isArray(registeredPlayers)
      ? registeredPlayers.map((r) => getIDValue.registeredPlayers?.(r))
      : getIDValue.registeredPlayers?.(registeredPlayers)
  );
  const getDisplayValue = {
    createdByProfileID: (r) =>
      `${r?.username ? r?.username + " - " : ""}${r?.id}`,
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
    interesetdUsers: (r) => `${r?.username ? r?.username + " - " : ""}${r?.id}`,
    registeredPlayers: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    createdByName: [{ type: "Required" }],
    createdByProfileID: [{ type: "Required" }],
    ageGroup: [{ type: "Required" }],
    positionsNeeded: [{ type: "Required" }],
    numOfPlayersNeeded: [{ type: "Required" }],
    skillLevel: [{ type: "Required" }],
    kickOff: [{ type: "Required" }],
    street: [{ type: "Required" }],
    townCity: [{ type: "Required" }],
    county: [{ type: "Required" }],
    postcode: [{ type: "Required" }],
    isActive: [{ type: "Required" }],
    interesetdUsers: [],
    registeredPlayers: [],
    selectedPlayers: [],
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
        filter: {
          or: [{ username: { contains: value } }, { id: { contains: value } }],
        },
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
  const fetchInteresetdUsersRecords = async (value) => {
    setInteresetdUsersLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ username: { contains: value } }, { id: { contains: value } }],
        },
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
        (item) => !interesetdUsersIdSet.has(getIDValue.interesetdUsers?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setInteresetdUsersRecords(newOptions.slice(0, autocompleteLength));
    setInteresetdUsersLoading(false);
  };
  const fetchRegisteredPlayersRecords = async (value) => {
    setRegisteredPlayersLoading(true);
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
          query: listPlayers.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listPlayers?.items;
      var loaded = result.filter(
        (item) =>
          !registeredPlayersIdSet.has(getIDValue.registeredPlayers?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setRegisteredPlayersRecords(newOptions.slice(0, autocompleteLength));
    setRegisteredPlayersLoading(false);
  };
  React.useEffect(() => {
    fetchCreatedByProfileIDRecords("");
    fetchInteresetdUsersRecords("");
    fetchRegisteredPlayersRecords("");
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
          title,
          description,
          createdByName,
          createdByProfileID,
          ageGroup,
          positionsNeeded,
          numOfPlayersNeeded,
          skillLevel,
          kickOff,
          street,
          townCity,
          county,
          postcode,
          isActive,
          interesetdUsers: interesetdUsers ?? null,
          registeredPlayers: registeredPlayers ?? null,
          selectedPlayers: selectedPlayers ?? null,
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
          const interesetdUsersToLinkMap = new Map();
          const interesetdUsersToUnLinkMap = new Map();
          const interesetdUsersMap = new Map();
          const linkedInteresetdUsersMap = new Map();
          interesetdUsers.forEach((r) => {
            const count = interesetdUsersMap.get(
              getIDValue.interesetdUsers?.(r)
            );
            const newCount = count ? count + 1 : 1;
            interesetdUsersMap.set(getIDValue.interesetdUsers?.(r), newCount);
          });
          linkedInteresetdUsers.forEach((r) => {
            const count = linkedInteresetdUsersMap.get(
              getIDValue.interesetdUsers?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedInteresetdUsersMap.set(
              getIDValue.interesetdUsers?.(r),
              newCount
            );
          });
          linkedInteresetdUsersMap.forEach((count, id) => {
            const newCount = interesetdUsersMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                interesetdUsersToUnLinkMap.set(id, diffCount);
              }
            } else {
              interesetdUsersToUnLinkMap.set(id, count);
            }
          });
          interesetdUsersMap.forEach((count, id) => {
            const originalCount = linkedInteresetdUsersMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                interesetdUsersToLinkMap.set(id, diffCount);
              }
            } else {
              interesetdUsersToLinkMap.set(id, count);
            }
          });
          interesetdUsersToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const profilePlayerPostRecords = (
              await client.graphql({
                query: listProfilePlayerPosts.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { profileId: { eq: recordKeys.id } },
                      { playerPostId: { eq: playerPostRecord.id } },
                    ],
                  },
                },
              })
            )?.data?.listProfilePlayerPosts?.items;
            for (let i = 0; i < count; i++) {
              promises.push(
                client.graphql({
                  query: deleteProfilePlayerPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: profilePlayerPostRecords[i].id,
                    },
                  },
                })
              );
            }
          });
          interesetdUsersToLinkMap.forEach((count, id) => {
            const profileToLink = interesetdUsersRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                client.graphql({
                  query: createProfilePlayerPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      playerPostId: playerPostRecord.id,
                      profileId: profileToLink.id,
                    },
                  },
                })
              );
            }
          });
          const registeredPlayersToLinkMap = new Map();
          const registeredPlayersToUnLinkMap = new Map();
          const registeredPlayersMap = new Map();
          const linkedRegisteredPlayersMap = new Map();
          registeredPlayers.forEach((r) => {
            const count = registeredPlayersMap.get(
              getIDValue.registeredPlayers?.(r)
            );
            const newCount = count ? count + 1 : 1;
            registeredPlayersMap.set(
              getIDValue.registeredPlayers?.(r),
              newCount
            );
          });
          linkedRegisteredPlayers.forEach((r) => {
            const count = linkedRegisteredPlayersMap.get(
              getIDValue.registeredPlayers?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedRegisteredPlayersMap.set(
              getIDValue.registeredPlayers?.(r),
              newCount
            );
          });
          linkedRegisteredPlayersMap.forEach((count, id) => {
            const newCount = registeredPlayersMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                registeredPlayersToUnLinkMap.set(id, diffCount);
              }
            } else {
              registeredPlayersToUnLinkMap.set(id, count);
            }
          });
          registeredPlayersMap.forEach((count, id) => {
            const originalCount = linkedRegisteredPlayersMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                registeredPlayersToLinkMap.set(id, diffCount);
              }
            } else {
              registeredPlayersToLinkMap.set(id, count);
            }
          });
          registeredPlayersToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const playerPlayerPostRecords = (
              await client.graphql({
                query: listPlayerPlayerPosts.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { playerId: { eq: recordKeys.id } },
                      { playerPostId: { eq: playerPostRecord.id } },
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
          registeredPlayersToLinkMap.forEach((count, id) => {
            const playerToLink = registeredPlayersRecords.find((r) =>
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
                      playerPostId: playerPostRecord.id,
                      playerId: playerToLink.id,
                    },
                  },
                })
              );
            }
          });
          const modelFieldsToSave = {
            title: modelFields.title,
            description: modelFields.description,
            createdByName: modelFields.createdByName,
            createdByProfileID: modelFields.createdByProfileID,
            ageGroup: modelFields.ageGroup,
            positionsNeeded: modelFields.positionsNeeded,
            numOfPlayersNeeded: modelFields.numOfPlayersNeeded,
            skillLevel: modelFields.skillLevel,
            kickOff: modelFields.kickOff,
            street: modelFields.street,
            townCity: modelFields.townCity,
            county: modelFields.county,
            postcode: modelFields.postcode,
            isActive: modelFields.isActive,
            selectedPlayers: modelFields.selectedPlayers ?? null,
          };
          promises.push(
            client.graphql({
              query: updatePlayerPost.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: playerPostRecord.id,
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
      {...getOverrideProps(overrides, "PlayerPostUpdateForm")}
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
      <TextField
        label="Created by name"
        isRequired={true}
        isReadOnly={false}
        value={createdByName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              createdByName: value,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
            };
            const result = onChange(modelFields);
            value = result?.createdByName ?? value;
          }
          if (errors.createdByName?.hasError) {
            runValidationTasks("createdByName", value);
          }
          setCreatedByName(value);
        }}
        onBlur={() => runValidationTasks("createdByName", createdByName)}
        errorMessage={errors.createdByName?.errorMessage}
        hasError={errors.createdByName?.hasError}
        {...getOverrideProps(overrides, "createdByName")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              description,
              createdByName,
              createdByProfileID: value,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
            };
            const result = onChange(modelFields);
            value = result?.createdByProfileID ?? value;
          }
          setCreatedByProfileID(value);
          setCurrentCreatedByProfileIDValue(undefined);
        }}
        currentFieldValue={currentCreatedByProfileIDValue}
        label={"Created by profile id"}
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
          label="Created by profile id"
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
          defaultValue={createdByProfileID}
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
              createdByName,
              createdByProfileID,
              ageGroup: value,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded: values,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded: value,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel: value,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff: value,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street: value,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity: value,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county: value,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode: value,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
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
      <SwitchField
        label="Is active"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isActive}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              description,
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive: value,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers,
            };
            const result = onChange(modelFields);
            value = result?.isActive ?? value;
          }
          if (errors.isActive?.hasError) {
            runValidationTasks("isActive", value);
          }
          setIsActive(value);
        }}
        onBlur={() => runValidationTasks("isActive", isActive)}
        errorMessage={errors.isActive?.errorMessage}
        hasError={errors.isActive?.hasError}
        {...getOverrideProps(overrides, "isActive")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers: values,
              registeredPlayers,
              selectedPlayers,
            };
            const result = onChange(modelFields);
            values = result?.interesetdUsers ?? values;
          }
          setInteresetdUsers(values);
          setCurrentInteresetdUsersValue(undefined);
          setCurrentInteresetdUsersDisplayValue("");
        }}
        currentFieldValue={currentInteresetdUsersValue}
        label={"Interesetd users"}
        items={interesetdUsers}
        hasError={errors?.interesetdUsers?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "interesetdUsers",
            currentInteresetdUsersValue
          )
        }
        errorMessage={errors?.interesetdUsers?.errorMessage}
        getBadgeText={getDisplayValue.interesetdUsers}
        setFieldValue={(model) => {
          setCurrentInteresetdUsersDisplayValue(
            model ? getDisplayValue.interesetdUsers(model) : ""
          );
          setCurrentInteresetdUsersValue(model);
        }}
        inputFieldRef={interesetdUsersRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Interesetd users"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Profile"
          value={currentInteresetdUsersDisplayValue}
          options={interesetdUsersRecords.map((r) => ({
            id: getIDValue.interesetdUsers?.(r),
            label: getDisplayValue.interesetdUsers?.(r),
          }))}
          isLoading={interesetdUsersLoading}
          onSelect={({ id, label }) => {
            setCurrentInteresetdUsersValue(
              interesetdUsersRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentInteresetdUsersDisplayValue(label);
            runValidationTasks("interesetdUsers", label);
          }}
          onClear={() => {
            setCurrentInteresetdUsersDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchInteresetdUsersRecords(value);
            if (errors.interesetdUsers?.hasError) {
              runValidationTasks("interesetdUsers", value);
            }
            setCurrentInteresetdUsersDisplayValue(value);
            setCurrentInteresetdUsersValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "interesetdUsers",
              currentInteresetdUsersDisplayValue
            )
          }
          errorMessage={errors.interesetdUsers?.errorMessage}
          hasError={errors.interesetdUsers?.hasError}
          ref={interesetdUsersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "interesetdUsers")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers: values,
              selectedPlayers,
            };
            const result = onChange(modelFields);
            values = result?.registeredPlayers ?? values;
          }
          setRegisteredPlayers(values);
          setCurrentRegisteredPlayersValue(undefined);
          setCurrentRegisteredPlayersDisplayValue("");
        }}
        currentFieldValue={currentRegisteredPlayersValue}
        label={"Registered players"}
        items={registeredPlayers}
        hasError={errors?.registeredPlayers?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "registeredPlayers",
            currentRegisteredPlayersValue
          )
        }
        errorMessage={errors?.registeredPlayers?.errorMessage}
        getBadgeText={getDisplayValue.registeredPlayers}
        setFieldValue={(model) => {
          setCurrentRegisteredPlayersDisplayValue(
            model ? getDisplayValue.registeredPlayers(model) : ""
          );
          setCurrentRegisteredPlayersValue(model);
        }}
        inputFieldRef={registeredPlayersRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Registered players"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Player"
          value={currentRegisteredPlayersDisplayValue}
          options={registeredPlayersRecords.map((r) => ({
            id: getIDValue.registeredPlayers?.(r),
            label: getDisplayValue.registeredPlayers?.(r),
          }))}
          isLoading={registeredPlayersLoading}
          onSelect={({ id, label }) => {
            setCurrentRegisteredPlayersValue(
              registeredPlayersRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentRegisteredPlayersDisplayValue(label);
            runValidationTasks("registeredPlayers", label);
          }}
          onClear={() => {
            setCurrentRegisteredPlayersDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchRegisteredPlayersRecords(value);
            if (errors.registeredPlayers?.hasError) {
              runValidationTasks("registeredPlayers", value);
            }
            setCurrentRegisteredPlayersDisplayValue(value);
            setCurrentRegisteredPlayersValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "registeredPlayers",
              currentRegisteredPlayersDisplayValue
            )
          }
          errorMessage={errors.registeredPlayers?.errorMessage}
          hasError={errors.registeredPlayers?.hasError}
          ref={registeredPlayersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "registeredPlayers")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              createdByName,
              createdByProfileID,
              ageGroup,
              positionsNeeded,
              numOfPlayersNeeded,
              skillLevel,
              kickOff,
              street,
              townCity,
              county,
              postcode,
              isActive,
              interesetdUsers,
              registeredPlayers,
              selectedPlayers: values,
            };
            const result = onChange(modelFields);
            values = result?.selectedPlayers ?? values;
          }
          setSelectedPlayers(values);
          setCurrentSelectedPlayersValue("");
        }}
        currentFieldValue={currentSelectedPlayersValue}
        label={"Selected players"}
        items={selectedPlayers}
        hasError={errors?.selectedPlayers?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "selectedPlayers",
            currentSelectedPlayersValue
          )
        }
        errorMessage={errors?.selectedPlayers?.errorMessage}
        setFieldValue={setCurrentSelectedPlayersValue}
        inputFieldRef={selectedPlayersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Selected players"
          isRequired={false}
          isReadOnly={false}
          value={currentSelectedPlayersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.selectedPlayers?.hasError) {
              runValidationTasks("selectedPlayers", value);
            }
            setCurrentSelectedPlayersValue(value);
          }}
          onBlur={() =>
            runValidationTasks("selectedPlayers", currentSelectedPlayersValue)
          }
          errorMessage={errors.selectedPlayers?.errorMessage}
          hasError={errors.selectedPlayers?.hasError}
          ref={selectedPlayersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "selectedPlayers")}
        ></TextField>
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
          isDisabled={!(idProp || playerPostModelProp)}
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
              !(idProp || playerPostModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
