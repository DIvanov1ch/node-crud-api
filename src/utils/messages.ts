export const getInvalidEndpointMessage = (url?: string): string => `Invalid url: ${url}`;

export const getInvalidUserIdMessage = (uuid: string): string => `Invalid uuid: ${uuid}`;

export const getInvalidDataMessage = (): string => `Invalid data, try again later`;

export const getUserDoesntExistMessage = (uuid: string): string => `User with id '${uuid}' doesn't exist`;

export const getInternalServerErrorMessage = (): string =>
  'There is a problem with the resource you are looking for, and it cannot be displayed.';
