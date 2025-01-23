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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const bcrypt = require("bcrypt");
const token_service_1 = require("./token/token.service");
let AppService = class AppService {
    constructor(clientKafka, tokenService) {
        this.clientKafka = clientKafka;
        this.tokenService = tokenService;
    }
    async onModuleInit() {
        this.clientKafka.subscribeToResponseOf('user.create');
        this.clientKafka.subscribeToResponseOf('user.get-user');
        await this.clientKafka.connect();
    }
    async signUp(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        dto.password = hashedPassword;
        const _user = await (0, rxjs_1.lastValueFrom)(this.clientKafka.send('user.create', dto));
        const payload = { sub: _user._id };
        const authToken = this.tokenService.signAuthToken(payload);
        _user.authToken = authToken;
        const user = this.userResponseGen(_user);
        return JSON.stringify(user);
    }
    async signIn(dto) {
        const _user = await (0, rxjs_1.lastValueFrom)(this.clientKafka.send('user.get-user', dto.email));
        const payload = { sub: _user._id };
        const authToken = this.tokenService.signAuthToken(payload);
        _user.authToken = authToken;
        const user = this.userResponseGen(_user);
        return JSON.stringify(user);
    }
    userResponseGen(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            authToken: user.authToken,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        token_service_1.TokenService])
], AppService);
//# sourceMappingURL=app.service.js.map