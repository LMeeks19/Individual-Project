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
  useAuthenticator,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import {
  getPlayerPost,
  listPlayerPlayerPosts,
  listPlayers,
  listProfilePlayerPosts,
  listProfiles,
  playerPlayerPostsByPlayerPostId,
  profilePlayerPostsByPlayerPostId,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
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
export default function RegisterPlayerPostPlayerForm(props) {
  const { user } = useAuthenticator();
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
    interestedUsers: [],
    registeredPlayers: [],
  };
  const [interestedUsers, setInterestedUsers] = React.useState(
    initialValues.interestedUsers
  );
  const [interestedUsersLoading, setInterestedUsersLoading] =
    React.useState(false);
  const [interestedUsersRecords, setInterestedUsersRecords] = React.useState(
    []
  );
  const [registeredPlayers, setRegisteredPlayers] = React.useState(
    initialValues.registeredPlayers
  );
  const [registeredPlayersLoading, setRegisteredPlayersLoading] =
    React.useState(false);
  const [registeredPlayersRecords, setRegisteredPlayersRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = playerPostRecord
      ? {
          ...initialValues,
          ...playerPostRecord,
          interestedUsers: linkedInterestedUsers,
          registeredPlayers: linkedRegisteredPlayers,
        }
      : initialValues;
    setInterestedUsers(cleanValues.interestedUsers ?? []);
    setCurrentInterestedUsersValue(undefined);
    setCurrentInterestedUsersDisplayValue("");
    setRegisteredPlayers(cleanValues.registeredPlayers ?? []);
    setCurrentRegisteredPlayersValue(undefined);
    setCurrentRegisteredPlayersDisplayValue("");
    setErrors({});
  };
  const [playerPostRecord, setPlayerPostRecord] =
    React.useState(playerPostModelProp);
  const [linkedInterestedUsers, setLinkedInterestedUsers] = React.useState([]);
  const canUnlinkInterestedUsers = false;
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
      const linkedInterestedUsers = record
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
      setLinkedInterestedUsers(linkedInterestedUsers);
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
    linkedInterestedUsers,
    linkedRegisteredPlayers,
  ]);
  const [
    currentInterestedUsersDisplayValue,
    setCurrentInterestedUsersDisplayValue,
  ] = React.useState("");
  const [currentInterestedUsersValue, setCurrentInterestedUsersValue] =
    React.useState(undefined);
  const interestedUsersRef = React.createRef();
  const [
    currentRegisteredPlayersDisplayValue,
    setCurrentRegisteredPlayersDisplayValue,
  ] = React.useState("");
  const [currentRegisteredPlayersValue, setCurrentRegisteredPlayersValue] =
    React.useState(undefined);
  const registeredPlayersRef = React.createRef();
  const getIDValue = {
    interestedUsers: (r) => JSON.stringify({ id: r?.id }),
    registeredPlayers: (r) => JSON.stringify({ id: r?.id }),
  };
  const interestedUsersIdSet = new Set(
    Array.isArray(interestedUsers)
      ? interestedUsers.map((r) => getIDValue.interestedUsers?.(r))
      : getIDValue.interestedUsers?.(interestedUsers)
  );
  const registeredPlayersIdSet = new Set(
    Array.isArray(registeredPlayers)
      ? registeredPlayers.map((r) => getIDValue.registeredPlayers?.(r))
      : getIDValue.registeredPlayers?.(registeredPlayers)
  );
  const getDisplayValue = {
    interestedUsers: (r) => `${r?.username}`,
    registeredPlayers: (r) => `${r?.name}`,
  };
  const validations = {
    interestedUsers: [],
    registeredPlayers: [
      { type: "Required", validationMessage: "Player is required." },
    ],
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
  const fetchInterestedUsersRecords = async (value) => {
    setInterestedUsersLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: { or: {name: {contains: value}, and: {id: {eq: user.userId}}}},
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
  const fetchRegisteredPlayersRecords = async (value) => {
    setRegisteredPlayersLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: { or: {name: {contains: value}, and: {profileID: {eq: user.userId}}}},
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
    fetchInterestedUsersRecords("");
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
          interestedUsers: interestedUsers ?? null,
          registeredPlayers,
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
          const interestedUsersToLinkMap = new Map();
          const interestedUsersToUnLinkMap = new Map();
          const interestedUsersMap = new Map();
          const linkedInterestedUsersMap = new Map();
          interestedUsers.forEach((r) => {
            const count = interestedUsersMap.get(
              getIDValue.interestedUsers?.(r)
            );
            const newCount = count ? count + 1 : 1;
            interestedUsersMap.set(getIDValue.interestedUsers?.(r), newCount);
          });
          linkedInterestedUsers.forEach((r) => {
            const count = linkedInterestedUsersMap.get(
              getIDValue.interestedUsers?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedInterestedUsersMap.set(
              getIDValue.interestedUsers?.(r),
              newCount
            );
          });
          linkedInterestedUsersMap.forEach((count, id) => {
            const newCount = interestedUsersMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                interestedUsersToUnLinkMap.set(id, diffCount);
              }
            } else {
              interestedUsersToUnLinkMap.set(id, count);
            }
          });
          interestedUsersMap.forEach((count, id) => {
            const originalCount = linkedInterestedUsersMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                interestedUsersToLinkMap.set(id, diffCount);
              }
            } else {
              interestedUsersToLinkMap.set(id, count);
            }
          });
          interestedUsersToUnLinkMap.forEach((count, id) => {
            const recordKeys = JSON.parse(id);
            if (modelFields.interestedUsers.some((iu) => iu.id === recordKeys.id))
              interestedUsersToUnLinkMap.delete(id);
          })
          interestedUsersToUnLinkMap.forEach(async (count, id) => {
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
          interestedUsersToLinkMap.forEach((count, id) => {
            const profileToLink = interestedUsersRecords.find((r) =>
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
          setRegisteredPlayers([...modelFields.registeredPlayers])
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
          registeredPlayersToUnLinkMap.forEach((count, id) => {
            const recordKeys = JSON.parse(id);
            if (modelFields.registeredPlayers.some((iu) => iu.id === recordKeys.id))
              registeredPlayersToUnLinkMap.delete(id);
          })
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
          const modelFieldsToSave = {};
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
      {...getOverrideProps(overrides, "RegisterPlayerPostPlayerForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              interestedUsers: values,
              registeredPlayers,
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
        items={interestedUsers.filter((rp) => rp.id === user.userId)}
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              interestedUsers,
              registeredPlayers: values,
            };
            const result = onChange(modelFields);
            values = result?.registeredPlayers ?? values;
          }
          setRegisteredPlayers(values);
          setCurrentRegisteredPlayersValue(undefined);
          setCurrentRegisteredPlayersDisplayValue("");
        }}
        currentFieldValue={currentRegisteredPlayersValue}
        label={"Players to Register"}
        items={registeredPlayers.filter((rp) => rp.profileID === user.userId)}
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
          label="Players to Register"
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
              Object.values(errors).some((e) => e?.hasError) ||
              !interestedUsers.some((iu) => iu.id === user.userId) && registeredPlayers.some((rp) => rp.profileID === user.userId) ||
              interestedUsers.some((iu) => iu.id === user.userId) && !registeredPlayers.some((rp) => rp.profileID === user.userId)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
