export const ADMIN_KEY = 'admin-metadata';

export function AdminFieldType(fieldType: string) {
  return (
      target: any,
      propertyKey: string | symbol
  ) => {
      const existingData = Reflect.getMetadata(ADMIN_KEY, target, propertyKey) || {};
      existingData['type'] = fieldType;
      Reflect.defineMetadata(ADMIN_KEY, existingData, target, propertyKey);
      return target[propertyKey];
  };
}