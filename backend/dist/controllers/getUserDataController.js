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
exports.getUserData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        // ユーザー情報をIDで取得
        const user = yield prisma.user.findUnique({
            where: {
                id: userId, // IDで検索
            },
        });
        // ユーザーが見つからなかった場合の処理
        if (!user) {
            res.status(404).json({ error: "ユーザーが見つかりません" });
            return;
        }
        // ユーザー情報をレスポンスとして返す
        res.status(200).json(user);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "サーバーエラー" });
        return;
    }
});
exports.getUserData = getUserData;
