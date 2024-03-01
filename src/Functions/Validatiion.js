export function ValidatePlayerModal(inputs) {
  let errors = [];

  if (inputs.name === null || inputs.name === "")
    errors.push({
      field: "name",
      message: "Field cannot be left blank",
    });
  if (inputs.dob === null || inputs.dob === "")
    errors.push({
      field: "dob",
      message: "Field cannot be left blank",
    });
  if (inputs.ageGroup === null || inputs.ageGroup === "")
    errors.push({
      field: "ageGroup",
      message: "An option must be selected from the list",
    });
  if (inputs.positions.length === 0)
    errors.push({
      field: "positions",
      message: "At least one of the following options must be selected",
    });
  if (inputs.skillLevel === null || inputs.skillLevel === "")
    errors.push({
      field: "skillLevel",
      message: "An option must be selected from the list",
    });

  return errors;
}

export function ValidateProfileModal(inputs) {
  let errors = [];

  if (inputs.name === null || inputs.name === "")
    errors.push({
      field: "name",
      message: "Field cannot be left blank",
    });
  if (inputs.dob === null || inputs.dob === "")
    errors.push({
      field: "dob",
      message: "Field cannot be left blank",
    });
  if (inputs.phoneNumber === null || inputs.phoneNumber === "")
    errors.push({
      field: "phoneNumber",
      message: "Field cannot be left blank",
    });
  if (inputs.accountType === null || inputs.accountType === "")
    errors.push({
      field: "accountType",
      message: "Field cannot be left blank",
    });
  if (inputs.street === null || inputs.street === "")
    errors.push({
      field: "street",
      message: "Field cannot be left blank",
    });
  if (inputs.townCity === null || inputs.townCity === "")
    errors.push({
      field: "townCity",
      message: "Field cannot be left blank",
    });
  if (inputs.county === null || inputs.county === "")
    errors.push({
      field: "county",
      message: "Field cannot be left blank",
    });
  if (inputs.postcode === null || inputs.postcode === "")
    errors.push({
      field: "postcode",
      message: "Field cannot be left blank",
    });

  return errors;
}

export function ValidateTeamModal(inputs) {
  let errors = [];

  if (inputs.name === null || inputs.name === "")
    errors.push({
      field: "name",
      message: "Field cannot be left blank",
    });
  if (inputs.league === null || inputs.league === "")
    errors.push({
      field: "league",
      message: "Field cannot be left blank",
    });
  if (inputs.ageGroup === null || inputs.ageGroup === "")
    errors.push({
      field: "ageGroup",
      message: "An option must be selected from the list",
    });
  if (inputs.location === null || inputs.location === "")
    errors.push({
      field: "location",
      message: "Field cannot be left blank",
    });

  return errors;
}

export function ValidateTeamPlayerModal(inputs) {
  let errors = [];

  if (inputs.name === null || inputs.name === "")
    errors.push({
      field: "name",
      message: "Field cannot be left blank",
    });
  if (inputs.age === null || inputs.age === "")
    errors.push({
      field: "age",
      message: "Field cannot be left blank",
    });
  if (inputs.kitNumber === null || inputs.kitNumber === "")
    errors.push({
      field: "kitNumber",
      message: "Field cannot be left blank",
    });
  if (inputs.positions.length === 0)
    errors.push({
      field: "positions",
      message: "At least one of the following options must be selected",
    });

  return errors;
}

export function ValidateMatchPostModal(inputs) {
  let errors = [];

  if (inputs.title === null || inputs.title === "")
    errors.push({
      field: "title",
      message: "Field cannot be left blank",
    });
  if (inputs.description === null || inputs.description === "")
    errors.push({
      field: "description",
      message: "Field cannot be left blank",
    });
  if (inputs.gameType === null || inputs.gameType === "")
    errors.push({
      field: "gameType",
      message: "An option must be selected from the list",
    });
  if (inputs.ageGroup === null || inputs.ageGroup === "")
    errors.push({
      field: "ageGroup",
      message: "An option must be selected from the list",
    });
  if (inputs.teamSize === null || inputs.teamSize === "")
    errors.push({
      field: "teamSize",
      message: "An option must be selected from the list",
    });
  if (inputs.halfLength === null || inputs.halfLength === "")
    errors.push({
      field: "halfLength",
      message: "Field cannot be left blank",
    });
  if (inputs.kickOff === null || inputs.kickOff === "")
    errors.push({
      field: "kickOff",
      message: "Field cannot be left blank",
    });
  if (inputs.street === null || inputs.street === "")
    errors.push({
      field: "street",
      message: "Field cannot be left blank",
    });
  if (inputs.townCity === null || inputs.townCity === "")
    errors.push({
      field: "townCity",
      message: "Field cannot be left blank",
    });
  if (inputs.county === null || inputs.county === "")
    errors.push({
      field: "county",
      message: "Field cannot be left blank",
    });
  if (inputs.postcode === null || inputs.postcode === "")
    errors.push({
      field: "postcode",
      message: "Field cannot be left blank",
    });

  return errors;
}
