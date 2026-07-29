import { request } from "@/services/api";
import { useEffect, useState } from "react";

type EntityWithId = { id: string };
type Status = { loading: boolean; error: string | null };

export function createApiCrudRepository<T extends EntityWithId>(resource: string) {
  let items: T[] = [];
  let status: Status = { loading: false, error: null };
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());
  const refresh = async () => {
    status = { loading: true, error: null }; notify();
    try { items = await request<T[]>(resource); status = { loading: false, error: null }; }
    catch { status = { loading: false, error: "Não foi possível carregar os dados. Verifique sua conexão e tente novamente." }; }
    notify();
  };
  const useSnapshot = <V,>(selector: () => V) => {
    const [, rerender] = useState(0);
    useEffect(() => { const listener = () => rerender((value) => value + 1); listeners.add(listener); void refresh(); return () => { listeners.delete(listener); }; }, []);
    return selector();
  };
  return {
    useItems: () => useSnapshot(() => items),
    useStatus: () => useSnapshot(() => status),
    getById: (id: string) => items.find((item) => item.id === id),
    create: async (item: Omit<T, "id">) => { const created = await request<T>(resource, { method: "POST", body: JSON.stringify(item) }); items = [created, ...items]; notify(); return created; },
    update: async (id: string, updates: Partial<Omit<T, "id">>) => { const updated = await request<T>(`${resource}/${id}`, { method: "PUT", body: JSON.stringify(updates) }); items = items.map((item) => item.id === id ? updated : item); notify(); },
    remove: async (id: string) => { await request<void>(`${resource}/${id}`, { method: "DELETE" }); items = items.filter((item) => item.id !== id); notify(); },
  };
}
