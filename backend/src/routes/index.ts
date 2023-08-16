import Router from "koa-router";
import UserController from "../controllers/user";
import CheckInController from "../controllers/checkin";

const router = new Router({ prefix: "/api/v1" });

router.get("/hello", async (ctx) => {
  ctx.body = "hello world";
  ctx.status = 200;
});

router.post("/users", UserController.new);
router.get("/checkin/today", CheckInController.today);
router.get("/checkin/week", CheckInController.week);
router.get("/checkin/all-time", CheckInController.allTime);

export default router;
