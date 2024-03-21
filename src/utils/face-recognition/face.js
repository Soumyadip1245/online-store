import faceIO from '@faceio/fiojs'
const faceio = new faceIO(process.env.REACT_APP_FACEIO_ID);

export const enrollUser = async (data) => {
  console.log(process.env.REACT_APP_FACEIO_ID,faceio)
 faceio.enroll({
    locale: "auto",
    payload: {
      phoneNumber: data.phoneNumber,
      name: data.name,
    },
  }).then(user=>{
    return user
  }).catch(e=>{
    return handleError(e)
  })
};
export const authenticateUser = async () => {
  const userInfo = await faceio.authenticate({
    locale: "auto",
  });
  return userInfo.payload;
};
function handleError(errCode) {
  switch (errCode) {
    case errCode.PERMISSION_REFUSED:
      console.log("Access to the Camera stream was denied by the end user");
      break;
    case errCode.NO_FACES_DETECTED:
      console.log("No faces were detected during the enroll or authentication process");
      break;
    case errCode.UNRECOGNIZED_FACE:
      console.log("Unrecognized face on this application's Facial Index");
      break;
    case errCode.MANY_FACES:
      console.log("Two or more faces were detected during the scan process");
      break;
    case errCode.FACE_DUPLICATION:
      console.log("User enrolled previously (facial features already recorded). Cannot enroll again!");
      break;
    case errCode.MINORS_NOT_ALLOWED:
      console.log("Minors are not allowed to enroll on this application!");
    break;
    case errCode.PAD_ATTACK:
      console.log("Presentation (Spoof) Attack (PAD) detected during the scan process");
      break;
    case errCode.FACE_MISMATCH:
      console.log("Calculated Facial Vectors of the user being enrolled do not matches");
      break;
    case errCode.WRONG_PIN_CODE:
      console.log("Wrong PIN code supplied by the user being authenticated");
      break;
    case errCode.PROCESSING_ERR:
      console.log("Server side error");
      break;
    case errCode.UNAUTHORIZED:
      console.log("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information");
      break;
    case errCode.TERMS_NOT_ACCEPTED:
      console.log("Terms & Conditions set out by FACEIO/host application rejected by the end user");
      break;
    case errCode.UI_NOT_READY:
      console.log("The FACEIO Widget could not be (or is being) injected onto the client DOM");
      break;
    case errCode.SESSION_EXPIRED:
      console.log("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly");
      break;
    case errCode.TIMEOUT:
      console.log("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)");
      break;
    case errCode.TOO_MANY_REQUESTS:
      console.log("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications");
      break;
    case errCode.EMPTY_ORIGIN:
      console.log("Origin or Referer HTTP request header is empty or missing");
      break;
    case errCode.FORBIDDDEN_ORIGIN:
      console.log("Domain origin is forbidden from instantiating fio.js");
      break;
    case errCode.FORBIDDDEN_COUNTRY:
      console.log("Country ISO-3166-1 Code is forbidden from instantiating fio.js");
      break;
    case errCode.SESSION_IN_PROGRESS:
      console.log("Another authentication or enrollment session is in progress");
      break;
    case errCode.NETWORK_IO:
    default:
      console.log("Error while establishing network connection with the target FACEIO processing node");
      break;
  }
}