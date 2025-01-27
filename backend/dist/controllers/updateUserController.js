"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: "名前は必須です" });
            return;
        }
        /// Prismaを使ってユーザー情報を更新
        const updatedUser = yield prisma.user.update({
            where: {
                id: userId, // 更新するユーザーIDを指定
            },
            data: {
                name, // 新しい名前
            },
        });
        // 更新されたユーザー情報をレスポンスとして返す
        res.status(200).json(updatedUser);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "サーバーエラー" });
        return;
    }
});
exports.updateUserData = updateUserData;
