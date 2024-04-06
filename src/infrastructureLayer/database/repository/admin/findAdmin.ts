import AdminModel from "../../model/adminModel";



export const findAdmin = async(
    email: string,
    adminModel: typeof AdminModel
) => {
   try {
     console.log('email in findAdminByEmail in adminRepository --->>>> ', email)
     const allAdmins = await adminModel.find();
     console.log(allAdmins,'all admin');
     
        const existingAdmin = await adminModel.findOne({ email: email });
        console.log(existingAdmin,'is it admin')
        return existingAdmin
   } catch (error) {
        throw error
   }
}