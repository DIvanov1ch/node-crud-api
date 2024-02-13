export const getInvalidEndpointMessage = (url?: string): string =>
  `Invalid url: ${url}`;

export const getInvalidUserIdMessage = (uuid: string): string =>
  `Invalid uuid: ${uuid}`;

export const getInvalidDataMessage = (): string =>
  `Invalid data, check it and try again.`;

export const getUserDoesntExistMessage = (uuid: string): string =>
  `User with id '${uuid}' doesn't exist`;

export const getInternalServerErrorMessage = (): string =>
  `Resource you requested doesn't exist.`;
