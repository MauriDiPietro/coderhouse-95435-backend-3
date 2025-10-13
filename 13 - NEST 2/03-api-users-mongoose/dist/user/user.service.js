"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("./helpers/bcrypt");
let UserService = class UserService {
    UserModel;
    JwtService;
    constructor(UserModel, JwtService) {
        this.UserModel = UserModel;
        this.JwtService = JwtService;
    }
    async register(createUserDto) {
        const { email, password } = createUserDto;
        const exist = await this.findByEmail(email);
        if (exist)
            throw new common_1.NotFoundException('El usuario ya existe');
        return await this.UserModel.create({
            ...createUserDto,
            password: (0, bcrypt_1.createHash)(password),
        });
    }
    async login(user) {
        const { email, password } = user;
        const exist = await this.findByEmail(email);
        if (!exist)
            throw new common_1.BadRequestException('Credenciales incorrectas');
        const passValid = (0, bcrypt_1.isValidPass)(password, exist.password);
        if (!passValid)
            throw new common_1.BadRequestException('Credenciales incorrectas');
        return this.generateToken(exist);
    }
    async findByEmail(email) {
        return await this.UserModel.findOne({ email });
    }
    generateToken(user) {
        const payload = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        };
        return this.JwtService.sign(payload);
    }
    profile(req) {
        return req.user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map