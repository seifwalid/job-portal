import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../../models/User';
import { firstValueFrom } from 'rxjs';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
/**
 * Service for managing users.
 * Provides methods for creating, reading, updating, and deleting users.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase ) { }
posts: any[] = []; 
  /**
   * Creates a new user.
   * @param user - The details of the new user.
   */
  async createUser(user: User) {
    await this.db.object<User>(`users/${user.id}`).set(user);
  }

  /**
   * Retrieves a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  async getUser(userId: string) {
    const user$ = this.db.object<User>(`users/${userId}`).valueChanges();
    return firstValueFrom(user$);
  }
async test(){
    await this.db.list('users').valueChanges().subscribe(posts => {
      this.posts = posts;
    });
    console.log(this.posts); // This will log an array of user objects
}
  /**
   * Updates a user.
   * @param user - The updated details of the user.
   */
  async updateUser(user: User) {
    await this.db.object<User>(`users/${user.id}`).update(user);
  }
  async getSpecificUser(){
    
const userr =   await this.db.object<User>(`users/`)
console.log(userr);   
}
  /**
   * Deletes a user.
   * @param userId - The ID of the user to delete.
   */
  async deleteUser(userId: string) {
    await this.db.object(`users/${userId}`).remove();
  }
}
