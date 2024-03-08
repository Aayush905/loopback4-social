import {RequestBodyObject} from '@loopback/rest';

// export const CredentialsSchema={
//   type:'object',
//   required:['email','password'],
//   properties:{
//     email:{
//       type:'string',
//       format:'email'
//     },
//     password:{
//       type:'string'
//     },
//   },
// };

export const CredentialsRequestBody :Partial<RequestBodyObject> = {
  description:'The input of login function',
  required:true,
  content:{
    'application/json':{
      schema :{
        type:'object',
        required:['email','password'],
        properties:{
          email:{
            type:'string',
            format:'email'
          },
          password:{
            type:'string'
          },
        },
      }
    }
  },
};
