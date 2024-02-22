/**
 * Definition of an indexeddb table
 */
export interface IndexedDbTable {
    name: string;
    options?: IDBObjectStoreParameters;
    indexArray?: {
        name: string;
        fields: string[];
        unique: boolean;
    }[];
}
/**
 * IndexedDb manager.
 */
export declare class IndexedDbManager {
    private readonly DATABASE_NAME;
    /**
     * Default tables.
     */
    private readonly DEFAULT_TABLES;
    private db?;
    private tables;
    /**
     * Singleton design pattern
     */
    private static _instance;
    static instance(): IndexedDbManager;
    /**
     * Sets indexeddb tables. This should be called before getDatabase() is called.
     */
    setTables(tables: IndexedDbTable[]): void;
    /**
     * Gets indexeddb tables.
     */
    getTables(): IndexedDbTable[];
    /**
     * Makes sure to open database, and the table is already created before add/put/delete, etc.
     */
    getDatabase(): Promise<IDBDatabase>;
    /**
     * Closes the database.
     */
    closeDatabase(): void;
    private deleteDataBase;
    private getDB;
    private getUpgradedDB;
    private createTable;
}
