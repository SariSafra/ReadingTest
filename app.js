import  express from "express";
import 'dotenv/config'

const app = express();
app.use(express.json());

app.use("/login", loginRouter)

//app.use(authenticateToken);
app.use("/users", usersRouter);



app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));

