import { IPersistentStorage } from "@/global-utils/persistent-storage";
import { AuthServerData } from "../user.type";

export class AuthStorage {
  private storage: IPersistentStorage;
  private storageKey = "AUTH";

  constructor(persistentStorage: IPersistentStorage) {
    this.storage = persistentStorage;
  }

  save(data: AuthServerData | null): void {
    this.storage.save(this.storageKey, data);
  }

  get(): AuthServerData | null {
    const data = this.storage.retrieve(this.storageKey);
    // validate here
    return data as AuthServerData | null;
  }

  delete(): void {
    this.storage.delete(this.storageKey);
  }
}
