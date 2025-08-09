import { format, parseISO } from 'date-fns';

export const zoneDateToDate = (date: string, formatType: string) => {
    return format(parseISO(date), formatType || 'dd MMM yyyy, hh:mm a');
}

export const zoneDateToTime = (date: string) => {
    return format(parseISO(date), 'hh:mm a');
}

export const notificationMessages = (message: any) => {
    let newMsgArray = [];
    for(let k = 0; k < message?.length; k++) {
        newMsgArray.push(message[k]?.messages)
    }
    return newMsgArray;
}