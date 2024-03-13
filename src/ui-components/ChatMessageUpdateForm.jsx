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
import { generateClient } from "aws-amplify/api";
import { getChat, getChatMessage, listChats } from "../graphql/queries";
import { updateChatMessage } from "../graphql/mutations";
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
export default function ChatMessageUpdateForm(props) {
  const {
    id: idProp,
    chatMessage: chatMessageModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    chatID: undefined,
    senderUserID: "",
    message: "",
  };
  const [chatID, setChatID] = React.useState(initialValues.chatID);
  const [chatIDLoading, setChatIDLoading] = React.useState(false);
  const [chatIDRecords, setChatIDRecords] = React.useState([]);
  const [selectedChatIDRecords, setSelectedChatIDRecords] = React.useState([]);
  const [senderUserID, setSenderUserID] = React.useState(
    initialValues.senderUserID
  );
  const [message, setMessage] = React.useState(initialValues.message);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = chatMessageRecord
      ? { ...initialValues, ...chatMessageRecord, chatID }
      : initialValues;
    setChatID(cleanValues.chatID);
    setCurrentChatIDValue(undefined);
    setCurrentChatIDDisplayValue("");
    setSenderUserID(cleanValues.senderUserID);
    setMessage(cleanValues.message);
    setErrors({});
  };
  const [chatMessageRecord, setChatMessageRecord] =
    React.useState(chatMessageModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getChatMessage.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getChatMessage
        : chatMessageModelProp;
      const chatIDRecord = record ? record.chatID : undefined;
      const chatRecord = chatIDRecord
        ? (
            await client.graphql({
              query: getChat.replaceAll("__typename", ""),
              variables: { id: chatIDRecord },
            })
          )?.data?.getChat
        : undefined;
      setChatID(chatIDRecord);
      setSelectedChatIDRecords([chatRecord]);
      setChatMessageRecord(record);
    };
    queryData();
  }, [idProp, chatMessageModelProp]);
  React.useEffect(resetStateValues, [chatMessageRecord, chatID]);
  const [currentChatIDDisplayValue, setCurrentChatIDDisplayValue] =
    React.useState("");
  const [currentChatIDValue, setCurrentChatIDValue] = React.useState(undefined);
  const chatIDRef = React.createRef();
  const getDisplayValue = {
    chatID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    chatID: [{ type: "Required" }],
    senderUserID: [{ type: "Required" }],
    message: [{ type: "Required" }],
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
  const fetchChatIDRecords = async (value) => {
    setChatIDLoading(true);
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
      var loaded = result.filter((item) => chatID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setChatIDRecords(newOptions.slice(0, autocompleteLength));
    setChatIDLoading(false);
  };
  React.useEffect(() => {
    fetchChatIDRecords("");
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
          chatID,
          senderUserID,
          message,
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
            query: updateChatMessage.replaceAll("__typename", ""),
            variables: {
              input: {
                id: chatMessageRecord.id,
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
      {...getOverrideProps(overrides, "ChatMessageUpdateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              chatID: value,
              senderUserID,
              message,
            };
            const result = onChange(modelFields);
            value = result?.chatID ?? value;
          }
          setChatID(value);
          setCurrentChatIDValue(undefined);
        }}
        currentFieldValue={currentChatIDValue}
        label={"Chat id"}
        items={chatID ? [chatID] : []}
        hasError={errors?.chatID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("chatID", currentChatIDValue)
        }
        errorMessage={errors?.chatID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.chatID(
                chatIDRecords.find((r) => r.id === value) ??
                  selectedChatIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentChatIDDisplayValue(
            value
              ? getDisplayValue.chatID(
                  chatIDRecords.find((r) => r.id === value) ??
                    selectedChatIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentChatIDValue(value);
          const selectedRecord = chatIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedChatIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={chatIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Chat id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Chat"
          value={currentChatIDDisplayValue}
          options={chatIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.chatID?.(r),
            }))}
          isLoading={chatIDLoading}
          onSelect={({ id, label }) => {
            setCurrentChatIDValue(id);
            setCurrentChatIDDisplayValue(label);
            runValidationTasks("chatID", label);
          }}
          onClear={() => {
            setCurrentChatIDDisplayValue("");
          }}
          defaultValue={chatID}
          onChange={(e) => {
            let { value } = e.target;
            fetchChatIDRecords(value);
            if (errors.chatID?.hasError) {
              runValidationTasks("chatID", value);
            }
            setCurrentChatIDDisplayValue(value);
            setCurrentChatIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("chatID", currentChatIDValue)}
          errorMessage={errors.chatID?.errorMessage}
          hasError={errors.chatID?.hasError}
          ref={chatIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "chatID")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Sender user id"
        isRequired={true}
        isReadOnly={false}
        value={senderUserID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chatID,
              senderUserID: value,
              message,
            };
            const result = onChange(modelFields);
            value = result?.senderUserID ?? value;
          }
          if (errors.senderUserID?.hasError) {
            runValidationTasks("senderUserID", value);
          }
          setSenderUserID(value);
        }}
        onBlur={() => runValidationTasks("senderUserID", senderUserID)}
        errorMessage={errors.senderUserID?.errorMessage}
        hasError={errors.senderUserID?.hasError}
        {...getOverrideProps(overrides, "senderUserID")}
      ></TextField>
      <TextField
        label="Message"
        isRequired={true}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chatID,
              senderUserID,
              message: value,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
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
          isDisabled={!(idProp || chatMessageModelProp)}
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
              !(idProp || chatMessageModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
