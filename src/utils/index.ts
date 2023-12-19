import { ChartData } from "chart.js"
import { Roles } from "../models/UsersModel"

export const getRolesValue = (role: string) => {
  return Roles[role]
}
export const getRolesSeverity = (role: string) => {
  return Roles[role] == Roles.ADMIN ? 'danger' : 'info'
}

export const simpleCSVParser = (csvFileContent: string, splitter: string = ',', linesLimit: number = 50) => {
  const lines: string[] = csvFileContent.split('\n');
  let headers: string[] = []
  let parsedData: { [key: string]: string }[] = []
  let chartData: { [key: string]: string[] } = {}

  if (lines.length > 0) {
    headers = lines[0].trim().split(splitter);
    parsedData = lines.slice(1, linesLimit).map((line, index) => {
      let splitted_line = line.trim().split(splitter)

      let row_data: { [key: string]: any } = {}

      headers.map((header, i) => {

        if (!(chartData[header] instanceof Array)) chartData[header] = new Array()
        chartData[header].push(splitted_line[i])

        row_data[header] = splitted_line[i]
      })

      return row_data
    });
  }

  return {
    headers,
    parsedData,
    chartData,
  }
}

export const associationRulesToChartData = (chartData: { [key: string]: string[] }) => {
  return <ChartData>{
    labels: chartData.antecedents,
    datasets: [
      {
        label: 'Antecedent support dataset',
        backgroundColor: '#db382c',
        data: chartData["antecedent support"].map((d) => parseFloat(d))
      },
      {
        label: 'Consequent support dataset',
        backgroundColor: '#5cb52b',
        data: chartData["consequent support"].map((d) => parseFloat(d))
      },
      {
        label: 'Support dataset',
        backgroundColor: '#2cd1b6',
        data: chartData["support"].map((d) => parseFloat(d))
      },
      {
        label: 'Lift dataset',
        backgroundColor: '#9330d1',
        data: chartData["lift"].map((d) => parseFloat(d))
      },
      {
        label: 'Confidence dataset',
        backgroundColor: '#c42389',
        data: chartData["confidence"].map((d) => parseFloat(d))
      }
    ]
  }
}
