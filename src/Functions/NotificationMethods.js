import { NotificationType } from "./Enums";
import { formatDateTime } from "./FormatDate";
import { CreateNotification } from "./Server";

export function createMessageReceivedNotification(userIDs, chatName, currentUserName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Message recieved from ${currentUserName} in ${chatName}`, notificationTypes.MESSAGERECEIVED)
    });
}

export function createPlayerPostUpdatedNotification(userIDs, playerPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Player Post ${playerPostName} has been Updated`, notificationTypes.PLAYERPOSTUPDATED)
    });
}

export function createSelectedForPlayerPostNotification(userIDs, playerPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `You have been selected for Player Post ${playerPostName}`, notificationTypes.SELECTEDFORPLAYERPOST)
    });
}

export function createUnSelectedForPlayerPostNotification(userIDs, playerPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `You have been unselected for Player Post ${playerPostName}`, notificationTypes.UNSELECTEDFORPLAYERPOST)
    });
}

export function createsPlayerPostDeletedNotification(userIDs, playerPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Player Post ${playerPostName} has been deleted`, notificationTypes.PLAYERPOSTDELETED)
    });
}

export function createsPlayerPostClosedNotification(userIDs, playerPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Player Post ${playerPostName} has been closed`, notificationTypes.PLAYERPOSTCLOSED)
    });
}

export function createMatchPostUpdatedNotification(userIDs, matchPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Match Post ${matchPostName} has been Updated`, notificationTypes.MATCHPOSTUPDATED)
    });
}

export function createSelectedForMatchPostNotification(userIDs, matchPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `You have been selected for Match Post ${matchPostName}`, notificationTypes.SELECTEDFORMATCHPOST)
    });
}

export function createUnSelectedForMatchPostNotification(userIDs, matchPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `You have been unselected for Player Post ${matchPostName}`, notificationTypes.UNSELECTEDFORMATCHPOST)
    });
}

export function createMatchPostDeletedNotification(userIDs, matchPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Match Post ${matchPostName} has been deleted`, notificationTypes.MATCHPOSTDELETED)
    });
}

export function createMatchPostClosedNotification(userIDs, matchPostName) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Player Post ${matchPostName} has been closed`, notificationTypes.MATCHPOSTCLOSED)
    });
}

export function createEventCreatedNotification(userIDs, eventCreatedDate) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Event Created for the ${formatDateTime(eventCreatedDate)}`, notificationTypes.EVENTCREATED)
    });
}

export function createEventReScheduledClosedNotification(userIDs, eventCreatedDate) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Event Rescheduled for the ${formatDateTime(eventCreatedDate)}`, notificationTypes.EVENTSCHEDULED)
    });
}

export function createEventUnScheduledClosedNotification(userIDs, eventCreatedDate) {
    let notificationTypes = new NotificationType()
    userIDs.forEach(async (id) => {
        await CreateNotification(id, `Event Unschedued for the ${formatDateTime(eventCreatedDate)}`, notificationTypes.EVENTUNSCHEDULED)
    });
}

