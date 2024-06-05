import AdminModel from "../../model/adminModel";

// Correct the parameter type for _id
export const amountToWallet = async (
    adminProfit:number,
    adminModel: typeof AdminModel
): Promise<string | null> => {
    try {
        console.log("inseide admin wallet");
        console.log("profit",adminProfit);
        
        const admin = await adminModel.findOne().select("-password");
        if (admin) {
            admin.wallet = (admin.wallet || 0) + adminProfit;
            const res = await admin.save();
            console.log("res",res);
            return "Successfully updated wallet"; // Return success message
        } else {
            return null; // User not found
        }
    } catch (error) {
        throw error;
    }
}
