import "dotenv/config";
import UserModel from "../models/user.model";
import connectDatabase from "../config/database.config";

export const CreateConexaAI = async () => {
  const existingAI = await UserModel.findOne({ isAI: true });
  if (existingAI) {
    await UserModel.deleteOne({ _id: existingAI._id });
  }
  const conexaAI = await UserModel.create({
    name: "Conexa AI",
    isAI: true,
    avatar:
      "https://res.cloudinary.com/dttt1f4un/image/upload/v1788543238/AI_logo_ujewnq.png",
  });
  console.log("Conexa AI created: ", conexaAI._id);
  return conexaAI;
};

const seedConexaAI = async () => {
  try {
    await connectDatabase();
    await CreateConexaAI();
    console.log("Seeding completed");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed: ", error);
    process.exit(0);
  }
};

seedConexaAI();
