import Message, {MessageType} from '../models/message';
import * as Config from '../env_config.json';
import {GroupId} from '../types/commonTypes';
import {formatISO} from 'date-fns';
import stringDateTransfer from '../lib/stringDateTrasnfer';

export type DefaultAgentType = {
    sdkVersion: string
    osPlatform: string
};

export const defaultAgent: DefaultAgentType = {
    sdkVersion: Config.version,
    osPlatform: `${process.platform} | ${process.version}`,
};

abstract class DefaultMessageRequest {
    allowDuplicates: boolean;
    appId: string | undefined;
    protected agent: DefaultAgentType;

    protected constructor() {
        this.agent = defaultAgent;
        this.allowDuplicates = false;
    }
}

export class SingleMessageSendingRequest extends DefaultMessageRequest {
    message: Message;

    constructor(message: Message, allowDuplicates?: boolean, appId?: string) {
        super();
        this.message = message;
        if (typeof allowDuplicates === 'boolean') {
            this.allowDuplicates = allowDuplicates;
        }
        if (appId) {
            this.appId = appId;
        }
    }
}

export class MultipleMessageSendingRequest extends DefaultMessageRequest {
    messages: Array<Message>;

    constructor(messages: Array<Message>, allowDuplicates?: boolean, appId?: string) {
        super();
        this.messages = messages;
        if (typeof allowDuplicates === 'boolean') {
            this.allowDuplicates = allowDuplicates;
        }
        if (appId) {
            this.appId = appId;
        }
    }
}

export class GroupMessageAddRequest {
    messages: Array<Message>;

    constructor(messages: Array<Message>) {
        this.messages = messages;
    }
}

export type ScheduledDateSendingRequest = {
    scheduledDate: string
}

export type RemoveMessageIdsToGroupRequest = {
    messageIds: Array<string>
}

export type GetGroupMessagesRequest = {
    startKey?: string,
    limit?: number
}

export type GetGroupsRequest = {
    startKey?: string,
    limit?: number,
    startDate?: string,
    endDate?: string
}

export type RequestConfig = {
    method: string,
    url: string
}

export type GetMessagesRequestType = {
    readonly startKey: string
    readonly limit: number
    readonly dateType: string
    readonly startDate: string
    readonly endDate: string
    readonly messageId: string
    readonly messageIds: Array<string>
    readonly groupId: GroupId
    readonly to: string
    readonly from: string
    readonly type: MessageType
    readonly statusCode: string
    readonly dateCreated: string
    readonly dateUpdated: string
}

export class GetMessagesRequest {
    readonly startKey: string;
    readonly limit: number;
    readonly dateType: string;
    readonly startDate: string;
    readonly endDate: string;
    readonly messageId: string;
    readonly messageIds: Array<string>;
    readonly groupId: GroupId;
    readonly to: string;
    readonly from: string;
    readonly type: MessageType;
    readonly statusCode: string;
    readonly dateCreated: string;
    readonly dateUpdated: string;

    constructor(getMessageRequestType: GetMessagesRequestType) {
        this.startKey = getMessageRequestType.startKey;
        this.limit = getMessageRequestType.limit;
        this.dateType = getMessageRequestType.dateType;
        this.startDate = formatISO(stringDateTransfer(getMessageRequestType.startDate));
        this.endDate = formatISO(stringDateTransfer(getMessageRequestType.endDate));
        this.messageId = getMessageRequestType.messageId;
        this.messageIds = getMessageRequestType.messageIds;
        this.groupId = getMessageRequestType.groupId;
        this.to = getMessageRequestType.to;
        this.from = getMessageRequestType.from;
        this.type = getMessageRequestType.type;
        this.statusCode = getMessageRequestType.statusCode;
        this.dateCreated = formatISO(stringDateTransfer(getMessageRequestType.dateCreated));
        this.dateUpdated = formatISO(stringDateTransfer(getMessageRequestType.dateUpdated));
    }
}

export type GetStatisticsRequestType = {
    readonly startDate: string | Date
    readonly endDate: string | Date
    readonly masterAccountId: string
}

export class GetStatisticsRequest {
    readonly startDate: string;
    readonly endDate: string;
    readonly masterAccountId: string;

    constructor(getStatisticsRequest: GetStatisticsRequestType) {
        this.startDate = formatISO(stringDateTransfer(getStatisticsRequest.startDate));
        this.endDate = formatISO(stringDateTransfer(getStatisticsRequest.endDate));
        this.masterAccountId = getStatisticsRequest.masterAccountId;
    }
}

export type FileType = 'KAKAO' | 'MMS' | 'DOCUMENT' | 'RCS'

export type FileUploadRequest = {
    file: string
    type: FileType
    name?: string
    link?: string
}

export type CreateGroupRequest = DefaultAgentType & {
    allowDuplicates: boolean
    appId?: string
}
