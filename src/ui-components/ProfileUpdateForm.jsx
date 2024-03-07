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
  listProfileChats,
  profileChatsByProfileId,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import {
  createProfileChat,
  deleteProfileChat,
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
  const [chats, setChats] = React.useState(initialValues.chats);
  const [chatsLoading, setChatsLoading] = React.useState(false);
  const [chatsRecords, setChatsRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = profileRecord
      ? { ...initialValues, ...profileRecord, chats: linkedChats }
      : initialValues;
    setName(cleanValues.name);
    setDob(cleanValues.dob);
    setPhoneNumber(cleanValues.phoneNumber);
    setStreet(cleanValues.street);
    setTownCity(cleanValues.townCity);
    setCounty(cleanValues.county);
    setPostcode(cleanValues.postcode);
    setChats(cleanValues.chats ?? []);
    setCurrentChatsValue(undefined);
    setCurrentChatsDisplayValue("");
    setErrors({});
  };
  const [profileRecord, setProfileRecord] = React.useState(profileModelProp);
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
  React.useEffect(resetStateValues, [profileRecord, linkedChats]);
  const [currentChatsDisplayValue, setCurrentChatsDisplayValue] =
    React.useState("");
  const [currentChatsValue, setCurrentChatsValue] = React.useState(undefined);
  const chatsRef = React.createRef();
  const getIDValue = {
    chats: (r) => JSON.stringify({ id: r?.id }),
  };
  const chatsIdSet = new Set(
    Array.isArray(chats)
      ? chats.map((r) => getIDValue.chats?.(r))
      : getIDValue.chats?.(chats)
  );
  const getDisplayValue = {
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
