import { v2 as cloudinary } from "cloudinary";

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;

        const result = await cloudinary.uploader.destroy(publicId);

        return result;
    } catch (error) {
        console.log("Cloudinary delete error:", error);
        return null;
    }
};

export { deleteFromCloudinary };