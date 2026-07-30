import { GetServerSidePropsContext } from "next";
import { ADD_USERS_TO_TEAMS_GROUP, ADD_USER_TO_TEAMS_GROUP, CREATE_TEAMS_GROUP, DELETE_TEAMS_GROUP, DELETE_USERS_BY_ADMIN, GET_TEAMS_GROUP, GET_TEAMS_GROUPS, REMOVE_USER_FROM_TEAMS_GROUP, UPDATE_TEAMS_GROUP, UPDATE_USER_TEAMS_GROUP } from "constants/routes";
import { api } from "./api";
import { getAPIClient } from "./axios";
import { ButtonsProps } from "domain/User";

export async function getTeamsGroup(groupId: string, context: GetServerSidePropsContext) {
  const apiClient = context ? getAPIClient(context) : api;

  try {
    const response = await apiClient.get(GET_TEAMS_GROUP(groupId));

    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type IGetTeamsGroupsParams = {
  administratorId?: string;
  name?: string;
  skip?: number;
  limit?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
  context?: GetServerSidePropsContext;
}

export async function getTeamsGroups({ context, ...params }: IGetTeamsGroupsParams) {
  const apiClient = context ? getAPIClient(context) : api;

  try {
    const response = await apiClient.get(GET_TEAMS_GROUPS, { params });

    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type ICreateTeamsGroupParams = {
  name: string;
  membersIds: string[];
}

export async function createTeamsGroup({ name, membersIds }: ICreateTeamsGroupParams) {
  let body = {
    name,
    membersIds
  }
  try {
    const response = await api.post(CREATE_TEAMS_GROUP, body);
    return response.data
  } catch (e) {
    if (e.response)
      throw e.response.data
  }
  throw "Falha, tente novamente...";
}

type IUpdateTeamsGroupParams = {
  name?: string;
  administratorId?: string;
  membersIds?: string[];
  buttons?: ButtonsProps[];
  blockSaveContact?: boolean,
  blockSendContacts?: boolean,
  blockEditProfile?: boolean,
  allowUsersUpdateProfileColor?: boolean
}

export async function updateTeamsGroup(groupId: string, params: IUpdateTeamsGroupParams) {
  try {
    const response = await api.patch(UPDATE_TEAMS_GROUP(groupId), params);
    return response.data
  } catch (e) {
    if (e.response)
      throw e.response.data
  }
  throw "Falha, tente novamente...";
}

type IAddUserTeamsToGroupParams = {
  groupId: string;
  membersIds: string[];
}

export async function addUsersToTeamsGroup({ groupId, membersIds }: IAddUserTeamsToGroupParams) {
  try {
    const response = await api.post(ADD_USERS_TO_TEAMS_GROUP(groupId), membersIds);
    console.log(response.status)
    return response.data;
  } catch (e) {
    if (e.response) {
      throw e.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type IUpdateUserTeamsGroupParams = {
  userId: string;
  groupId: string;
}

export async function updateUserTeamsGroup({ userId, groupId }: IUpdateUserTeamsGroupParams) {
  try {
    const response = await api.put(UPDATE_USER_TEAMS_GROUP(groupId, userId));
    return response.data;
  } catch (e) {
    if (e.response) {
      throw e.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type IAddUserToTeamsGroupParams = {
  userId: string;
  groupId: string;
}

export async function addUserToTeamsGroup({ userId, groupId }: IAddUserToTeamsGroupParams) {
  try {
    const response = await api.post(ADD_USER_TO_TEAMS_GROUP(groupId, userId));
    return response.data;
  } catch (e) {
    if (e.response) {
      throw e.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type IAdminDeleteUsersParams = {
  usersIds: any[];
}

export async function adminDeleteUsers(usersIds: IAdminDeleteUsersParams) {
  try {
    const response = await api.delete(DELETE_USERS_BY_ADMIN, {
      data: {
        usersIds
      }
    });
    return response.data;
  } catch (e) {
    if (e.response) {
      throw e.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type IRemoveUserFromTeamsGroupParams = {
  userId: string;
  groupId: string;
}

export async function removeUserFromTeamsGroup({ userId, groupId }: IRemoveUserFromTeamsGroupParams) {
  try {
    const response = await api.delete(REMOVE_USER_FROM_TEAMS_GROUP(groupId, userId));
    return response.data;
  } catch (e) {
    if (e.response) {
      throw e.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

export async function deleteTeamsGroup(groupId: string) {
  try {
    const response = await api.delete(DELETE_TEAMS_GROUP(groupId));
    return response.data;
  } catch (e) {
    if (e.response) {
      throw e.response.data;
    }
    throw "Falha, tente novamente...";
  }
}
