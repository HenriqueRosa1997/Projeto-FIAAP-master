import { db } from "@/services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSyncExternalStore } from "react";

type EntityWithId = {
  id: string;
};

type RepositoryStatus = {
  loading: boolean;
  error: string | null;
};

type CreateInput<T extends EntityWithId> = Omit<T, "id"> & {
  id?: string;
};

function getSortStamp(item: EntityWithId) {
  const record = item as EntityWithId & {
    updatedAt?: number;
    createdAt?: number;
  };

  return record.updatedAt ?? record.createdAt ?? 0;
}

function sortByRecency<T extends EntityWithId>(items: T[]) {
  return [...items].sort((left, right) => {
    const stampDiff = getSortStamp(right) - getSortStamp(left);

    if (stampDiff !== 0) {
      return stampDiff;
    }

    return right.id.localeCompare(left.id);
  });
}

function removeDuplicateIds<T extends EntityWithId>(items: T[]) {
  const ids = new Set<string>();

  return items.filter((item) => {
    if (ids.has(item.id)) {
      return false;
    }

    ids.add(item.id);
    return true;
  });
}

export function createFirestoreCrudRepository<T extends EntityWithId>(
  collectionName: string,
) {
  const collectionRef = collection(db, collectionName);
  const listeners = new Set<() => void>();
  let items: T[] = [];
  let status: RepositoryStatus = { loading: true, error: null };
  let unsubscribeSnapshot: (() => void) | undefined;

  function emitChange() {
    listeners.forEach((listener) => listener());
  }

  function updateCache(nextItems: T[]) {
    items = sortByRecency(removeDuplicateIds(nextItems));
    emitChange();
  }

  function updateStatus(nextStatus: RepositoryStatus) {
    status = nextStatus;
    emitChange();
  }

  function startSnapshot() {
    if (unsubscribeSnapshot) {
      return;
    }

    status = { loading: true, error: null };
    unsubscribeSnapshot = onSnapshot(collectionRef, (snapshot) => {
      const nextItems = snapshot.docs.map((documentSnapshot) => ({
        id: documentSnapshot.id,
        ...(documentSnapshot.data() as Omit<T, "id">),
      })) as T[];

      status = { loading: false, error: null };
      updateCache(nextItems);
    }, () => {
      updateStatus({ loading: false, error: "Não foi possível carregar os dados. Verifique sua conexão e tente novamente." });
    });
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    startSnapshot();

    return () => {
      listeners.delete(listener);

      if (listeners.size === 0) {
        unsubscribeSnapshot?.();
        unsubscribeSnapshot = undefined;
      }
    };
  }

  function getSnapshot() {
    return items;
  }

  function useItems() {
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  }

  function useStatus() {
    return useSyncExternalStore(subscribe, () => status, () => status);
  }

  function getById(id: string) {
    return items.find((item) => item.id === id);
  }

  async function create(item: CreateInput<T>) {
    const now = Date.now();
    const payload = {
      ...item,
      createdAt: now,
      updatedAt: now,
    } as Omit<T, "id"> & { createdAt: number; updatedAt: number };

    const createdDoc = await addDoc(collectionRef, payload);
    const createdItem = { ...payload, id: createdDoc.id } as unknown as T;

    updateCache([createdItem, ...items]);
    return createdItem;
  }

  async function update(id: string, updates: Partial<Omit<T, "id">>) {
    const now = Date.now();
    const docRef = doc(collectionRef, id);

    await updateDoc(docRef, {
      ...updates,
      updatedAt: now,
    });

    const updatedItem = items.find((item) => item.id === id);

    if (updatedItem) {
      updateCache([
        {
          ...updatedItem,
          ...updates,
          updatedAt: now,
        } as T,
        ...items.filter((item) => item.id !== id),
      ]);
    }
  }

  async function remove(id: string) {
    await deleteDoc(doc(collectionRef, id));
    updateCache(items.filter((item) => item.id !== id));
  }

  async function findOneByField(fieldName: string, value: unknown) {
    const snapshot = await getDocs(
      query(collectionRef, where(fieldName, "==", value)),
    );

    const found = snapshot.docs[0];

    if (!found) {
      return undefined;
    }

    return {
      id: found.id,
      ...(found.data() as Omit<T, "id">),
    } as T;
  }

  return {
    useItems,
    useStatus,
    getById,
    create,
    update,
    remove,
    findOneByField,
  };
}
