import {UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {compare} from 'bcryptjs';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
export class MyUserService implements UserService<User,Credentials>{

  constructor(@repository(UserRepository)
   public userRepository: UserRepository)
   {}

  async verifyCredentials(credentials: Credentials): Promise<User> {

     const foundUser=await this.userRepository.findOne({
      where:{
        email:credentials.email
      }
     });
     if(!foundUser){
      throw new HttpErrors.NotFound(`user not found with this ${credentials.email}`);
     }
     const passwordMatched = await compare(credentials.password,foundUser.password);
     if(!passwordMatched){
         throw new HttpErrors.Unauthorized('password is not valid');
     }
     return foundUser;
  }
  convertToUserProfile(user: User):UserProfile{
    return {id:`${user.id}`,name:user.username,[securityId]: `${user.id}`};
  }
}
