import { ADMIN_GET_ANALYTICS_GROUPED_BY_DATE } from "constants/routes";
import { GetServerSidePropsContext } from "next";
import { api } from "services/api";
import { getAPIClient } from "./axios";

export type UserAnalytics = {
  details: {
    _id: string;
    clicks: number;
  }[];

  daily_clicks: number;
  weekly_clicks: number;
  monthly_clicks: number;
};

export async function trackProfileButtonClick(input: {
  userId: string;
  buttonName: string;
}) {
  try {
    return await api.post(`/analytics/save/${input.userId}`, {
      buttonName: input.buttonName,
    });
  } catch {
    throw new Error("Erro ao enviar analytics");
  }
}

export type GetUserAnalyticsFilters =
  | "TODAY"
  | "YESTERDAY"
  | "LAST_7_DAYS"
  | "LAST_30_DAYS";

export async function getUserAnalytics(
  ctx: any,
  input: {
    filter: GetUserAnalyticsFilters;
  }
) {
  try {
    const api = getAPIClient(ctx);
    const { data: userAnalytics } = await api.get<UserAnalytics>(`/analytics`, {
      params: {
        filter: input.filter,
      },
    });

    return userAnalytics;
  } catch {
    throw new Error("Erro ao obter analytics");
  }
}

type AdminGetAnalyticsGroupedByDateData = {
  administratorId?: string;
  userId?: string;
  groupedBy?: "DAYS" | "MONTHS" | "YEARS"
  context?: GetServerSidePropsContext;
}

export async function adminGetAnalyticsGroupedByDate({context, ...params}: AdminGetAnalyticsGroupedByDateData) {
  const apiClient = context ? getAPIClient(context) : api;
  try {
    const response = await apiClient.get(ADMIN_GET_ANALYTICS_GROUPED_BY_DATE, { params });
    return response.data;
  } catch(error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}
