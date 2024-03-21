import { Client, Functions } from "appwrite";
export const sendMail = async (to,subject,html) =>{
    const payload = {
        to: to,
        subject: subject,
        html: html
      };
      const client = new Client()
      .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
      .setProject(process.env.REACT_APP_APPWRITE_PROJECT);
    
    const functions = new Functions(client)
    
    try {
      const execution = await functions.createExecution(
          '65a22c013da1d20eb6a8',
          JSON.stringify(payload),
      )
      return JSON.parse(execution.responseBody).data
    } catch (err) {
      console.error(err.message)
    }
}