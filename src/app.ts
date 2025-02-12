import express, { Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth";
import { connectToDB } from "./config/database";
import { UserModel } from "./models/user";
const app = express();

app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  const user = new UserModel({ ...req.body });
  try {
    await user.save();
    res.json({
      status: 200,
      message: "User Saved Successfully",
    });
  } catch (error) {
    res.json({
      status: 400,
      error: error.message,
    });
  }
});

app.patch("/update-profile/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const NOT_ALLOWED_FIELDS = ["password", "email"];
  const isDataIncludesNotAllowedFields = Object.keys(data).some((key) => {
    return NOT_ALLOWED_FIELDS.includes(key);
  });
  try {
    if (!id) {
      throw new Error("No id found");
    }
    if (isDataIncludesNotAllowedFields) {
      throw new Error("Email or Password couldn't be updated");
    }
    let updatedData = await UserModel.findOneAndUpdate({ _id: id }, data, {
      runValidators: true,
      returnDocument: "after",
    });
    res.json({
      status: 200,
      message: "User Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    res.json({
      status: 400,
      error: error.message,
    });
  }
});

app.get("/feed", async (req: Request, res: Response) => {
  try {
    let users = await UserModel.find({});
    try {
      res.json({
        count: users.length,
        data: users,
      });
    } catch (error) {
      res.json({
        status: 400,
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

connectToDB()
  .then(() => {
    console.log("DB Connection Successfull");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error Connecting to Database : ${error}`);
  });
