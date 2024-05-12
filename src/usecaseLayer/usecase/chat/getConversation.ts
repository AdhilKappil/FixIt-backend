// import ErrorResponse from "../../handler/errorResponse";
// import { IChatRepository } from "../../interface/repository/IchatRepository";
// import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
// import { ConversationResponse } from "../../interface/services/Iresponse";


// // create new conversation
// export const getConversation = async (
//   requestValidator: IRequestValidator,
//   chatRepository: IChatRepository,
//   senderId: string,
//   receiverId : string

// ): Promise<ConversationResponse | string> => {
//   try {
//     // Validate required parameters
//     const validation = requestValidator.validateRequiredFields(
//       { senderId, receiverId},
//       [
//         "receiverId",
//         "receiverId"
       
//       ]
//     );

//     if (!validation.success) {
//       throw ErrorResponse.badRequest(validation.message as string);
//     }

//     const conversation = await chatRepository.findConversation(senderId,receiverId); // checking if the service exist or not
//     if (conversation) {
//         return {
//             status: 200,
//             success: true,
//             data: conversation,
//           };
//     }
//     return "conversation not fund"

//   } catch (err) {
//     throw err;
//   }
// };
