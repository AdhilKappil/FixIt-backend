import UserModel from "../../model/userModel";

// Correct the parameter type for _id
export const blockUser = async (
    _id: string,
    userModels: typeof UserModel
): Promise<string | null> => {
    try {
        const user = await userModels.findOne({ _id: _id }).select("-password");
        if (user) {
            // Assuming isStatus is a property on the user model
            user.isBlocked = !user.isBlocked;
            await user.save();
            return "Successfully updated"; // Return success message
        } else {
            return null; // User not found
        }
    } catch (error) {
        throw error;
    }
}
