import MessageModel from "../../model/message";

// Creating new user
export const viewMessages = async (
  _id: string[],
  messageModel: typeof MessageModel
): Promise<string> => {
  try {
    // Update the status of messages with the given IDs true means its viewed
    await messageModel.updateMany(
      { _id: { $in: _id } },
      { $set: { status: true } }
    );
    return "Success";
  } catch (error) {
    throw error;
  }
};
