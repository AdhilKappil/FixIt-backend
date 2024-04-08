import AdminModel from "../../model/adminModel";



export const findAdmin = async(
    email: string,
    adminModel: typeof AdminModel
) => {
   try {
     console.log('email in findAdminByEmail in adminRepository --->>>> ', email)
     const allAdmins = await adminModel.find();
     
        const existingAdmin = await adminModel.findOne({ email: email });
        return existingAdmin
   } catch (error) {
        throw error
   }
}