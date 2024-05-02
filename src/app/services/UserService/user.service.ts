import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { firstValueFrom } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
/**
 * Service for managing users.
 * Provides methods for creating, reading, updating, and deleting users.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) { }
  posts: any[] = [];
  /**
   * Creates a new user.
   * @param user - The details of the new user.
   */
  async createUser(user: User) {
    await this.db.collection<User>("users").doc(user.id).set(user);
  }

  /**
   * Retrieves a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  async getUser(userId: string) {
    const user$ = this.db.collection<User>(`users`).doc(userId).valueChanges();
    return await firstValueFrom(user$);
  }

  /**
   * Retrieves a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  async getUserJobs(userId: string) {
    const user$ = await this.getUser(userId);
    let jobs$, appliedJobs, postedJobs;
    if (user$?.role === "seeker") {
      appliedJobs = (user$?.appliedJobsIds ?? []).map(async (jobId) => {
        const temp = this.db.doc(jobId).valueChanges();
        return await firstValueFrom(temp);
      })
    }
    else if (user$?.role === "recruiter") {
      jobs$ = this.db.doc(user$?.postedJobsIds![1]!).valueChanges();
    }
    console.log(jobs$);
    return {
      appliedJobs,
      postedJobs
    };
  }

  /**
   * Updates a user.
   * @param user - The updated details of the user.
   */
  async updateUser(user: User) {
    await this.db.collection<User>(`users`).doc(user.id).update(user);
  }

  /**
   * Deletes a user.
   * @param userId - The ID of the user to delete.
   */
  async deleteUser(userId: string) {
    await this.db.collection<User>(`users`).doc(userId).delete();
  }
}
