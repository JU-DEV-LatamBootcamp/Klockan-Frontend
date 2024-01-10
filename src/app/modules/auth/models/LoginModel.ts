// login.model.ts
export class LoginModel {
  constructor(
    public username: string,
    public password: string
  ) {}

  isValid(): boolean {
    return this.isUsernameValid() && this.isPasswordValid();
  }

  private isUsernameValid(): boolean {
    return this.username.length >= 3;
  }

  private isPasswordValid(): boolean {
    return this.password.length >= 6;
  }
}
