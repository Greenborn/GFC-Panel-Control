import { User } from "../users/types";

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type Fotoclub = {
  id: UUID;
  project_name: string;
  project_owner: User["id"];
  team: User["id"][];
  status: "important" | "completed" | "archived" | "in progress";
  created_at: string;
};

export type EmptyFotoclub = Omit<
  Fotoclub,
  "id" | "project_owner" | "created_at" | "status"
> & {
  project_owner: Fotoclub["project_owner"] | undefined;
  status: Fotoclub["status"] | undefined;
};
