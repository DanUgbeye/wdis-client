import { IPersistentStorage } from "@/global-utils/persistent-storage";
import { UserServerData } from "../user.type";

export class UserStorage {
  private storage: IPersistentStorage;
  private storageKey = "USER";

  constructor(persistentStorage: IPersistentStorage) {
    this.storage = persistentStorage;
  }

  save(data: UserServerData | null): void {
    this.storage.save(this.storageKey, data);
  }

  get(): UserServerData | null {
    const data = this.storage.retrieve(this.storageKey);
    // validate here
    return data as UserServerData | null;
  }

  delete(): void {
    this.storage.delete(this.storageKey);
  }
}
