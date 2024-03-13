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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import {
  getProfile,
  listChats,
  listMatchPosts,
  listPlayerPosts,
  listProfileChats,
  listProfileMatchPosts,
  listProfilePlayerPosts,
  profileChatsByProfileId,
  profileMatchPostsByProfileId,
  profilePlayerPostsByProfileId,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import {
  createProfileChat,
  createProfileMatchPost,
  createProfilePlayerPost,
  deleteProfileChat,
  deleteProfileMatchPost,
  deleteProfilePlayerPost,
  updateMatchPost,
  updatePlayerPost,
  updateProfile,
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
export default function ProfileUpdateForm(props) {
  const {
    id: idProp,
    profile: profileModelProp,
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
    phoneNumber: "",
    street: "",
    townCity: "",
    county: "",
    postcode: "",
    matchPosts: [],
    interestedMatchPosts: [],
    playerPosts: [],
    interestedPlayerPosts: [],
    chats: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [dob, setDob] = React.useState(initialValues.dob);
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [street, setStreet] = React.useState(initialValues.street);
  const [townCity, setTownCity] = React.useState(initialValues.townCity);
  const [county, setCounty] = React.useState(initialValues.county);
  const [postcode, setPostcode] = React.useState(initialValues.postcode);
  const [matchPosts, setMatchPosts] = React.useState(initialValues.matchPosts);
  const [matchPostsLoading, setMatchPostsLoading] = React.useState(false);
  const [matchPostsRecords, setMatchPostsRecords] = React.useState([]);
  const [interestedMatchPosts, setInterestedMatchPosts] = React.useState(
    initialValues.interestedMatchPosts
  );
  const [interestedMatchPostsLoading, setInterestedMatchPostsLoading] =
    React.useState(false);
  const [interestedMatchPostsRecords, setInterestedMatchPostsRecords] =
    React.useState([]);
  const [playerPosts, setPlayerPosts] = React.useState(
    initialValues.playerPosts
  );
  const [playerPostsLoading, setPlayerPostsLoading] = React.useState(false);
  const [playerPostsRecords, setPlayerPostsRecords] = React.useState([]);
  const [interestedPlayerPosts, setInterestedPlayerPosts] = React.useState(
    initialValues.interestedPlayerPosts
  );
  const [interestedPlayerPostsLoading, setInterestedPlayerPostsLoading] =
    React.useState(false);
  const [interestedPlayerPostsRecords, setInterestedPlayerPostsRecords] =
    React.useState([]);
  const [chats, setChats] = React.useState(initialValues.chats);
  const [chatsLoading, setChatsLoading] = React.useState(false);
  const [chatsRecords, setChatsRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = profileRecord
      ? {
          ...initialValues,
          ...profileRecord,
          matchPosts: linkedMatchPosts,
          interestedMatchPosts: linkedInterestedMatchPosts,
          playerPosts: linkedPlayerPosts,
          interestedPlayerPosts: linkedInterestedPlayerPosts,
          chats: linkedChats,
        }
      : initialValues;
    setName(cleanValues.name);
    setDob(cleanValues.dob);
    setPhoneNumber(cleanValues.phoneNumber);
    setStreet(cleanValues.street);
    setTownCity(cleanValues.townCity);
    setCounty(cleanValues.county);
    setPostcode(cleanValues.postcode);
    setMatchPosts(cleanValues.matchPosts ?? []);
    setCurrentMatchPostsValue(undefined);
    setCurrentMatchPostsDisplayValue("");
    setInterestedMatchPosts(cleanValues.interestedMatchPosts ?? []);
    setCurrentInterestedMatchPostsValue(undefined);
    setCurrentInterestedMatchPostsDisplayValue("");
    setPlayerPosts(cleanValues.playerPosts ?? []);
    setCurrentPlayerPostsValue(undefined);
    setCurrentPlayerPostsDisplayValue("");
    setInterestedPlayerPosts(cleanValues.interestedPlayerPosts ?? []);
    setCurrentInterestedPlayerPostsValue(undefined);
    setCurrentInterestedPlayerPostsDisplayValue("");
    setChats(cleanValues.chats ?? []);
    setCurrentChatsValue(undefined);
    setCurrentChatsDisplayValue("");
    setErrors({});
  };
  const [profileRecord, setProfileRecord] = React.useState(profileModelProp);
  const [linkedMatchPosts, setLinkedMatchPosts] = React.useState([]);
  const canUnlinkMatchPosts = false;
  const [linkedInterestedMatchPosts, setLinkedInterestedMatchPosts] =
    React.useState([]);
  const canUnlinkInterestedMatchPosts = false;
  const [linkedPlayerPosts, setLinkedPlayerPosts] = React.useState([]);
  const canUnlinkPlayerPosts = false;
  const [linkedInterestedPlayerPosts, setLinkedInterestedPlayerPosts] =
    React.useState([]);
  const canUnlinkInterestedPlayerPosts = false;
  const [linkedChats, setLinkedChats] = React.useState([]);
  const canUnlinkChats = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getProfile.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getProfile
        : profileModelProp;
      const linkedMatchPosts = record?.matchPosts?.items ?? [];
      setLinkedMatchPosts(linkedMatchPosts);
      const linkedInterestedMatchPosts = record
        ? (
            await client.graphql({
              query: profileMatchPostsByProfileId.replaceAll("__typename", ""),
              variables: {
                profileId: record.id,
              },
            })
          ).data.profileMatchPostsByProfileId.items.map((t) => t.matchPost)
        : [];
      setLinkedInterestedMatchPosts(linkedInterestedMatchPosts);
      const linkedPlayerPosts = record?.playerPosts?.items ?? [];
      setLinkedPlayerPosts(linkedPlayerPosts);
      const linkedInterestedPlayerPosts = record
        ? (
            await client.graphql({
              query: profilePlayerPostsByProfileId.replaceAll("__typename", ""),
              variables: {
                profileId: record.id,
              },
            })
          ).data.profilePlayerPostsByProfileId.items.map((t) => t.playerPost)
        : [];
      setLinkedInterestedPlayerPosts(linkedInterestedPlayerPosts);
      const linkedChats = record
        ? (
            await client.graphql({
              query: profileChatsByProfileId.replaceAll("__typename", ""),
              variables: {
                profileId: record.id,
              },
            })
          ).data.profileChatsByProfileId.items.map((t) => t.chat)
        : [];
      setLinkedChats(linkedChats);
      setProfileRecord(record);
    };
    queryData();
  }, [idProp, profileModelProp]);
  React.useEffect(resetStateValues, [
    profileRecord,
    linkedMatchPosts,
    linkedInterestedMatchPosts,
    linkedPlayerPosts,
    linkedInterestedPlayerPosts,
    linkedChats,
  ]);
  const [currentMatchPostsDisplayValue, setCurrentMatchPostsDisplayValue] =
    React.useState("");
  const [currentMatchPostsValue, setCurrentMatchPostsValue] =
    React.useState(undefined);
  const matchPostsRef = React.createRef();
  const [
    currentInterestedMatchPostsDisplayValue,
    setCurrentInterestedMatchPostsDisplayValue,
  ] = React.useState("");
  const [
    currentInterestedMatchPostsValue,
    setCurrentInterestedMatchPostsValue,
  ] = React.useState(undefined);
  const interestedMatchPostsRef = React.createRef();
  const [currentPlayerPostsDisplayValue, setCurrentPlayerPostsDisplayValue] =
    React.useState("");
  const [currentPlayerPostsValue, setCurrentPlayerPostsValue] =
    React.useState(undefined);
  const playerPostsRef = React.createRef();
  const [
    currentInterestedPlayerPostsDisplayValue,
    setCurrentInterestedPlayerPostsDisplayValue,
  ] = React.useState("");
  const [
    currentInterestedPlayerPostsValue,
    setCurrentInterestedPlayerPostsValue,
  ] = React.useState(undefined);
  const interestedPlayerPostsRef = React.createRef();
  const [currentChatsDisplayValue, setCurrentChatsDisplayValue] =
    React.useState("");
  const [currentChatsValue, setCurrentChatsValue] = React.useState(undefined);
  const chatsRef = React.createRef();
  const getIDValue = {
    matchPosts: (r) => JSON.stringify({ id: r?.id }),
    interestedMatchPosts: (r) => JSON.stringify({ id: r?.id }),
    playerPosts: (r) => JSON.stringify({ id: r?.id }),
    interestedPlayerPosts: (r) => JSON.stringify({ id: r?.id }),
    chats: (r) => JSON.stringify({ id: r?.id }),
  };
  const matchPostsIdSet = new Set(
    Array.isArray(matchPosts)
      ? matchPosts.map((r) => getIDValue.matchPosts?.(r))
      : getIDValue.matchPosts?.(matchPosts)
  );
  const interestedMatchPostsIdSet = new Set(
    Array.isArray(interestedMatchPosts)
      ? interestedMatchPosts.map((r) => getIDValue.interestedMatchPosts?.(r))
      : getIDValue.interestedMatchPosts?.(interestedMatchPosts)
  );
  const playerPostsIdSet = new Set(
    Array.isArray(playerPosts)
      ? playerPosts.map((r) => getIDValue.playerPosts?.(r))
      : getIDValue.playerPosts?.(playerPosts)
  );
  const interestedPlayerPostsIdSet = new Set(
    Array.isArray(interestedPlayerPosts)
      ? interestedPlayerPosts.map((r) => getIDValue.interestedPlayerPosts?.(r))
      : getIDValue.interestedPlayerPosts?.(interestedPlayerPosts)
  );
  const chatsIdSet = new Set(
    Array.isArray(chats)
      ? chats.map((r) => getIDValue.chats?.(r))
      : getIDValue.chats?.(chats)
  );
  const getDisplayValue = {
    matchPosts: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    interestedMatchPosts: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    playerPosts: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    interestedPlayerPosts: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    chats: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    dob: [{ type: "Required" }],
    phoneNumber: [{ type: "Required" }, { type: "Phone" }],
    street: [{ type: "Required" }],
    townCity: [{ type: "Required" }],
    county: [{ type: "Required" }],
    postcode: [{ type: "Required" }],
    matchPosts: [],
    interestedMatchPosts: [],
    playerPosts: [],
    interestedPlayerPosts: [],
    chats: [],
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
  const fetchMatchPostsRecords = async (value) => {
    setMatchPostsLoading(true);
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
          query: listMatchPosts.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMatchPosts?.items;
      var loaded = result.filter(
        (item) => !matchPostsIdSet.has(getIDValue.matchPosts?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMatchPostsRecords(newOptions.slice(0, autocompleteLength));
    setMatchPostsLoading(false);
  };
  const fetchInterestedMatchPostsRecords = async (value) => {
    setInterestedMatchPostsLoading(true);
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
          query: listMatchPosts.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMatchPosts?.items;
      var loaded = result.filter(
        (item) =>
          !interestedMatchPostsIdSet.has(
            getIDValue.interestedMatchPosts?.(item)
          )
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setInterestedMatchPostsRecords(newOptions.slice(0, autocompleteLength));
    setInterestedMatchPostsLoading(false);
  };
  const fetchPlayerPostsRecords = async (value) => {
    setPlayerPostsLoading(true);
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
        (item) => !playerPostsIdSet.has(getIDValue.playerPosts?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPlayerPostsRecords(newOptions.slice(0, autocompleteLength));
    setPlayerPostsLoading(false);
  };
  const fetchInterestedPlayerPostsRecords = async (value) => {
    setInterestedPlayerPostsLoading(true);
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
          !interestedPlayerPostsIdSet.has(
            getIDValue.interestedPlayerPosts?.(item)
          )
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setInterestedPlayerPostsRecords(newOptions.slice(0, autocompleteLength));
    setInterestedPlayerPostsLoading(false);
  };
  const fetchChatsRecords = async (value) => {
    setChatsLoading(true);
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
          query: listChats.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listChats?.items;
      var loaded = result.filter(
        (item) => !chatsIdSet.has(getIDValue.chats?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setChatsRecords(newOptions.slice(0, autocompleteLength));
    setChatsLoading(false);
  };
  React.useEffect(() => {
    fetchMatchPostsRecords("");
    fetchInterestedMatchPostsRecords("");
    fetchPlayerPostsRecords("");
    fetchInterestedPlayerPostsRecords("");
    fetchChatsRecords("");
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
          phoneNumber,
          street,
          townCity,
          county,
          postcode,
          matchPosts: matchPosts ?? null,
          interestedMatchPosts: interestedMatchPosts ?? null,
          playerPosts: playerPosts ?? null,
          interestedPlayerPosts: interestedPlayerPosts ?? null,
          chats: chats ?? null,
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
          const matchPostsToLink = [];
          const matchPostsToUnLink = [];
          const matchPostsSet = new Set();
          const linkedMatchPostsSet = new Set();
          matchPosts.forEach((r) =>
            matchPostsSet.add(getIDValue.matchPosts?.(r))
          );
          linkedMatchPosts.forEach((r) =>
            linkedMatchPostsSet.add(getIDValue.matchPosts?.(r))
          );
          linkedMatchPosts.forEach((r) => {
            if (!matchPostsSet.has(getIDValue.matchPosts?.(r))) {
              matchPostsToUnLink.push(r);
            }
          });
          matchPosts.forEach((r) => {
            if (!linkedMatchPostsSet.has(getIDValue.matchPosts?.(r))) {
              matchPostsToLink.push(r);
            }
          });
          matchPostsToUnLink.forEach((original) => {
            if (!canUnlinkMatchPosts) {
              throw Error(
                `MatchPost ${original.id} cannot be unlinked from Profile because createdByProfileID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateMatchPost.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    createdByProfileID: null,
                  },
                },
              })
            );
          });
          matchPostsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateMatchPost.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    createdByProfileID: profileRecord.id,
                  },
                },
              })
            );
          });
          const interestedMatchPostsToLinkMap = new Map();
          const interestedMatchPostsToUnLinkMap = new Map();
          const interestedMatchPostsMap = new Map();
          const linkedInterestedMatchPostsMap = new Map();
          interestedMatchPosts.forEach((r) => {
            const count = interestedMatchPostsMap.get(
              getIDValue.interestedMatchPosts?.(r)
            );
            const newCount = count ? count + 1 : 1;
            interestedMatchPostsMap.set(
              getIDValue.interestedMatchPosts?.(r),
              newCount
            );
          });
          linkedInterestedMatchPosts.forEach((r) => {
            const count = linkedInterestedMatchPostsMap.get(
              getIDValue.interestedMatchPosts?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedInterestedMatchPostsMap.set(
              getIDValue.interestedMatchPosts?.(r),
              newCount
            );
          });
          linkedInterestedMatchPostsMap.forEach((count, id) => {
            const newCount = interestedMatchPostsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                interestedMatchPostsToUnLinkMap.set(id, diffCount);
              }
            } else {
              interestedMatchPostsToUnLinkMap.set(id, count);
            }
          });
          interestedMatchPostsMap.forEach((count, id) => {
            const originalCount = linkedInterestedMatchPostsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                interestedMatchPostsToLinkMap.set(id, diffCount);
              }
            } else {
              interestedMatchPostsToLinkMap.set(id, count);
            }
          });
          interestedMatchPostsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const profileMatchPostRecords = (
              await client.graphql({
                query: listProfileMatchPosts.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { matchPostId: { eq: recordKeys.id } },
                      { profileId: { eq: profileRecord.id } },
                    ],
                  },
                },
              })
            )?.data?.listProfileMatchPosts?.items;
            for (let i = 0; i < count; i++) {
              promises.push(
                client.graphql({
                  query: deleteProfileMatchPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: profileMatchPostRecords[i].id,
                    },
                  },
                })
              );
            }
          });
          interestedMatchPostsToLinkMap.forEach((count, id) => {
            const matchPostToLink = interestedMatchPostsRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                client.graphql({
                  query: createProfileMatchPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      profileId: profileRecord.id,
                      matchPostId: matchPostToLink.id,
                    },
                  },
                })
              );
            }
          });
          const playerPostsToLink = [];
          const playerPostsToUnLink = [];
          const playerPostsSet = new Set();
          const linkedPlayerPostsSet = new Set();
          playerPosts.forEach((r) =>
            playerPostsSet.add(getIDValue.playerPosts?.(r))
          );
          linkedPlayerPosts.forEach((r) =>
            linkedPlayerPostsSet.add(getIDValue.playerPosts?.(r))
          );
          linkedPlayerPosts.forEach((r) => {
            if (!playerPostsSet.has(getIDValue.playerPosts?.(r))) {
              playerPostsToUnLink.push(r);
            }
          });
          playerPosts.forEach((r) => {
            if (!linkedPlayerPostsSet.has(getIDValue.playerPosts?.(r))) {
              playerPostsToLink.push(r);
            }
          });
          playerPostsToUnLink.forEach((original) => {
            if (!canUnlinkPlayerPosts) {
              throw Error(
                `PlayerPost ${original.id} cannot be unlinked from Profile because createdByProfileID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updatePlayerPost.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    createdByProfileID: null,
                  },
                },
              })
            );
          });
          playerPostsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updatePlayerPost.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    createdByProfileID: profileRecord.id,
                  },
                },
              })
            );
          });
          const interestedPlayerPostsToLinkMap = new Map();
          const interestedPlayerPostsToUnLinkMap = new Map();
          const interestedPlayerPostsMap = new Map();
          const linkedInterestedPlayerPostsMap = new Map();
          interestedPlayerPosts.forEach((r) => {
            const count = interestedPlayerPostsMap.get(
              getIDValue.interestedPlayerPosts?.(r)
            );
            const newCount = count ? count + 1 : 1;
            interestedPlayerPostsMap.set(
              getIDValue.interestedPlayerPosts?.(r),
              newCount
            );
          });
          linkedInterestedPlayerPosts.forEach((r) => {
            const count = linkedInterestedPlayerPostsMap.get(
              getIDValue.interestedPlayerPosts?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedInterestedPlayerPostsMap.set(
              getIDValue.interestedPlayerPosts?.(r),
              newCount
            );
          });
          linkedInterestedPlayerPostsMap.forEach((count, id) => {
            const newCount = interestedPlayerPostsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                interestedPlayerPostsToUnLinkMap.set(id, diffCount);
              }
            } else {
              interestedPlayerPostsToUnLinkMap.set(id, count);
            }
          });
          interestedPlayerPostsMap.forEach((count, id) => {
            const originalCount = linkedInterestedPlayerPostsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                interestedPlayerPostsToLinkMap.set(id, diffCount);
              }
            } else {
              interestedPlayerPostsToLinkMap.set(id, count);
            }
          });
          interestedPlayerPostsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const profilePlayerPostRecords = (
              await client.graphql({
                query: listProfilePlayerPosts.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { playerPostId: { eq: recordKeys.id } },
                      { profileId: { eq: profileRecord.id } },
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
          interestedPlayerPostsToLinkMap.forEach((count, id) => {
            const playerPostToLink = interestedPlayerPostsRecords.find((r) =>
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
                      profileId: profileRecord.id,
                      playerPostId: playerPostToLink.id,
                    },
                  },
                })
              );
            }
          });
          const chatsToLinkMap = new Map();
          const chatsToUnLinkMap = new Map();
          const chatsMap = new Map();
          const linkedChatsMap = new Map();
          chats.forEach((r) => {
            const count = chatsMap.get(getIDValue.chats?.(r));
            const newCount = count ? count + 1 : 1;
            chatsMap.set(getIDValue.chats?.(r), newCount);
          });
          linkedChats.forEach((r) => {
            const count = linkedChatsMap.get(getIDValue.chats?.(r));
            const newCount = count ? count + 1 : 1;
            linkedChatsMap.set(getIDValue.chats?.(r), newCount);
          });
          linkedChatsMap.forEach((count, id) => {
            const newCount = chatsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                chatsToUnLinkMap.set(id, diffCount);
              }
            } else {
              chatsToUnLinkMap.set(id, count);
            }
          });
          chatsMap.forEach((count, id) => {
            const originalCount = linkedChatsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                chatsToLinkMap.set(id, diffCount);
              }
            } else {
              chatsToLinkMap.set(id, count);
            }
          });
          chatsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const profileChatRecords = (
              await client.graphql({
                query: listProfileChats.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { chatId: { eq: recordKeys.id } },
                      { profileId: { eq: profileRecord.id } },
                    ],
                  },
                },
              })
            )?.data?.listProfileChats?.items;
            for (let i = 0; i < count; i++) {
              promises.push(
                client.graphql({
                  query: deleteProfileChat.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: profileChatRecords[i].id,
                    },
                  },
                })
              );
            }
          });
          chatsToLinkMap.forEach((count, id) => {
            const chatToLink = chatsRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                client.graphql({
                  query: createProfileChat.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      profileId: profileRecord.id,
                      chatId: chatToLink.id,
                    },
                  },
                })
              );
            }
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            dob: modelFields.dob,
            phoneNumber: modelFields.phoneNumber,
            street: modelFields.street,
            townCity: modelFields.townCity,
            county: modelFields.county,
            postcode: modelFields.postcode,
          };
          promises.push(
            client.graphql({
              query: updateProfile.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: profileRecord.id,
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
      {...getOverrideProps(overrides, "ProfileUpdateForm")}
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
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
              chats,
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
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
              chats,
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
      <TextField
        label="Phone number"
        isRequired={true}
        isReadOnly={false}
        type="tel"
        value={phoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dob,
              phoneNumber: value,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
              chats,
            };
            const result = onChange(modelFields);
            value = result?.phoneNumber ?? value;
          }
          if (errors.phoneNumber?.hasError) {
            runValidationTasks("phoneNumber", value);
          }
          setPhoneNumber(value);
        }}
        onBlur={() => runValidationTasks("phoneNumber", phoneNumber)}
        errorMessage={errors.phoneNumber?.errorMessage}
        hasError={errors.phoneNumber?.hasError}
        {...getOverrideProps(overrides, "phoneNumber")}
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
              name,
              dob,
              phoneNumber,
              street: value,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
              chats,
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
              name,
              dob,
              phoneNumber,
              street,
              townCity: value,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
              chats,
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
              name,
              dob,
              phoneNumber,
              street,
              townCity,
              county: value,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
              chats,
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
              name,
              dob,
              phoneNumber,
              street,
              townCity,
              county,
              postcode: value,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
              chats,
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
              name,
              dob,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts: values,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
              chats,
            };
            const result = onChange(modelFields);
            values = result?.matchPosts ?? values;
          }
          setMatchPosts(values);
          setCurrentMatchPostsValue(undefined);
          setCurrentMatchPostsDisplayValue("");
        }}
        currentFieldValue={currentMatchPostsValue}
        label={"Match posts"}
        items={matchPosts}
        hasError={errors?.matchPosts?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("matchPosts", currentMatchPostsValue)
        }
        errorMessage={errors?.matchPosts?.errorMessage}
        getBadgeText={getDisplayValue.matchPosts}
        setFieldValue={(model) => {
          setCurrentMatchPostsDisplayValue(
            model ? getDisplayValue.matchPosts(model) : ""
          );
          setCurrentMatchPostsValue(model);
        }}
        inputFieldRef={matchPostsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Match posts"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search MatchPost"
          value={currentMatchPostsDisplayValue}
          options={matchPostsRecords
            .filter((r) => !matchPostsIdSet.has(getIDValue.matchPosts?.(r)))
            .map((r) => ({
              id: getIDValue.matchPosts?.(r),
              label: getDisplayValue.matchPosts?.(r),
            }))}
          isLoading={matchPostsLoading}
          onSelect={({ id, label }) => {
            setCurrentMatchPostsValue(
              matchPostsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMatchPostsDisplayValue(label);
            runValidationTasks("matchPosts", label);
          }}
          onClear={() => {
            setCurrentMatchPostsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchMatchPostsRecords(value);
            if (errors.matchPosts?.hasError) {
              runValidationTasks("matchPosts", value);
            }
            setCurrentMatchPostsDisplayValue(value);
            setCurrentMatchPostsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("matchPosts", currentMatchPostsDisplayValue)
          }
          errorMessage={errors.matchPosts?.errorMessage}
          hasError={errors.matchPosts?.hasError}
          ref={matchPostsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "matchPosts")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              dob,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts: values,
              playerPosts,
              interestedPlayerPosts,
              chats,
            };
            const result = onChange(modelFields);
            values = result?.interestedMatchPosts ?? values;
          }
          setInterestedMatchPosts(values);
          setCurrentInterestedMatchPostsValue(undefined);
          setCurrentInterestedMatchPostsDisplayValue("");
        }}
        currentFieldValue={currentInterestedMatchPostsValue}
        label={"Interested match posts"}
        items={interestedMatchPosts}
        hasError={errors?.interestedMatchPosts?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "interestedMatchPosts",
            currentInterestedMatchPostsValue
          )
        }
        errorMessage={errors?.interestedMatchPosts?.errorMessage}
        getBadgeText={getDisplayValue.interestedMatchPosts}
        setFieldValue={(model) => {
          setCurrentInterestedMatchPostsDisplayValue(
            model ? getDisplayValue.interestedMatchPosts(model) : ""
          );
          setCurrentInterestedMatchPostsValue(model);
        }}
        inputFieldRef={interestedMatchPostsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Interested match posts"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search MatchPost"
          value={currentInterestedMatchPostsDisplayValue}
          options={interestedMatchPostsRecords.map((r) => ({
            id: getIDValue.interestedMatchPosts?.(r),
            label: getDisplayValue.interestedMatchPosts?.(r),
          }))}
          isLoading={interestedMatchPostsLoading}
          onSelect={({ id, label }) => {
            setCurrentInterestedMatchPostsValue(
              interestedMatchPostsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentInterestedMatchPostsDisplayValue(label);
            runValidationTasks("interestedMatchPosts", label);
          }}
          onClear={() => {
            setCurrentInterestedMatchPostsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchInterestedMatchPostsRecords(value);
            if (errors.interestedMatchPosts?.hasError) {
              runValidationTasks("interestedMatchPosts", value);
            }
            setCurrentInterestedMatchPostsDisplayValue(value);
            setCurrentInterestedMatchPostsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "interestedMatchPosts",
              currentInterestedMatchPostsDisplayValue
            )
          }
          errorMessage={errors.interestedMatchPosts?.errorMessage}
          hasError={errors.interestedMatchPosts?.hasError}
          ref={interestedMatchPostsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "interestedMatchPosts")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              dob,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts: values,
              interestedPlayerPosts,
              chats,
            };
            const result = onChange(modelFields);
            values = result?.playerPosts ?? values;
          }
          setPlayerPosts(values);
          setCurrentPlayerPostsValue(undefined);
          setCurrentPlayerPostsDisplayValue("");
        }}
        currentFieldValue={currentPlayerPostsValue}
        label={"Player posts"}
        items={playerPosts}
        hasError={errors?.playerPosts?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("playerPosts", currentPlayerPostsValue)
        }
        errorMessage={errors?.playerPosts?.errorMessage}
        getBadgeText={getDisplayValue.playerPosts}
        setFieldValue={(model) => {
          setCurrentPlayerPostsDisplayValue(
            model ? getDisplayValue.playerPosts(model) : ""
          );
          setCurrentPlayerPostsValue(model);
        }}
        inputFieldRef={playerPostsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Player posts"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search PlayerPost"
          value={currentPlayerPostsDisplayValue}
          options={playerPostsRecords
            .filter((r) => !playerPostsIdSet.has(getIDValue.playerPosts?.(r)))
            .map((r) => ({
              id: getIDValue.playerPosts?.(r),
              label: getDisplayValue.playerPosts?.(r),
            }))}
          isLoading={playerPostsLoading}
          onSelect={({ id, label }) => {
            setCurrentPlayerPostsValue(
              playerPostsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPlayerPostsDisplayValue(label);
            runValidationTasks("playerPosts", label);
          }}
          onClear={() => {
            setCurrentPlayerPostsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPlayerPostsRecords(value);
            if (errors.playerPosts?.hasError) {
              runValidationTasks("playerPosts", value);
            }
            setCurrentPlayerPostsDisplayValue(value);
            setCurrentPlayerPostsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("playerPosts", currentPlayerPostsDisplayValue)
          }
          errorMessage={errors.playerPosts?.errorMessage}
          hasError={errors.playerPosts?.hasError}
          ref={playerPostsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "playerPosts")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              dob,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts: values,
              chats,
            };
            const result = onChange(modelFields);
            values = result?.interestedPlayerPosts ?? values;
          }
          setInterestedPlayerPosts(values);
          setCurrentInterestedPlayerPostsValue(undefined);
          setCurrentInterestedPlayerPostsDisplayValue("");
        }}
        currentFieldValue={currentInterestedPlayerPostsValue}
        label={"Interested player posts"}
        items={interestedPlayerPosts}
        hasError={errors?.interestedPlayerPosts?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "interestedPlayerPosts",
            currentInterestedPlayerPostsValue
          )
        }
        errorMessage={errors?.interestedPlayerPosts?.errorMessage}
        getBadgeText={getDisplayValue.interestedPlayerPosts}
        setFieldValue={(model) => {
          setCurrentInterestedPlayerPostsDisplayValue(
            model ? getDisplayValue.interestedPlayerPosts(model) : ""
          );
          setCurrentInterestedPlayerPostsValue(model);
        }}
        inputFieldRef={interestedPlayerPostsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Interested player posts"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search PlayerPost"
          value={currentInterestedPlayerPostsDisplayValue}
          options={interestedPlayerPostsRecords.map((r) => ({
            id: getIDValue.interestedPlayerPosts?.(r),
            label: getDisplayValue.interestedPlayerPosts?.(r),
          }))}
          isLoading={interestedPlayerPostsLoading}
          onSelect={({ id, label }) => {
            setCurrentInterestedPlayerPostsValue(
              interestedPlayerPostsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentInterestedPlayerPostsDisplayValue(label);
            runValidationTasks("interestedPlayerPosts", label);
          }}
          onClear={() => {
            setCurrentInterestedPlayerPostsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchInterestedPlayerPostsRecords(value);
            if (errors.interestedPlayerPosts?.hasError) {
              runValidationTasks("interestedPlayerPosts", value);
            }
            setCurrentInterestedPlayerPostsDisplayValue(value);
            setCurrentInterestedPlayerPostsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "interestedPlayerPosts",
              currentInterestedPlayerPostsDisplayValue
            )
          }
          errorMessage={errors.interestedPlayerPosts?.errorMessage}
          hasError={errors.interestedPlayerPosts?.hasError}
          ref={interestedPlayerPostsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "interestedPlayerPosts")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              dob,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
              chats: values,
            };
            const result = onChange(modelFields);
            values = result?.chats ?? values;
          }
          setChats(values);
          setCurrentChatsValue(undefined);
          setCurrentChatsDisplayValue("");
        }}
        currentFieldValue={currentChatsValue}
        label={"Chats"}
        items={chats}
        hasError={errors?.chats?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("chats", currentChatsValue)
        }
        errorMessage={errors?.chats?.errorMessage}
        getBadgeText={getDisplayValue.chats}
        setFieldValue={(model) => {
          setCurrentChatsDisplayValue(
            model ? getDisplayValue.chats(model) : ""
          );
          setCurrentChatsValue(model);
        }}
        inputFieldRef={chatsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Chats"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Chat"
          value={currentChatsDisplayValue}
          options={chatsRecords.map((r) => ({
            id: getIDValue.chats?.(r),
            label: getDisplayValue.chats?.(r),
          }))}
          isLoading={chatsLoading}
          onSelect={({ id, label }) => {
            setCurrentChatsValue(
              chatsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentChatsDisplayValue(label);
            runValidationTasks("chats", label);
          }}
          onClear={() => {
            setCurrentChatsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchChatsRecords(value);
            if (errors.chats?.hasError) {
              runValidationTasks("chats", value);
            }
            setCurrentChatsDisplayValue(value);
            setCurrentChatsValue(undefined);
          }}
          onBlur={() => runValidationTasks("chats", currentChatsDisplayValue)}
          errorMessage={errors.chats?.errorMessage}
          hasError={errors.chats?.hasError}
          ref={chatsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "chats")}
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
          isDisabled={!(idProp || profileModelProp)}
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
              !(idProp || profileModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
