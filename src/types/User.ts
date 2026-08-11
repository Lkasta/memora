export type UserType = {
  id: number;
  username: string;
  lastname?: string;
  email: string;
  /** Only ever sent on write (register/update) payloads; never present on read responses. */
  password?: string;
  profile_image_url?: string;
};
