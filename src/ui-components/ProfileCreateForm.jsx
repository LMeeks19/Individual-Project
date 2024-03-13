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
import { listMatchPosts, listPlayerPosts } from "../graphql/queries";
import {
  createProfile,
  createProfileMatchPost,
  createProfilePlayerPost,
  updateMatchPost,
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
export default function ProfileCreateForm(props) {
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
    name: "",
    dob: "",
    accountType: "",
    phoneNumber: "",
    street: "",
    townCity: "",
    county: "",
    postcode: "",
    matchPosts: [],
    interestedMatchPosts: [],
    playerPosts: [],
    interestedPlayerPosts: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [dob, setDob] = React.useState(initialValues.dob);
  const [accountType, setAccountType] = React.useState(
    initialValues.accountType
  );
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
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setDob(initialValues.dob);
    setAccountType(initialValues.accountType);
    setPhoneNumber(initialValues.phoneNumber);
    setStreet(initialValues.street);
    setTownCity(initialValues.townCity);
    setCounty(initialValues.county);
    setPostcode(initialValues.postcode);
    setMatchPosts(initialValues.matchPosts);
    setCurrentMatchPostsValue(undefined);
    setCurrentMatchPostsDisplayValue("");
    setInterestedMatchPosts(initialValues.interestedMatchPosts);
    setCurrentInterestedMatchPostsValue(undefined);
    setCurrentInterestedMatchPostsDisplayValue("");
    setPlayerPosts(initialValues.playerPosts);
    setCurrentPlayerPostsValue(undefined);
    setCurrentPlayerPostsDisplayValue("");
    setInterestedPlayerPosts(initialValues.interestedPlayerPosts);
    setCurrentInterestedPlayerPostsValue(undefined);
    setCurrentInterestedPlayerPostsDisplayValue("");
    setErrors({});
  };
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
  const getIDValue = {
    matchPosts: (r) => JSON.stringify({ id: r?.id }),
    interestedMatchPosts: (r) => JSON.stringify({ id: r?.id }),
    playerPosts: (r) => JSON.stringify({ id: r?.id }),
    interestedPlayerPosts: (r) => JSON.stringify({ id: r?.id }),
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
  const getDisplayValue = {
    matchPosts: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    interestedMatchPosts: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    playerPosts: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    interestedPlayerPosts: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    dob: [{ type: "Required" }],
    accountType: [{ type: "Required" }],
    phoneNumber: [{ type: "Required" }, { type: "Phone" }],
    street: [{ type: "Required" }],
    townCity: [{ type: "Required" }],
    county: [{ type: "Required" }],
    postcode: [{ type: "Required" }],
    matchPosts: [],
    interestedMatchPosts: [],
    playerPosts: [],
    interestedPlayerPosts: [],
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
  React.useEffect(() => {
    fetchMatchPostsRecords("");
    fetchInterestedMatchPostsRecords("");
    fetchPlayerPostsRecords("");
    fetchInterestedPlayerPostsRecords("");
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
          accountType,
          phoneNumber,
          street,
          townCity,
          county,
          postcode,
          matchPosts,
          interestedMatchPosts,
          playerPosts,
          interestedPlayerPosts,
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
            name: modelFields.name,
            dob: modelFields.dob,
            accountType: modelFields.accountType,
            phoneNumber: modelFields.phoneNumber,
            street: modelFields.street,
            townCity: modelFields.townCity,
            county: modelFields.county,
            postcode: modelFields.postcode,
          };
          const profile = (
            await client.graphql({
              query: createProfile.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createProfile;
          const promises = [];
          promises.push(
            ...matchPosts.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateMatchPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      createdByProfileID: profile.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...interestedMatchPosts.reduce((promises, matchPost) => {
              promises.push(
                client.graphql({
                  query: createProfileMatchPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      profileId: profile.id,
                      matchPostId: matchPost.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...playerPosts.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updatePlayerPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      createdByProfileID: profile.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...interestedPlayerPosts.reduce((promises, playerPost) => {
              promises.push(
                client.graphql({
                  query: createProfilePlayerPost.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      profileId: profile.id,
                      playerPostId: playerPost.id,
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
      {...getOverrideProps(overrides, "ProfileCreateForm")}
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
              accountType,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
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
              accountType,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
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
        label="Account Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={accountType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dob,
              accountType: value,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
            };
            const result = onChange(modelFields);
            value = result?.accountType ?? value;
          }
          if (errors.accountType?.hasError) {
            runValidationTasks("accountType", value);
          }
          setAccountType(value);
        }}
        onBlur={() => runValidationTasks("accountType", accountType)}
        errorMessage={errors.accountType?.errorMessage}
        hasError={errors.accountType?.hasError}
        {...getOverrideProps(overrides, "accountType")}
      >
        <option
          children="COACH"
          value="COACH"
          {...getOverrideProps(overrides, "accountTypeoption0")}
        ></option>
        <option
          children="PARENT"
          value="PARENT"
          {...getOverrideProps(overrides, "accountTypeoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Phone Number"
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
              accountType,
              phoneNumber: value,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
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
              accountType,
              phoneNumber,
              street: value,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
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
              accountType,
              phoneNumber,
              street,
              townCity: value,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
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
              accountType,
              phoneNumber,
              street,
              townCity,
              county: value,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
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
              accountType,
              phoneNumber,
              street,
              townCity,
              county,
              postcode: value,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
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
              accountType,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts: values,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts,
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
              accountType,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts: values,
              playerPosts,
              interestedPlayerPosts,
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
              accountType,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts: values,
              interestedPlayerPosts,
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
              accountType,
              phoneNumber,
              street,
              townCity,
              county,
              postcode,
              matchPosts,
              interestedMatchPosts,
              playerPosts,
              interestedPlayerPosts: values,
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
