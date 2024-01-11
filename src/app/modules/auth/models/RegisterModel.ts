// register.model.ts
export class RegisterModel {
  constructor(
    public username: string,
    public password: string,
    public email: string
  ) {}

  isValid(): boolean {
    return (
      this.isUsernameValid() && this.isPasswordValid() && this.isEmailValid()
    );
  }

  private isUsernameValid(): boolean {
    return this.username.length >= 3;
  }

  private isPasswordValid(): boolean {
    return this.password.length >= 6;
  }

  private isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}
