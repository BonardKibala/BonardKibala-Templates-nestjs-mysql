import { ConflictException } from '@nestjs/common';

export function validatePassword(
  password: string,
  password_confirm: string,
): string {
  if (password !== password_confirm)
    throw new ConflictException({
      error: 'Les deux mot de passe sont différents',
    });
  return password;
}
