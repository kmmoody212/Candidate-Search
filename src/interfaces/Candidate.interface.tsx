// Created an interface for the Candidate objects returned by the API
export interface Candidate {
  readonly avatar_url: string | null;
  readonly name: string | null;
  readonly username: string;
  readonly location: string | null;
  readonly email: string | null;
  readonly company: string | null;
  readonly bio: string | null;
  readonly html_url: string | null;
}
