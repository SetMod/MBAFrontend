import axios, { AxiosError } from "axios";
import config from "../config";
import Reports from "../models/ReportsModel";

interface ReportsResponse {
    report_id: number
    report_name: string
    report_data: string
    report_create_date: Date
    user_id: number
    organization_id: number
}

export default class ReportsService {

    async getReports() {
        const errorMessage: String = 'Failed to get reports'
        try {
            const response = await axios.get(`${config.baseUrl}/reports/`)

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            const reports: Reports[] = response.data.map((val: ReportsResponse) => {
                return this.mapDataToReport(val)
            })
            console.log(reports)
            return reports
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async getReportById(reportId: number) {
        const errorMessage: String = 'Failed to get report'
        try {
            const response = await axios.get(`${config.baseUrl}/reports/${reportId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const report: Reports = this.mapDataToReport(response.data)
            console.log(report)
            return report
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async getReportAnalyzes(reportId: number) {
        const errorMessage: String = 'Failed to get report analyzes'
        try {
            const response = await axios.get(`${config.baseUrl}/reports/${reportId}.analyzes`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const report: Reports = this.mapDataToReport(response.data)
            console.log(report)
            return report
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async getUserReports(userId: number) {
        const errorMessage: String = 'Failed to get report'
        try {
            const response = await axios.get(`${config.baseUrl}/users/${userId}/reports`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const reports: Reports[] = response.data.map((val: ReportsResponse) => {
                return this.mapDataToReport(val)
            })
            console.log(reports)
            return reports
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async createReport(report: Reports) {
        const errorMessage: String = 'Failed to create an reports'
        try {
            const dataReport = this.mapReportToData(report)
            const response = await axios.post(`${config.baseUrl}/reports/`, dataReport)

            if (response.data instanceof String) return response.data

            const newReport: Reports = this.mapDataToReport(response.data)
            console.log(newReport)
            return newReport
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data);
            return errorMessage
        }
    }
    async updateReport(report: Reports) {
        const errorMessage: String = 'Failed to update report'
        try {
            const dataReport = this.mapReportToData(report)
            const response = await axios.put(`${config.baseUrl}/reports/${report.reportId}`, dataReport)

            if (response.data instanceof String) return response.data

            const updatedReport: Reports = this.mapDataToReport(response.data)
            console.log(updatedReport)
            return updatedReport
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async deleteReport(roleId: number) {
        const errorMessage: String = 'Failed to delete report'
        try {
            const response = await axios.delete(`${config.baseUrl}/reports/${roleId}`)

            if (response.data instanceof String) return response.data

            const deletedReport: Reports = this.mapDataToReport(response.data)
            console.log(deletedReport)
            return deletedReport
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    mapDataToReport(data: ReportsResponse) {
        const report = new Reports()
        report.reportId = data.report_id
        report.reportName = data.report_name
        report.reportData = data.report_data
        report.reportCreateDate = data.report_create_date
        report.userId = data.user_id
        report.organizationId = data.organization_id
        return report
    }
    mapReportToData(report: Reports) {
        return <ReportsResponse>{
            report_id: report.reportId,
            report_name: report.reportName,
            report_data: report.reportData,
            report_create_date: report.reportCreateDate,
            user_id: report.userId,
            organization_id: report.organizationId,
        }
    }
}