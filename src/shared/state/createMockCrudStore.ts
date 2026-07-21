import { useSyncExternalStore } from "react";

type EntityWithId = {
  id: string;
};

type CreateInput<T extends EntityWithId> = Omit<T, "id"> & {
  id?: string;
};

export function createMockCrudStore<T extends EntityWithId>(seedData: T[]) {
  let items = [...seedData];
  const listeners = new Set<() => void>();

  function emitChange() {
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function getSnapshot() {
    return items;
  }

  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function create(item: CreateInput<T>) {
    const newItem = {
      ...item,
      id: item.id ?? generateId(),
    } as T;

    items = [newItem, ...items];
    emitChange();
    return newItem;
  }

  function update(id: string, updates: Partial<Omit<T, "id">>) {
    let updatedItem: T | undefined;

    items = items.map((item) => {
      if (item.id !== id) {
        return item;
      }

      updatedItem = { ...item, ...updates };
      return updatedItem;
    });

    emitChange();
    return updatedItem;
  }

  function remove(id: string) {
    items = items.filter((item) => item.id !== id);
    emitChange();
  }

  function getById(id: string) {
    return items.find((item) => item.id === id);
  }

  function useItems() {
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  }

  return {
    useItems,
    getById,
    create,
    update,
    remove,
  };
}
