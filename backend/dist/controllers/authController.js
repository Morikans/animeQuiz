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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
// 新規登録
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // パスワードのハッシュ化
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // ユーザー作成
        const user = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: "新規登録が完了しました！", user });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "ユーザーが既に存在するか、サーバーエラーです。" });
    }
});
exports.register = register;
// ログイン
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(400).json({ error: "ユーザーが見つかりません" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "パスワードが違います" });
            return;
        }
        const token = (0, jwt_1.generateJWT)(user.id);
        (0, jwt_1.storeJWT)(res, token);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "サーバーエラーです。" });
    }
});
exports.login = login;
