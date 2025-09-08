// Enhanced data service with React Query integration
import * as localDB from './indexedDB';
import * as browseract from './browseract';

// Entity service base class with React Query integration
class EntityService {
  constructor(storeName) {
    this.storeName = storeName;
    this.queryKeys = {
      all: [storeName],
      lists: () => [...this.queryKeys.all, 'list'],
      list: (filters) => [...this.queryKeys.lists(), { filters }],
      details: () => [...this.queryKeys.all, 'detail'],
      detail: (id) => [...this.queryKeys.details(), id],
    };
  }

  // Local operations
  async createLocal(data) {
    return await localDB.create(this.storeName, data);
  }

  async readLocal(id) {
    return await localDB.read(this.storeName, id);
  }

  async readAllLocal() {
    return await localDB.readAll(this.storeName);
  }

  async updateLocal(id, data) {
    return await localDB.update(this.storeName, id, data);
  }

  async deleteLocal(id) {
    return await localDB.remove(this.storeName, id);
  }

  // Remote operations (to be implemented when APIs are ready)
  async createRemote(data) {
    // Placeholder for remote API call
    console.warn(`Remote create not implemented for ${this.storeName}`);
    return data;
  }

  async readRemote(id) {
    // Placeholder for remote API call
    console.warn(`Remote read not implemented for ${this.storeName}`);
    return null;
  }

  async readAllRemote() {
    // Placeholder for remote API call
    console.warn(`Remote readAll not implemented for ${this.storeName}`);
    return [];
  }

  async updateRemote(id, data) {
    // Placeholder for remote API call
    console.warn(`Remote update not implemented for ${this.storeName}`);
    return data;
  }

  async deleteRemote(id) {
    // Placeholder for remote API call
    console.warn(`Remote delete not implemented for ${this.storeName}`);
    return true;
  }

  // Hybrid operations - try remote first, fallback to local
  async create(data, useRemote = false) {
    if (useRemote) {
      try {
        return await this.createRemote(data);
      } catch (error) {
        console.error(`Remote create failed, falling back to local:`, error);
      }
    }
    return await this.createLocal(data);
  }

  async read(id, useRemote = false) {
    if (useRemote) {
      try {
        const remoteData = await this.readRemote(id);
        if (remoteData) return remoteData;
      } catch (error) {
        console.error(`Remote read failed, falling back to local:`, error);
      }
    }
    return await this.readLocal(id);
  }

  async readAll(useRemote = false) {
    if (useRemote) {
      try {
        const remoteData = await this.readAllRemote();
        if (remoteData && remoteData.length > 0) return remoteData;
      } catch (error) {
        console.error(`Remote readAll failed, falling back to local:`, error);
      }
    }
    return await this.readAllLocal();
  }

  async update(id, data, useRemote = false) {
    if (useRemote) {
      try {
        return await this.updateRemote(id, data);
      } catch (error) {
        console.error(`Remote update failed, falling back to local:`, error);
      }
    }
    return await this.updateLocal(id, data);
  }

  async delete(id, useRemote = false) {
    if (useRemote) {
      try {
        await this.deleteRemote(id);
        return true;
      } catch (error) {
        console.error(`Remote delete failed, falling back to local:`, error);
      }
    }
    await this.deleteLocal(id);
    return true;
  }

  // React Query helpers
  getQueryKeys() {
    return this.queryKeys;
  }
}

// Specific entity services
export const ClassService = new EntityService('classes');
export const MeetingService = new EntityService('meetings');
export const AttendanceService = new EntityService('attendance');
export const GradeService = new EntityService('grades');
export const FileService = new EntityService('files');
export const UserService = new EntityService('users');

// Initialize mock data
export async function initializeData() {
  await localDB.openDB();
  await localDB.initializeMockData();
}

// Export localDB functions for direct access when needed
export { openDB, initializeMockData } from './indexedDB';