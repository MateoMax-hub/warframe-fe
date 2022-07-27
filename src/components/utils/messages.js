import { message } from "antd";
import "antd/dist/antd.css";

// const getErrors = (errors = []) => {
//     console.log(errors.response.data.status.errors);
//   return (
//     <>
//       Error:
//       <div>
//         {typeof errors === "string" ? (
//           <p>{errors}</p>
//         ) : (
//           errors.map((error, index) => {
//             console.log(error, index);
//             return (
//             <p key={`error-msg-${index}`}>{error.message || error.msg}</p>
//           )})
//         )}
//       </div>
//     </>
//   );
// };
const messageError = (e) => message.error(e);

const messageSuccess = (messages) => message.success(messages);

const messageWarming = (m) => message.warning(m);

export { messageError, messageSuccess, messageWarming };
