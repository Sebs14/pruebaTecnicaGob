"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.User = void 0;
class User {
    id;
    email;
    name;
    passwordHash;
    role;
    createdAt;
    updatedAt;
    constructor(id, email, name, passwordHash, role, createdAt, updatedAt) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.passwordHash = passwordHash;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(props) {
        return new User(crypto.randomUUID(), props.email.toLowerCase().trim(), props.name.trim(), props.passwordHash, props.role ?? UserRole.USER, new Date(), new Date());
    }
    isAdmin() {
        return this.role === UserRole.ADMIN;
    }
}
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=user.entity.js.map